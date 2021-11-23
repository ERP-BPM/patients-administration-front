import { Injectable } from '@angular/core';
import { Patient } from '../models/patients.model';

@Injectable({
  providedIn: 'root'
})

export class PatientService {

  patients: Patient[];

  constructor() {
    this.patients = [
      new Patient({
        id: '1',
        curp: 'CURP',
        nombre: 'Erick Jared',
        apellido_paterno: 'Corpus',
        apellido_materno: 'Mendoza',
        email: 'email',
        estado_civil: 'estado_civil',
        fecha_nacimiento: 'hoy',
        genero: 'genero',
        grupo_sanguineo: 'A',
        nss: '874512875478D',
      }),
      new Patient({
        id: '1',
        curp: 'CURP',
        nombre: 'Erick Jared',
        apellido_paterno: 'Corpus',
        apellido_materno: 'Mendoza',
        email: 'email',
        estado_civil: 'estado_civil',
        fecha_nacimiento: 'hoy',
        genero: 'genero',
        grupo_sanguineo: 'A',
        nss: '874512875478D',
      }),
      new Patient({
        id: '1',
        curp: 'CURP',
        nombre: 'Erick Jared',
        apellido_paterno: 'Corpus',
        apellido_materno: 'Mendoza',
        email: 'email',
        estado_civil: 'estado_civil',
        fecha_nacimiento: 'hoy',
        genero: 'genero',
        grupo_sanguineo: 'A',
        nss: '874512875478D',
      }),
    ];
  }

  get getPatients(): Patient[] {
    return this.patients;
  }

  deletePatient(patient: Patient): void {
    const index: number = this.patients.indexOf(patient);
    if (index !== -1) {
      this.patients.splice(index, 1);
    }
  }

  createPatient(data: any): void {
    this.patients.push(new Patient({
      id: `${this.patients.length + 1}`,
      curp: data.curp,
      nombre: data.nombre,
      apellido_paterno: data.apellido_paterno,
      apellido_materno: data.apellido_materno,
      email: data.email,
      estado_civil: data.estado_civil,
      genero: data.genero,
      fecha_nacimiento: 'hoy',
      grupo_sanguineo: data.grupo_sanguineo,
      nss: data.nss,
    }));
  }
}
