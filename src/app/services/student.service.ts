import { Injectable } from '@angular/core';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private students: Student[] = [
    {
      controlnumber: '02400391',
      age: 38,
      career: 'ISC',
      curp: 'AOVI840917HNTRZS09',
      email: 'iarjona@ittepic.edu.mx',
      name: 'Israel Arjona Vizcaíno',
      nip: 717,
      photo: 'https://picsum.photos/600/?random=1',
    },
    {
      controlnumber: '12400391',
      age: 28,
      career: 'IM',
      curp: 'AOCI840917HNTRZS09',
      email: 'iarjona2@ittepic.edu.mx',
      name: 'Israel Arjona Castañeda',
      nip: 818,
      photo: 'https://picsum.photos/600/?random=2',
    },
    {
      controlnumber: '22400391',
      age: 18,
      career: 'IC',
      curp: 'OOCI840917HNTRZS09',
      email: 'iarjona3@ittepic.edu.mx',
      name: 'Israel Arjona Méndez',
      nip: 919,
      photo: 'https://picsum.photos/600/?random=3',
    },
  ];

  constructor() {}

  public getStudents(): Student[] {
    return this.students;
  }

  public removeStudent(pos: number): Student[] {
    this.students.splice(pos, 1);
    return this.students;
  }

  public getStudentByControlNumber(controlnumber: string): Student {
    return this.students.find((student) => {
      return student.controlnumber === controlnumber;
    });
  }
  public newStudent(student: Student): void {
    //
    this.students.push(student);
  }

  public setStudentByNctrl(nctrl: string, student: Student) {
    this.students = this.students.map((st) => {
      return st.controlnumber === nctrl ? student : st;
    });
  }
}
