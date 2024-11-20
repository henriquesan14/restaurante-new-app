import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemMesasComponent } from './listagem-mesas.component';

describe('ListagemMesasComponent', () => {
  let component: ListagemMesasComponent;
  let fixture: ComponentFixture<ListagemMesasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemMesasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemMesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
