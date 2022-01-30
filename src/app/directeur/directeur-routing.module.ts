import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AgendaComponent } from './agenda/agenda.component';
import { PerformanceComponent } from './performance/performance.component';
import { RapportComponent } from './rapport/rapport.component';
import { RdvComponent } from './rdv/rdv.component';
import { ReunionComponent } from './reunion/reunion.component';

const routes: Routes = [{
  path: 'accueil',
  component: AccueilComponent
}, {
  path: 'rapport',
  component: RapportComponent
}, {
  path: 'agenda',
  component: AgendaComponent
}, {
  path: 'reunion',
  component: ReunionComponent
}, {
  path: 'performance',
  component: PerformanceComponent
}, {
  path: 'rdv',
  component: RdvComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirecteurRoutingModule { }
