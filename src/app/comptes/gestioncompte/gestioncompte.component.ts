import { Component, OnInit } from '@angular/core';
import { Profil } from 'src/app/mesbeans/profil';
import { ReponseDonCom } from 'src/app/mesbeans/reponsedoncom';
import { ReponseUser } from 'src/app/mesbeans/reponseuser';
import { ReponseUserFul } from 'src/app/mesbeans/reponseuserful';
import { ReponseUserFulNew } from 'src/app/mesbeans/reponseuserfulnew';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

declare const $: any;

@Component({
  selector: 'app-gestioncompte',
  templateUrl: './gestioncompte.component.html',
  styleUrls: ['./gestioncompte.component.css']
})
export class GestioncompteComponent implements OnInit {

  // Attributes :
  listeProfil: Profil[];
  listeCommerciaux: ReponseUser[];
  listeCommerciauxFul: ReponseUserFulNew[];
  userToUpdate: ReponseUserFul[];
  getListeProfil = false;
  getListeCom = false;
  profil: Number = 0;
  email: String = "";
  nom: String = "";
  prenom: String = "";
  contact: String = "";
  idDone: String = "";
  initTable = false;
  setModification = false;
  setUserId = "";
  userconnexion = "";
  passconnexion = "";
  modes = "0";
  emailCollab: String = "";
  information: String = "";
  reponseReport = new ReponseDonCom();


  // Methods :
  constructor(private meswebservices: MeswebservService) { }

  ngOnInit(): void {
    this.getRapportlist();
    //this.getusersbyprofil();
    this.getAllusers();

    // Init :
    this.reponseReport.commentaires = 0;   // Liste Superviseurs
    this.reponseReport.commerciaux = 0;   // Liste comptes bloques
    this.reponseReport.rapports = 0;   // Liste de tous les utilisateurs
    this.reponseReport.rdv = 0;  // Liste Commerciaux

    //
    this.getadministratorstats();
  }

  ouvrirzonecom(): void {
    // Open modal :
    this.profil = 1;
    this.nom = "";
    this.prenom = "";
    this.email = "";
    this.contact = "";
    this.idDone = "";
    this.modes = "0";
    $('#myModal').modal();
  }

  /* get RAPPORT list :*/
  getRapportlist(): void {
    this.meswebservices.getprofiliste().toPromise()
      .then(
        resultat => {
          if (resultat.length > 0) {

            this.listeProfil = resultat;
            this.getListeProfil = true;

          }
        }
      )
  }

  // Save 
  enregistrerUser(): void {
    if (!this.setModification) {
      this.meswebservices.enregistrerUser(this.nom, this.prenom, this.contact,
        this.email, this.profil, this.modes, this.idDone).toPromise().then(
          resultat => {
            if (resultat.element == "ok") {
              //window.location.href = "#/gestion/comptes";
              this.cleanFields();
              this.getListeCom = false;
              //this.getAllusers();
              location.reload();
            }
            else if (resultat.element == "pok") {
              // Le compte existe deja :
              this.warnmessage("L'adresse MAIL est déjà en utilisation ...");
              //this.information = "Patientez svp ...";
            }
          }
        )
    }
    else {
      this.setModification = false;

      this.meswebservices.modifierUser(this.nom, this.prenom, this.contact,
        this.email, this.profil, this.setUserId, this.modes, this.idDone).toPromise().then(
          resultat => {
            if (resultat.element == "ok") {
              location.reload();
            }
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
            this.listeCommerciaux = resultat;
            this.getListeCom = true;

            setTimeout(function () {
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
            }, 1000);
          }
        }
      )
  }


  /* Get user */
  getAllusers(): void {
    this.meswebservices.getAllusers().toPromise()
      .then(
        resultat => {
          // Succes
          if (resultat.length > 0) {
            this.listeCommerciauxFul = resultat;
            this.getListeCom = true;

            if (!this.initTable) {
              //
              this.initTable = true;

              setTimeout(function () {
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
              }, 1000);
            }
          }
        }
      )
  }

  modifieruser(userids: string) {
    //alert("id : "+userids);  getusertoupdate
    this.meswebservices.getusertoupdate(userids).toPromise()
      .then(
        resultat => {
          if (resultat.length > 0) {

            // Set the FLAGS :
            this.setModification = true;
            this.setUserId = userids;

            this.userToUpdate = resultat;
            // update variable CONTENT :
            this.nom = this.userToUpdate[0].nom;
            this.prenom = this.userToUpdate[0].prenom;
            this.contact = this.userToUpdate[0].contact;
            this.email = this.userToUpdate[0].email;
            this.profil = parseInt(this.userToUpdate[0].identifiant.toString());
            this.modes = this.userToUpdate[0].modes.toString();
            this.idDone = this.userToUpdate[0].iddone.toString();
            // Display :
            $('#myModal').modal();
          }
        }
      )
  }



  activationquestion(email: string) {
    // Open modal :
    this.emailCollab = email;
    this.information = "";
    $('#modalactivation').modal();
  }


  desactivercompte(email: string) {
    // Open modal :
    this.emailCollab = email;
    this.information = "";
    $('#modalaccountblock').modal();
  }


  desactiverlecompte() {
    // Display message :
    this.information = "Patientez svp ...";

    this.meswebservices.desactiverlecompte(this.emailCollab.toString()).toPromise()
      .then(
        resultat => {
          // Succes
          if (resultat.element == "ok") {
            this.information = "";
            location.reload();
          }
        },
        (error) => {
          location.reload();
        }
      )
  }


  activerUser() {
    // Display message :
    this.information = "Patientez svp ...";

    this.meswebservices.activercompteuser(this.emailCollab.toString()).toPromise()
      .then(
        resultat => {
          // Succes
          if (resultat.element == "ok") {
            this.information = "";
            location.reload();
          }
        },
        (error) => {
          location.reload();
        }
      )
  }


  parametresconnexion(userids: string) {
    //alert("id : "+userids);  getusertoupdate
    this.meswebservices.parametresconnexion(userids).toPromise()
      .then(
        resultat => {
          if (resultat.length > 0) {
            this.userconnexion = resultat[0].prenom.toString();
            if(resultat[0].nom.toString().length ==4){
              this.passconnexion = resultat[0].nom.toString();
            }
            else{
              //this.passconnexion = "********";
              this.passconnexion = resultat[0].nom.toString();
            } 
            //resultat[0].nom.toString();
            // Display :
            $('#myModalParametres').modal();
          }
        }
      )
  }






  // Clean FIELDS :
  cleanFields() {
    this.nom = "";
    this.prenom = "";
    this.contact = "";
    this.email = "";
  }


  warnmessage(information: string) {
    $.notify({
      icon: 'notifications',
      message: information
    }, {
      type: 'success',
      timer: 5000,
      placement: {
        from: 'bottom',
        align: 'center'
      },
      template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }


  // Get Data 
  getadministratorstats(): void {
    this.meswebservices.getadministratorstats().toPromise().then(
      resultat => {
        this.reponseReport.commentaires = resultat.commentaires;   // Liste Superviseurs
        this.reponseReport.commerciaux = resultat.commerciaux;   // Liste comptes bloques
        this.reponseReport.rapports = resultat.rapports;   // Liste de tous les utilisateurs
        this.reponseReport.rdv = resultat.rdv;  // Liste Commerciaux
      }
    );
  }

}
