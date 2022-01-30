import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RepGraphe } from 'src/app/mesbeans/repgraphe';
import { ReponseUser } from 'src/app/mesbeans/reponseuser';
import { Utilisateur } from 'src/app/mesbeans/utilisateur';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

import { Chart } from 'node_modules/chart.js';
import ChartDataLabels from 'node_modules/chartjs-plugin-datalabels';
import { DonneGraphe } from 'src/app/mesbeans/donnegraphe';
import { DonneTampon } from 'src/app/mesbeans/donnetampon';


declare const $: any;

@Component({
  selector: 'app-gestioncommerce',
  templateUrl: './gestioncommerce.component.html',
  styleUrls: ['./gestioncommerce.component.css']
})
export class GestioncommerceComponent implements OnInit {

  // A t t r i b u t e s   :
  listeCommerciaux: Utilisateur[];
  getListeCom = false;
  getAllListeCom = false;
  listeAllCommerciaux: ReponseUser[];
  identifiant: String = "";
  tableauCom = false;
  emailCollab: String = "";
  information: String = "";
  suppression = false;



  // M e t h o d :
  constructor(private meswebservices: MeswebservService, private router: Router) { }

  ngOnInit(): void {

    this.getusersbyprofilandid();
    this.getusersbyprofil();
    //

  }

  enregistrerUser(): void {
    if (this.identifiant.length > 0) {
      this.meswebservices.adduserhierarchie(this.identifiant.toString()).toPromise().then(
        resultat => {
          if (resultat.element == "ok") {
            //window.location.href = "#/gestion/portefeuille";
            //this.router.navigateByUrl('/gestion/portefeuille');
            this.getusersbyprofilandid();
            this.getusersbyprofil();
          }
        }
      )
    }
  }


  ouvrirzoneparam(): void {
    // Open modal :
    $('#myModal').modal();
  }


  // 
  afficherinvit(nom: String, email: String): void {
    // Open modal :
    this.emailCollab = email;
    this.information = "";
    $('#modaldelete').modal();
  }


  // Supprimer :
  supprimerUser() {

    if (!this.suppression) {

      // Set it :
      this.suppression = true;

      // Display message :
      this.information = "Patientez svp ...";

      this.meswebservices.supprimercollab(this.emailCollab.toString()).toPromise()
        .then(
          resultat => {

            this.suppression = false;

            // Succes
            if (resultat.element == "ok") {
              this.information = "";
              this.getusersbyprofilandid();
              this.getusersbyprofil();
              // Now hide the modal 
              this.information = "";
              $('#modaldelete').modal('hide');
            }
            else {
              // Display message :
              this.information = "Impossible de traiter la suppression !";
            }
          },
          (error) => {
            this.suppression = false;
            this.information = "";
          }
        )
    }
  }



  /* Get user */
  getusersbyprofil(): void {
    this.meswebservices.getusersbyprofil("commercial").toPromise()
      .then(
        resultat => {
          // Succes
          if (resultat.length > 0) {
            this.listeAllCommerciaux = resultat;
            // Set a default : 
            this.identifiant = this.listeAllCommerciaux[0].identifiant;
            //this.getAllListeCom = true; 
          }
        }
      )
  }



  getusersbyprofilandid(): void {
    this.meswebservices.getusersbyprofilandid("commercial").toPromise().then(
      resultat => {
        if (resultat.length > 0) {
          this.listeCommerciaux = resultat;
          //window.location.href = "/gestion/comptes";          
        }

        //
        this.getListeCom = true;

        setTimeout(function () {

          if (!this.tableauCom) {
            $('#datatables').DataTable({
              "pagingType": "full_numbers",
              "lengthMenu": [
                [10, 25, 50, -1],
                [10, 25, 50, "All"]
              ],
              responsive: true,
              language: {
                search: "_INPUT_",
                searchPlaceholder: "Search records",
              }
            });
          }
          else {
            $('#datatables').DataTable();
          }

          this.tableauCom = true;
        }, 1000);

      }
    )
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
