import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArticlesAdminPageComponent } from './list-articles-admin-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OrganismModule } from 'src/app/components/organism/organism.module';
import { AtomsModule } from 'src/app/components/atoms/atoms.module';

describe('ListArticlesAdminPageComponent', () => {
  let component: ListArticlesAdminPageComponent;
  let fixture: ComponentFixture<ListArticlesAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListArticlesAdminPageComponent ],
      imports: [HttpClientTestingModule, OrganismModule, AtomsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListArticlesAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
