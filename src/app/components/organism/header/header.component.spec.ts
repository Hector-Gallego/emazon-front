import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { NavigationEnd, Event, Router, RouterModule,} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Subject } from 'rxjs';
import { AtomsModule } from '../../atoms/atoms.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CoreModule } from 'src/app/core/core.module';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let routerMock: Partial<Router>;
  let routerEventsSubject: Subject<Event>;

  beforeEach(async () => {
    routerEventsSubject = new Subject<Event>();
    routerMock = {
      events: routerEventsSubject.asObservable(),
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, AtomsModule, HttpClientTestingModule, CoreModule ],
      declarations: [HeaderComponent],
      providers: [{ provide: Router, useValue: routerMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería actualizar currentRoute al recibir un evento NavigationEnd', () => {
    const testUrl = '/nueva-ruta';
    component.ngOnInit();
    
    
    routerEventsSubject.next(new NavigationEnd(1, testUrl, testUrl));
   
    fixture.detectChanges();
    expect(component.currentRoute).toBe(testUrl);
  });

  it('debería cambiar el valor de active al llamar a setActive', () => {
    component.active = true;
    component.setActive();
    expect(component.active).toBe(false);

    component.setActive();
    expect(component.active).toBe(true);
  });

  it('debería retornar true cuando la ruta actual coincide en isActive', () => {
    component.currentRoute = '/test-route';
    expect(component.isActive('/test-route')).toBe(true);
  });

  it('debería retornar false cuando la ruta actual no coincide en isActive', () => {
    component.currentRoute = '/test-route';
    expect(component.isActive('/other-route')).toBe(false);
  });

  it('deberia devolver true si las rutas coinciden', ()=>{

    const testRoute = '/tienda/articulos';

    component.onNavigateto();

    expect(routerMock.navigate).toHaveBeenCalledWith([testRoute]);

  });
 
});
