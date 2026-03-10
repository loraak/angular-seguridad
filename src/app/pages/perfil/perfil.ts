import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';
import { MessageService, ConfirmationService } from 'primeng/api';
import { KeyFilterModule } from 'primeng/keyfilter';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AvatarModule,
    CardModule,
    TagModule,
    DividerModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    FloatLabelModule,
    ToastModule,
    ConfirmDialogModule,
    TooltipModule,
    InputMaskModule,
    KeyFilterModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil {
  modalVisible = false;

  usuario = {
    nombreCompleto: 'César Zeppeli',
    usuario: 'CHICHA',
    email: 'cesar@email.com',
    direccion: 'Av. Estados Unidos',
    fechaNacimiento: '15/03/1800',
    telefono: '524681033370',
    activo: true
  };

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.form = this.fb.group({
      nombreCompleto:  ['', Validators.required],
      usuario:         ['', Validators.required],
      email:           ['', [Validators.required, Validators.email]],
      direccion:       ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      telefono:        ['', Validators.required]
    });
  }

  get f() {
    return this.form.controls as { [key: string]: FormControl };
  }

  abrirEditar() {
    this.form.patchValue(this.usuario);
    this.modalVisible = true;
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.usuario = { ...this.usuario, ...this.form.value };
    this.modalVisible = false;
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Perfil actualizado.' });
  }

  confirmarBaja() {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas dar de baja tu perfil?',
      header: 'Confirmar Baja',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usuario.activo = false;
        this.messageService.add({ severity: 'warn', summary: 'Baja', detail: 'Tu perfil ha sido dado de baja.' });
      }
    });
  }
}