import { Component, inject } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DespesaService } from '../../../shared/services/despesa.service';
import { Router } from '@angular/router';
import { Despesa } from '../../../core/models/despesa.interface';
import { FormDespesaComponent } from '../form-despesa/form-despesa.component';
import { BtnNovoComponent } from '../../../shared/components/btn-novo/btn-novo.component';
import { BtnVoltarComponent } from '../../../shared/components/btn-voltar/btn-voltar.component';

@Component({
  selector: 'app-cadastro-despesas',
  standalone: true,
  imports: [FormDespesaComponent, BtnNovoComponent, BtnVoltarComponent, NgxSpinnerModule],
  templateUrl: './cadastro-despesas.component.html',
  styleUrl: './cadastro-despesas.component.css'
})
export class CadastroDespesasComponent {

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private despesaService: DespesaService,
    private router: Router){
  }

  async submit(despesa: Despesa){
    this.spinner.show();
    
    this.cadastrarDespesa(despesa);
  }

  cadastrarDespesa(event: any){
    this.despesaService.addDespesa(event).subscribe({
      next: () => {
        this.toastr.success('Despesa cadastrada!', 'Sucesso!');
        this.router.navigateByUrl('app/despesas')
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
