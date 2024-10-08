import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavBarComponent } from './nav-bar.component';
import { NavigationBarButtonComponent } from '../../atoms/navigation-bar-buttom/navigation-bar-button.component'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { By } from '@angular/platform-browser';

describe('NavBarComponent', () => {
    let component: NavBarComponent;
    let fixture: ComponentFixture<NavBarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NavBarComponent, NavigationBarButtonComponent],
            imports: [FontAwesomeModule]
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
        const buttons = fixture.debugElement.queryAll(By.css('app-navigation-bar-button'));
        expect(buttons.length).toBe(component.menuItems.length);
    });

    it('debería pasar el label e icono correctos a cada app-navigation-bar-button', () => {
        const buttons = fixture.debugElement.queryAll(By.css('app-navigation-bar-button'));

        buttons.forEach((button, index) => {
            const label = button.componentInstance.label;
            const icon = button.componentInstance.icon;
            expect(label).toBe(component.menuItems[index].label);
            expect(icon).toBe(component.menuItems[index].icon);
        });
    });
});
