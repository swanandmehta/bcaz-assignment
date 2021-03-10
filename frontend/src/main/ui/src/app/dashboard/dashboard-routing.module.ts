import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../common/guard/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ServerListComponent } from './components/server-list/server-list.component';
import { ServerComponent } from './components/server/server.component';

const routes: Routes = [
  {
    path: "dashboard",
    pathMatch: "prefix",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "list"
      },
      {
        path: "list",
        pathMatch: "full",
        component: ServerListComponent
      },
      {
        path: "create",
        pathMatch: "full",
        component: ServerComponent
      },
      {
        path: ":id",
        pathMatch: "full",
        component: ServerComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
