import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl:'./header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    private usersSubject: Subscription;

    constructor(private dataStorageService: DataStorageService, private authService: AuthService) {  }

    ngOnInit() {
        this.usersSubject = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;
        });
    }

    ngOnDestroy(): void {
        this.usersSubject.unsubscribe();
    }

    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }
}