import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.page.html',
  styleUrls: ['./view-student.page.scss'],
})
export class ViewStudentPage implements OnInit {

  public student: Student;

  constructor(private studentService: StudentService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    // let cn;
    this.activatedRoute.params.subscribe((params) => {
      this.student = this.studentService.getStudentByControlNumber(params.nctrl);
    });
  }

}
