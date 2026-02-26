import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, PanelModule, DrawerModule, ButtonModule, AvatarModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  sidebarVisible = true;
}