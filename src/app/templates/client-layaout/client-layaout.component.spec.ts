import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientLayaoutComponent } from './client-layaout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AtomsModule } from 'src/app/components/atoms/atoms.module';
import { OrganismModule } from 'src/app/components/organism/organism.module';
import { AdminModule } from 'src/app/pages/admin/admin.module';

describe('ClientLayaoutComponent', () => {
  let component: ClientLayaoutComponent;
  let fixture: ComponentFixture<ClientLayaoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminModule, AtomsModule, RouterTestingModule, OrganismModule],
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
