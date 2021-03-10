import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './components/main/main.component';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardModule } from '../dashboard/dashboard.module';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { keycloakConfigProvider } from '../common/providers/Keycloak-provider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ToastrConfig } from '../common/config/Toastr-config';

@NgModule({
  declarations: [MainComponent],
  imports: [
    BrowserModule,
    CommonModule,
    MainRoutingModule,
    DashboardModule,
    KeycloakAngularModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(new ToastrConfig())
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: keycloakConfigProvider,
      multi: true,
      deps: [KeycloakService],
    }
  ],
  bootstrap: [MainComponent]
})
export class MainModule { }
