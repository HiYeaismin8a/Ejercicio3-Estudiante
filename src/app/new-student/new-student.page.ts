import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { FotoService } from '../services/foto.service';
import { Router } from '@angular/router';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.page.html',
  styleUrls: ['./new-student.page.scss'],
})
export class NewStudentPage implements OnInit {
  activar = false;
  public student: Student = {
    controlnumber: '',
    age: 0,
    career: '',
    curp: '',
    email: '',
    name: '',
    nip: 0,
    photo: '',
  };
  public formulario: FormGroup;
  public validationMessages: Object;

  constructor(
    private studenteService: StudentService,
    private fb: FormBuilder,
    private fotoService: FotoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formulario = new FormGroup({
      controlnumber: new FormControl(this.student.controlnumber, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern('^[0-9]+$'),
      ]),
      curp: new FormControl(this.student.curp, [
        Validators.required,
        Validators.minLength(18),
        Validators.maxLength(18),
        Validators.pattern(
          /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/
        ),
      ]),
      name: new FormControl(this.student.name, [Validators.required]),
      age: new FormControl(this.student.age, [
        Validators.required,
        Validators.min(18),
      ]),
      nip: new FormControl(this.student.nip, [
        Validators.required,
        Validators.min(9),
        Validators.max(9999),
      ]),
      email: new FormControl(this.student.email, [
        Validators.required,
        Validators.pattern(
          '^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$'
        ),
      ]),
      photo: new FormControl(this.student.photo, [Validators.required]),
      career: new FormControl(this.student.career, [Validators.required]),
    });
    this.validationMessages = {
      controlnumber: [
        { type: 'required', message: 'N??mero de control obligatorio' },
        {
          type: 'minlength',
          message: 'El n??mero de control debe ser de 8 digitos',
        },
        {
          type: 'maxlength',
          message: 'El n??mero de control debe ser de 8 digitos',
        },
        { type: 'pattern', message: 'El n??mero de control est?? mal formado' },
      ],
      name: [{ type: 'required', message: 'Nombre obligatorio' }],
      curp: [
        { type: 'required', message: 'La curp es obligatoria' },
        { type: 'minlength', message: 'La curp debe ser de 18 digitos' },
        { type: 'maxlength', message: 'La curp debe ser de 18 digitos' },
        { type: 'pattern', message: 'La curp est?? mal formada' },
      ],
      age: [
        { type: 'required', message: 'La edad es obligatoria' },
        { type: 'min', message: 'La edad debe ser mayor a 17' },
      ],
      nip: [
        { type: 'required', message: 'El nip es obligatorio' },
        { type: 'min', message: 'El nip debe ser mayor a 9' },
        { type: 'max', message: 'El nip debe ser menor a 9999' },
      ],
      email: [
        { type: 'required', message: 'Correo obligatorio' },
        { type: 'pattern', message: 'El correo est?? mal formado' },
      ],
      photo: [
        { type: 'required', message: 'foto obligatoria' },
        { type: 'pattern', message: 'El url est?? mal formado' },
        {},
      ],
      career: [{ type: 'required', message: 'Carrera Obligatoria' }],
    };
  }

  activarBoton(): Boolean {
    console.log(Object.entries(this.validationMessages).length);
    if (Object.entries(this.validationMessages).length === 0) {
      console.log(this.activar);
      return false;
    }
    this.activar = true;
    return true;
  }

  registrar() {
    if (this.formulario.valid) {
      this.studenteService.newStudent(this.formulario.value);
      this.router.navigate(['']);
    }
  }
}
