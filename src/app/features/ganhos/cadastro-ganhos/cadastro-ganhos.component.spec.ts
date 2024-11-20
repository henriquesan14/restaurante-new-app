import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroGanhosComponent } from './cadastro-ganhos.component';

describe('CadastroGanhosComponent', () => {
  let component: CadastroGanhosComponent;
  let fixture: ComponentFixture<CadastroGanhosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroGanhosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroGanhosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
