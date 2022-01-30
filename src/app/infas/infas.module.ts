import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfasRoutingModule } from './infas-routing.module';
import { ProfesseurComponent } from './professeur/professeur.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule, NativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ResponsableComponent } from './responsable/responsable.component';
import { ClasseComponent } from './classe/classe.component';
import { UnitenseigneComponent } from './unitenseigne/unitenseigne.component';
import { EcueComponent } from './ecue/ecue.component';
import { LienrespueComponent } from './lienrespue/lienrespue.component';
import { CoursComponent } from './cours/cours.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { GrapheComponent } from './graphe/graphe.component';


@NgModule({
  declarations: [ProfesseurComponent, ResponsableComponent, ClasseComponent, UnitenseigneComponent, EcueComponent, LienrespueComponent, CoursComponent, GrapheComponent],
  imports: [
    CommonModule,
    InfasRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule   ,                    
    MatDatepickerModule,        
    NativeDateModule,
    ReactiveFormsModule

  ]
})
export class InfasModule { }
