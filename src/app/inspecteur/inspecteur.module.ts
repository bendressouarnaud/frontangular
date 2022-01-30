import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InspecteurRoutingModule } from './inspecteur-routing.module';
import { AccueilComponent } from './accueil/accueil.component';
import { SuperviseurComponent } from './superviseur/superviseur.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule, NativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RdvComponent } from './rdv/rdv.component';
import { RapportComponent } from './rapport/rapport.component';
import { AgendaComponent } from './agenda/agenda.component';
import { ReunionComponent } from './reunion/reunion.component';
import { PerformanceComponent } from './performance/performance.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [AccueilComponent, SuperviseurComponent, RdvComponent, RapportComponent, AgendaComponent, ReunionComponent, PerformanceComponent],
  imports: [
    CommonModule,
    InspecteurRoutingModule,
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
export class InspecteurModule { }
