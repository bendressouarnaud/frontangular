import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirecteurRoutingModule } from './directeur-routing.module';
import { AccueilComponent } from './accueil/accueil.component';
import { RapportComponent } from './rapport/rapport.component';
import { AgendaComponent } from './agenda/agenda.component';
import { ReunionComponent } from './reunion/reunion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule, NativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PerformanceComponent } from './performance/performance.component';
import { RdvComponent } from './rdv/rdv.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CollaborateurComponent } from './collaborateur/collaborateur.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';


@NgModule({
  declarations: [AccueilComponent, RapportComponent, AgendaComponent, ReunionComponent, PerformanceComponent, RdvComponent, CollaborateurComponent, UserdetailsComponent],
  imports: [
    CommonModule,
    DirecteurRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    MatDatepickerModule,   
    NativeDateModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class DirecteurModule { }
