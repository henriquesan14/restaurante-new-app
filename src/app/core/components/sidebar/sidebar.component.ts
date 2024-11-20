import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LocalstorageService } from '../../../shared/services/localstorage.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarDays, faChair, faChartLine, faDashboard, faFile, faGavel, faHandHoldingDollar, faHome, faLandmark, faMoneyBillWaveAlt, faServer, faSpinner, faUser, faUserTie, faUsers, faUsersGear, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { HasRoleDirective } from '../../../shared/directives/has-role.directive';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule, HasRoleDirective],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  faHome = faHome;
  faUser = faUser;
  faUsers = faUsers;
  faFile = faFile;
  faUsersGear = faUsersGear;
  faCalendar = faCalendarDays;
  faLandmark = faLandmark;
  faGavel = faGavel;
  faServer = faServer;
  faUserTie = faUserTie;
  faSpinner = faSpinner;
  faMoneyBillWaveAlt = faMoneyBillWaveAlt;
  faHandHoldingDollar = faHandHoldingDollar;
  faChartLine = faChartLine;
  faUtensils = faUtensils;
  faChair = faChair;

  @Output() toggleMenuEvent = new EventEmitter<void>();


  activeItems: any[] = [
    {
      text: 'Dashboard',
      path: '/app/dashboard',
      icon: this.faChartLine,
      role: 'Admin'
    },
    {
      text: 'Menus',
      path: '/app/menus',
      icon: this.faUtensils,
      role: 'Admin'
    },
    {
      text: 'Mesas',
      path: '/app/mesas',
      icon: this.faChair,
      role: 'Admin'
    },
    {
      text: 'Usuários',
      path: '/app/usuarios',
      icon: this.faUser,
      role: 'Admin'
    },
    {
      text: 'Grupos',
      path: '/app/grupos',
      icon: this.faUsersGear,
      role: 'Admin'
    },
    {
      text: 'Despesas',
      path: '/app/despesas',
      icon: this.faMoneyBillWaveAlt,
      role: 'Admin'
    },
    {
      text: 'Ganhos',
      path: '/app/ganhos',
      icon: this.faHandHoldingDollar,
      role: 'Admin'
    }
  ];
  constructor(private localStorageService: LocalstorageService, private router: Router){}

  logout(){
    this.localStorageService.removeAuthStorage();
    this.router.navigateByUrl('/');
  }

  navigate(path: string){
    this.router.navigateByUrl(path);
    this.toggleMenuEvent.emit();
  }
}
