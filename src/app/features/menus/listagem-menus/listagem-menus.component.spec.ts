import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemMenusComponent } from './listagem-menus.component';

describe('ListagemMenusComponent', () => {
  let component: ListagemMenusComponent;
  let fixture: ComponentFixture<ListagemMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemMenusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
