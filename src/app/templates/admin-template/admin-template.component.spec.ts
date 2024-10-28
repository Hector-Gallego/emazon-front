import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminTemplateComponent } from './admin-template.component';
import { RouterModule } from '@angular/router';
import { AtomsModule } from 'src/app/components/atoms/atoms.module';
import { OrganismModule } from 'src/app/components/organism/organism.module';
import { AdminModule } from 'src/app/pages/admin/admin.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('MainLayaoutComponent', () => {
  let component: AdminTemplateComponent;
  let fixture: ComponentFixture<AdminTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminTemplateComponent],
      imports: [AdminModule, AtomsModule, RouterTestingModule, OrganismModule ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
