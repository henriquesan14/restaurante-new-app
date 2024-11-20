import { Component, OnInit } from '@angular/core';
import { GrupoService } from '../../../shared/services/grupo.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { BtnCadastrarComponent } from '../../../shared/components/btn-cadastrar/btn-cadastrar.component';
import { BtnVoltarComponent } from '../../../shared/components/btn-voltar/btn-voltar.component';
import { FormGrupoComponent } from '../form-grupo/form-grupo.component';

@Component({
  selector: 'app-edicao-grupos',
  standalone: true,
  imports: [BtnCadastrarComponent, BtnVoltarComponent, NgxSpinnerModule, FormGrupoComponent],
  templateUrl: './edicao-grupos.component.html',
  styleUrl: './edicao-grupos.component.css'
})
export class EdicaoGruposComponent implements OnInit {
  constructor(private grupoService: GrupoService, private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router,
    private activatedRoute: ActivatedRoute){

  }

  grupoId!: number;

  ngOnInit(){
    this.grupoId = this.activatedRoute.snapshot.params['id'];
  }

  editarGrupo(event: any){
    this.spinner.show();
    event.id = this.grupoId;
    this.grupoService.updateGrupo(event).subscribe({
      next: () => {
        this.toastr.success('Grupo atualizado!', 'Sucesso');
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
