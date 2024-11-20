import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { MenuService } from '../../../shared/services/menu.service';
import { ToastrService } from 'ngx-toastr';
import { Menu } from '../../../core/models/menu.interface';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { BtnNovoComponent } from '../../../shared/components/btn-novo/btn-novo.component';
import { BtnPesquisarComponent } from '../../../shared/components/btn-pesquisar/btn-pesquisar.component';
import { BtnLimparComponent } from '../../../shared/components/btn-limpar/btn-limpar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HasRoleDirective } from '../../../shared/directives/has-role.directive';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-listagem-menus',
  standalone: true,
  imports: [BtnNovoComponent, ReactiveFormsModule, BtnPesquisarComponent, BtnLimparComponent, FontAwesomeModule, HasRoleDirective, DatePipe, NgbTooltip],
  templateUrl: './listagem-menus.component.html',
  styleUrl: './listagem-menus.component.css'
})
export class ListagemMenusComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  filtroForm!: FormGroup;
  faTrash = faTrash;
  faEye = faEye;
  menus: Menu[] = [];

  private modalService = inject(NgbModal);

  constructor(private formBuilder: FormBuilder, private router: Router, private menuService: MenuService, private toastr: ToastrService){
    this.filtroForm = this.formBuilder.group({
      name: [null]
    });
  }

  ngOnInit(): void {
    this.getMenus();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getMenus(){
    this.menuService.getMenus(this.filtroForm.value)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res) => {
        this.menus = res;
      }
    });
  }

  limpar(){
    this.filtroForm.reset();
  }

  novoMenu(){
    this.router.navigateByUrl('/app/grupos/cadastro');
  }

  editarMenu(id: number){
    this.router.navigateByUrl(`/app/grupos/${id}`);
  }

  deleteMenu(menuId: number){
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.title = 'Confirmar Exclusão';
    modalRef.componentInstance.message = 'Tem certeza de que deseja excluir este item?';
    
    modalRef.result.then((result) => {
      if (result) {
        
        
      }
    }, () => {
    });
  }
}
