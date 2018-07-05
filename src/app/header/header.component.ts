import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styles: [`
    .active {
        background-color: red;
    }
    `]
})
export class HeaderComponent {
}
