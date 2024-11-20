import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoGanhosComponent } from './edicao-ganhos.component';

describe('EdicaoGanhosComponent', () => {
  let component: EdicaoGanhosComponent;
  let fixture: ComponentFixture<EdicaoGanhosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdicaoGanhosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EdicaoGanhosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
