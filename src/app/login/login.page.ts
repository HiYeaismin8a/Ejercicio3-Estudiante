import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public formulario: FormGroup;

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit() {
    this.formulario = new FormGroup({
      controlnumber: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern('^[0-9]+$'),
      ]),
      nip: new FormControl(0, [
        Validators.required,
        Validators.min(9),
        Validators.max(9999),
      ]),
    });
  }

  public login() {
    let st = this.studentService.getStudentByControlNumber(
      this.formulario.get('controlnumber').value
    );
    if (st?.nip.toString() === this.formulario.get('nip').value) {
      this.router.navigate(['/view-student', st.controlnumber]);
    } else {
      console.log(st);
    }
  }

  public registrar() {
    this.router.navigate(['/new-student']);
  }

  public administrar() {
    this.router.navigate(['/home']);
  }
}
