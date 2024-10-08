import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBarButtomComponent } from './navigation-bar-buttom.component';

describe('NavigationBarButtomComponent', () => {
  let component: NavigationBarButtomComponent;
  let fixture: ComponentFixture<NavigationBarButtomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationBarButtomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationBarButtomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
