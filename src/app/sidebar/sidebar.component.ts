import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const routesInfas: RouteInfo[] = [
    {
        path: '/infas/accueilinfas',
        title: 'Accueil',
        type: 'link',
        icontype: 'dashboard'
    },
    {
        path: '/infas',
        title: 'Modules',
        type: 'sub',
        icontype: 'apps',
        collapse: 'infas',
        children: [
            { path: 'professeur', title: 'Professeurs', ab: 'PS' },
            { path: 'classe', title: 'Classe', ab: 'CE' },
            { path: 'cours', title: 'Cours', ab: 'CS' },
            { path: 'ecue', title: 'Ecue', ab: 'EE' },
            { path: 'uniteeneigne', title: 'Unités enseignés', ab: 'UE' },
            { path: 'lienrespue', title: 'Lien PUE', ab: 'LP' },
            { path: 'responsable', title: 'Responsable', ab: 'RE' },
            { path: 'responsableped', title: 'Responsable Péd.', ab: 'RP' },
        ]
    }
];



export const routesInspecteur: RouteInfo[] = [
    {
        path: '/inspecteur/accueil',
        title: 'Accueil',
        type: 'link',
        icontype: 'dashboard'
    },
    {
        path: '/inspecteur',
        title: 'Modules',
        type: 'sub',
        icontype: 'apps',
        collapse: 'inspecteur',
        children: [
            { path: 'rdv', title: 'Rdv', ab: 'RV' },
            { path: 'superviseur', title: 'Superviseur', ab: 'SR' },
            { path: 'rapport', title: 'Rapports', ab: 'RS' },
            { path: 'agenda', title: 'Agenda', ab: 'AG' },
            { path: 'reunion', title: 'Réunion', ab: 'RS' },
            { path: 'performance', title: 'Performance', ab: 'PE' },
            { path: 'clients', title: 'Client', ab: 'CT' }
        ]
    },
    {
        path: '/inspecteur',
        title: 'Operations',
        type: 'sub',
        icontype: 'shopping_cart',
        collapse: 'operations',
        children: [
            { path: 'devis', title: 'Gestion des Devis', ab: 'GD' },
            { path: 'devisequipe', title: 'Clôture des devis en attente', ab: 'GE' },
            { path: 'statsdevisequipe', title: 'Devis en attente de paie', ab: 'DP' },
            { path: 'souscription', title: 'Gestion des Souscriptions', ab: 'GS' }
        ]
    }
];



export const routesDirecteurAdj: RouteInfo[] = [
    {
        path: '/directeuragj/accueil',
        title: 'Accueil',
        type: 'link',
        icontype: 'dashboard'
    },
    {
        path: '/directeuragj',
        title: 'Modules',
        type: 'sub',
        icontype: 'apps',
        collapse: 'directeuragj',
        children: [
            { path: 'devis', title: 'Devis', ab: 'DS' },
            { path: 'rapport', title: 'Rapports', ab: 'RT' },
            { path: 'rdv', title: 'Rdv', ab: 'RV' },
            { path: 'agenda', title: 'Agenda', ab: 'AG' },
            { path: 'reunion', title: 'Réunion', ab: 'RS' },
            { path: 'performance', title: 'Performance', ab: 'PE' }
        ]
    }
];



export const routesDirecteur: RouteInfo[] = [
    {
        path: '/directeur/accueil',
        title: 'Accueil',
        type: 'link',
        icontype: 'dashboard'
    },
    {
        path: '/directeur',
        title: 'Modules',
        type: 'sub',
        icontype: 'apps',
        collapse: 'directeur',
        children: [
            { path: 'rapport', title: 'Rapports', ab: 'RS' },
            { path: 'rdv', title: 'Rdv', ab: 'RV' },
            { path: 'agenda', title: 'Agenda', ab: 'AG' },
            { path: 'reunion', title: 'Réunion', ab: 'RS' },
            { path: 'performance', title: 'Performance', ab: 'PE' }
        ]
    }
];



export const routesResponsable: RouteInfo[] = [
    {
        path: '/responsable/accueil',
        title: 'Accueil',
        type: 'link',
        icontype: 'dashboard'
    },
    {
        path: '/responsable',
        title: 'Modules',
        type: 'sub',
        icontype: 'apps',
        collapse: 'responsable',
        children: [
            { path: 'rdv', title: 'Rdv', ab: 'RV' },
            { path: 'inspecteur', title: 'Inspecteur', ab: 'SR' },
            { path: 'rapport', title: 'Rapports', ab: 'RS' },
            { path: 'agenda', title: 'Agenda', ab: 'AG' },
            { path: 'reunion', title: 'Réunion', ab: 'RS' },
            { path: 'performance', title: 'Performance', ab: 'PE' },
            { path: 'clients', title: 'Client', ab: 'CT' }
        ]
    },
    {
        path: '/gestion',
        title: 'Operations',
        type: 'sub',
        icontype: 'shopping_cart',
        collapse: 'operations',
        children: [
            { path: 'devis', title: 'Gestion des Devis', ab: 'GD' },
            { path: 'devisequipe', title: 'Clôture des devis en attente', ab: 'GE' },
            { path: 'statsdevisequipe', title: 'Devis en attente de paie', ab: 'DP' },
            { path: 'souscription', title: 'Gestion des Souscriptions', ab: 'GS' }
        ]
    }
];



export const routesSuperviseur: RouteInfo[] = [
    {
        path: '/gestion/accueilsup',
        title: 'Accueil',
        type: 'link',
        icontype: 'dashboard'
    },
    {
        path: '/gestion',
        title: 'Modules',
        type: 'sub',
        icontype: 'apps',
        collapse: 'gestion',
        children: [
            { path: 'rdv', title: 'Rdv', ab: 'RV' },
            { path: 'portefeuille', title: 'Liste Commerciaux', ab: 'LC' },
            { path: 'rapportcom', title: 'Rapports Commerciaux', ab: 'RC' },
            { path: 'agenda', title: 'Planning commerciaux', ab: 'GS' },
            { path: 'reunion', title: 'Réunions', ab: 'RS' },
            { path: 'performance', title: 'Performances', ab: 'PE' },
            { path: 'clients', title: 'Client', ab: 'CT' }
        ]
    },
    {
        path: '/gestion',
        title: 'Operations',
        type: 'sub',
        icontype: 'shopping_cart',
        collapse: 'operations',
        children: [
            { path: 'devis', title: 'Gestion des Devis', ab: 'GD' },
            { path: 'devisequipe', title: 'Clôture des devis en attente', ab: 'GE' },
            { path: 'statsdevisequipe', title: 'Devis en attente de paie', ab: 'DP' },
            { path: 'souscription', title: 'Gestion des Souscriptions', ab: 'GS' }
        ]
    }
];



export const routesCommercial: RouteInfo[] = [
    {
        path: '/gcommercial/accueilcom',
        title: 'Accueil',
        type: 'link',
        icontype: 'dashboard'
    },
    {
        path: '/gcommercial',
        title: 'Modules',
        type: 'sub',
        icontype: 'apps',
        collapse: 'gcommercial',
        children: [
            { path: 'comrdv', title: 'Gestion RDV', ab: 'GR' },
            { path: 'actcommerciale', title: 'Activité commerciale', ab: 'AC' },
            { path: 'comrap', title: 'Gestion Rapports', ab: 'GA' },
            { path: 'comagenda', title: 'Agenda', ab: 'AG' },
            { path: 'performance', title: 'Performance', ab: 'PE' },
            { path: 'clients', title: 'Client', ab: 'CT' }
        ]
    },
    {
        path: '/gcommercial',
        title: 'Operations',
        type: 'sub',
        icontype: 'shopping_cart',
        collapse: 'operations',
        children: [
            { path: 'devis', title: 'Gestion des Devis', ab: 'GD' },
            { path: 'souscription', title: 'Gestion des Souscriptions', ab: 'GS' }
        ]
    }
];




export const routesTresorier: RouteInfo[] = [
    {
        path: '/tresorier/accueil',
        title: 'Accueil',
        type: 'link',
        icontype: 'dashboard'
    },
    {
        path: '/tresorier/statistiques',
        title: 'Statistiques',
        type: 'link',
        icontype: 'trending_up'
    }
];




export const routesAdministarteur: RouteInfo[] = [
    /*{
        path: '/dashboard',
        title: 'Accueil',
        type: 'link',
        icontype: 'dashboard'
    },*/
    {
        path: '/gestion',
        title: 'Gestion',
        type: 'sub',
        icontype: 'apps',
        collapse: 'gestion',
        children: [
            { path: 'comptes', title: 'Comptes utilisateurs', ab: 'CU' },
            { path: 'historique', title: 'Historique', ab: 'HE' },
            { path: 'addressmac', title: 'Adr. MAC', ab: 'AM' },
            { path: 'activite', title: 'Activités', ab: 'AS' },
            { path: 'detailequipe', title: 'Détail équipe', ab: 'DE' },
            { path: 'motif', title: 'Motif', ab: 'MF' },
            { path: 'nomenclature', title: 'Nomenclature', ab: 'NE' },
            { path: 'detailnomenclature', title: 'Détail Nomenclature', ab: 'DN' }
        ]
    }
];




export const ROUTES: RouteInfo[] = [{
    path: '/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'dashboard'
}, {
    path: '/components',
    title: 'Components',
    type: 'sub',
    icontype: 'apps',
    collapse: 'components',
    children: [
        { path: 'buttons', title: 'Buttons', ab: 'B' },
        { path: 'grid', title: 'Grid System', ab: 'GS' },
        { path: 'panels', title: 'Panels', ab: 'P' },
        { path: 'sweet-alert', title: 'Sweet Alert', ab: 'SA' },
        { path: 'notifications', title: 'Notifications', ab: 'N' },
        { path: 'icons', title: 'Icons', ab: 'I' },
        { path: 'typography', title: 'Typography', ab: 'T' }
    ]
}, {
    path: '/forms',
    title: 'Forms',
    type: 'sub',
    icontype: 'content_paste',
    collapse: 'forms',
    children: [
        { path: 'regular', title: 'Regular Forms', ab: 'RF' },
        { path: 'extended', title: 'Extended Forms', ab: 'EF' },
        { path: 'validation', title: 'Validation Forms', ab: 'VF' },
        { path: 'wizard', title: 'Wizard', ab: 'W' }
    ]
}, {
    path: '/tables',
    title: 'Tables',
    type: 'sub',
    icontype: 'grid_on',
    collapse: 'tables',
    children: [
        { path: 'regular', title: 'Regular Tables', ab: 'RT' },
        { path: 'extended', title: 'Extended Tables', ab: 'ET' },
        { path: 'datatables.net', title: 'Datatables.net', ab: 'DT' }
    ]
}, {
    path: '/maps',
    title: 'Maps',
    type: 'sub',
    icontype: 'place',
    collapse: 'maps',
    children: [
        { path: 'google', title: 'Google Maps', ab: 'GM' },
        { path: 'fullscreen', title: 'Full Screen Map', ab: 'FSM' },
        { path: 'vector', title: 'Vector Map', ab: 'VM' }
    ]
}, {
    path: '/widgets',
    title: 'Widgets',
    type: 'link',
    icontype: 'widgets'

}, {
    path: '/charts',
    title: 'Charts',
    type: 'link',
    icontype: 'timeline'

}, {
    path: '/calendar',
    title: 'Calendar',
    type: 'link',
    icontype: 'date_range'
}, {
    path: '/pages',
    title: 'Pages',
    type: 'sub',
    icontype: 'image',
    collapse: 'pages',
    children: [
        { path: 'pricing', title: 'Pricing', ab: 'P' },
        { path: 'timeline', title: 'Timeline Page', ab: 'TP' },
        { path: 'login', title: 'Login Page', ab: 'LP' },
        { path: 'register', title: 'Register Page', ab: 'RP' },
        { path: 'lock', title: 'Lock Screen Page', ab: 'LSP' },
        { path: 'user', title: 'User Page', ab: 'UP' }
    ]
}
];
@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {

    // A t t r i b u t e s   :
    public menuItems: any[];
    ps: any;
    nom_utilisateur: String = "";


    // M e t h o d  :
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {

        // Get USERNAME :
        this.nom_utilisateur = localStorage.getItem("identifiant");

        //alert("Profil : "+this.nom_utilisateur);

        switch (localStorage.getItem("profil")) {
            
            case "superviseur":
                this.menuItems = routesSuperviseur.filter(menuItem => menuItem);
                break;

            case "admin":
                this.menuItems = routesAdministarteur.filter(menuItem => menuItem);
                break;

            case "commercial":
                this.menuItems = routesCommercial.filter(menuItem => menuItem);
                break;

            case "infas":
                this.menuItems = routesInfas.filter(menuItem => menuItem);
                break;

            case "inspecteur":
                this.menuItems = routesInspecteur.filter(menuItem => menuItem);
                //this.menuItems = ROUTES.filter(menuItem => menuItem);
                break;

            case "respreseau":
                this.menuItems = routesResponsable.filter(menuItem => menuItem);
                break;

            case "dircomadj":
                this.menuItems = routesDirecteurAdj.filter(menuItem => menuItem);
                break;

            case "dircom":
                this.menuItems = routesDirecteur.filter(menuItem => menuItem);
                break;

            case "tresorier":
                this.menuItems = routesTresorier.filter(menuItem => menuItem);
                break;
            

            default:
                this.menuItems = ROUTES.filter(menuItem => menuItem);
                break;
        }


        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            this.ps = new PerfectScrollbar(elemSidebar);
        }
    }
    updatePS(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            this.ps.update();
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }

    deconnexion(): void {
        if (localStorage.length > 0) {
            localStorage.clear();
            /*localStorage.removeItem("userid");
            localStorage.removeItem("profil");*/
            //window.location.href="#/pages/login";
            window.location.href = "/";
            //window.location.href="/jcom";
        }
    }
}
