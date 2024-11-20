import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormGrupoComponent } from './modal-form-grupo.component';

describe('ModalFormGrupoComponent', () => {
  let component: ModalFormGrupoComponent;
  let fixture: ComponentFixture<ModalFormGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalFormGrupoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalFormGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
