import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DragDropModule } from 'primeng/dragdrop'; 
import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';

import { AuthService } from '../../services/auth.service';
import { PermissionsService } from '../../services/permissions.service';
import { HasPermissionDirective } from '../../directives/has-permission.directive';
export interface Comentario { autor: string; texto: string; fecha: Date; }
export interface Historial { accion: string; fecha: Date; }

export interface Ticket { 
  id: number; 
  titulo: string; 
  descripcion?: string; 
  estado: string; 
  asignado: string; 
  creador: string; 
  prioridad: string; 
  fechaCreacion: Date; 
  fechaLimite: Date;
  comentarios: Comentario[]; 
  historial?: Historial[];  
}

@Component({
  selector: 'app-group-detail',
  standalone: true, 
  imports: [
    CommonModule, ReactiveFormsModule, ButtonModule, TagModule, TableModule,
    DialogModule, InputTextModule, DragDropModule,
    FloatLabelModule, ConfirmDialogModule, ToastModule,
    HasPermissionDirective 
  ], 
  providers: [ConfirmationService, MessageService],
  templateUrl: './group-detail.html',
  styleUrl: './group-detail.css',
})

export class GroupDetail {
  private fb = inject(FormBuilder);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  protected authService = inject(AuthService); 
  protected permissionsSvc = inject(PermissionsService); 
  
  ticketArrastrado: Ticket | null = null; 
  vistaActual: 'kanban' | 'tabla' = 'kanban'; 
  ticketSeleccinoado?: Ticket | null = null; 

  //  Función para ver sí es creador del ticket. 
  esCreador(ticket: Ticket): boolean {
    const usuarioActual = (this.authService.usuario() as any)?.nombreCompleto;
    return ticket.creador === usuarioActual;
  }

  dragStart(ticket: Ticket) {
    this.ticketArrastrado = ticket;
  }

  dragEnd() {
    this.ticketArrastrado = null;
  }

  drop(estadoDestino: string) {
    if (this.ticketArrastrado && 
        this.ticketArrastrado.estado !== estadoDestino && 
        this.esCreador(this.ticketArrastrado)) {
      
      this.ticketArrastrado.estado = estadoDestino;
    }
    this.ticketArrastrado = null;
  }

  usuarios = ['Jonathan Joestar', 'Kakyoin', 'Mista', 'Narancia', 'Giorno Giovanna', 'Fugo', 'Abbachio', 'Bruno Bucciarati', 'Trisha'];


    tickets : Ticket[] = [
        { id: 101, titulo: 'Derrotar a Diavolo', descripcion: 'Matar al Diavolo', estado: 'Hecho',  creador: 'Bruno Bucciarati', asignado: 'Giorno Giovanna', prioridad: 'Alta', fechaCreacion: new Date('2026-03-01'), fechaLimite: new Date('2026-03-15'), comentarios: [], historial: []},
        { id: 102, titulo: 'Matar a Dio', estado: 'En Progreso', creador:'Zeppeli',  asignado: 'Jonathan', prioridad: 'Baja', fechaCreacion: new Date('2026-03-03'), fechaLimite: new Date('2026-12-03'), comentarios: [] },
        { id: 103, titulo: 'Sacar a pasear a Polnareff', estado: 'Hecho', creador: 'Giorno Giovanna', asignado: 'Giorno Giovanna', prioridad: 'Media', fechaCreacion: new Date('2026-03-05'), fechaLimite: new Date('2026-03-20'), comentarios: [] },
        { id: 104, titulo: 'Encontrar a número 5', estado: 'Bloqueado', creador: 'Mista', asignado: 'Mista', prioridad: 'Media', fechaCreacion: new Date('2026-02-28'), fechaLimite: new Date('2026-03-10'), comentarios: []  },
        { id: 105, titulo: 'Bañar a Mista', estado: 'En Progreso', creador: 'Giorno Giovanna', asignado: 'Trish', prioridad: 'Crítica', fechaCreacion: new Date('2026-01-04'), fechaLimite: new Date('2026-05-04'), comentarios: [] },
        { id: 106, titulo: 'Estudiar la tabla del 1', estado: 'En Progreso', creador: 'Fugo', asignado: 'Narancia', prioridad: 'Media', fechaCreacion: new Date('2026-02-03'), fechaLimite: new Date('2026-06-02'), comentarios: [] },
        { id: 107, titulo: 'Enseñar la tabla del 1', estado: 'Hecho', creador: 'Abbacchio', asignado: 'Fugo', prioridad: 'Baja', fechaCreacion: new Date('2026-03-01'), fechaLimite: new Date('2026-03-15'), comentarios: []  },
        { id: 108, titulo: 'Revivir a Passione', estado: 'Bloqueado', creador: 'Bruno Bucciarati', asignado: 'Giorno Giovanna', prioridad: 'Alta', fechaCreacion: new Date('2026-07-01'), fechaLimite: new Date('2026-05-02'), comentarios: [] },
        { id: 109, titulo: 'Echarse unas carnitas asadas', estado: 'Hecho', creador: 'Giorno Giovanna', asignado: 'Mista', prioridad: 'Media', fechaCreacion: new Date('2026-03-05'), fechaLimite: new Date('2026-03-20'), comentarios: [] },
        { id: 110, titulo: 'Revivir', estado: 'En Profreso', asignado: 'Kakyoin', creador: 'Loro', prioridad: 'Crítica', fechaCreacion: new Date('2026-02-28'), fechaLimite: new Date('2026-03-10'), comentarios: []},
        
    ];

  estados = ['Pendiente', 'En Progreso', 'Bloqueado', 'Hecho'];
  prioridades = ['Baja', 'Media', 'Alta', 'Crítica'];

  modoEdicion = false;
  modalVisible = false;
  ticketSeleccionado: Ticket | null = null;

  form: FormGroup = this.fb.group({
    titulo: ['', Validators.required],
    asignado: ['', Validators.required],
    estado: ['Pendiente', Validators.required],
    prioridad: ['Media', Validators.required],
    fechaLimite: [null, Validators.required]
  });

  getTickets(estado: string) {
    return this.tickets.filter(t => t.estado === estado);
  }

  getSeverity(prioridad: string): 'success' | 'warn' | 'danger' | 'info' {
    if (prioridad === 'Alta' || prioridad === 'Crítica') return 'danger';
    if (prioridad === 'Media') return 'warn';
    return 'success';
  }

  crearTicket() {
    this.modoEdicion = false;
    this.ticketSeleccionado = null;
    this.form.reset({ estado: 'Pendiente', prioridad: 'Media', creador: 'Giorno Giovanna' });

    this.form.enable(); 
    this.modalVisible = true;
  }

  editarTicket(ticket: Ticket) {
    this.modoEdicion = true;
    this.ticketSeleccionado = ticket;
    const fecha = new Date(ticket.fechaLimite);
    const fechaFormateada = fecha.toISOString().split('T')[0];
    this.form.patchValue({
      ...ticket,
      fechaLimite: fechaFormateada
    });

    if (this.esCreador(ticket)) {
      this.form.enable(); 
    } else { 
      this.form.disable(); 
    }

    this.modalVisible = true;
  }

    agregarComentario(inputEl: HTMLInputElement) {
        const texto = inputEl.value.trim();
        if (!texto || !this.ticketSeleccionado) return;
        const nombreUsuario = (this.authService.usuario() as any)?.nombreCompleto || 'Usuario';
        this.ticketSeleccionado?.comentarios.push({ autor: nombreUsuario, texto, fecha: new Date() });
        inputEl.value = '';
    }


  eliminarTicket(ticket: Ticket) {
    if (!this.esCreador(ticket)) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Solo el creador puede eliminar este ticket.' });
      return;
    }

    this.confirmationService.confirm({
      message: `¿Seguro que deseas eliminar el ticket "${ticket.titulo}"?`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonProps: { severity: 'danger' },
      rejectButtonProps: { severity: 'secondary', text: true },
      accept: () => {
        this.tickets = this.tickets.filter(t => t.id !== ticket.id);
        this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Ticket borrado correctamente.' });
        this.modalVisible = false; 
      }
    });
  }

  guardarTicket() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    const usuarioActual = (this.authService.usuario() as any)?.nombreCompleto || 'Usuario';
    
    if (this.modoEdicion && this.ticketSeleccionado) {
      const idx = this.tickets.findIndex(t => t.id === this.ticketSeleccionado!.id);
      this.tickets[idx] = { ...this.ticketSeleccionado, ...this.form.value };
      this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Ticket modificado correctamente.' });
    } else {
      const nuevo: Ticket = { 
        id: Date.now(), 
        ...this.form.value, 
        creador: usuarioActual, 
        fechaCreacion: new Date(),
        comentarios: [],
        historial: [{ accion: 'Ticket creado', fecha: new Date() }]
      };
      this.tickets = [...this.tickets, nuevo];
      this.messageService.add({ severity: 'success', summary: 'Creado', detail: 'Ticket creado correctamente.' });
    }
    
    this.tickets = [...this.tickets]; 
    this.modalVisible = false;
  }

  get misTickets() {
    const usuarioActual = (this.authService.usuario() as any)?.nombreCompleto;
    return this.tickets.filter(t => t.asignado === usuarioActual);
  }
}