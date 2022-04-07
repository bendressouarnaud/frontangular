import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { ConnexionService } from './messervices/connexion.service';

export const AppRoutes: Routes = [
    {
      path: '',      
      redirectTo: 'pages/login',      
      pathMatch: 'full',
    }, 
    {
      path: '',
      component: AdminLayoutComponent,
      canActivate:[ConnexionService],
      children: [
        {
            path: '',
            loadChildren: './dashboard/dashboard.module#DashboardModule'
        }, {
                path: 'components',
                loadChildren: './components/components.module#ComponentsModule'
            }, {
                path: 'forms',
                loadChildren: './forms/forms.module#Forms'
            }, {
                path: 'tables',
                loadChildren: './tables/tables.module#TablesModule'
            }, {
                path: 'maps',
                loadChildren: './maps/maps.module#MapsModule'
            }, {
                path: 'widgets',
                loadChildren: './widgets/widgets.module#WidgetsModule'
            }, {
                path: 'charts',
                loadChildren: './charts/charts.module#ChartsModule'
            }, {
                path: 'calendar',
                loadChildren: './calendar/calendar.module#CalendarModule'
            }, 
            {
                path: 'gestion',
                loadChildren: './comptes/comptes.module#ComptesModule'
            }
            , 
            {
                path: 'gcommercial',
                loadChildren: './commercial/commercial.module#CommercialModule'
            }, 
            {
                path: 'infas',
                loadChildren: './infas/infas.module#InfasModule'
            }, 
            {
                path: 'inspecteur',
                loadChildren: './inspecteur/inspecteur.module#InspecteurModule'
            }, 
            {
                path: 'responsable',
                loadChildren: './responsable/responsable.module#ResponsableModule'
            }, 
            {
                path: 'directeuragj',
                loadChildren: './directeuragj/directeuragj.module#DirecteuragjModule'
            }, 
            {
                path: 'directeur',
                loadChildren: './directeur/directeur.module#DirecteurModule'
            }, 
            {
                path: 'tresorier',
                loadChildren: './tresorier/tresorier.module#TresorierModule'
            },
            {
                path: '',
                loadChildren: './userpage/user.module#UserModule'
            }, 
            {
                path: '',
                loadChildren: './timeline/timeline.module#TimelineModule'
            }
        ]}, {
      path: '',
      component: AuthLayoutComponent,
      children: [{
        path: 'pages',
        loadChildren: './pages/pages.module#PagesModule'
      }]
    }
];
