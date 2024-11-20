import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoDespesasComponent } from './edicao-despesas.component';

describe('EdicaoDespesasComponent', () => {
  let component: EdicaoDespesasComponent;
  let fixture: ComponentFixture<EdicaoDespesasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdicaoDespesasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EdicaoDespesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
