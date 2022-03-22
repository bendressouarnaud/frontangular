import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateur } from "../mesbeans/utilisateur";
import { Reponse } from "../mesbeans/reponse";
import { ReponseUser } from "../mesbeans/reponseuser";
import { ReponseRdv } from "../mesbeans/reponserdv";
import { Profil } from "../mesbeans/profil";
import { RepGraphe } from "../mesbeans/repgraphe";
import { ReponseDonCom } from "../mesbeans/reponsedoncom";
import { Activite } from "../mesbeans/activite";
import { Rdv } from "../mesbeans/rdv";
import { Reprdv } from "../mesbeans/reprdv";
import { Rapport } from "../mesbeans/rapport";
import { Professeur } from "../mesbeans/professeur";
import { Responsable } from "../mesbeans/responsable";
import { Classe } from "../mesbeans/classe";
import { Uniteenseigne } from "../mesbeans/uniteenseigne";
import { Ecue } from "../mesbeans/ecue";
import { Lienrespue } from "../mesbeans/lienrespue";
import { Cours } from "../mesbeans/cours";
import { GrapheCours } from "../mesbeans/graphecours";
import { TeamAgenda } from "../mesbeans/teamagenda";
import { RapportComment } from "../mesbeans/rapportcomment";
import { RepRdvClient } from "../mesbeans/reprdvclient";
import { StatGen } from "../mesbeans/statgen";
import { Reunion } from "../mesbeans/reunion";
import { ReunionRest } from "../mesbeans/reunionrest";
import { Mois } from "../mesbeans/mois";
import { Annee } from "../mesbeans/annee";
import { Performance } from "../mesbeans/performance";
import { PerfRest } from "../mesbeans/reponseperform";
import { ReunionRestSup } from "../mesbeans/reunionrestsup";
import { UserLog } from "../mesbeans/userlogin";
import { RdvObjet } from "../mesbeans/rdvobjet";
import { RapportObjet } from "../mesbeans/rapportobjet";
import { RdvFullRest } from "../mesbeans/rdvfullrest";

@Injectable({
    providedIn: 'root'
})

export class ApisCalls {

    private webserviceUri: String = "http://localhost:8081/backend";
    //private webserviceUri : String = "http://217.160.247.10/backend";
    //private webserviceUri : String = "http://oceaneinter.com/backend";
    //private webserviceUri : String = "https//jcom.nsiaassurances.ci/backend";

    constructor(private httpclient: HttpClient) { }


    // Save Activite:
    enregistrerRdv(rdv: RdvFullRest, dates: string): Observable<Reponse> {

        // Set the new OBject
        var rdvObjet = new RdvObjet();
        rdvObjet.nom = rdv.nom.toString();
        rdvObjet.contact = rdv.contact.toString();
        rdvObjet.email = rdv.email.toString();
        rdvObjet.activite = rdv.activite;
        rdvObjet.motif = rdv.motif;
        rdvObjet.dates = dates;
        rdvObjet.heure = rdv.heure.toString();
        rdvObjet.categorie = rdv.categorie;
        rdvObjet.qualite = rdv.qualite;
        rdvObjet.superviseur = rdv.superviseur;
        rdvObjet.resume = rdv.resume;
        rdvObjet.etat = 1;
        //
        rdvObjet.invite = rdv.invite.toString();
        rdvObjet.mailautre = rdv.mailautre.toString();
        rdvObjet.nomfonction = rdv.nomfonction.toString();
        rdvObjet.lieu = rdv.lieu.toString();

        return this.httpclient.post<Reponse>(this.webserviceUri.concat("/enregistrerRdvObjet"), rdvObjet, {});
    }


    // Save Activite:
    modifierRdv(rdv: RdvFullRest, dates: string): Observable<Reponse> {

        var rdvObjet = new RdvObjet();

        rdvObjet.nom = rdv.nom.toString();
        rdvObjet.contact = rdv.contact.toString();
        rdvObjet.email = rdv.email.toString();
        rdvObjet.activite = rdv.activite;
        rdvObjet.motif = rdv.motif;
        rdvObjet.dates = dates;
        rdvObjet.heure = rdv.heure.toString();
        rdvObjet.categorie = rdv.categorie;
        rdvObjet.qualite = rdv.qualite;
        rdvObjet.superviseur = rdv.superviseur;
        rdvObjet.resume = rdv.resume;
        rdvObjet.idrdv = rdv.idrdv;
        //
        rdvObjet.invite = rdv.invite.toString();
        rdvObjet.mailautre = rdv.mailautre.toString();
        rdvObjet.nomfonction = rdv.nomfonction.toString();
        rdvObjet.lieu = rdv.lieu.toString();
        /*  */
        return this.httpclient.post<Reponse>(this.webserviceUri.concat("/modifierRdvObjet"), rdvObjet, {});
    }


    // Save Activite:
    enregistrerRapport(rapport: Rapport): Observable<Reponse> {
        var report = new RapportObjet();
        report.actions = rapport.actions.toString().trim();
        report.contenu = rapport.contenu.toString().trim();
        report.interlocuteurs = rapport.interlocuteurs.toString().trim();
        report.idrdv = rapport.idrdv;
        /*  */
        return this.httpclient.post<Reponse>(this.webserviceUri.concat("/enregistrerRapportObjet"), report, {});
    }


    retourMois(mois: Number): string {
        var retour = "";

        if (mois == 1) retour = "Jan";
        else if (mois == 2) retour = "Fev";
        else if (mois == 3) retour = "Mar";
        else if (mois == 4) retour = "Avr";
        else if (mois == 5) retour = "Mai";
        else if (mois == 6) retour = "Jun";
        else if (mois == 7) retour = "Jul";
        else if (mois == 8) retour = "Aou";
        else if (mois == 9) retour = "Sep";
        else if (mois == 10) retour = "Oct";
        else if (mois == 11) retour = "Nov";
        else if (mois == 12) retour = "Dec";

        return retour;
    }

}