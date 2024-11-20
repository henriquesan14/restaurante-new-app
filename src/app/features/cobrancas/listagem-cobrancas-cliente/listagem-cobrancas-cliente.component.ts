import { Component, inject, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbPagination, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CobrancaResponse } from '../../../core/models/cobranca-response.interface';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { CobrancaService } from '../../../shared/services/cobranca.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AsaasResponse } from '../../../core/models/asaas-response.interface';
import { HasRoleDirective } from '../../../shared/directives/has-role.directive';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listagem-cobrancas-cliente',
  standalone: true,
  imports: [FontAwesomeModule, DatePipe, CurrencyPipe, NgxSpinnerModule, NgClass, NgbTooltip, NgbPagination, HasRoleDirective],
  templateUrl: './listagem-cobrancas-cliente.component.html',
  styleUrl: './listagem-cobrancas-cliente.component.css'
})
export class ListagemCobrancasClienteComponent implements OnInit {

  @Input({required: true}) cpfCnpj!: string;

  activeModal = inject(NgbActiveModal);
  asaasResponse: AsaasResponse<CobrancaResponse> = {
    object: 'list',
    offset: 1,
    hasMore: false,
    data: [],
    limit: 20,
    totalCount: 0
  };
  cobrancas: CobrancaResponse[] = [];
  faTrash = faTrash;
  faEye = faEye;
  loading = false;

  private modalService = inject(NgbModal);
  
  constructor(private cobrancaService: CobrancaService, private spinner: NgxSpinnerService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.getCobrancas();
  }

  getCobrancas(){
    this.spinner.show();
    this.loading = true;
    var params = {
      offset: this.asaasResponse.offset - 1,
      limit: this.asaasResponse.limit,
      cpfCnpj: this.cpfCnpj
    };
    this.cobrancaService.getCobrancas(params).subscribe({
      next: (res) => {
        this.asaasResponse = res;
        this.asaasResponse.offset += 1;
      },
      error: () => {
        this.loading = false;
        this.spinner.hide();
      },
      complete: () => {
        this.loading = false;
        this.spinner.hide();
      }
    })
  }

  deleteCobranca(id: string){
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.title = 'Confirmar Exclusão';
    modalRef.componentInstance.message = 'Tem certeza de que deseja excluir este item?';
    
    modalRef.result.then((result) => {
      if (result) {
        this.cobrancaService.deleteCobrancaCobranca(id).subscribe({
          next: () => {
            this.toastr.success('Cobrança removida!', 'Sucesso');
            this.getCobrancas();
          }
        });
      }
    }, () => {
    });
  }

  openInvoiceInNewTab(url: string): void {
    window.open(url, '_blank');
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'badge bg-warning text-dark';
      case 'RECEIVED':
      case 'CONFIRMED':
      case 'RECEIVED_IN_CASH':
        return 'badge bg-success';
      case 'OVERDUE':
      case 'CHARGEBACK_REQUESTED':
      case 'REFUND_REQUESTED':
        return 'badge bg-danger';
      case 'REFUNDED':
      case 'REFUND_IN_PROGRESS':
      case 'DUNNING_REQUESTED':
      case 'DUNNING_RECEIVED':
        return 'badge bg-secondary';
      case 'AWAITING_RISK_ANALYSIS':
        return 'badge bg-info text-dark';
      default:
        return 'badge bg-light text-dark';
    }
}
}
