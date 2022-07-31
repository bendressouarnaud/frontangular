import { Component, OnInit } from '@angular/core';
import { ClientBeanComAuto } from 'src/app/mesbeans/clientbeancomauto';
import { ClientBeanComSante } from 'src/app/mesbeans/clientbeancomsante';
import { StatsDevisUser } from 'src/app/mesbeans/statsdevisuser';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

declare const $: any;

@Component({
  selector: 'app-statdevisequipe',
  templateUrl: './statdevisequipe.component.html',
  styleUrls: ['./statdevisequipe.component.css']
})

export class StatdevisequipeComponent implements OnInit {

  // Attributes :
  listeAutoClientBeanComAuto: ClientBeanComAuto[]; 
  listeSanteClientBeanCom: ClientBeanComSante[]; 
  listeAutoClientBeanComAccident: ClientBeanComAuto[]; 
  listeAutoClientBeanComVoyage: ClientBeanComAuto[]; 
  listeAutoClientBeanComMrh: ClientBeanComAuto[]; 
  getAutoCommecial = false;
  getVoyageCommecial = false;
  getAccidentCommecial = false;
  getMrhCommecial = false;
  getSanteCommecial = false;
  statsdevisuser = new StatsDevisUser();
  iddev = 0;
  nomClient = "";



  // Methods :
  constructor(private meswebservices: MeswebservService) { }

  ngOnInit(): void {
    this.statsdevisuser.auto = "0";
    this.statsdevisuser.accident = "0";
    this.statsdevisuser.mrh = "0";
    this.statsdevisuser.voyage = "0";
    this.statsdevisuser.sante = "0";
    this.statsdevisuser.total = "0";

    this.getCommercialHistoDevisAuto();
    this.getCommercialHistoDevisAccident();
    this.getCommercialHistoDevisVoyage();
    this.getCommercialHistoDevisMrh();
    this.getCommercialHistoDevisSante();
    this.getStatsDevisEnCoursForManager();
  }


  // Get Statistiques DATA from All TEAM linked :
  getStatsDevisEnCoursForManager() {
    this.meswebservices.getStatsDevisEnCoursForManager().toPromise()
      .then(
        resultat => {
          this.statsdevisuser = resultat;
        },
        (error) => {
        }
      );
  }


  // Get DEVIS AUTO for 'Commercial' :
  getCommercialHistoDevisAuto() {
    this.meswebservices.getCommercialHistoDevisAuto().toPromise()
      .then(
        resultat => {
          this.listeAutoClientBeanComAuto = resultat;
          this.getAutoCommecial = true;
          // Refresh :
          this.initDevisAutoComm();
        }
      )
  }


  // Get DEVIS SANTE for 'Commercial' :
  getCommercialHistoDevisSante() {
    this.meswebservices.getCommercialHistoDevisSante().toPromise()
      .then(
        resultat => {
          this.listeSanteClientBeanCom = resultat;
          this.getSanteCommecial = true;
          // Refresh :
          this.initDevisSanteComm();
        }
      )
  }


  // Get DEVIS ACCIDENT for 'Commercial' :
  getCommercialHistoDevisAccident() {
    this.meswebservices.getCommercialHistoDevisAccident().toPromise()
      .then(
        resultat => {
          this.listeAutoClientBeanComAccident = resultat;
          this.getAccidentCommecial = true;
          // Refresh :
          this.initDevisAccidentComm();
        }
      )
  }


  // Get DEVIS VOYAGE for 'Commercial' :
  getCommercialHistoDevisVoyage() {
    this.meswebservices.getCommercialHistoDevisVoyage().toPromise()
      .then(
        resultat => {
          this.listeAutoClientBeanComVoyage = resultat;
          this.getVoyageCommecial = true;
          // Refresh :
          this.initDevisVoyageComm();
        }
      )
  }


  // Get DEVIS VOYAGE for 'Commercial' :
  getCommercialHistoDevisMrh() {
    this.meswebservices.getCommercialHistoDevisMrh().toPromise()
      .then(
        resultat => {
          this.listeAutoClientBeanComMrh = resultat;
          this.getMrhCommecial = true;
          // Refresh :
          this.initDevisMrhComm();
        }
      )
  }


  // Display 'MESSAGE' to CLOSE the TICKET :
  cloturerDevis( iddev: number, nomClient: string ){
    this.iddev = iddev;
    this.nomClient = nomClient;
    $('#modalAvorte').modal();
  }


  // Close the DEVIS :
  avorterDevis(){
    // process the 'DEVIS' :
    this.meswebservices.closeDevis(this.iddev.toString()).toPromise()
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
        "order": [[6, "desc"]]
      });
    }, 500);
  }



  // init DEVIS Sante for 'Commercial'
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
        "order": [[4, "desc"]]
      });
    }, 500);
  }



  // init DEVIS ACCIDENT for 'Commercial'
  initDevisAccidentComm() {
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
        "order": [[4, "desc"]]
      });
    }, 500);
  }

  // init DEVIS VOYAGE for 'Commercial'
  initDevisVoyageComm() {
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
        "order": [[4, "desc"]]
      });
    }, 500);
  }



  // init DEVIS MRH for 'Commercial'
  initDevisMrhComm() {
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
