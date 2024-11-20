import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'btn-novo',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './btn-novo.component.html',
  styleUrl: './btn-novo.component.css'
})
export class BtnNovoComponent {
  faPlusCircle = faPlusCircle;
  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();
  @Input({required: true}) title!: string;

  novo(){
    this.clickEvent.emit();
  }
}
