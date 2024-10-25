import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientLayaoutComponent } from './client-layaout.component';

describe('ClientLayaoutComponent', () => {
  let component: ClientLayaoutComponent;
  let fixture: ComponentFixture<ClientLayaoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientLayaoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientLayaoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
