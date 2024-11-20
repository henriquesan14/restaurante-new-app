import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BtnCadastrarComponent } from '../../../shared/components/btn-cadastrar/btn-cadastrar.component';
import { CompetenciaService } from '../../../shared/services/competencia.service';
import { ToastrService } from 'ngx-toastr';
import { FormUtils } from '../../../shared/utils/form.utils';
import { Parte } from '../../../core/models/parte.interface';
import { CobrancaService } from '../../../shared/services/cobranca.service';
import { NgxMaskDirective } from 'ngx-mask';
import { Cobranca } from '../../../core/models/cobranca.interface';
import { HasRoleDirective } from '../../../shared/directives/has-role.directive';

@Component({
  selector: 'app-modal-gerar-cobranca',
  standalone: true,
  imports: [ReactiveFormsModule, NgxSpinnerModule, BtnCadastrarComponent, NgxMaskDirective, HasRoleDirective],
  templateUrl: './modal-gerar-cobranca.component.html',
  styleUrl: './modal-gerar-cobranca.component.css'
})
export class ModalGerarCobrancaComponent {

  activeModal = inject(NgbActiveModal);
  form!: FormGroup;
  installmentOptions: Array<{ count: number; text: string }> = [];

  @Input() parte!: Parte;

  constructor(private cobrancaService: CobrancaService, private formBuilder: FormBuilder, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      billingType: [null, Validators.required],
      value: [null, Validators.required],
      dueDate: [null, Validators.required],
      installmentCount: [1],
      description: [null]
    });
    
  }

  submit() {
    if (this.form.valid) {
      this.gerarCobranca();
    } else {
      FormUtils.markFormGroupTouched(this.form);
    }
  }

  gerarCobranca() {
    this.spinner.show();
    const form = this.formatCobrancaValue();
    this.cobrancaService.gerarCobranca(form).subscribe({
      next: (res) => {
        this.toastr.success('Cobrança cadastrada!', 'Sucesso!');
        this.activeModal.close();
        this.openInvoiceInNewTab(res.invoiceUrl);
      },
      error: () => {
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      }
    })
  }

  formatCobrancaValue(){
    const rawValue = this.form.get('value')?.value;
    let valorSemPrefixo = rawValue.toString();
    if (/R\$\s?\d/.test(valorSemPrefixo)) {
      valorSemPrefixo = valorSemPrefixo.replace(/[R$\s]/g, '').replace('.', '').replace(',', '.');
    }

    return <Cobranca>{
      ...this.form.value,
      value: valorSemPrefixo,
      totalValue: valorSemPrefixo,
      installmentCount: this.form.value.billingType == 'CREDIT_CARD' ? this.form.value.installmentCount : 0,
      customerCpf: this.parte.cpfCnpj,
      customerName: this.parte.nome,
      customerEmail: this.parte.email
    }
  }

  updateInstallments(): void {
    const rawValue = this.form.get('value')?.value;

    const valorSemPrefixo = rawValue.toString().replace(/[R$\s]/g, '').replace('.', '').replace(',', '.');

    this.installmentOptions = [];

    if (valorSemPrefixo && !isNaN(valorSemPrefixo)) {
      for (let i = 1; i <= 12; i++) {
        const installmentValue = (valorSemPrefixo / i).toFixed(2);
        this.installmentOptions.push({
          count: i,
          text: `${i}x de R$ ${installmentValue}`
        });
      }
    }
  }

  openInvoiceInNewTab(url: string): void {
    window.open(url, '_blank');
  }

  isInvalidAndTouched(fieldName: string) {
    return FormUtils.isInvalidAndTouched(this.form, fieldName);
  }
}
