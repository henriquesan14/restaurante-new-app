import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BtnLimparComponent } from '../../../shared/components/btn-limpar/btn-limpar.component';
import { CurrencyPipe } from '@angular/common';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BtnNovoComponent } from '../../../shared/components/btn-novo/btn-novo.component';

@Component({
  selector: 'app-itens-menu',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, BtnLimparComponent, CurrencyPipe, BtnNovoComponent],
  templateUrl: './itens-menu.component.html',
  styleUrl: './itens-menu.component.css'
})
export class ItensMenuComponent {
  itemForm!: FormGroup;
  menu: any = {}; // Dados do menu atual (pode ser preenchido pelo serviço)
  menuItems: any[] = []; // Lista de itens adicionados

  faTrash = faTrash;
  faEdit = faEdit;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Inicialização do formulário
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      description: ['']
    });

    // Simula carregar o menu atual
    this.menu = { id: 1, name: 'Menu Exemplo' };

    // Simula carregar itens do menu (pode ser obtido via serviço)
    this.menuItems = [
      { id: 1, name: 'Item 1', price: 10, description: 'Descrição do Item 1' }
    ];
  }

  addItem(): void {
    if (this.itemForm.valid) {
      const newItem = { id: Date.now(), ...this.itemForm.value };
      this.menuItems.push(newItem);
      this.itemForm.reset();
    }
  }

  editItem(item: any): void {
    this.itemForm.patchValue(item);
    this.removeItem(item.id); // Remove temporariamente para evitar duplicação
  }

  removeItem(itemId: number): void {
    this.menuItems = this.menuItems.filter(item => item.id !== itemId);
  }

  limparItemForm(): void {
    this.itemForm.reset();
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
