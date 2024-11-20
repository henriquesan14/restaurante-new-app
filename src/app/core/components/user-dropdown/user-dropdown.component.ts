import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDown, faCartArrowDown, faCogs, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { LocalstorageService } from '../../../shared/services/localstorage.service';
import { Router, RouterLink } from '@angular/router';
import { AvatarUsuarioComponent } from '../../../shared/components/avatar-usuario/avatar-usuario.component';
import { NotificationService } from '../../../shared/services/notification.service';
import { HasRoleDirective } from '../../../shared/directives/has-role.directive';

@Component({
  selector: 'app-user-dropdown',
  standalone: true,
  imports: [FontAwesomeModule, AvatarUsuarioComponent, RouterLink, HasRoleDirective],
  templateUrl: './user-dropdown.component.html',
  styleUrl: './user-dropdown.component.css'
})
export class UserDropdownComponent {

  constructor(private localStorageService: LocalstorageService, private router: Router, private notificationService: NotificationService){}

  faCartArrowDown = faCartArrowDown;
  faCogs = faCogs;
  faAngleDown = faAngleDown;
  faUser = faUser;
  faKey = faKey;

  logout(){
    this.notificationService.stopConnection();
    this.localStorageService.removeAuthStorage();
    this.router.navigateByUrl('/');
  }

  get nomeUsuario(){
    const response = this.localStorageService.getAuthStorage();
    return response.user.firstName;
  }
}
