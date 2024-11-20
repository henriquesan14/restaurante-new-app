import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../shared/utils/form.utils';
import { BtnCadastrarComponent } from '../../../shared/components/btn-cadastrar/btn-cadastrar.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskDirective } from 'ngx-mask';
import { MesasService } from '../../../shared/services/mesas.service';

@Component({
  selector: 'app-form-mesa',
  standalone: true,
  imports: [ReactiveFormsModule, BtnCadastrarComponent, NgxMaskDirective],
  templateUrl: './form-mesa.component.html',
  styleUrl: './form-mesa.component.css'
})
export class FormMesaComponent {
  formMesa!: FormGroup;
  activeModal = inject(NgbActiveModal);

  @Output() submitEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() mesaId!: number;

  constructor(private formBuilder: FormBuilder, private mesaService: MesasService){}

  ngOnInit(): void {
    this.formMesa = this.formBuilder.group({
      name: [null, Validators.required],
      capacity: [null, Validators.required]
    });
    if(this.mesaId){
      this.getMesa();
    }
  }

  getMesa(){
    this.mesaService.getMesaById(this.mesaId).subscribe({
      next: (res) => {
        this.formMesa.get('name')?.setValue(res.name);
        this.formMesa.get('capacity')?.setValue(res.capacity);
      }
    })
  }

  submit(){
    if(this.formMesa.valid){
      this.submitEvent.emit(this.formMesa.value);
      this.activeModal.close();
    }
  }

  isInvalidAndTouched(fieldName: string){
    return FormUtils.isInvalidAndTouched(this.formMesa, fieldName);
  }
}
