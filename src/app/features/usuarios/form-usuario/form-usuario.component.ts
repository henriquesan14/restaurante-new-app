import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GrupoService } from '../../../shared/services/grupo.service';
import { Grupo } from '../../../core/models/grupo.interface';
import { ConfirmPasswordValidators } from '../../../shared/validators/confirm-password.validator';
import { Usuario } from '../../../core/models/usuario.interface';
import { FormUtils } from '../../../shared/utils/form.utils';
import { BtnCadastrarComponent } from '../../../shared/components/btn-cadastrar/btn-cadastrar.component';
import { NgxMaskDirective } from 'ngx-mask';
import { UsuariosService } from '../../../shared/services/usuarios.service';
import { HasRoleDirective } from '../../../shared/directives/has-role.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { Avatar } from '../../../core/models/avatar.interface';
import { DataService } from '../../../shared/services/data-service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AvatarService } from '../../../shared/services/avatar.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-form-usuario',
  standalone: true,
  imports: [ ReactiveFormsModule, BtnCadastrarComponent, NgxMaskDirective, HasRoleDirective, FontAwesomeModule, NgbTooltip, NgxSpinnerModule],
  templateUrl: './form-usuario.component.html',
  styleUrl: './form-usuario.component.css'
})
export class FormUsuarioComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  form!: FormGroup;
  grupos: Grupo[] = [];
  @Output() submitEvent: EventEmitter<Usuario> = new EventEmitter<Usuario>();
  @Input() usuarioId!: number;
  
  @ViewChild('fileInput') fileInput: any;

  faTrash = faTrash;

  avatar!: Avatar | null;
  loading = false;
  mask: string = '';
  
  constructor(private formBuilder: FormBuilder, 
    private grupoService: GrupoService, private usuarioService: UsuariosService, private dataService: DataService, private spinner: NgxSpinnerService,
    private avatarService: AvatarService){
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, this.usuarioId ? null : [Validators.required, Validators.minLength(6)]],
      confirmSenha: [null, this.usuarioId ? null : [Validators.required]],
      grupoId:[null, Validators.required],
      telefone:[null, [Validators.required, Validators.minLength(11)]],
      documento:[null, [Validators.minLength(11)]],
    }, {
      validators: ConfirmPasswordValidators.confirmPasswordValidator
    });
    this.getGrupos(null);
    if(this.usuarioId){
      this.getUsuario();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isSenhaRequired(): boolean {
    if (!this.usuarioId) {
      return true;
    } else if (this.form && this.form.get('senha')?.value) {
      return true;
    }
    return false;
  }
  

  getGrupos(parametros: any){
    this.grupoService.getGrupos(parametros)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res) => {
        this.grupos = res;
      },
    });
  }

  getUsuario(){
    this.loading = true;
    this.usuarioService.getUsuarioById(this.usuarioId)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res) => {
        this.avatar = res.avatar;
        this.form.get('nome')?.setValue(res.firstName);
        this.form.get('email')?.setValue(res.email);
        this.form.get('grupoId')?.setValue(res.roleId);
        this.form.get('telefone')?.setValue(res.phoneNumber);
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
      const usuario = <Usuario>{
        avatar: this.avatar,
        ...this.form.value
      };
      this.submitEvent.emit(usuario);
    }else{
      FormUtils.markFormGroupTouched(this.form);
    }
  }

  selectFile(): void {
    this.fileInput.nativeElement.click();
  }

  // Método chamado quando um arquivo é selecionado
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const urlLocal = URL.createObjectURL(file);
      this.avatar = { nome: file.name, urlLocal, file };
    }  
  }

  async deleteAvatar(){
    this.fileInput.nativeElement.value = '';
    if(this.avatar?.id){
      this.spinner.show();
      this.avatarService.deleteAvatar(this.avatar.id).subscribe({
        next: async () => {
          try{
            await this.dataService.deleteFile(this.avatar?.path!);
            this.avatar = null;
          }catch(e){
            this.spinner.hide();
          }finally{
            this.spinner.hide();
          }
        },
        error: () => {
          this.spinner.hide();
        }
      })
    }else{
      this.avatar = null;
    }
  }


  isInvalidAndTouched(fieldName: string){
    return FormUtils.isInvalidAndTouched(this.form, fieldName);
  }

  getError(field: string, validation: string){
    return this.form.get(field)?.hasError(validation);
  }

  onInputChange(): void {
    const cleanValue = this.form.get('documento')?.value;
    if (cleanValue.length <= 11) {
      this.mask = '000.000.000-009'; // CPF
    } else {
      this.mask = '00.000.000/0000-00'; // CNPJ
    }
  }

  get avatarSelecionado(){
    if(this.avatar && this.avatar.id){
      return this.avatar.url
    }
    return this.avatar && this.avatar.urlLocal ? this.avatar.urlLocal : 'assets/images/avatar.webp';
  }
}
