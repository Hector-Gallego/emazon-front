import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { NavBarComponent } from './nav-bar.component';
import { NavigationBarButtonComponent } from '../../atoms/navigation-bar-buttom/navigation-bar-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { By } from '@angular/platform-browser';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let routerMock: Partial<Router>;
  let routerEventsSubject: Subject<Event>;

  beforeEach(async () => {
    routerEventsSubject = new Subject<Event>();
    routerMock = {
      events: routerEventsSubject.asObservable(),
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [NavBarComponent, NavigationBarButtonComponent],
      imports: [FontAwesomeModule],
      providers: [{ provide: Router, useValue: routerMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener tres elementos en el menú', () => {
    expect(component.menuItems.length).toBe(3);
  });

  it('debería renderizar un componente app-navigation-bar-button por cada elemento en el menú', () => {
    const buttons = fixture.debugElement.queryAll(
      By.css('app-navigation-bar-button')
    );
    expect(buttons.length).toBe(component.menuItems.length);
  });

  it('debería pasar el label e icono correctos a cada app-navigation-bar-button', () => {
    const buttons = fixture.debugElement.queryAll(
      By.css('app-navigation-bar-button')
    );

    buttons.forEach((button, index) => {
      const label = button.componentInstance.label;
      const icon = button.componentInstance.icon;
      expect(label).toBe(component.menuItems[index].label);
      expect(icon).toBe(component.menuItems[index].icon);
    });
  });

  it('debería actualizar currentRoute en el evento NavigationEnd y agregar la suscripción', () => {
    const addSpy = jest.spyOn(component.subscription, 'add');

    component.ngOnInit();

    const testUrl = '/nueva-ruta';
    routerEventsSubject.next(new NavigationEnd(1, testUrl, testUrl));

    fixture.detectChanges();

    expect(component.currentRoute).toBe(testUrl);
    expect(addSpy).toHaveBeenCalled();
  });

  it('debería llamar a navigate() con la ruta correcta', () => {
    const testRoute = '/categorias';

    component.navigate(testRoute);

    expect(routerMock.navigate).toHaveBeenCalledWith([testRoute]);
  });

  it('debería cambiar el valor de isSidebarOpen de false a true cuando toggleSidebar() es llamado', () => {
    component.isSidebarOpen = false;
    component.toggleSidebar();
    expect(component.isSidebarOpen).toBe(true);
  });

  it('debería cambiar el valor de isSidebarOpen de true a false cuando toggleSidebar() es llamado', () => {
    component.isSidebarOpen = true;
    component.toggleSidebar();
    expect(component.isSidebarOpen).toBe(false);
  });
});
