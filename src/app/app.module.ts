import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TemplatesModule } from './templates/templates.module';
import { OrganismModule } from './components/organism/organism.module';
import { MoleculesModule } from './components/molecules/molecules.module';
import { AdminModule } from './pages/admin/admin.module';
import { ClientModule } from './pages/client/client.module';



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
    ClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
