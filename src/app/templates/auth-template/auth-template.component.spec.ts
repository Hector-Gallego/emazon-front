import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthTemplateComponent } from './auth-template.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AtomsModule } from 'src/app/components/atoms/atoms.module';
import { OrganismModule } from 'src/app/components/organism/organism.module';
import { AdminModule } from 'src/app/pages/admin/admin.module';

describe('AuthTemplateComponent', () => {
  let component: AuthTemplateComponent;
  let fixture: ComponentFixture<AuthTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthTemplateComponent],
      imports: [
        AdminModule,
        AtomsModule,
        RouterTestingModule,
        OrganismModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
