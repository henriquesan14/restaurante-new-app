import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../core/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../core/components/header/header.component';
import { FooterComponent } from '../../core/components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-authenticated',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './authenticated.component.html',
  styleUrl: './authenticated.component.css'
})
export class AuthenticatedComponent implements OnInit{

  larguraTela: number;
  menuHidden: boolean = false;

  constructor() {
    this.larguraTela = window.innerWidth;
    this.menuHidden
  }

  ngOnInit(): void {
    this.hideMenu();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.larguraTela = event.target.innerWidth;
    this.hideMenu();
  }

  hideMenu(){
    if (this.larguraTela < 900) {
      this.menuHidden = true;
    } else {
      this.menuHidden = false;
    }
  }

  toggleMenu(): void {
    this.menuHidden = !this.menuHidden;
  }

  toggleMenuNavigate(): void {
    if (this.larguraTela < 767){
      this.menuHidden = !this.menuHidden;
    }
  }
}
