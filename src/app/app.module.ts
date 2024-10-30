import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TemplatesModule } from './templates/templates.module';
import { OrganismModule } from './components/organism/organism.module';
import { MoleculesModule } from './components/molecules/molecules.module';
import { AdminModule } from './pages/admin/admin.module';
import { ClientModule } from './pages/client/client.module';
import { AuthModule } from './pages/auth/auth.module';
import { TokenInterceptor } from './core/interceptors/token-interceptor/token.interceptor';
import { ShowForRolesDirective } from './core/directives/show-for-roles/show-for-roles.directive';
import { HttpErrorHandlerInterceptor } from './core/interceptors/http-error-handler-intercepor/http-error-handler.interceptor';
import { HttpSuccesHandlerInterceptor } from './core/interceptors/http-succes-handler-interceptor/http-succes-handler.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [AppComponent],
  imports: [
    TemplatesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    FontAwesomeModule,
    OrganismModule,
    MoleculesModule,
    AdminModule,
    ClientModule,
    AuthModule,
    BrowserAnimationsModule

    
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandlerInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpSuccesHandlerInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
