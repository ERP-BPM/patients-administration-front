import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployersFormComponent } from './components/employers-form/employers-form.component';
import { EmployersListComponent } from './components/employers-list/employers-list.component';
import { EmployeesPageComponent } from './pages/employees-page/employees-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PatientPageComponent } from './pages/patient-page/patient-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'employees', component: EmployeesPageComponent, children: [
      { path: 'list', component: EmployersListComponent },
      { path: 'create', component: EmployersFormComponent },
    ]
  },
  { path: 'patients', component: PatientPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
