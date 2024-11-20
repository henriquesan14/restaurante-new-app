import { Component, inject, OnInit } from '@angular/core';
import { BtnNovoComponent } from '../../../shared/components/btn-novo/btn-novo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Mesa } from '../../../core/models/mesa.interface';
import { CardMesaComponent } from '../card-mesa/card-mesa.component';
import { MesasService } from '../../../shared/services/mesas.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormMesaComponent } from '../form-mesa/form-mesa.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listagem-mesas',
  standalone: true,
  imports: [BtnNovoComponent, ReactiveFormsModule, CardMesaComponent],
  templateUrl: './listagem-mesas.component.html',
  styleUrl: './listagem-mesas.component.css'
})
export class ListagemMesasComponent implements OnInit {
  mesas: Mesa[] = [];

  private modalService = inject(NgbModal);

  constructor(private mesaService: MesasService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.getMesas(null);
  }

  getMesas(params: any){
    this.mesaService.getMesas(params).subscribe({
      next: (res) => {
        this.mesas = res;
      }
    })
  }

  novaMesa(){
    const modalRef = this.modalService.open(FormMesaComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.submitEvent.subscribe((e: any) => {
      this.mesaService.addMesa(e).subscribe({
        next: () => {
          this.toastr.success('Mesa cadastrada', 'Sucesso');
          this.getMesas(null);
        }
      })
    });
  }

  editarMesa(id: number){
    const modalRef = this.modalService.open(FormMesaComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.mesaId = id;
    modalRef.componentInstance.submitEvent.subscribe((e: any) => {
      e.id = id;
      this.mesaService.updateMesa(e).subscribe({
        next: () => {
          this.toastr.success('Mesa atualizada', 'Sucesso');
          this.getMesas(null);
        }
      })
    });
  }

  updateStatusMesa(event: any){
    this.mesaService.updateStatusMesa(event).subscribe({
      next: () => {
        this.toastr.success('Mesa atualizada', 'Sucesso');
        this.getMesas(null);
      }
    })
  }
}
