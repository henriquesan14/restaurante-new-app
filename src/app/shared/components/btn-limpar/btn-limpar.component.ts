import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'btn-limpar',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './btn-limpar.component.html',
  styleUrl: './btn-limpar.component.css'
})
export class BtnLimparComponent {
  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();
  faTimes = faTimes;

  limpar(){
    this.clickEvent.emit();
  }
}
