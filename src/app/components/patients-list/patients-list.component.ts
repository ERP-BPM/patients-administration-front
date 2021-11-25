import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patients.model';
import { ConfirmationsService } from 'src/app/services/confirmations.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {

  patients: Patient[];

  constructor(
    private patientService: PatientService,
    private confirmationsService: ConfirmationsService
  ) {
    this.patients = patientService.getPatients;
  }

  ngOnInit(): void {
  }

  deletePatient(patient: Patient): void {
    this.patientService.deletePatient(patient);
  }

  receptionComfirm(): void {
    this.confirmationsService.receptionComfirm();
  }

  confirmIngress(): void {
    this.confirmationsService.confirmIngress();
  }

  dischargeConfirm(): void {
    this.confirmationsService.dischargeConfirm();
  }

  infoAboutPatient(): void {
    this.confirmationsService.infoAboutPatient();
  }

  textSignalConfirm(): void {
    this.confirmationsService.textSignalConfirm();
  }
}
