import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { ViewStudentPage } from './view-student.page';

const routes: Routes = [
  {
    path: '',
    component: ViewStudentPage
  },
  {
    path: 'editar/:nctrl',
    loadChildren: () => import('./edit-student/edit-student.module').then( m => m.EditStudentPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewStudentPageRoutingModule {}
