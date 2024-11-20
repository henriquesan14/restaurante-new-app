import { Component, EventEmitter, Output } from '@angular/core';
import { UserDropdownComponent } from '../user-dropdown/user-dropdown.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [UserDropdownComponent, NotificationsComponent, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Output() toggleMenuEvent = new EventEmitter<void>();

  constructor(){

  }
  
  toggleMenu() {
    this.toggleMenuEvent.emit();
  }

  faBars = faBars;
}
