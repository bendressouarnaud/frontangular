import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommercialRoutingModule } from './commercial-routing.module';
import { TraderComponent } from './trader/trader.component';
import { RdvComponent } from './rdv/rdv.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule, MAT_DATE_LOCALE, NativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepicker, MatDatepickerInput, MatDatepickerModule } from '@angular/material/datepicker';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';
import { MaterialModule } from '../app.module';
import { RapportComponent } from './rapport/rapport.component';
import { AgendaComponent } from './agenda/agenda.component';
import { PerformanceComponent } from './performance/performance.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ActiviteComponent } from './activite/activite.component';
import { DevisComponent } from './devis/devis.component';
import { MatRadioModule } from '@angular/material/radio';
import { ExamenComponent } from './examen/examen.component';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { ClientsComponent } from './clients/clients.component';
import { SantefamilleComponent } from './santefamille/santefamille.component';
import { SanteavantageComponent } from './santeavantage/santeavantage.component';
import { FicheclientComponent } from './ficheclient/ficheclient.component';


@NgModule({
  declarations: [TraderComponent, RdvComponent, RapportComponent, AgendaComponent, PerformanceComponent, ActiviteComponent, DevisComponent, ExamenComponent, ClientsComponent, SantefamilleComponent, SanteavantageComponent, FicheclientComponent],
  imports: [
    CommonModule,
    CommercialRoutingModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule, 
    MatCheckboxModule,   
    FormsModule,
    NativeDateModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()
    
    
  ]
})
export class CommercialModule { }
