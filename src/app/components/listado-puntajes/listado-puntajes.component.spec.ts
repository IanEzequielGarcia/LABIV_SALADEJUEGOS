import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPuntajesComponent } from './listado-puntajes.component';

describe('ListadoPuntajesComponent', () => {
  let component: ListadoPuntajesComponent;
  let fixture: ComponentFixture<ListadoPuntajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoPuntajesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoPuntajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
