import { Component, OnInit } from '@angular/core';
import { ClientBeanComAuto } from 'src/app/mesbeans/clientbeancomauto';
import { ClientBeanStatComAuto } from 'src/app/mesbeans/clientbeanstatcomauto';
import { StatsDevisUser } from 'src/app/mesbeans/statsdevisuser';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

declare const $: any;

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  // Attributes :
  statsdevisuser = new StatsDevisUser();
  listeDevisAuto: ClientBeanStatComAuto[];
  listeDevisSante: ClientBeanStatComAuto[];
  listeDevisAccident: ClientBeanStatComAuto[];
  listeDevisVoyage: ClientBeanStatComAuto[];
  listeDevisMrh: ClientBeanStatComAuto[];
  getDevisAuto = false;
  getDevisAccident = false;
  getDevisVoyage = false;
  getDevisMrh = false;
  getDevisSante = false;
  iddev = 0;
  nomClient = "";
  numDevis = "";



  // Methodes :
  constructor(private meswebservices: MeswebservService) { }

  ngOnInit(): void {

    // Set DATA :
    this.statsdevisuser.auto = "0";
    this.statsdevisuser.accident = "0";
    this.statsdevisuser.voyage = "0";
    this.statsdevisuser.mrh = "0";
    this.statsdevisuser.sante = "0";
    this.statsdevisuser.total = "0";

    //
    this.getStatsDevisByTresorier();
    this.getTresorierDevisAuto();
    this.getTresorierDevisVoyage();
    this.getTresorierDevisAccident();
    this.getTresorierDevisMrh();
    this.getTresorierDevisSante();

  }


  // Get DATA from AUTO devis :
  getStatsDevisByTresorier() {
    this.meswebservices.getStatsDevisByTresorier().toPromise()
      .then(
        resultat => {
          this.statsdevisuser = resultat;
        },
        (error) => {
        }
      );
  }


  // Get DEVIS AUTO  :
  getTresorierDevisAuto() {
    this.meswebservices.getTresorierDevisAuto().toPromise()
      .then(
        resultat => {
          this.listeDevisAuto = resultat;
          this.getDevisAuto = true;
          // Refresh :
          this.initDevisAutoComm();
        }
      )
  }


  // Get DEVIS SANTE  :
  getTresorierDevisSante() {
    this.meswebservices.getTresorierDevisSante().toPromise()
      .then(
        resultat => {
          this.listeDevisSante = resultat;
          this.getDevisSante = true;
          // Refresh :
          this.initDevisSanteComm();
        }
      )
  }


  // Get DATA from VOYAGE devis :
  getTresorierDevisVoyage() {
    this.meswebservices.getTresorierDevisVoyage().toPromise()
      .then(
        resultat => {
          this.listeDevisVoyage = resultat;
          this.getDevisVoyage = true;
          this.initTableVoyage();
        },
        (error) => {
          this.getDevisVoyage = true;
          this.initTableVoyage();
        }
      );
  }


  // Get DATA from Accident devis :
  getTresorierDevisAccident() {
    this.meswebservices.getTresorierDevisAccident().toPromise()
      .then(
        resultat => {
          this.listeDevisAccident = resultat;
          this.getDevisAccident = true;
          this.initTableAccident();
        },
        (error) => {
          this.getDevisAccident = true;
          this.initTableAccident();
        }
      );
  }



  // Get DATA from Mrh devis :
  getTresorierDevisMrh() {
    this.meswebservices.getTresorierDevisMrh().toPromise()
      .then(
        resultat => {
          this.listeDevisMrh = resultat;
          this.getDevisMrh = true;
          this.initTableMrh();
          //this.separateurMillierOnTable();
        },
        (error) => {
          this.getDevisMrh = true;
          this.initTableMrh();
        }
      );
  }


  // Display 'MESSAGE' to CLOSE the TICKET :
  ouvrirValidation( iddev: number, nomClient: string ){
    this.iddev = iddev;
    this.nomClient = nomClient;
    $('#modalValide').modal();
  }


  // Valid PAYMENT :
  confirmerValidation(){
    // process the 'DEVIS' :
    this.meswebservices.validPayment(this.iddev.toString()).toPromise()
    .then(
      resultat => {
        if(resultat.code =="ok"){
          // Refresh :
          location.reload();
        }
        else{
          (error) => {
            this.warnmessage("Impossible de cloturer ce DEVIS !");
          }
        }
      },
      (error) => {
        this.warnmessage("Impossible de traiter la demande !");
      }
    )
  }


  // init DEVIS AUTO for 'Commercial'
  initDevisAutoComm() {
    setTimeout(function () {
      $('#datatableAuto').DataTable({
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
        "order": [[5, "desc"]]
      });
    }, 500);
  }

  initTableMrh() {
    setTimeout(function () {
      $('#datatableMrh').DataTable({
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
        "order": [[7, "desc"]]
      });
    }, 500);
  }


  initTableVoyage() {
    setTimeout(function () {
      $('#datatableVoyage').DataTable({
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
        "order": [[6, "desc"]]
      });
    }, 500);
  }



  initTableAccident() {
    setTimeout(function () {
      $('#datatableAccident').DataTable({
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
        "order": [[5, "desc"]]
      });
    }, 500);
  }



  initDevisSanteComm() {
    setTimeout(function () {
      $('#datatableSante').DataTable({
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
        "order": [[5, "desc"]]
      });
    }, 500);
  }  




  warnmessage(information: string) {
    $.notify({
      icon: 'notifications',
      message: information
    }, {
      type: 'danger',
      timer: 3000,
      placement: {
        from: 'top',
        align: 'left'
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



}
