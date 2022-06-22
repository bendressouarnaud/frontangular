import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AgendaComponent } from './agenda/agenda.component';
import { CollaborateurComponent } from './collaborateur/collaborateur.component';
import { DevisComponent } from './devis/devis.component';
import { PerformanceComponent } from './performance/performance.component';
import { RapportComponent } from './rapport/rapport.component';
import { RdvComponent } from './rdv/rdv.component';
import { ReunionComponent } from './reunion/reunion.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';

const routes: Routes = [{
  path: 'accueil',
  component: AccueilComponent
},{
  path: 'rapport',
  component: RapportComponent
},{
  path: 'agenda',
  component: AgendaComponent
},{
  path: 'reunion',
  component: ReunionComponent
},{
  path: 'performance',
  component: PerformanceComponent
},{
  path: 'rdv',
  component: RdvComponent
},
{path: 'collaborateur', component: CollaborateurComponent },
{ path: 'userdetails/:contact', component: UserdetailsComponent },
{
  path: 'devis',
  component: DevisComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirecteuragjRoutingModule { }
