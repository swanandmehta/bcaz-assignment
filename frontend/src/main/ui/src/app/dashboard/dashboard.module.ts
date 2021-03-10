import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ServerComponent } from './components/server/server.component';
import { ServerListComponent } from './components/server-list/server-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableTextPipe } from '../common/pipe/table-text.pipe';


@NgModule({
  declarations: [DashboardComponent, NavigationComponent, ServerComponent, ServerListComponent, TableTextPipe],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class DashboardModule {}
