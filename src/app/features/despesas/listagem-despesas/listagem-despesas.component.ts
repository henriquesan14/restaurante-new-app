import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BtnNovoComponent } from '../../../shared/components/btn-novo/btn-novo.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BtnPesquisarComponent } from '../../../shared/components/btn-pesquisar/btn-pesquisar.component';
import { BtnLimparComponent } from '../../../shared/components/btn-limpar/btn-limpar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Subject, takeUntil } from 'rxjs';
import { Despesa } from '../../../core/models/despesa.interface';
import { faCheck, faExclamationCircle, faExclamationTriangle, faEye, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DespesaService } from '../../../shared/services/despesa.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { NroProcessoPipe } from '../../../shared/pipes/nro-processo.pipe';
import { HasRoleDirective } from '../../../shared/directives/has-role.directive';

@Component({
  selector: 'app-listagem-despesas',
  standalone: true,
  imports: [CommonModule, BtnNovoComponent, ReactiveFormsModule, BtnPesquisarComponent, BtnLimparComponent, FontAwesomeModule, CurrencyPipe, DatePipe, NroProcessoPipe, NgbTooltipModule, HasRoleDirective],
  templateUrl: './listagem-despesas.component.html',
  styleUrl: './listagem-despesas.component.css'
})
export class ListagemDespesasComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  filtroForm!: FormGroup;
  despesas: Despesa[] = [];
  faPencil = faPencil;
  faTrash = faTrash;
  faEye = faEye;
  faExclamationCircle = faExclamationCircle;
  faExclamationTriangle = faExclamationTriangle;
  faCheck = faCheck;


  private modalService = inject(NgbModal);

  constructor(private despesaService: DespesaService, private formBuilder: FormBuilder, private router: Router, 
    private toastr: ToastrService){
    this.filtroForm = this.formBuilder.group({
      tipo: [''],
      status: ['']
    });
  }

  ngOnInit(): void {
    this.getDespesas();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getDespesas(){
    this.despesaService.getDespesas(this.filtroForm.value)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res: Despesa[]) => {
        this.despesas = res;
      }
    });
  }

  limpar(){
    this.filtroForm.reset();
    this.filtroForm.get('tipo')?.setValue('');
    this.filtroForm.get('status')?.setValue('');
  }

  novaDespesa(){
    this.router.navigateByUrl('/app/despesas/cadastro');
  }

  visualizarDespesa(id: number){
    this.router.navigateByUrl(`/app/despesas/${id}`);
  }

  deleteDespesa(despesaId: number){
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.title = 'Confirmar Exclusão';
    modalRef.componentInstance.message = 'Tem certeza de que deseja excluir este item?';
    
    modalRef.result.then((result) => {
      if (result) {
        this.despesaService.deleteDespesa(despesaId).subscribe({
          next: () => {
            this.toastr.success('Despesa removida!', 'Sucesso');
            this.getDespesas();
          }
        });
      }
    }, () => {
    });
  }

  pagarDespesa(id: number){
    this.despesaService.pagarDespesa(id).subscribe({
      next: () => {
        this.toastr.success('Despesa paga!', 'Sucesso');
        this.getDespesas();
      }
    })
  }

  getVencimentoStatus(dataVencimento: string): number {
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
