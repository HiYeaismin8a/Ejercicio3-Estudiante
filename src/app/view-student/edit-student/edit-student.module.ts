import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { EditStudentPage } from './edit-student.page';
import { EditStudentPageRoutingModule } from './edit-student-routing.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditStudentPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditStudentPage]
})
export class EditStudentPageModule {}
