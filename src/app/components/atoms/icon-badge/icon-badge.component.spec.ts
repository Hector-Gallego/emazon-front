import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconBadgeComponent } from './icon-badge.component';

describe('CartBadgeComponent', () => {
  let component: IconBadgeComponent;
  let fixture: ComponentFixture<IconBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconBadgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
