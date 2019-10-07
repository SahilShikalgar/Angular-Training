import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.modal';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
 
export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    kind: string,
    expiresIn: string,
    localId: string,
    registerd?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;
    
    constructor(private http: HttpClient, private router: Router) {  }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
            { email, password, returnSecureToken: true }
        )
        .pipe(
            catchError(this.handleError),  //automatically passed response
            tap((responseData) => {
                this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn); // doing operation without changing responnse
            })   
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
            { email, password, returnSecureToken: true }
        )
        .pipe(
            catchError(this.handleError),    //automatically passed response
            tap((responseData) => {
                this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
            })
        );
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = 'Something went wrong! please try after some time';
        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
        }

        switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS': 
                errorMessage = 'The email address is already in use by another account.';
            break;
            case 'OPERATION_NOT_ALLOWED':
                errorMessage = 'Password sign-in is disabled for this project.';
            break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER': 
                errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
            break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
            break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The password is invalid or the user does not have a password.';
            break;
            case 'USER_DISABLED':
                errorMessage = 'The user account has been disabled by an administrator.';
        }
        return throwError(errorMessage);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        localStorage.setItem('userData', JSON.stringify(user));
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
    }

    logout() {
        this.user.next(null);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
        this.router.navigate(['/auth']);
    }

    autoLogin() {
        const user: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
    
        if(!user) {
            return;
        }
        const loadedUser = new User(user.email, user.id, user._token, new Date(user._tokenExpirationDate));
        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }
}