import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMesaComponent } from './form-mesa.component';

describe('FormMesaComponent', () => {
  let component: FormMesaComponent;
  let fixture: ComponentFixture<FormMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormMesaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
