import { Component, EventEmitter, Output, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GrupoService } from '../../../shared/services/grupo.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BtnCadastrarComponent } from '../../../shared/components/btn-cadastrar/btn-cadastrar.component';
import { FormGrupoComponent } from '../../grupos/form-grupo/form-grupo.component';

@Component({
  selector: 'app-modal-form-grupo',
  standalone: true,
  imports: [BtnCadastrarComponent, NgxSpinnerModule, FormGrupoComponent],
  templateUrl: './modal-form-grupo.component.html',
  styleUrl: './modal-form-grupo.component.css'
})
export class ModalFormGrupoComponent {
  activeModal = inject(NgbActiveModal);

  @Output() submitEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private grupoService: GrupoService, private toastr: ToastrService,
     private spinner: NgxSpinnerService){}


  cadastrarGrupo(event: any){
    this.spinner.show();
    this.grupoService.addGrupo(event).subscribe({
      next: () => {
        this.toastr.success('Grupo adicionado!', 'Sucesso');
        this.submitEvent.emit(true);
        this.activeModal.close();
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
