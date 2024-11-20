import { Component } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { GanhoService } from '../../../shared/services/ganho.service';
import { Router } from '@angular/router';
import { Ganho } from '../../../core/models/ganho.interface';
import { FormGanhoComponent } from '../form-ganho/form-ganho.component';
import { BtnVoltarComponent } from '../../../shared/components/btn-voltar/btn-voltar.component';

@Component({
  selector: 'app-cadastro-ganhos',
  standalone: true,
  imports: [FormGanhoComponent, BtnVoltarComponent, NgxSpinnerModule],
  templateUrl: './cadastro-ganhos.component.html',
  styleUrl: './cadastro-ganhos.component.css'
})
export class CadastroGanhosComponent {
  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private ganhoService: GanhoService,
    private router: Router){
  }

  async submit(ganho: Ganho){
    this.spinner.show();
    
    this.cadastrarGanho(ganho);
  }

  cadastrarGanho(event: any){
    this.ganhoService.addGanho(event).subscribe({
      next: () => {
        this.toastr.success('Ganho cadastrado!', 'Sucesso!');
        this.router.navigateByUrl('app/ganhos')
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
