import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleInputSelectComponent } from './multiple-input-select.component';

describe('InputSelectComponent', () => {
  let component: MultipleInputSelectComponent;
  let fixture: ComponentFixture<MultipleInputSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleInputSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleInputSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
