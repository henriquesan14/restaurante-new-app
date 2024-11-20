import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'btn-pesquisar',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './btn-pesquisar.component.html',
  styleUrl: './btn-pesquisar.component.css'
})
export class BtnPesquisarComponent {
  faSearch = faSearch;
}
