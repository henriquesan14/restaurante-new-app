import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Subject, takeUntil } from 'rxjs';
import { Despesa } from '../../../core/models/despesa.interface';
import { DespesaService } from '../../../shared/services/despesa.service';
import { FormUtils } from '../../../shared/utils/form.utils';
import { NgxMaskDirective } from 'ngx-mask';
import { BtnCadastrarComponent } from '../../../shared/components/btn-cadastrar/btn-cadastrar.component';
import { HasRoleDirective } from '../../../shared/directives/has-role.directive';

@Component({
  selector: 'app-form-despesa',
  standalone: true,
  imports: [ReactiveFormsModule, NgxSpinnerModule, NgxMaskDirective, BtnCadastrarComponent, HasRoleDirective],
  templateUrl: './form-despesa.component.html',
  styleUrl: './form-despesa.component.css'
})
export class FormDespesaComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  form!: FormGroup;
  @Output() submitEvent: EventEmitter<Despesa> = new EventEmitter<Despesa>();
  @Input() despesaId!: number;
  
  loading = false;
  mask: string = '';
  
  constructor(private formBuilder: FormBuilder, 
    private despesaService: DespesaService, private spinner: NgxSpinnerService){
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      tipo: [null, Validators.required],
      valor: [null, [Validators.required]],
      dataVencimento: [null,[Validators.required]],
      dataPagamento: [null],
      status:[null, Validators.required],
      observacoes:[null],
      nroProcesso: [null]
    });
    if(this.despesaId){
      this.getDespesa();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getDespesa(){
    this.loading = true;
    this.despesaService.getById(this.despesaId)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res) => {
        this.form.get('tipo')?.setValue(res.tipo);
        this.form.get('valor')?.setValue(res.valor);

        const dataVencimento = new Date(res.dataVencimento).toISOString().split('T')[0];
        this.form.get('dataVencimento')?.setValue(dataVencimento);

        if(res.dataPagamento){
          const dataPagamento = new Date(res.dataPagamento).toISOString().split('T')[0];
          this.form.get('dataPagamento')?.setValue(dataPagamento);
        }

        this.form.get('status')?.setValue(res.status);
        this.form.get('observacoes')?.setValue(res.observacoes);

        if(res.processo){
          this.form.get('nroProcesso')?.setValue(res.processo.nroProcesso);
        }
      },
      error: () => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    })
  }

  submit(){
    if(this.form.valid){
      const rawValue = this.form.get('valor')?.value;
      let valorSemPrefixo = rawValue.toString();

      // Verifica se o valor contém o prefixo 'R$' ou espaços antes de formatar
      if (/R\$\s?\d/.test(valorSemPrefixo)) {
        valorSemPrefixo = valorSemPrefixo.replace(/[R$\s]/g, '').replace('.', '').replace(',', '.');
      }
  
      const formValue = {
        ...this.form.value,
        nroProcesso: this.form.value.nroProcesso?.replace(/\D/g, '') || null,
        valor: valorSemPrefixo
      }
      this.submitEvent.emit(formValue);
    }else{
      FormUtils.markFormGroupTouched(this.form);
    }
  }

  isInvalidAndTouched(fieldName: string){
    return FormUtils.isInvalidAndTouched(this.form, fieldName);
  }

  getError(field: string, validation: string){
    return this.form.get(field)?.hasError(validation);
  }
}
