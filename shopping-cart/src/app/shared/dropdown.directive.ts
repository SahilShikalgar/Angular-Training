import { Directive, HostListener, Renderer2, Input, ElementRef } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    isOpen: boolean = false;
    @Input('dropdownMenu') dropdownMenu: ElementRef; 
    
    @HostListener('click') toggleOpen() {
        this.isOpen ?  this.rendered.removeClass(this.dropdownMenu, 'show') :  this.rendered.addClass(this.dropdownMenu, 'show');
        this.isOpen = !this.isOpen;
    }

    constructor(private rendered: Renderer2) {}
}