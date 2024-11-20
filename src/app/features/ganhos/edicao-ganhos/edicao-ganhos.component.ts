import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { GanhoService } from '../../../shared/services/ganho.service';
import { Ganho } from '../../../core/models/ganho.interface';
import { FormGanhoComponent } from '../form-ganho/form-ganho.component';
import { BtnVoltarComponent } from '../../../shared/components/btn-voltar/btn-voltar.component';

@Component({
  selector: 'app-edicao-ganhos',
  standalone: true,
  imports: [FormGanhoComponent, BtnVoltarComponent, NgxSpinnerModule],
  templateUrl: './edicao-ganhos.component.html',
  styleUrl: './edicao-ganhos.component.css'
})
export class EdicaoGanhosComponent implements OnInit {
  ganhoId!: number;
  constructor(private activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService, private ganhoService: GanhoService, private toastr: ToastrService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.ganhoId = this.activatedRoute.snapshot.params['id'];
  }
  
  submit(event: Ganho){
    this.spinner.show();
    event.id = this.ganhoId;
    this.editarGanho(event);
  }

  async editarGanho(event: any){
    this.ganhoService.updateGanho(event).subscribe({
      next: () => {
        this.toastr.success('Ganho atualizado!', 'Sucesso');
        this.router.navigateByUrl('/app/ganhos');
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
