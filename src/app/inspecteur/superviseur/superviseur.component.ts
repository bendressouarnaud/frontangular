import { Component, OnInit } from '@angular/core';
import { ReponseUser } from 'src/app/mesbeans/reponseuser';
import { Utilisateur } from 'src/app/mesbeans/utilisateur';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

declare const $: any;

@Component({
  selector: 'app-superviseur',
  templateUrl: './superviseur.component.html',
  styleUrls: ['./superviseur.component.css']
})
export class SuperviseurComponent implements OnInit {

  // A t t r i b u t e s :
  listeCommerciaux: Utilisateur[];
  getListeCom = false;
  getAllListeCom = false;
  listeAllCommerciaux: ReponseUser[];
  identifiant: String = "";
  tableauCom = false;
  emailCollab: String = "";
  information: String = "";
  suppression = false;


  // M e t h o d s :
  constructor(private meswebservices: MeswebservService) { }

  ngOnInit(): void {

    this.getusersbyprofilandid();
    this.getusersbyprofil();

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
    this.meswebservices.getusersbyprofil("superviseur").toPromise()
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
    this.meswebservices.getusersbyprofilandid("superviseur").toPromise().then(
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
        }, 400);
      }
    )
  }


}
