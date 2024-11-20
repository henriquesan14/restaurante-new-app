import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PermissaoCategoria } from '../../../core/models/permissao-categoria';
import { FormUtils } from '../../../shared/utils/form.utils';
import { BtnCadastrarComponent } from '../../../shared/components/btn-cadastrar/btn-cadastrar.component';
import { GrupoService } from '../../../shared/services/grupo.service';
import { HasRoleDirective } from '../../../shared/directives/has-role.directive';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-form-grupo',
  standalone: true,
  imports: [ReactiveFormsModule, BtnCadastrarComponent, HasRoleDirective],
  templateUrl: './form-grupo.component.html',
  styleUrl: './form-grupo.component.css'
})
export class FormGrupoComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  formGrupo!: FormGroup;
  permissoes: PermissaoCategoria[] = [];
  permissaoSelecionada: { [key: number]: boolean } = {};

  @Output() submitEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() grupoId!: number;

  constructor(private formBuilder: FormBuilder, private grupoService: GrupoService){}

  ngOnInit(): void {
    this.formGrupo = this.formBuilder.group({
      nome: [null, Validators.required],
      sobAprovacao: [false]
    });
    // this.getPermissoes();
    
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getGrupo(){
    this.grupoService.getGrupoById(this.grupoId)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res) => {
        this.formGrupo.get('nome')?.setValue(res.nome);
        this.formGrupo.get('sobAprovacao')?.setValue(res.sobAprovacao);

        res.permissoes.forEach(permissao => {
          if (this.formGrupo.contains(String(permissao.id))) {
            this.formGrupo.get(String(permissao.id))?.setValue(true);
          }
        });
      }
    });
  }

  inicializarFormulario(): void {
    const formControls: { [key: string]: any } = {}; // Definir tipo explícito

    this.permissoes.forEach(categoria => {
      categoria.permissoes.forEach(permissao => {
        formControls[permissao.id] = false;
      });
    });

    this.formGrupo = this.formBuilder.group({
      nome: ['', Validators.required],
      sobAprovacao: [false],
      ...formControls
    });

    if (this.grupoId) {
      this.getGrupo();
    }
  }

  selecionarTudo(){
    this.permissoes.forEach(categoria => {
      categoria.permissoes.forEach(permissao => {
        this.formGrupo.get([permissao.id])?.setValue(true);
      });
    });
  }

  desmarcarTudo(){
    this.permissoes.forEach(categoria => {
      categoria.permissoes.forEach(permissao => {
        this.formGrupo.get([permissao.id])?.setValue(false);
      });
    });
  }

  submit(){
    if(this.formGrupo.valid){
      const permissoesSelecionadas = Object.keys(this.formGrupo.controls)
        .filter(key => key !== 'nome' && key !== 'sobAprovacao' && this.formGrupo.get(key)?.value) 
        .map(key => parseInt(key, 10));

      const novoGrupo ={
        nome: this.formGrupo.get('nome')?.value,
        sobAprovacao: this.formGrupo.get('sobAprovacao')?.value, 
        permissoes: permissoesSelecionadas
      };

      this.submitEvent.emit(novoGrupo);
    }else{
      FormUtils.markFormGroupTouched(this.formGrupo);
    }
  }

  isInvalidAndTouched(fieldName: string){
    return FormUtils.isInvalidAndTouched(this.formGrupo, fieldName);
  }
}
