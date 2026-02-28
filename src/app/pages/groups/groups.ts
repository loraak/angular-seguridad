import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './groups.html',
  styleUrl: './groups.css'
})
export class Groups {}