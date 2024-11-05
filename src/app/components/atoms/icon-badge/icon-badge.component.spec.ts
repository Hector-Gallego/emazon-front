import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconBadgeComponent } from './icon-badge.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('CartBadgeComponent', () => {
  let component: IconBadgeComponent;
  let fixture: ComponentFixture<IconBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconBadgeComponent ],
      imports: [SharedModule]
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
