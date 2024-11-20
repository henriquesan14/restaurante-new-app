import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'icon-cliente',
  standalone: true,
  imports: [FontAwesomeModule, NgbTooltip],
  templateUrl: './icon-cliente.component.html',
  styleUrl: './icon-cliente.component.css'
})
export class IconClienteComponent {
  faAddressCard = faAddressCard;
}
