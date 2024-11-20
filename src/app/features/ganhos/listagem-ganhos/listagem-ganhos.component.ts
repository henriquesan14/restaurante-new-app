import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Ganho } from '../../../core/models/ganho.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faExclamationCircle, faExclamationTriangle, faEye, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { GanhoService } from '../../../shared/services/ganho.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { BtnNovoComponent } from '../../../shared/components/btn-novo/btn-novo.component';
import { BtnLimparComponent } from '../../../shared/components/btn-limpar/btn-limpar.component';
import { BtnPesquisarComponent } from '../../../shared/components/btn-pesquisar/btn-pesquisar.component';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { NroProcessoPipe } from '../../../shared/pipes/nro-processo.pipe';

@Component({
  selector: 'app-listagem-ganhos',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, BtnNovoComponent, BtnLimparComponent, BtnPesquisarComponent, CurrencyPipe, DatePipe, NgClass, NroProcessoPipe, NgbTooltip],
  templateUrl: './listagem-ganhos.component.html',
  styleUrl: './listagem-ganhos.component.css'
})
export class ListagemGanhosComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  filtroForm!: FormGroup;
  ganhos: Ganho[] = [];
  faPencil = faPencil;
  faTrash = faTrash;
  faEye = faEye;
  faExclamationCircle = faExclamationCircle;
  faExclamationTriangle = faExclamationTriangle;
  faCheck = faCheck;


  private modalService = inject(NgbModal);

  constructor(private ganhoService: GanhoService, private formBuilder: FormBuilder, private router: Router, 
    private toastr: ToastrService){
    this.filtroForm = this.formBuilder.group({
      fonte: [''],
      status: ['']
    });
  }

  ngOnInit(): void {
    this.getGanhos();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getGanhos(){
    this.ganhoService.getGanhos(this.filtroForm.value)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res: Ganho[]) => {
        this.ganhos = res;
      }
    });
  }

  limpar(){
    this.filtroForm.reset();
    this.filtroForm.get('fonte')?.setValue('');
    this.filtroForm.get('status')?.setValue('');
  }

  novoGanho(){
    this.router.navigateByUrl('/app/ganhos/cadastro');
  }

  visualizarGanho(id: number){
    this.router.navigateByUrl(`/app/ganhos/${id}`);
  }

  deleteGanho(despesaId: number){
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.title = 'Confirmar Exclusão';
    modalRef.componentInstance.message = 'Tem certeza de que deseja excluir este item?';
    
    modalRef.result.then((result) => {
      if (result) {
        this.ganhoService.deleteGanho(despesaId).subscribe({
          next: () => {
            this.toastr.success('Ganho removido!', 'Sucesso');
            this.getGanhos();
          }
        });
      }
    }, () => {
    });
  }

  getRecebimentoStatus(dataVencimento: string): number {
    const vencimento = new Date(dataVencimento);
    const hoje = new Date();
  
    // Zerar as horas para comparar apenas as datas
    vencimento.setHours(0, 0, 0, 0);
    hoje.setHours(0, 0, 0, 0);
  
    // Calcula a diferença em milissegundos e converte para dias
    const diffInMilliseconds = vencimento.getTime() - hoje.getTime();
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const diffInDays = Math.floor(diffInMilliseconds / millisecondsInADay);
  
    return diffInDays;
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'PENDENTE':
        return 'badge bg-warning text-dark';
      case 'PAGO':
        return 'badge bg-success';
      case 'AGUARDANDO':
        return 'badge bg-secondary';
      case 'RECEBIDO':
        return 'badge bg-info text-dark';
      default:
        return 'badge bg-light text-dark';
    }
  }

  getTextoReduzido(descricao: string | undefined){
    if(!descricao){
      return 'N/A';
    }
    if(descricao.length <= 10){
      return descricao;
    }
    return `${descricao.substring(0,10)}...`;
  }
}
