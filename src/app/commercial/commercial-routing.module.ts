import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActiviteComponent } from './activite/activite.component';
import { AgendaComponent } from './agenda/agenda.component';
import { ClientsComponent } from './clients/clients.component';
import { DevisComponent } from './devis/devis.component';
import { ExamenComponent } from './examen/examen.component';
import { FicheclientComponent } from './ficheclient/ficheclient.component';
import { PerformanceComponent } from './performance/performance.component';
import { RapportComponent } from './rapport/rapport.component';
import { RdvComponent } from './rdv/rdv.component';
import { SanteavantageComponent } from './santeavantage/santeavantage.component';
import { SantefamilleComponent } from './santefamille/santefamille.component';
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
  },
  {
    path: 'examen',
    component: ExamenComponent
  },
  {
    path: 'clients',
    component: ClientsComponent
  },
  {
    path: 'santefamille/:idsan',
    component: SantefamilleComponent
  },
  {
    path: 'santeavantage/:idsan',
    component: SanteavantageComponent
  },
  {
    path: 'ficheclient/:idcli',
    component: FicheclientComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommercialRoutingModule { }
