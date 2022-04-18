import { Component, OnInit } from '@angular/core';
import { ActivitecommercialeRest } from 'src/app/mesbeans/activitecommerciale';
import { NsiaTeam } from 'src/app/mesbeans/nsiateam';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';
import * as moment from 'moment';
import { ThrowStmt } from '@angular/compiler';
import { HistoActivitecommerciale } from 'src/app/mesbeans/histoactivitecommerciale';
import { Detailtable } from 'src/app/mesbeans/detailnomenclature';

declare const $: any;

@Component({
  selector: 'app-activitecommerciale',
  templateUrl: './activitecommerciale.component.html',
  styleUrls: ['./activitecommerciale.component.css']
})
export class ActivitecommercialeComponent implements OnInit {

  //        A t t r i b u t e s :
  getDate = new Date();
  getDateFin = new Date();
  activitecom = new ActivitecommercialeRest();
  listeActivite: HistoActivitecommerciale[];
  listeActiviteManager: HistoActivitecommerciale[];
  listeActiviteInvite: HistoActivitecommerciale[];
  getActivite = false;
  getActiviteManager = false;
  getActiviteInvite = false;
  ongoingprocess = false;
  basicDatepicker = "";
  basicDatepickerFin = "";

  /* */
  presonnesInvitees = [];
  dropdownSettings = {};
  personnelNsia: NsiaTeam[];
  tempUsers = [];
  dropdownList = [];
  membresId = [];
  selectedItems = [];
  tempSelectedItems = [];
  responsableId = 0;

  // Chef D'equipe :
  dropdownEquipeSettings = {};
  membresEquipeId = [];
  selectedEquipeItems = [];
  tempSelectedEquipeItems = [];
  chefEquipeId = 0;

  // Liste PRODUIT :
  listeProduit: Detailtable[];
  produitId = 0;
  capital = 0;
  capitalMillier = "0";



  //        M e t h o d s :
  constructor(private meswebservices: MeswebservService) { }

  ngOnInit(): void {
    this.getNsiaWholeTeam();
    this.getProduits();
    this.getActiviteComByCommercial();
    this.getactivitecomformanager();
    this.getActiviteWeAreCalledOn();
  }



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
          singleSelection: true,
          idField: 'item_id',
          textField: 'item_text',
          selectAllText: 'Sélectionner tout',
          unSelectAllText: 'Supprimer les sélections',
          itemsShowLimit: 5,
          maxHeight: 400,
          allowSearchFilter: true
        };

        this.dropdownEquipeSettings = {
          singleSelection: true,
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
    this.responsableId = parseInt(item.item_id);
  }

  // whenever an item is deselected :
  onItemDeSelect(item: any) {
    //
    this.membresId.forEach((element, index) => {
      if (element == item.item_id) {
        this.membresId.splice(index, 1);
        this.responsableId = 0;
      }
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



  /*     CHEF d'EQUIPE     */
  // whenever an item is selected :
  onItemEquipeSelect(item: any) {
    // Add user'id
    this.membresEquipeId.push(item.item_id);
    this.chefEquipeId = parseInt(item.item_id);
  }

  // whenever an item is deselected :
  onItemEquipeDeSelect(item: any) {
    //
    this.membresEquipeId.forEach((element, index) => {
      if (element == item.item_id) {
        this.membresEquipeId.splice(index, 1);
        this.chefEquipeId = 0;
      }
    });
  }

  // Whenever all items are selected :
  onSelectEquipeAll(items: any) {
    // Reset the table :
    this.membresEquipeId = [];
    for (let i = 0; i < items.length; i++) {
      this.membresEquipeId.push(items[i].item_id);
    }
  }



  // Go to pull PRODUIT ASSURANCE data , id : 11 :
  getProduits(): void {
    this.meswebservices.getdonneeparametree("11").toPromise()
      .then(
        resultat => {
          this.listeProduit = resultat;
          // Init 
          this.activitecom.produit = resultat[0].idnmd;
          this.produitId = resultat[0].idnmd;
        }
      )
  }





  // Get ACTIVITE list :
  getactivitecomformanager(): void {
    this.meswebservices.getactivitecomformanager().toPromise()
      .then(
        resultat => {
          // Succes
          if (resultat.length > 0) {
            this.listeActiviteManager = resultat;
          }

          //
          this.getActiviteManager = true;

          //
          setTimeout(function () {

            // Separateur de MILLIER :
            $(".chiffremanager").each(function(index, objet){
              var tp = parseInt(objet.innerHTML);
              objet.innerHTML = tp.toLocaleString();
            });
            

            $('#datatablesManager').DataTable({
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
              "order": [[ 2, "desc" ]]
            });

            // Display values 
            //alert($(".chiffre").val());
          }, 500);
        }
      )
  }




  // Get ACTIVITE list :
  getActiviteComByCommercial(): void {
    this.meswebservices.getActiviteComByCommercial().toPromise()
      .then(
        resultat => {
          // Succes
          if (resultat.length > 0) {
            this.listeActivite = resultat;
          }

          //
          this.getActivite = true;

          //
          setTimeout(function () {

            // Separateur de MILLIER :
            $(".chiffre").each(function(index, objet){
              var tp = parseInt(objet.innerHTML);
              objet.innerHTML = tp.toLocaleString();
            });
            

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

            // Display values 
            //alert($(".chiffre").val());
          }, 500);
        }
      )
  }




  // Get ACTIVITE list :
  getActiviteWeAreCalledOn(): void {
    this.meswebservices.getActiviteWeAreCalledOn().toPromise()
      .then(
        resultat => {
          // Succes
          if (resultat.length > 0) {
            this.listeActiviteInvite = resultat;
          }

          //
          this.getActiviteInvite = true;

          //
          setTimeout(function () {

            // Separateur de MILLIER :
            $(".chiffrewe").each(function(index, objet){
              var tp = parseInt(objet.innerHTML);
              objet.innerHTML = tp.toLocaleString();
            });
            

            $('#datatablewe').DataTable({
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

            // Display values 
            //alert($(".chiffre").val());
          }, 500);
        }
      )
  }




  //
  ouvrirzonegestion(): void {
    // Open modal :
    this.activitecom.idacm = 0;
    $('#myModal').modal();
  }


  /*computeTime() {
    if (this.checkTime()) {
      this.activitecom.duree = this.computeDuree();
    }
  }
  */


  checkTime(): boolean {
    // clean :
    document.getElementById("infos").innerHTML = "";

    if (($('#heuredebut').val().match(/^((0[0-9])|(1[0-9])|(2[0-3])):([0-5][0-9])$/)) &&
      ($('#heurefin').val().match(/^((0[0-9])|(1[0-9])|(2[0-3])):([0-5][0-9])$/))) return true;
    else return false;
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


  enregistrerActivite() {
    // Check if DUREE is set :
    if (this.activitecom.libelle.length > 0) {
      if (this.selectedItems.length > 0) {
        if (this.selectedEquipeItems.length > 0) {
          if (!this.ongoingprocess) {

            this.ongoingprocess = true;
            // Now Process :         
            let momentVariable = moment(this.getDate, 'MM-DD-YYYY');
            let dates = momentVariable.format('YYYY-MM-DD');
            this.activitecom.datedebut = dates;
            // Date fin
            momentVariable = moment(this.getDateFin, 'MM-DD-YYYY');
            dates = momentVariable.format('YYYY-MM-DD');
            this.activitecom.datefin = dates;
            // Responsable de l'action commerciale
            this.activitecom.responsable = this.responsableId;
            // Chef d'équipe :
            this.activitecom.chefequipe = this.chefEquipeId;

            // Call to save the DATA :
            document.getElementById("infos").innerHTML = "Patientez...";

            this.meswebservices.enregistreractivite(this.activitecom).toPromise().then(
              resultat => {
                // reinit :
                this.ongoingprocess = false;
                if (resultat.element == "ok") {
                  // 
                  location.reload();
                }
                else document.getElementById("infos").innerHTML = "Impossible d'enregistrer les données !";
              },
              (error) => {
                // reinit :
                this.ongoingprocess = false;
                document.getElementById("infos").innerHTML = "Impossible d'enregistrer les données !";
              }
            )
          }
        }
      }
      else this.warnmessage("Veuillez sélectionner un Responsable !");
    }
    else this.warnmessage("Le libellé de l'action commerciale doit être défini !");
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



  afficheActivite(id: number): void {
    this.meswebservices.getSpecificActivite(id.toString()).toPromise().then(
      resultat => {
        if (resultat.idacm > 0) {

          // Work on DATE :
          var dates: String[] = resultat.datedebut.split("-");
          var ourDates = dates[1] + "/" + dates[2] + "/" + dates[0];

          this.activitecom = resultat;
          //this.activitecom.dates = ourDates;
          this.getDate = new Date(resultat.datedebut.toString());
          this.getDateFin = new Date(resultat.datefin.toString());

          //  Set Responsable :
          this.tempSelectedItems = []; // Reinit :
          this.tempSelectedEquipeItems = []; // Reinit :
          this.selectedItems = [];
          this.selectedEquipeItems = [];

          // Set the drop down list values :
          for (var i = 0; i < this.personnelNsia.length; i++) {
            if (resultat.responsable == this.personnelNsia[i].iduser) {
              this.tempSelectedItems.push({ item_id: this.personnelNsia[i].iduser, item_text: this.personnelNsia[i].membre });
              this.responsableId = this.personnelNsia[i].iduser;
              break;
            }
          }

          //
          this.selectedItems = this.tempSelectedItems;

          // For chef d'equipe : 
          for (var i = 0; i < this.personnelNsia.length; i++) {
            if (resultat.chefequipe == this.personnelNsia[i].iduser) {
              this.tempSelectedEquipeItems.push({ item_id: this.personnelNsia[i].iduser, item_text: this.personnelNsia[i].membre });
              this.chefEquipeId = this.personnelNsia[i].iduser;
              break;
            }
          }

          //
          this.selectedEquipeItems = this.tempSelectedEquipeItems;

          // Chiffre d'affaire :
          this.capitalMillier = resultat.objectifchiffre.toLocaleString(); 

          // Display :
          $('#myModal').modal('show');
        }
      },
      (error) => {
        this.warnmessage("Impossible d'obtenir les données de la réunion !");
      }
    )
  }



  setmillier(event: any) {
    //alert(event.target.value);      activitecom.objectifchiffre
    if (this.checkAmount(event.target.value)) {
      this.activitecom.objectifchiffre = parseInt(event.target.value);
      this.capitalMillier = this.activitecom.objectifchiffre.toLocaleString();
    }
    else {
      this.activitecom.objectifchiffre = 0;
      this.capitalMillier = "0";
    }
  }

  checkAmount(valeur: string): boolean {
    var retour = true;
    if (!/^[0-9]+$/.test(valeur))
      retour = false;
    return retour;
  }


}