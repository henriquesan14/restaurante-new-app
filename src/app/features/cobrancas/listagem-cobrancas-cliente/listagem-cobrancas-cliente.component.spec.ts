import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemCobrancasClienteComponent } from './listagem-cobrancas-cliente.component';

describe('ListagemCobrancasClienteComponent', () => {
  let component: ListagemCobrancasClienteComponent;
  let fixture: ComponentFixture<ListagemCobrancasClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemCobrancasClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemCobrancasClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
