import {
    Directive, Input, OnInit,
    TemplateRef, ViewContainerRef, inject
} from '@angular/core';
import { AuthService, Permiso } from '../services/auth.service';

@Directive({
    selector: '[appPermiso]',
    standalone: true,
})
export class PermisoDirective implements OnInit {
    private auth = inject(AuthService);
    private vcr  = inject(ViewContainerRef);
    private tpl  = inject(TemplateRef<unknown>);

    @Input('appPermiso') permiso!: Permiso;

    ngOnInit(): void {
        if (this.auth.tienePermiso(this.permiso)) {
        this.vcr.createEmbeddedView(this.tpl);
        }
    }
}