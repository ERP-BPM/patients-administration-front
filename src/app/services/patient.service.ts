import { Injectable } from '@angular/core';
import { Patient } from '../models/patients.model';
import { Apollo, gql } from 'apollo-angular';

const CREATE_PATIENT = gql`
  mutation MyMutation(
      $fecha_nacimiento: date,
      $apellido_materno: String,
      $apellido_paterno: String,
      $curp: String,
      $estado_civil: String,
      $email: String,
      $genero: String,
      $nombre: String
    ) {
      insert_Hospital_persona(objects: {apellido_materno: $apellido_materno,
      apellido_paterno: $apellido_paterno,
      curp: $curp,
      email: $email,
      estado_civil: $estado_civil,
      fecha_nacimiento: $fecha_nacimiento,
      genero: $genero,
      nombre: $nombre,
  ) {
      affected_rows
    }
  }
`;

@Injectable({
  providedIn: 'root'
})

export class PatientService {

  patients: Patient[];

  constructor(private apollo: Apollo) {
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
    /*
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
    }));*/
    this.apollo.mutate({
      mutation: CREATE_PATIENT,
      variables: {
        //id_persona: '0587796e-bee6-45af-a53b-e3937f398daa', // `${this.patients.length + 1}`,
        curp: data.curp,
        nombre: data.nombre,
        apellido_paterno: data.apellido_paterno,
        apellido_materno: data.apellido_materno,
        email: data.email,
        estado_civil: data.estado_civil,
        genero: data.genero,
        fecha_nacimiento: '2021-11-11',
        // grupo_sanguineo: data.grupo_sanguineo,
        // nss: data.nss,
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }
}
