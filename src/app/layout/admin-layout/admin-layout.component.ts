import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent {
  constructor(private router: Router) {}

  // Clear storage and navigate
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
