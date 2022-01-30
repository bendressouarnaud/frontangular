import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Responsable } from '../mesbeans/responsable';
import { ClasseComponent } from './classe/classe.component';
import { CoursComponent } from './cours/cours.component';
import { EcueComponent } from './ecue/ecue.component';
import { GrapheComponent } from './graphe/graphe.component';
import { LienrespueComponent } from './lienrespue/lienrespue.component';
import { ProfesseurComponent } from './professeur/professeur.component';
import { ResponsableComponent } from './responsable/responsable.component';
import { UnitenseigneComponent } from './unitenseigne/unitenseigne.component';

const routes: Routes = [{
  path: 'professeur',
  component: ProfesseurComponent
  }, 
  {
    path: 'accueilinfas',
    component: ProfesseurComponent
  }
  , 
  {
    path: 'responsable',
    component: ResponsableComponent
  }
  , 
  {
    path: 'classe',
    component: ClasseComponent
  }
  , 
  {
    path: 'uniteeneigne',
    component: UnitenseigneComponent
  }
  , 
  {
    path: 'ecue',
    component: EcueComponent
  }
  , 
  {
    path: 'lienrespue',
    component: LienrespueComponent
  }, 
  {
    path: 'cours',
    component: CoursComponent
  }, 
  {
    path: 'graphe',
    component: GrapheComponent
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfasRoutingModule { }
