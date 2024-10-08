import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLayaoutComponent } from './main-layaout.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MainLayaoutComponent', () => {
  let component: MainLayaoutComponent;
  let fixture: ComponentFixture<MainLayaoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainLayaoutComponent],
      schemas: [NO_ERRORS_SCHEMA] // Ignora componentes hijos no especificados
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayaoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
 
});
