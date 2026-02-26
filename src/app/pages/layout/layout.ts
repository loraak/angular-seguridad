import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, AvatarModule, ButtonModule],
  templateUrl: './layout.html'
})
export class Layout {
  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/login']);
  }
}