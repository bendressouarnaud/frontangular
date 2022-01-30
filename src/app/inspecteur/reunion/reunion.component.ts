import { Component, OnInit } from '@angular/core';
import { ReponseUser } from 'src/app/mesbeans/reponseuser';
import { Reunion } from 'src/app/mesbeans/reunion';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';
import * as moment from 'moment';
import { ReunionRest } from 'src/app/mesbeans/reunionrest';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ReunionRestSup } from 'src/app/mesbeans/reunionrestsup';
import { NsiaTeam } from 'src/app/mesbeans/nsiateam';

declare const $: any;

@Component({
  selector: 'app-reunion',
  templateUrl: './reunion.component.html',
  styleUrls: ['./reunion.component.css']
})
export class ReunionComponent implements OnInit {

  //
  getDate = new Date();
  reunion: Reunion = new Reunion();
  basicDatepicker = "";
  idchoix = 2;
  listePersonne: ReponseUser[];
  getListePersonne = false;
  //
  personnesinvitees: String[];
  traitementEnCours = false;
  //
  listeReunion: ReunionRest[];
  listeReunionTeam: ReunionRestSup[];
  getListeReunionTeam = false;
  getReunion = false;
  resume = false;

  /* Added on 07/08/2021 */
  presonnesInvitees = [];
  dropdownSettings = {};
  personnelNsia: NsiaTeam[];
  tempUsers = [];
  dropdownList = [];
  membresId = [];
  selectedItems = [];
  tempSelectedItems = [];



  /*  M  e  t  h  o  d */
  constructor(private meswebservices: MeswebservService, private router: Router
    , private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.reunion.duree = 0;
    this.getUsers();
    this.getReunionByCommercial();
    this.getReunionTeam();
    this.getNsiaWholeTeam();
  }


  ouvrirzonegestion(): void {

    // Reset :
    this.membresId = [];
    this.selectedItems = [];

    if (this.resume == true) {
      this.resume = false;
    }


    // Open modal :
    $('#myModal').modal();
  }

  getUsers(): void {
    this.meswebservices.getFullUsers().toPromise()
      .then(
        resultat => {

          // Succes
          if (resultat.length > 0) {
            this.listePersonne = resultat;
            this.getListePersonne = true;
          }

        }
      )
  }


  getReunionTeam(): void {
    this.meswebservices.getReunionTeambySupId().toPromise()
      .then(
        resultat => {

          // Succes
          if (resultat.length > 0) {
            this.listeReunionTeam = resultat;
          }
          this.initableTeam();

        }
      )
  }


  checkTime(): boolean {
    // clean :
    document.getElementById("infos").innerHTML = "";

    if (($('#heuredebut').val().match(/^((0[0-9])|(1[0-9])|(2[0-3])):([0-5][0-9])$/)) &&
      ($('#heurefin').val().match(/^((0[0-9])|(1[0-9])|(2[0-3])):([0-5][0-9])$/))) return true;
    else return false;
  }

  checkDuree(): boolean {
    if (this.reunion.duree.toString().match(/^[0-9]+$/)) return true;
    return false;
  }

  //
  // Save 
  enregistrerReunion(): void {

    if (this.checkDuree()) {
      if (!this.traitementEnCours) {
        // set it :
        this.traitementEnCours = true;

        // Send the DATA :
        var personneAInviter = "";
        for (var i = 0; i < this.membresId.length; i++) {
          if (i == 0) personneAInviter += this.membresId[i];
          else personneAInviter += "," + this.membresId[i];
        }

        // Set the obet :
        this.reunion.personnes = personneAInviter;
        if (!this.resume) {
          this.reunion.iduser = 0;
          this.reunion.idreu = 0;
          this.reunion.rapport = "";
        }

        // Process the date :         
        let momentVariable = moment(this.getDate, 'MM-DD-YYYY');
        let dates = momentVariable.format('YYYY-MM-DD');

        // Call to save the DATA :
        document.getElementById("infos").innerHTML = "Patientez...";
        if (!this.resume) {
          this.meswebservices.enregistrereunion(this.reunion, dates).toPromise().then(
            resultat => {
              // reinit :
              this.traitementEnCours = false;
              if (resultat.element == "ok") {
                // 
                this.cleanFields();
                $('#myModal').modal('hide');
                document.getElementById("infos").innerHTML = "";
                //this.getReunionByCommercial();
                location.reload();
              }
              else document.getElementById("infos").innerHTML = "Impossible d'enregistrer les données !";
            },
            (error) => {
              // reinit :
              this.traitementEnCours = false;
              document.getElementById("infos").innerHTML = "Impossible d'enregistrer les données !";
            }
          )
        }
        else {
          // Update 
          this.meswebservices.modifierReunion(this.reunion, dates).toPromise().then(
            resultat => {
              // reinit :
              this.traitementEnCours = false;
              if (resultat.element == "ok") {
                // 
                this.cleanFields();
                $('#myModal').modal('hide');
                document.getElementById("infos").innerHTML = "";
                //this.getReunionByCommercial();
                location.reload();
              }
              else document.getElementById("infos").innerHTML = "Impossible de modifier les données de la réunion !";
            },
            (error) => {
              // reinit :
              this.traitementEnCours = false;
              document.getElementById("infos").innerHTML = "Impossible d'enregistrer les données !";
            }
          )
        }
      }
    }
    else document.getElementById("infos").innerHTML = "La durée est incorrecte !";
  }

  // Clean :
  cleanFields() {
    this.reunion.personnes = "";
    this.reunion.iduser = 0;
    this.reunion.emplacement = "";
    this.reunion.duree = 0;
    this.reunion.idreu = 0;
    this.reunion.resume = "";
  }

  computeTime() {
    if (this.checkTime()) {
      this.reunion.duree = this.computeDuree();
    }
  }

  /* DUREE */
  computeDuree(): number {

    var retour = 0;
    let momentVariable = moment(this.getDate, 'MM-DD-YYYY');
    let dates = momentVariable.format('YYYY-MM-DD');
    var date1 = new Date(dates + " " + $('#heuredebut').val()).getTime();
    var date2 = new Date(dates + " " + $('#heurefin').val()).getTime();

    var msec = date2 - date1;
    var mins = Math.floor(msec / 60000);

    // Set the data :
    return mins;

  }


  // Get RDV list :
  getReunionByCommercial(): void {
    this.meswebservices.getReunionByCommercial().toPromise()
      .then(
        resultat => {
          // Succes
          if (resultat.length > 0) {
            this.listeReunion = resultat;
          }

          //
          if (!this.getReunion) this.initable();
        },
        (error) => {
          if (!this.getReunion) this.initable();
        }
      )
  }


  initable() {

    //
    this.getReunion = true;

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

    }, 500);
  }



  initableTeam() {

    //
    this.getListeReunionTeam = true;

    setTimeout(function () {

      $('#tableTeam').DataTable({
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

    }, 500);
  }



  afficheReunion(id: number): void {
    this.meswebservices.getSpecificReunion(id.toString()).toPromise().then(
      resultat => {
        if (resultat.idreu > 0) {

          //  
          this.reunion.duree = resultat.duree;
          this.reunion.emplacement = resultat.emplacement;
          this.reunion.heuredebut = resultat.heuredebut;
          this.reunion.heurefin = resultat.heurefin;
          this.reunion.idreu = resultat.idreu;
          this.reunion.iduser = resultat.iduser;
          this.reunion.objet = resultat.objet;
          this.reunion.personnes = resultat.personnes;
          var tampInvite: String[] = this.reunion.personnes.split(",");

          // Set a new table :
          this.membresId = [];
          this.tempSelectedItems = []; // Reinit :
          this.selectedItems = [];

          for (let k = 0; k < tampInvite.length; k++) {
            this.membresId.push(tampInvite[k]);

            // Set the drop down list values :
            for (var i = 0; i < this.personnelNsia.length; i++) {
              if (parseInt(tampInvite[k].toString()) == this.personnelNsia[i].iduser) {
                this.tempSelectedItems.push({ item_id: this.personnelNsia[i].iduser, item_text: this.personnelNsia[i].membre });
              }
            }
          }
          //
          this.selectedItems = this.tempSelectedItems;

          //
          this.reunion.rappel = resultat.rappel;
          this.reunion.resume = resultat.resume;
          this.reunion.rapport = resultat.rapport;

          // 
          let tDate = resultat.dates.toString().split("T");
          this.getDate = new Date(tDate[0]);

          /*  */
          this.resume = true;

          // Display :
          $('#myModal').modal('show');
        }
      },
      (error) => {
        this.warnmessage("Impossible d'obtenir les données de la réunion !");
      }
    )
  }



  saisierapport(id: number): void {

    //
    this.reunion.idreu = id;

    this.meswebservices.getSpecificReunion(id.toString()).toPromise().then(
      resultat => {
        if (resultat.idreu > 0) {
          this.reunion.rapport = resultat.rapport;
        }
      },
      (error) => {
        this.warnmessage("Impossible d'obtenir les données de la réunion !");
      }
    )

    //
    $('#myModalRap').modal('show');
  }



  // Save 
  enregistrerRapport(): void {
    //alert("Message : "+this.reunion.rapport);
    this.meswebservices.enregistrerRapportReunion(this.reunion.rapport.toString(),
      this.reunion.idreu.toString()).toPromise().then(
        resultat => {
          if (resultat.element == "ok") {
            // 
            this.reunion.rapport = "";
            this.warnmessage("Le rapport a bien enregistré !");
            $('#myModalRap').modal('hide');
          }
        },
        (error) => {
          this.warnmessage("Impossible d'enregistrer le rapport !");
          $('#myModalRap').modal('hide');
        }
      )

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




  /* Added on 07-08-2021 */
  getNsiaWholeTeam(): void {
    this.meswebservices.getNsiaWholeTeam().toPromise().then(
      resultat => {
        if (resultat.length > 0) {
          this.personnelNsia = resultat;
        }

        // Browse :
        for (var i = 0; i < this.personnelNsia.length; i++) {
          var deq = new NsiaTeam();
          deq.iduser = this.personnelNsia[i].iduser;
          deq.membre = this.personnelNsia[i].membre.toString();
          this.tempUsers.push({
            item_id: this.personnelNsia[i].iduser,
            item_text: this.personnelNsia[i].membre.toString()
          });
        }

        this.dropdownList = this.tempUsers;
        //this.selectedItems = this.tempSelectedItems;

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



}
