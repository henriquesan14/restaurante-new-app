import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { FormUtils } from '../../../shared/utils/form.utils';
import { BtnCadastrarComponent } from '../../../shared/components/btn-cadastrar/btn-cadastrar.component';
import { BtnVoltarComponent } from '../../../shared/components/btn-voltar/btn-voltar.component';
import { ConfirmPasswordValidators } from '../../../shared/validators/confirm-password.validator';
import { ProfileService } from '../../../shared/services/profile.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-atualizar-senha',
  standalone: true,
  imports: [ReactiveFormsModule, NgxSpinnerModule, BtnCadastrarComponent, BtnVoltarComponent],
  templateUrl: './atualizar-senha.component.html',
  styleUrl: './atualizar-senha.component.css'
})
export class AtualizarSenhaComponent {
  formUpdatePassword!: FormGroup;

  constructor(private formBuilder: FormBuilder, private spinner: NgxSpinnerService, private profileService: ProfileService, private toastr: ToastrService){

  }

  ngOnInit(){
    this.formUpdatePassword = this.formBuilder.group({
      senhaAtual: [null, Validators.required],
      senha: [null, [Validators.required, Validators.minLength(6)]],
      confirmSenha: [null, [Validators.required]]
    },
    {
      validators: ConfirmPasswordValidators.confirmPasswordValidator
    });
  }

  submit(){
    if(this.formUpdatePassword.valid){
      this.spinner.show();
      this.profileService.atualizarSenha({
        senhaAtual: this.formUpdatePassword.get('senhaAtual')?.value,
        senhaNova: this.formUpdatePassword.get('senha')?.value
      }).subscribe({
        next: () => {
          this.formUpdatePassword.reset();
          this.toastr.success('Senha atualizada!', 'Sucesso');
        },
        error: () => {
          this.spinner.hide();
        },
        complete: () => {
          this.spinner.hide();
        }
      })
    }else{
      FormUtils.markFormGroupTouched(this.formUpdatePassword);
    }
  }

  isInvalidAndTouched(fieldName: string){
    return FormUtils.isInvalidAndTouched(this.formUpdatePassword, fieldName);
  }

  getError(field: string, validation: string){
    return this.formUpdatePassword.get(field)?.hasError(validation);
  }
}
