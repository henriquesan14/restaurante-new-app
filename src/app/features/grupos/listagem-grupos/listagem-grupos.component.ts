import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Grupo } from '../../../core/models/grupo.interface';
import { Router } from '@angular/router';
import { GrupoService } from '../../../shared/services/grupo.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BtnNovoComponent } from '../../../shared/components/btn-novo/btn-novo.component';
import { BtnPesquisarComponent } from '../../../shared/components/btn-pesquisar/btn-pesquisar.component';
import { BtnLimparComponent } from '../../../shared/components/btn-limpar/btn-limpar.component';
import { DatePipe } from '@angular/common';
import { NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { ToastrService } from 'ngx-toastr';
import { HasRoleDirective } from '../../../shared/directives/has-role.directive';

@Component({
  selector: 'app-listagem-grupos',
  standalone: true,
  imports: [FontAwesomeModule, BtnNovoComponent, ReactiveFormsModule, BtnPesquisarComponent, BtnLimparComponent, DatePipe, NgbTooltip, HasRoleDirective],
  templateUrl: './listagem-grupos.component.html',
  styleUrl: './listagem-grupos.component.css'
})
export class ListagemGruposComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  filtroForm!: FormGroup;
  faTrash = faTrash;
  faEye = faEye;
  grupos: Grupo[] = [];

  private modalService = inject(NgbModal);

  constructor(private formBuilder: FormBuilder, private router: Router, private grupoService: GrupoService, private toastr: ToastrService){
    this.filtroForm = this.formBuilder.group({
      nome: [null]
    });
  }

  ngOnInit(): void {
    this.getGrupos();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getGrupos(){
    this.grupoService.getGrupos(this.filtroForm.value)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res) => {
        this.grupos = res;
      }
    });
  }

  limpar(){
    this.filtroForm.reset();
  }

  novoGrupo(){
    this.router.navigateByUrl('/app/grupos/cadastro');
  }

  editarGrupo(id: number){
    this.router.navigateByUrl(`/app/grupos/${id}`);
  }

  deleteGrupo(grupoId: number){
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.title = 'Confirmar Exclusão';
    modalRef.componentInstance.message = 'Tem certeza de que deseja excluir este item?';
    
    modalRef.result.then((result) => {
      if (result) {
        this.grupoService.deleteGrupo(grupoId).subscribe({
          next: () => {
            this.toastr.success('Grupo removido!', 'Sucesso');
            this.getGrupos();
          }
        });
      }
    }, () => {
    });
  }
}
