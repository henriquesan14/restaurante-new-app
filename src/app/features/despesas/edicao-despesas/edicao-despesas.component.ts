import { Component, OnInit } from '@angular/core';
import { FormDespesaComponent } from '../form-despesa/form-despesa.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { DespesaService } from '../../../shared/services/despesa.service';
import { ToastrService } from 'ngx-toastr';
import { Despesa } from '../../../core/models/despesa.interface';
import { BtnVoltarComponent } from '../../../shared/components/btn-voltar/btn-voltar.component';

@Component({
  selector: 'app-edicao-despesas',
  standalone: true,
  imports: [FormDespesaComponent, NgxSpinnerModule, BtnVoltarComponent],
  templateUrl: './edicao-despesas.component.html',
  styleUrl: './edicao-despesas.component.css'
})
export class EdicaoDespesasComponent implements OnInit{
  despesaId!: number;
  constructor(private activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService, private despesaService: DespesaService, private toastr: ToastrService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.despesaId = this.activatedRoute.snapshot.params['id'];
  }
  
  submit(event: Despesa){
    this.spinner.show();
    event.id = this.despesaId;
    this.editarUsuario(event);
  }

  async editarUsuario(event: any){
    this.despesaService.updateDespesa(event).subscribe({
      next: () => {
        this.toastr.success('Despesa atualizada!', 'Sucesso');
        this.router.navigateByUrl('/app/despesas');
      },
      error: async () => {
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }
}
