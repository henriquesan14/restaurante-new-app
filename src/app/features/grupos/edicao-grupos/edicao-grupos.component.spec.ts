import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoGruposComponent } from './edicao-grupos.component';

describe('EdicaoGruposComponent', () => {
  let component: EdicaoGruposComponent;
  let fixture: ComponentFixture<EdicaoGruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdicaoGruposComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EdicaoGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
