import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBan, faCalendarCheck, faChair, faCheckCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Mesa } from '../../../core/models/mesa.interface';
import { NgClass } from '@angular/common';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { MesasService } from '../../../shared/services/mesas.service';

@Component({
  selector: 'card-mesa',
  standalone: true,
  imports: [FontAwesomeModule, NgClass, NgbTooltip],
  templateUrl: './card-mesa.component.html',
  styleUrl: './card-mesa.component.css'
})
export class CardMesaComponent {
  @Output() editEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateStatusEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input({required: true}) mesa!: Mesa;
  faChair = faChair;
  

  faCalendarCheck = faCalendarCheck;
  faCheck = faCheckCircle;
  faBan = faBan;
  faEdit = faEdit;

  ocuparMesa(id: number){
    const updateStatus = {
      id,
      status: 'BUSY'
    }
    
    this.updateStatusEvent.emit(updateStatus);
  }

  liberarMesa(id: number){
    const updateStatus = {
      id,
      status: 'AVAILABLE'
    }
    
    this.updateStatusEvent.emit(updateStatus);
  }

  reservarMesa(id: number){
    const updateStatus = {
      id,
      status: 'RESERVED'
    }
    
    this.updateStatusEvent.emit(updateStatus);
  }

  getIcon(status: string){
    if(status === 'AVAILABLE'){
      return this.faCheck;
    }else if(status === 'BUSY'){
      return this.faBan;
    }

    return this.faCalendarCheck;
  }

  editarMesa(){
    this.editEvent.emit();
  }
  
}
