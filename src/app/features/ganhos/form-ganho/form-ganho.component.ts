import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ganho } from '../../../core/models/ganho.interface';
import { GanhoService } from '../../../shared/services/ganho.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BtnCadastrarComponent } from '../../../shared/components/btn-cadastrar/btn-cadastrar.component';
import { NgxMaskDirective } from 'ngx-mask';
import { Subject, takeUntil } from 'rxjs';
import { FormUtils } from '../../../shared/utils/form.utils';

@Component({
  selector: 'app-form-ganho',
  standalone: true,
  imports: [ReactiveFormsModule, NgxSpinnerModule, BtnCadastrarComponent, NgxMaskDirective],
  templateUrl: './form-ganho.component.html',
  styleUrl: './form-ganho.component.css'
})
export class FormGanhoComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  form!: FormGroup;
  @Output() submitEvent: EventEmitter<Ganho> = new EventEmitter<Ganho>();
  @Input() ganhoId!: number;
  
  loading = false;
  mask: string = '';
  
  constructor(private formBuilder: FormBuilder, 
    private ganhoService: GanhoService, private spinner: NgxSpinnerService){
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fonte: [null, Validators.required],
      valor: [null, [Validators.required]],
      dataRecebimento: [null,[Validators.required]],
      status:[null, Validators.required],
      nroProcesso: [null]
    });
    if(this.ganhoId){
      this.getGanho();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getGanho(){
    this.loading = true;
    this.ganhoService.getById(this.ganhoId)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res) => {
        this.form.get('fonte')?.setValue(res.fonte);
        this.form.get('valor')?.setValue(res.valor);

        const dataRecebimento = new Date(res.dataRecebimento).toISOString().split('T')[0];
        this.form.get('dataRecebimento')?.setValue(dataRecebimento);

        this.form.get('status')?.setValue(res.status);

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
