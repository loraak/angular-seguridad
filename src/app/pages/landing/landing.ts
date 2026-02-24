import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, PanelModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {

}