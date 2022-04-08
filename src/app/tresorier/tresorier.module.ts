import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

import { TresorierRoutingModule } from './tresorier-routing.module';
import { AccueilComponent } from './accueil/accueil.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';


@NgModule({
  declarations: [AccueilComponent, StatistiquesComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    TresorierRoutingModule
  ]
})
export class TresorierModule { }
