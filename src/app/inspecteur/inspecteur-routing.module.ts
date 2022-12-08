import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ActivitecommercialeComponent } from './activitecommerciale/activitecommerciale.component';
import { AgendaComponent } from './agenda/agenda.component';
import { ClientsComponent } from './clients/clients.component';
import { DevisComponent } from './devis/devis.component';
import { PerformanceComponent } from './performance/performance.component';
import { RapportComponent } from './rapport/rapport.component';
import { RdvComponent } from './rdv/rdv.component';
import { ReunionComponent } from './reunion/reunion.component';
import { SanteavantageComponent } from './santeavantage/santeavantage.component';
import { SantefamilleComponent } from './santefamille/santefamille.component';
import { StatdevisattenteComponent } from './statdevisattente/statdevisattente.component';
import { StatdevisequipeComponent } from './statdevisequipe/statdevisequipe.component';
import { StatistiquesdevisComponent } from './statistiquesdevis/statistiquesdevis.component';
import { SuperviseurComponent } from './superviseur/superviseur.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';

const routes: Routes = [
  {
    path: 'accueil',
    component: AccueilComponent
  },
  {
    path: 'superviseur',
    component: SuperviseurComponent
  },
  {
    path: 'rdv',
    component: RdvComponent
  },
  {
    path: 'rapport',
    component: RapportComponent
  },
  {
    path: 'agenda',
    component: AgendaComponent
  },
  {
    path: 'reunion',
    component: ReunionComponent
  },
  {
    path: 'performance',
    component: PerformanceComponent
  },
  {
    path: 'actcommerciale',
    component: ActivitecommercialeComponent
  },
  {
    path:'devis',
    component: DevisComponent
  },
  {
    path:'devisequipe',
    component: StatdevisequipeComponent
  },
  {
    path:'statsdevisequipe',
    component: StatdevisattenteComponent
  },
  {
    path: 'clients',
    component: ClientsComponent
  },
  { path: 'userdetails/:contact', component: UserdetailsComponent },
  {
    path: 'santefamille/:idsan',
    component: SantefamilleComponent
  },
  {
    path: 'santeavantage/:idsan',
    component: SanteavantageComponent
  },
  {
    path: 'statistiquesdevis',
    component: StatistiquesdevisComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspecteurRoutingModule { }
