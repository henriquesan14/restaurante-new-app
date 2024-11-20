import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGerarCobrancaComponent } from './modal-gerar-cobranca.component';

describe('ModalGerarCobrancaComponent', () => {
  let component: ModalGerarCobrancaComponent;
  let fixture: ComponentFixture<ModalGerarCobrancaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalGerarCobrancaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalGerarCobrancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
