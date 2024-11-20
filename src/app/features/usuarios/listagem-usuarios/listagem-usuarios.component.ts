import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Usuario } from '../../../core/models/usuario.interface';
import { faEye, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UsuariosService } from '../../../shared/services/usuarios.service';
import { Router } from '@angular/router';
import { BtnNovoComponent } from '../../../shared/components/btn-novo/btn-novo.component';
import { BtnPesquisarComponent } from '../../../shared/components/btn-pesquisar/btn-pesquisar.component';
import { BtnLimparComponent } from '../../../shared/components/btn-limpar/btn-limpar.component';
import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { GrupoService } from '../../../shared/services/grupo.service';
import { Grupo } from '../../../core/models/grupo.interface';
import { HasRoleDirective } from '../../../shared/directives/has-role.directive';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { ToastrService } from 'ngx-toastr';
import { LocalstorageService } from '../../../shared/services/localstorage.service';

@Component({
  selector: 'app-listagem-usuarios',
  standalone: true,
  imports: [BtnNovoComponent, ReactiveFormsModule, BtnPesquisarComponent, BtnLimparComponent, DatePipe, FontAwesomeModule, NgbTooltip, HasRoleDirective],
  templateUrl: './listagem-usuarios.component.html',
  styleUrl: './listagem-usuarios.component.css'
})
export class ListagemUsuariosComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  filtroForm!: FormGroup;
  usuarios: Usuario[] = [];
  faPencil = faPencil;
  faTrash = faTrash;
  faEye = faEye;
  grupos: Grupo[] = [];

  private modalService = inject(NgbModal);

  constructor(private usuarioService: UsuariosService, private formBuilder: FormBuilder, private router: Router, 
    private grupoService: GrupoService, private toastr: ToastrService, private localStorageService: LocalstorageService){
    this.filtroForm = this.formBuilder.group({
      nome: [null],
      grupoId: ['']
    });
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getUsuarios(){
    this.usuarioService.getUsuarios(this.filtroForm.value)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res: Usuario[]) => {
        this.usuarios = res;
      }
    });
  }

  getGrupos(){
    this.grupoService.getGrupos(null)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res) => {
        this.grupos = res;
      }
    });
  }

  limpar(){
    this.filtroForm.reset();
    this.filtroForm.get('grupoId')?.setValue('');
  }

  novaUsuario(){
    this.router.navigateByUrl('/app/usuarios/cadastro');
  }

  visualizarUsuario(id: number){
    this.router.navigateByUrl(`/app/usuarios/${id}`);
  }

  deleteUsuario(usuarioId: number){
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.title = 'Confirmar Exclusão';
    modalRef.componentInstance.message = 'Tem certeza de que deseja excluir este item?';
    
    modalRef.result.then((result) => {
      if (result) {
        this.usuarioService.deleteUsuario(usuarioId).subscribe({
          next: () => {
            this.toastr.success('Usuário removido!', 'Sucesso');
            this.getUsuarios();
          }
        });
      }
    }, () => {
    });
  }

  avatar(usuario: Usuario){
    if(usuario.avatar){
      return usuario.avatar.url;
    }
    return 'assets/images/avatar.webp';
  }
  
}
