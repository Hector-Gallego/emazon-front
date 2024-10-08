import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoComponent } from './logo.component';
import { By } from '@angular/platform-browser';

describe('LogoComponent', () => {
    let component: LogoComponent;
    let fixture: ComponentFixture<LogoComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ LogoComponent ]
      })
      .compileComponents();
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(LogoComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  

    it('debería crear el componente', () => {
      expect(component).toBeTruthy();
    });
  

    it('debería tener una imagen', () => {
      const img = fixture.debugElement.query(By.css('img'));
      expect(img).toBeTruthy();
      expect(img.nativeElement.getAttribute('src')).toContain('assets/logo.svg');
     
    });
  
  });