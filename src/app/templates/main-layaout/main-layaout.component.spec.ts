import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLayaoutComponent } from './main-layaout.component';
import { PageModule } from 'src/app/pages/pages.module';
import { RouterModule } from '@angular/router';
import { AtomsModule } from 'src/app/components/atoms/atoms.module';
import { OrganismModule } from 'src/app/components/organism/organism.module';

describe('MainLayaoutComponent', () => {
  let component: MainLayaoutComponent;
  let fixture: ComponentFixture<MainLayaoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainLayaoutComponent],
      imports: [PageModule, AtomsModule, RouterModule, OrganismModule ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayaoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
