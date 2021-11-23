import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patients.model';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {

  patients: Patient[];

  constructor(private patientService: PatientService) {
    this.patients = patientService.getPatients;
  }

  ngOnInit(): void {
  }

  deletePatient(patient: Patient): void {
    this.patientService.deletePatient(patient);
  }

}
