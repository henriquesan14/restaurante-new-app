import { Component } from '@angular/core';
import { BtnVoltarComponent } from '../../../shared/components/btn-voltar/btn-voltar.component';
import { FormGrupoComponent } from '../form-grupo/form-grupo.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { GrupoService } from '../../../shared/services/grupo.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-grupos',
  standalone: true,
  imports: [BtnVoltarComponent, FormGrupoComponent, NgxSpinnerModule],
  templateUrl: './cadastro-grupos.component.html',
  styleUrl: './cadastro-grupos.component.css'
})
export class CadastroGruposComponent {

  constructor(private grupoService: GrupoService, private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router){

  }

  cadastrarGrupo(event: any){
    this.spinner.show();
    this.grupoService.addGrupo(event).subscribe({
      next: () => {
        this.toastr.success('Grupo adicionado!', 'Sucesso');
        this.router.navigateByUrl('/app/grupos');
      },
      error: () => {
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }
}
