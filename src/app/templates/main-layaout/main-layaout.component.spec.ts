import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLayaoutComponent } from './main-layaout.component';
import { RouterModule } from '@angular/router';
import { AtomsModule } from 'src/app/components/atoms/atoms.module';
import { OrganismModule } from 'src/app/components/organism/organism.module';
import { AdminModule } from 'src/app/pages/admin/admin.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('MainLayaoutComponent', () => {
  let component: MainLayaoutComponent;
  let fixture: ComponentFixture<MainLayaoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainLayaoutComponent],
      imports: [AdminModule, AtomsModule, RouterTestingModule, OrganismModule ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayaoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
