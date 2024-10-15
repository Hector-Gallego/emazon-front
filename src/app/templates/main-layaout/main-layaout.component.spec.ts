import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLayaoutComponent } from './main-layaout.component';
import { PageModule } from 'src/app/pages/pages.module';
import { DesignSystemModule } from 'src/app/design-system/design-system.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';

describe('MainLayaoutComponent', () => {
  let component: MainLayaoutComponent;
  let fixture: ComponentFixture<MainLayaoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainLayaoutComponent],
      imports: [PageModule, DesignSystemModule, RouterModule ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayaoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
