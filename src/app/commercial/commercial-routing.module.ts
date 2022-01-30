import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActiviteComponent } from './activite/activite.component';
import { AgendaComponent } from './agenda/agenda.component';
import { DevisComponent } from './devis/devis.component';
import { PerformanceComponent } from './performance/performance.component';
import { RapportComponent } from './rapport/rapport.component';
import { RdvComponent } from './rdv/rdv.component';
import { TraderComponent } from './trader/trader.component';

const routes: Routes = [
  {
    path: 'accueilcom',
    component: TraderComponent
  },
  {
    path: 'comrdv',
    component: RdvComponent
  },
  {
    path: 'comrap',
    component: RapportComponent
  },
  {
    path: 'comagenda',
    component: AgendaComponent
  },
  {
    path: 'performance',
    component: PerformanceComponent
  },
  {
    path: 'actcommerciale',
    component: ActiviteComponent
  },
  {
    path: 'devis',
    component: DevisComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommercialRoutingModule { }
