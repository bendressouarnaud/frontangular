import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsableRoutingModule } from './responsable-routing.module';
import { AccueilComponent } from './accueil/accueil.component';
import { InspecteurComponent } from './inspecteur/inspecteur.component';
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
import { ActivitecommercialeComponent } from './activitecommerciale/activitecommerciale.component';
import { DevisComponent } from './devis/devis.component';
import { ClientsComponent } from './clients/clients.component';
import { StatdevisattenteComponent } from './statdevisattente/statdevisattente.component';
import { StatdevisequipeComponent } from './statdevisequipe/statdevisequipe.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { SantefamilleComponent } from './santefamille/santefamille.component';
import { SanteavantageComponent } from './santeavantage/santeavantage.component';
import { StatistiquesdevisComponent } from './statistiquesdevis/statistiquesdevis.component';


@NgModule({
  declarations: [AccueilComponent, InspecteurComponent, RdvComponent, RapportComponent, AgendaComponent, ReunionComponent, PerformanceComponent, ActivitecommercialeComponent, DevisComponent, ClientsComponent, StatdevisattenteComponent, StatdevisequipeComponent, UserdetailsComponent, SantefamilleComponent, SanteavantageComponent, StatistiquesdevisComponent],
  imports: [
    CommonModule,
    ResponsableRoutingModule,
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
export class ResponsableModule { }
