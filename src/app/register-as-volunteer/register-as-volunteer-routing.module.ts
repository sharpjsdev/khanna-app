import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterAsVolunteerPage } from './register-as-volunteer.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterAsVolunteerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterAsVolunteerPageRoutingModule {}
