import { Component, OnInit } from '@angular/core';
import { BeanStatsDevis } from 'src/app/mesbeans/beanstatsdevis';
import { StatsDevisUser } from 'src/app/mesbeans/statsdevisuser';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

declare const $: any;

@Component({
  selector: 'app-statistiquesdevis',
  templateUrl: './statistiquesdevis.component.html',
  styleUrls: ['./statistiquesdevis.component.css']
})
export class StatistiquesdevisComponent implements OnInit {

  // A t t r i b u t e s :
  statsdevisuser = new StatsDevisUser();
  listeAutoCommercial: BeanStatsDevis[];
  listeAutoSuperviseur: BeanStatsDevis[];
  listeAutoInspecteur: BeanStatsDevis[];
  listeVoyComSuperviseur: BeanStatsDevis[];
  listeVoySupSuperviseur: BeanStatsDevis[];
  listeAccCommercial: BeanStatsDevis[];
  listeAccSuperviseur: BeanStatsDevis[];
  listeMrhCommercial: BeanStatsDevis[];
  listeMrhSuperviseur: BeanStatsDevis[];
  listeSanteCommercial: BeanStatsDevis[];
  listeSanteSuperviseur: BeanStatsDevis[];
  getAutoCommecial = false;
  getAutoSuperviseur = false;
  getAutoInspecteur = false;
  getVoyCommecial = false;
  getVoySuperviseur = false;
  getAccCommecial = false;
  getAccSuperviseur = false;
  getMrhCommecial = false;
  getMrhSuperviseur = false;
  getSanteCommecial = false;
  getSanteSuperviseur = false;



  // M e t h o d s :
  constructor(private meswebservices: MeswebservService) { }

  ngOnInit(): void {

    this.statsdevisuser.auto = "0";
    this.statsdevisuser.accident = "0";
    this.statsdevisuser.mrh = "0";
    this.statsdevisuser.voyage = "0";
    this.statsdevisuser.sante = "0";
    this.statsdevisuser.total = "0";

    this.getHistoDevisAutoCommForManager();
    this.getHistoDevisAutoSupForManager();
    this.getHistoAutoInspecteur();
    /*this.getHistoAutoSuperviseur();
    this.getHistoDevisCommVoyageInspecteur();
    this.getHistoDevisSupVoyageInspecteur();
    this.getHistoDevisCommAccidentInspecteur();
    this.getHistoDevisSupAccidentInspecteur();
    this.getHistoDevisCommMrhInspecteur();
    this.getHistoDevisSupMrhInspecteur();
    this.getHistoDevisComSanteInspecteur();
    this.getHistoDevisSupSanteInspecteur();*/
  }


  // Get DEVIS AUTO for 'Commercial' :
  getHistoDevisAutoCommForManager() {
    this.meswebservices.getHistoDevisAutoCommForManager().toPromise()
      .then(
        resultat => {
          this.listeAutoCommercial = resultat;
          this.getAutoCommecial = true;
          // Refresh :
          this.initAutoTable("#datatableAutoCom");
        }
      )
  }

  // Get DEVIS AUTO for 'Superviseur' :
  getHistoDevisAutoSupForManager() {
    this.meswebservices.getHistoDevisAutoSupForManager().toPromise()
      .then(
        resultat => {
          this.listeAutoSuperviseur = resultat;
          this.getAutoSuperviseur = true;
          // Refresh :
          this.initAutoTable("#datatableAutoSup");
        }
      )
  }

  // Get DEVIS AUTO for 'Superviseur' :
  getHistoAutoSuperviseur() {
    this.meswebservices.getHistoDevisSupForInspecteur().toPromise()
      .then(
        resultat => {
          this.listeAutoSuperviseur = resultat;
          this.getAutoSuperviseur = true;
          // Refresh :
          this.initAutoTable("#datatableAutoSup");
        }
      )
  }

  // Get DEVIS AUTO for 'Inspecteur' :
  getHistoAutoInspecteur() {
    this.meswebservices.getHistoDevisAutoInsForManager().toPromise()
      .then(
        resultat => {
          this.listeAutoInspecteur = resultat;
          this.getAutoInspecteur = true;
          // Refresh :
          this.initAutoTable("#datatableAutoIns");
        }
      )
  }

  getHistoDevisCommVoyageInspecteur() {
    this.meswebservices.getHistoDevisCommVoyageInspecteur().toPromise()
      .then(
        resultat => {
          this.listeVoyComSuperviseur = resultat;
          this.getVoyCommecial = true;
          // Refresh :
          this.initAutoTable("#datatableVoyCom");
        }
      )
  }

  getHistoDevisSupVoyageInspecteur() {
    this.meswebservices.getHistoDevisSupVoyageInspecteur().toPromise()
      .then(
        resultat => {
          this.listeVoySupSuperviseur = resultat;
          this.getVoySuperviseur = true;
          // Refresh :
          this.initAutoTable("#datatableVoySup");
        }
      )
  }

  //
  getHistoDevisCommAccidentInspecteur() {
    this.meswebservices.getHistoDevisCommAccidentInspecteur().toPromise()
      .then(
        resultat => {
          this.listeAccCommercial = resultat;
          this.getAccCommecial = true;
          // Refresh :
          this.initAutoTable("#datatableAccCom");
        }
      )
  }

  //
  getHistoDevisSupAccidentInspecteur() {
    this.meswebservices.getHistoDevisSupAccidentInspecteur().toPromise()
      .then(
        resultat => {
          this.listeAccSuperviseur = resultat;
          this.getAccSuperviseur = true;
          // Refresh :
          this.initAutoTable("#datatableAccSup");
        }
      )
  }

  //
  getHistoDevisCommMrhInspecteur() {
    this.meswebservices.getHistoDevisComMrhInspecteur().toPromise()
      .then(
        resultat => {
          this.listeMrhCommercial = resultat;
          this.getMrhCommecial = true;
          // Refresh :
          this.initAutoTable("#datatableMrhCom");
        }
      )
  }

  //
  getHistoDevisSupMrhInspecteur() {
    this.meswebservices.getHistoDevisSupMrhInspecteur().toPromise()
      .then(
        resultat => {
          this.listeMrhSuperviseur = resultat;
          this.getMrhSuperviseur = true;
          // Refresh :
          this.initAutoTable("#datatableMrhSup");
        }
      )
  }

  //
  getHistoDevisComSanteInspecteur() {
    this.meswebservices.getHistoDevisComSanteInspecteur().toPromise()
      .then(
        resultat => {
          this.listeSanteCommercial = resultat;
          this.getSanteCommecial = true;
          // Refresh :
          this.initAutoTable("#datatableSanteCom");
        }
      )
  }

  //
  getHistoDevisSupSanteInspecteur() {
    this.meswebservices.getHistoDevisSupSanteInspecteur().toPromise()
      .then(
        resultat => {
          this.listeSanteSuperviseur = resultat;
          this.getSanteSuperviseur = true;
          // Refresh :
          this.initAutoTable("#datatableSanteSup");
        }
      )
  }

  // init DEVIS AUTO for 'Commercial'
  initAutoTable(id: string) {
    setTimeout(function () {
      $(id).DataTable({
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

  initAutoSup() {
    setTimeout(function () {
      $('#datatableAutoSup').DataTable({
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

}
