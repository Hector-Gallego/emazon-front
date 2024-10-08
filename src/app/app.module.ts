import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/atoms/button/button.component';
import { InputComponent } from './components/atoms/input/input.component';
import { FormsModule } from '@angular/forms';
import { LogoComponent } from './components/atoms/logo/logo.component';
import { NavigationBarButtonComponent } from './components/atoms/navigation-bar-buttom/navigation-bar-button.component'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavBarComponent } from './components/organism/nav-bar/nav-bar.component';
import { DivisorComponent } from './components/atoms/divisor/divisor.component';
import { CategoryFormComponent } from './components/organism/category-form/category-form.component';
import { AddCategoryPageComponent } from './features/pages/add-category-page/add-category-page.component';
import { MainLayaoutComponent } from './features/templates/main-layaout/main-layaout.component';
import { HeaderComponent } from './components/organism/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './components/molecules/toast/toast.component';
import { IconComponent } from './components/atoms/icon/icon.component';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './components/atoms/loader/loader.component';


@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    InputComponent,
    LogoComponent,
    NavigationBarButtonComponent,
    NavBarComponent,
    DivisorComponent,
    CategoryFormComponent,
    AddCategoryPageComponent,
    MainLayaoutComponent,
    HeaderComponent,
    ToastComponent,
    IconComponent,
    LoaderComponent,   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
