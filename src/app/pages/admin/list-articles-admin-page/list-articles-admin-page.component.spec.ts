import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArticlesAdminPageComponent } from './list-articles-admin-page.component';

describe('ListArticlesAdminPageComponent', () => {
  let component: ListArticlesAdminPageComponent;
  let fixture: ComponentFixture<ListArticlesAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListArticlesAdminPageComponent ]
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
