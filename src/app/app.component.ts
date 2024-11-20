import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LocalstorageService } from './shared/services/localstorage.service';
import { NotificationService } from './shared/services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private localStorageService: LocalstorageService, private notificationService: NotificationService){}

  ngOnInit() {
    // Verifica se o usuário está logado ao iniciar a aplicação
    const auth = this.localStorageService.getAuthStorage();
    if (auth) {
      // this.notificationService.startConnection(auth.user.id.toString());
    }

    
  }
}
