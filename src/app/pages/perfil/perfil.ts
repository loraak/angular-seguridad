import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, AvatarModule, CardModule, TagModule, DividerModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil {
  usuario = {
    nombreCompleto: 'César Zeppeli',
    usuario: 'CHICHA',
    email: 'cesar@email.com',
    direccion: 'Av. Estados Unidos',
    fechaNacimiento: '15/03/1800',
    telefono: '524681033370'
  };
}