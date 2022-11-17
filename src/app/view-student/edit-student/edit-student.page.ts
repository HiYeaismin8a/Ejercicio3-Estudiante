import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { FotoService } from './../../services/foto.service';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.page.html',
  styleUrls: ['./edit-student.page.scss'],
})
export class EditStudentPage implements OnInit {
  nctrl = '';

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
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.nctrl = params.nctrl
      this.student = this.studenteService.getStudentByControlNumber(
        params.nctrl
      );
    });
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
        { type: 'required', message: 'Número de control obligatorio' },
        {
          type: 'minlength',
          message: 'El número de control debe ser de 8 digitos',
        },
        {
          type: 'maxlength',
          message: 'El número de control debe ser de 8 digitos',
        },
        { type: 'pattern', message: 'El número de control está mal formado' },
      ],
      name: [{ type: 'required', message: 'Nombre obligatorio' }],
      curp: [
        { type: 'required', message: 'La curp es obligatoria' },
        { type: 'minlength', message: 'La curp debe ser de 18 digitos' },
        { type: 'maxlength', message: 'La curp debe ser de 18 digitos' },
        { type: 'pattern', message: 'La curp está mal formada' },
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
        { type: 'pattern', message: 'El correo está mal formado' },
      ],
      photo: [
        { type: 'required', message: 'foto obligatoria' },
        { type: 'pattern', message: 'El url está mal formado' },
        {},
      ],
      career: [{ type: 'required', message: 'Carrera Obligatoria' }],
    };
    console.log(this.formulario.value)
  }

  actualizar() {
    if (this.formulario.valid) {
      this.studenteService.setStudentByNctrl(this.nctrl, this.formulario.value);
      this.router.navigate(['/view-student', this.nctrl]);
    }
  }
}
