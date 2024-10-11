import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBrandPageComponent } from './add-brand-page.component';

xdescribe('AddBrandPageComponent', () => {
  let component: AddBrandPageComponent;
  let fixture: ComponentFixture<AddBrandPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBrandPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBrandPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
