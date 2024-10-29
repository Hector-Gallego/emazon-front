import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTemplateComponent } from './client-template.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AtomsModule } from 'src/app/components/atoms/atoms.module';
import { OrganismModule } from 'src/app/components/organism/organism.module';
import { AdminModule } from 'src/app/pages/admin/admin.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClientTemplateComponent', () => {
  let component: ClientTemplateComponent;
  let fixture: ComponentFixture<ClientTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminModule, AtomsModule, RouterTestingModule, OrganismModule, HttpClientTestingModule],
      declarations: [ ClientTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
