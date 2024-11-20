import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGanhoComponent } from './form-ganho.component';

describe('FormGanhoComponent', () => {
  let component: FormGanhoComponent;
  let fixture: ComponentFixture<FormGanhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormGanhoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormGanhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
