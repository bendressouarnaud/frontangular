import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import * as moment from 'moment';
import { Activite } from 'src/app/mesbeans/activite';
import { Rdv } from 'src/app/mesbeans/rdv';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';
import { FormControl } from '@angular/forms';


import * as _moment from 'moment';
import { Moment } from 'moment';
import { Reprdv } from 'src/app/mesbeans/reprdv';
import { Rapport } from 'src/app/mesbeans/rapport';
import { ApisCalls } from 'src/app/messervices/apis';
import { Profil } from 'src/app/mesbeans/profil';
import { RdvFullRest } from 'src/app/mesbeans/rdvfullrest';
import { Detailequipe } from 'src/app/mesbeans/detailequipe';
import { UtilisateurInfo } from 'src/app/mesbeans/utilisateurinfo';
import { Motif } from 'src/app/mesbeans/motif';
import { InvitationRequest } from 'src/app/mesbeans/invitationrequest';

declare const $: any;

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'MMM DD, YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'app-rdv',
  templateUrl: './rdv.component.html',
  styleUrls: ['./rdv.component.css'],

  providers: [
    {
      provide: MY_FORMATS, useValue: MY_FORMATS
    }
  ]
})
export class RdvComponent implements OnInit {

  // Attributes :  
  listeRdv: Rdv[];
  malistedeRdv: Reprdv[];
  getMesRdv = false;
  tableaLreadyInit = false;
  listeActivite: Activite[];
  getListe = false;
  getListeActivite = false;
  rdv: RdvFullRest = new RdvFullRest();
  rapport: Rapport = new Rapport();
  basicDatepicker = "";
  //getDate = "";
  getDate = new Date();

  setHeure = this.getDate.getHours();
  setMinute = this.getDate.getMinutes();
  setDate = new Date();

  getHeure: number = Date.now();
  // {{getHeure | date:'hh:mm'}}
  dateValue = "";
  dateback: FormControl;
  rdvIdUpdate = 0;

  downloadFile = false;
  dropCallInterval: any;

  //
  public choix = [
    { "id": 1, "name": "1" }, { "id": 2, "name": "2" }, { "id": 3, "name": "3" }, { "id": 4, "name": "4" }, { "id": 5, "name": "5" }
    , { "id": 6, "name": "6" }, { "id": 7, "name": "7" }, { "id": 8, "name": "8" }, { "id": 9, "name": "9" }, { "id": 10, "name": "10" }
  ]


  /**  M o d i f i c a t i o n      a p p o r t é e     l e     15/07/2021  **/
  listeProfil: Profil[];
  profilschoisis: String[];
  listeDetails: Detailequipe[];
  /*-----*/
  dropdownList = [];
  tempUsers = [];
  selectedItems = [];
  dropdownSettings = {};
  tempSelectedItems = [];
  listeMyTeam: UtilisateurInfo[];
  membresId = [];
  processEnCours = false;

  // For deleting 
  information = "";
  idRdvToDelete = 0;


  /**  M o d i f i c a t i o n      a p p o r t é e     l e     15/10/2021  **/
  listeMotifs: Motif[];
  listeDesMembres: UtilisateurInfo[];
  mesinvitations: InvitationRequest[];
  getMesInvitations = false;








  // Methods :
  constructor(private meswebservices: MeswebservService, private apicall: ApisCalls) {
    //this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit(): void {

    // Init 
    this.rdv.activite = 1;
    this.rdv.motif = 1;
    this.rdv.categorie = 1;
    this.rdv.qualite = 0;
    this.rdv.superviseur = 0;
    this.rdv.heure = "";
    /* Init */
    this.rdv.resume = "";
    this.rdv.nom = "";
    this.rdv.contact = "";
    this.rdv.email = "";

    this.getAllActivities();

    // Display DATA :
    this.getRdvByCommercial();

    /**  M o d i f i c a t i o n      a p p o r t é e     l e     15/07/2021  **/
    $('#blocategorie').hide();
    $('#lesprofils').hide();
    $('#autres').hide();
    this.getListeProfil();
    this.getAllDetails();

    /**  M o d i f i c a t i o n      a p p o r t é e     l e     15/10/2021  **/
    this.getAllMotifs();
    this.getColleagues();
    this.getInvitationRdv();
  }

  ouvrirzonegestion(): void {
    // Reset :
    this.membresId = [];
    this.selectedItems = [];
    // Open modal :
    this.rdv.nom = "";
    this.rdv.contact = "";
    this.rdv.email = "";
    this.rdv.resume = "";
    this.rdv.qualite = 0;
    this.rdv.lieu = "";
    this.onQualiteChange();
    $('#myModal').modal();
  }

  getAllActivities(): void {
    this.meswebservices.getAllActivities().toPromise()
      .then(
        resultat => {

          // Succes
          if (resultat.length > 0) {
            this.listeActivite = resultat;
            this.getListeActivite = true;
          }

        }
      )
  }

  onKeyUp(x) { // appending the updated value to the variable
    if (x.target.value.length == 2) {
      let keep = x.target.value;
      if (keep.match(/^(0[0-9])|(1[0-9])|(2[0-3])$/)) {
        this.rdv.heure = keep + ':';
      }
    }
  }

  checkTime(): boolean {
    // clean :
    document.getElementById("infos").innerHTML = "";

    if (this.rdv.heure.match(/^((0[0-9])|(1[0-9])|(2[0-3])):([0-5][0-9])$/)) return true;
    else return false;
  }

  // ***************
  afficherrdv(idrdv: number): void {
    this.meswebservices.getSpecificRdvFull(idrdv.toString()).toPromise().then(
      resultat => {
        if (resultat.idrdv > 0) {
          //  
          this.rdv.categorie = resultat.categorie;
          this.rdv.contact = resultat.contact;
          this.rdv.dates = resultat.dates;
          this.rdv.email = resultat.email;
          this.rdv.etat = resultat.etat;
          this.rdv.heure = resultat.heure;
          //this.rdv.idcom = resultat.idcom;
          this.rdv.idrdv = resultat.idrdv;
          this.rdvIdUpdate = resultat.idrdv;
          this.rdv.nom = resultat.nom;
          this.rdv.qualite = resultat.qualite;
          this.rdv.resume = resultat.resume;
          this.rdv.superviseur = resultat.superviseur;
          //
          this.rdv.activite = resultat.activite;
          this.rdv.motif = resultat.motif;

          // New UPDATES :
          this.rdv.invite = resultat.invite;
          this.rdv.nomfonction = resultat.nomfonction;
          this.rdv.mailautre = resultat.mailautre;
          //
          this.rdv.lieu = resultat.lieu;


          if (this.rdv.categorie == 8) {  // Choisir Membres Equipes
            // Set a new table :
            this.membresId = [];
            this.tempSelectedItems = []; // Reinit :
            this.selectedItems = [];

            var tampInvite = this.rdv.invite.split(",");
            for (let k = 0; k < tampInvite.length; k++) {
              this.membresId.push(tampInvite[k]);

              // Set the drop down list values :
              for (var i = 0; i < this.listeDesMembres.length; i++) {
                if (parseInt(tampInvite[k]) == this.listeDesMembres[i].iduser) {
                  this.tempSelectedItems.push({
                    item_id: this.listeDesMembres[i].iduser,
                    item_text: this.listeDesMembres[i].nom.toString()
                  });
                }
              }
            }
            //
            this.selectedItems = this.tempSelectedItems;
          }


          // 
          let tDate = resultat.dates.toString().split("T");
          let momentVariable = moment(resultat.dates.toString(), 'MM-DD-YYYY');
          let dates = momentVariable.format('YYYY-MM-DD');
          let newDate = tDate[0].split("-");
          let finalDate = parseInt(newDate[1]).toString() + "/" + parseInt(newDate[2]).toString() +
            "/" + parseInt(newDate[0]).toString();
          this.getDate = new Date(tDate[0] + 'T' + resultat.heure);

          let comparatifDate = this.getDate >= this.setDate;
          let getFullTime = this.rdv.heure.split(":");

          if (comparatifDate == true) {
            comparatifDate = this.getDate > this.setDate;
            if (comparatifDate == true) {
              $('#myModal').modal('show');
              this.onQualiteChange();
              this.checkEquipe();
            }
            else {
              if (parseInt(getFullTime[0]) > this.setHeure) {
                $('#myModal').modal('show');
                this.onQualiteChange();
                this.checkEquipe();
              }
              else if (parseInt(getFullTime[0]) == this.setHeure) {
                if (parseInt(getFullTime[1]) >= this.setMinute) {
                  $('#myModal').modal('show');
                  this.onQualiteChange();
                  this.checkEquipe();
                }
                else alert("Imposible de modifier les valeurs de ce RDV, les délais sont dépassés !");
              }
              else alert("Imposible de modifier les valeurs de ce RDV, les délais sont dépassés !");
            }
          }
          else alert("Imposible de modifier les valeurs de ce RDV, les délais sont dépassés !");
        }
      }
    )
  }

  // Get RDV list :
  getRdvByCommercial(): void {
    this.meswebservices.getRdvByCommercial().toPromise()
      .then(
        resultat => {
          // Succes
          if (resultat.length > 0) {
            this.malistedeRdv = resultat;
          }

          //
          this.getMesRdv = true;

          //
          if (!this.tableaLreadyInit) {

            this.tableaLreadyInit = true;

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
                },
                "order": [[4, "desc"]]
              });
            }, 500);
          }
        }
      )
  }


  // Save 
  enregistrerRdv(): void {

    // Init :
    document.getElementById("infos").innerHTML = "";


    if (this.checkTime()) {
      if (this.rdvIdUpdate == 0) {

        // Si 'Certains membres de mon équipe' choisis :
        switch (this.rdv.categorie) {
          case 8:
            // Si des membres ont été choisis :
            if (this.membresId.length > 0) {

              // Process the INVITE :
              var tamponInvite = "";
              for (let n = 0; n < this.membresId.length; n++) {
                if (n == 0) tamponInvite = this.membresId[n];
                else tamponInvite += "," + this.membresId[n];
              }

              // Set data :
              this.rdv.invite = tamponInvite;
              this.rdv.nomfonction = "";
              this.rdv.mailautre = "";

              // call :
              this.traiterEnvoiDonnee();
            }
            else document.getElementById("infos").innerHTML = "Veuillez sélectionner au moins un membre !";
            break;


          case 9:
            // AUTRES :
            if ((this.rdv.nomfonction.length > 0) || (this.rdv.email.length > 0)) {
              this.rdv.invite = "";
              // call :
              this.traiterEnvoiDonnee();
            }
            else document.getElementById("infos").innerHTML = "Veuillez renseigner le nom ou la fonction et/ou l'adresse mail (Autre) !";
            break;

          default:
            this.rdv.invite = "";
            this.rdv.nomfonction = "";
            this.rdv.mailautre = "";
            this.traiterEnvoiDonnee();
            break;
        }
      }
      else this.modifierRdv();
    }
    else document.getElementById("infos").innerHTML = "Format de l'heure incorrect !";
  }


  // traiter les données :
  traiterEnvoiDonnee() {

    if (!this.processEnCours) {

      //
      this.processEnCours = true;

      // Process the date :         
      let momentVariable = moment(this.getDate, 'MM-DD-YYYY');
      let dates = momentVariable.format('YYYY-MM-DD');

      document.getElementById("infos").innerHTML = "Veuillez patienter...";
      this.apicall.enregistrerRdv(this.rdv, dates).toPromise().then(
        resultat => {

          //
          this.processEnCours = false;

          document.getElementById("infos").innerHTML = "";
          if (resultat.element == "ok") {
            // 
            this.cleanFields();
            $('#myModal').modal('hide');
            this.getRdvByCommercial();
          }
          else if (resultat.element == "pok") {
            document.getElementById("infos").innerHTML = "Attention : Il se pourrait qu'il y ait déjà un RDV à cette date !";
            this.warnmessage("Attention : Il se pourrait qu'il y ait déjà un RDV à cette date !");
          }
        },
        (error) => {
          //
          this.processEnCours = false;
          this.warnmessage("Impossible de d'enregistrer le RAPPORT !");
        }
      )
    }
  }




  warnmessage(information: string) {
    $.notify({
      icon: 'notifications',
      message: information
    }, {
      type: 'success',
      timer: 3000,
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


  // Save 
  enregistrerRapport(): void {
    this.rapport.idrap = 0;
    this.rapport.dates = "";
    this.rapport.heure = "";
    this.apicall.enregistrerRapport(this.rapport).toPromise().then(
      resultat => {
        if (resultat.element == "ok") {
          // 
          this.cleanFieldsRapport();
          window.location.href = "#/gcommercial/comrap";
        }
      },
      (error) => {
        this.warnmessage("Impossible de d'enregistrer le RAPPORT !");
      }
    )

  }


  // Save 
  modifierRdv(): void {

    if (this.checkTime()) {

      // Si 'Certains membres de mon équipe' choisis :
      switch (this.rdv.categorie) {
        case 8:
          // Si des membres ont été choisis :
          if (this.membresId.length > 0) {

            // Process the INVITE :
            var tamponInvite = "";
            for (let n = 0; n < this.membresId.length; n++) {
              if (n == 0) tamponInvite = this.membresId[n];
              else tamponInvite += "," + this.membresId[n];
            }

            // Set data :
            this.rdv.invite = tamponInvite;
            this.rdv.nomfonction = "";
            this.rdv.mailautre = "";

            // call :
            this.traiterModificationRdv();
          }
          else document.getElementById("infos").innerHTML = "Veuillez sélectionner au moins un membre !";
          break;


        case 9:
          // AUTRES :
          if ((this.rdv.nomfonction.length > 0) || (this.rdv.email.length > 0)) {
            this.rdv.invite = "";
            // call :
            this.traiterModificationRdv();
          }
          else document.getElementById("infos").innerHTML = "Veuillez renseigner le nom ou la fonction et/ou l'adresse mail (Autre) !";
          break;

        default:
          this.rdv.invite = "";
          this.rdv.nomfonction = "";
          this.rdv.mailautre = "";
          // call :
          this.traiterModificationRdv();
          break;
      }
    }
    else document.getElementById("infos").innerHTML = "Format de l'heure incorrect !";
  }



  // Traiter Modification Donnee :
  traiterModificationRdv() {

    if (!this.processEnCours) {

      //
      this.processEnCours = true;

      // Process the date :         
      let momentVariable = moment(this.getDate, 'MM-DD-YYYY');
      let dates = momentVariable.format('YYYY-MM-DD');
      this.rdv.idrdv = this.rdvIdUpdate;
      this.rdvIdUpdate = 0;

      document.getElementById("infos").innerHTML = "Veuillez patienter...";
      this.apicall.modifierRdv(this.rdv, dates).toPromise().then(
        resultat => {

          //
          this.processEnCours = false;

          if (resultat.element == "ok") {
            // 
            this.membresId = [];
            this.selectedItems = [];

            document.getElementById("infos").innerHTML = "";
            this.cleanFields();
            this.getRdvByCommercial();
            $('#myModal').modal('hide');
          }
        },
        (error) => {
          this.processEnCours = false;
          document.getElementById("infos").innerHTML = "";
          this.warnmessage("Impossible de modifier le RDV !");
        }
      )
    }

  }



  saisierapport(idrdv: number): void {
    //
    this.rapport.idrdv = idrdv;

    // Get the report :
    this.meswebservices.getSpecificRapport(idrdv.toString()).toPromise().then(
      resultat => {
        if (resultat == null) this.cleanFieldsRapport();
        else if (resultat.idrdv > 0) {
          this.rapport.interlocuteurs = resultat.interlocuteurs;
          this.rapport.actions = resultat.actions;
          this.rapport.contenu = resultat.contenu;
          this.rapport.dates = "";
          this.rapport.heure = "";
        }
      },
      (error) => {
        this.rapport.idrap = 0;
        this.cleanFieldsRapport();
        //console.log('Erreur ! : ' + error);
      }
    );

    //
    $('#myModalRap').modal('show');
  }



  // Display modal to delete 
  afficherdvtodel(idrdv: string) {
    // Open modal :
    this.idRdvToDelete = parseInt(idrdv);
    this.information = "";
    $('#modaldelete').modal();
  }


  // Now, suppress :
  supprimerRdv() {
    if (this.idRdvToDelete > 0) {
      this.information = "Veuillez patienter ...";
      let tpid = this.idRdvToDelete.toString();
      this.idRdvToDelete = 0;
      this.meswebservices.deleterdvid(tpid).toPromise().then(
        resultat => {
          //
          if (resultat.element == "ok") {
            // Recharger :
            this.information = "...";
            location.reload();
          }
          else {
            this.warnmessage("Impossible de supprimer ce RDV !");
          }
        },
        (error) => {
          this.warnmessage("Impossible de supprimer ce RDV !");
        }
      );
    }
  }



  // Link to download file :
  downloadfiche(idrdv: number): void {

    this.downloadFile = false;
    // Display MODAL :
    $('#modalwaiting').modal('show');
    this.dropCallInterval = setInterval(() => {
      this.closeModal();
    }, 1000);

    this.meswebservices.getFicheVisite(idrdv.toString()).toPromise().then(
      resultat => {
        //
        this.downloadFile = true;
        let file = new Blob([resultat], { type: 'application/octet-stream' });
        let fileUrl = window.URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = fileUrl;
        var filename = "fichevisite_" + idrdv.toString() + ".pdf";
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
      },
      (error) => {
        this.downloadFile = true;
        this.warnmessage("Impossible de télécharger ce document !");
      }
    );
  }


  closeModal() {
    if (this.downloadFile == true) {
      $('#modalwaiting').modal('toggle');
      clearInterval(this.dropCallInterval);
    }
  }


  cleanFields(): void {
    this.rdv.categorie = 0;
    this.rdv.contact = "";
    this.rdv.email = "";
    this.rdv.etat = 0;
    this.rdv.heure = "";
    this.rdv.idcom = 0;
    this.rdv.idrdv = 0;
    this.rdvIdUpdate = 0;
    this.rdv.nom = "";
    this.rdv.qualite = 0;
    this.rdv.resume = "";
    this.rdv.superviseur = 0;
  }

  cleanFieldsRapport(): void {
    this.rapport.actions = "";
    this.rapport.contenu = "";
    //this.rapport.idrdv = 0;
  }






  /**  M o d i f i c a t i o n      a p p o r t é e     l e     15/07/2021  **/
  onQualiteChange(): void {
    if (this.rdv.qualite == 1) {
      // Show DETAIL :
      $('#blocategorie').show();
    }
    else {
      $('#blocategorie').hide();
      // Force 'Choisir Memebre' to be hidden :
      this.rdv.categorie = 1;
    }

    // Also call :
    this.checkEquipe();
  }


  /* get Liste des profils Utilisateurs :*/
  getListeProfil(): void {
    this.meswebservices.getprofiliste().toPromise()
      .then(
        resultat => {
          if (resultat.length > 0) {
            this.listeProfil = resultat;
          }
        }
      )
  }


  /* get Liste des profils Utilisateurs :*/
  getAllDetails(): void {
    this.meswebservices.getAllDetailEquipe().toPromise()
      .then(
        resultat => {
          if (resultat.length > 0) {
            this.listeDetails = resultat;
          }
        }
      )
  }


  /*  */
  checkEquipe(): void {

    switch (this.rdv.categorie) {
      case 8:
        // Show DETAIL :
        $('#lesprofils').show();
        $('#autres').hide();
        break;

      case 9:
        // Show DETAIL :
        $('#lesprofils').hide();
        $('#autres').show();
        break;

      default:
        $('#lesprofils').hide();
        $('#autres').hide();
        break;
    }

  }

  // whenever an item is selected :
  onItemSelect(item: any) {
    // Add user'id
    this.membresId.push(item.item_id);
  }

  // whenever an item is deselected :
  onItemDeSelect(item: any) {
    //
    this.membresId.forEach((element, index) => {
      if (element == item.item_id) this.membresId.splice(index, 1);
    });
  }

  // Whenever all items are selected :
  onSelectAll(items: any) {
    // Reset the table :
    this.membresId = [];
    for (let i = 0; i < items.length; i++) {
      this.membresId.push(items[i].item_id);
    }
  }


  /* get MOTIFS :*/
  getAllMotifs(): void {
    this.meswebservices.getAllMotifs().toPromise()
      .then(
        resultat => {
          if (resultat.length > 0) {
            this.listeMotifs = resultat;
          }
        }
      )
  }



  /* get MEMBRES from same team :*/
  getColleagues(): void {
    this.meswebservices.getwebmembrequipe().toPromise()
      .then(
        resultat => {
          if (resultat.length > 0) {
            this.listeDesMembres = resultat;
          }

          // Browse :
          if(resultat.length > 0){
            for (var i = 0; i < this.listeDesMembres.length; i++) {
              var deq = new Detailequipe();
              this.tempUsers.push({
                item_id: this.listeDesMembres[i].iduser,
                item_text: this.listeDesMembres[i].nom.toString()
              });
            }
          }
          else{
            var deq = new Detailequipe();
              this.tempUsers.push({
                item_id: 0,
                item_text: "---"
              });
          }

          this.dropdownList = this.tempUsers;

          // Init :
          this.dropdownSettings = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Sélectionner tout',
            unSelectAllText: 'Supprimer les sélections',
            itemsShowLimit: 5,
            maxHeight: 400,
            allowSearchFilter: true
          };

        }
      )
  }




  // Get RDV list :
  getInvitationRdv(): void {
    this.meswebservices.getinvitationrdvforcom().toPromise()
      .then(
        resultat => {
          // Succes
          if (resultat.length > 0) {
            this.mesinvitations = resultat;
          }

          //
          this.getMesInvitations = true;

          //
          setTimeout(function () {
            $('#datatablesInvit').DataTable({
              "pagingType": "full_numbers",
              "lengthMenu": [
                [10, 25, 50, -1],
                [10, 25, 50, "All"]
              ],
              responsive: true,
              language: {
                search: "_INPUT_",
                searchPlaceholder: "Search records",
              },
              "order": [[4, "desc"]]
            });
          }, 500);
        }
      )
  }



}
