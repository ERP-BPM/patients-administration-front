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
    $genero: String,
    $nombre: String, $grupo_sanguineo: String, $nss: String) {
    insert_Hospital_paciente(objects: {apellido_materno: $apellido_materno, apellido_paterno: $apellido_paterno, curp: $curp, estado_civil: $estado_civil, fecha_nacimiento: $fecha_nacimiento, genero: $genero, nombre: $nombre, grupo_sanguineo: $grupo_sanguineo, nss: $nss}) {
  affected_rows
  }
  }
`;

const GET_PATIENTS = gql`
  query MyQuery {
  Hospital_paciente {
    id_paciente
    nss
    grupo_sanguineo
    apellido_materno
    apellido_paterno
    curp
    estado_civil
    fecha_nacimiento
    genero
    nombre
  }
}
`

const DELETE_PACIENT = gql`
mutation MyMutation($id: uuid) {
delete_Hospital_paciente(where: {id_paciente: {_eq: $id }}) {
  returning {
    nss
  }
}
}
`;

@Injectable({
  providedIn: 'root'
})

export class PatientService {

  patients: Patient[];

  constructor(private apollo: Apollo) {
    this.patients = [];

    this.apollo.query({
      query: GET_PATIENTS,
    }).subscribe(({ data }) => {
      const dt = data['Hospital_paciente'];

      for (const p of dt) {
        this.patients.push(new Patient({
          id: p.id_paciente,
          curp: p.curp,
          nombre: p.nombre,
          apellido_paterno: p.apellido_paterno,
          apellido_materno: p.apellido_materno,
          email: p.email,
          estado_civil: p.estado_civil,
          genero: p.genero,
          fecha_nacimiento: 'hoy',
          grupo_sanguineo: p.grupo_sanguineo,
          nss: p.nss,
        }));
      }
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }

  get getPatients(): Patient[] {
    return this.patients;
  }

  createPatient(data: any): void {
    this.apollo.mutate({
      mutation: CREATE_PATIENT,
      variables: {
        curp: data.curp,
        nombre: data.nombre,
        apellido_paterno: data.apellido_paterno,
        apellido_materno: data.apellido_materno,
        // email: data.email,
        estado_civil: data.estado_civil,
        genero: data.genero,
        fecha_nacimiento: '2021-11-11',
        grupo_sanguineo: data.grupo_sanguineo,
        nss: data.nss,
      }
    }).subscribe(({ }) => {
      this.patients.push(new Patient({
        id: data.id_paciente,
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
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }

  deletePatient(patient: Patient): void {
    this.apollo.mutate({
      mutation: DELETE_PACIENT,
      variables: {
        id: patient.id
      }
    }).subscribe(({ data }) => {
      console.log(data);

      const index: number = this.patients.indexOf(patient);
      if (index !== -1) {
        this.patients.splice(index, 1);
      }
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }
}
