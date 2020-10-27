import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterVolunteerPage } from './register-volunteer.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterVolunteerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterVolunteerPageRoutingModule {}
