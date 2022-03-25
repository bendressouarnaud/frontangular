import { Component, OnInit } from '@angular/core';
import { DonneGraphe } from 'src/app/mesbeans/donnegraphe';
import { DonneTampon } from 'src/app/mesbeans/donnetampon';
import { ReponseUser } from 'src/app/mesbeans/reponseuser';
import { ApisCalls } from 'src/app/messervices/apis';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';
import { Chart } from 'node_modules/chart.js';
import ChartDataLabels from 'node_modules/chartjs-plugin-datalabels';
import { DataGrapheCours } from 'src/app/mesbeans/dataGrapheCours';

declare const $: any;

@Component({
  selector: 'app-trader',
  templateUrl: './trader.component.html',
  styleUrls: ['./trader.component.css']
})
export class TraderComponent implements OnInit {

  // Attributes :
  listeBoss: ReponseUser[];
  getListeBoss = false;

  constructor(private meswebservices: MeswebservService, private apicalls: ApisCalls) { }

  ngOnInit(): void {
    // Call :
    this.getBossName();
    this.getMonthlyChart();
    this.getMonthlyDevisChart();
    this.getStatBySector();
  }

  /* get RAPPORT list :*/
  getBossName(): void {
    this.meswebservices.getbossname().toPromise()
      .then(
        resultat => {
          if (resultat.length > 0) {

            this.listeBoss = resultat;


          }

          this.getListeBoss = true;

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
      )
  }





  // Get RDV graphe 
  getMonthlyChart(): void {
    this.meswebservices.getcommercialrdvchart().toPromise().then(
      resultat => {

        //if(resultat.length > 0){

        var tabDonnee = [];
        var tabAnnee = [];
        var tabMois = [];
        var tabLibMois = [];

        //
        for (var i = 0; i < resultat.length; i++) {

          var tampon: DonneGraphe = new DonneGraphe();

          // Now fill :
          tampon.annee = resultat[i].annee;
          tampon.mois = resultat[i].mois;
          tampon.libmois = this.apicalls.retourMois(resultat[i].mois);
          tampon.tot = resultat[i].tot;

          //
          if (tabAnnee.indexOf(resultat[i].annee) == -1) {
            tabAnnee.push(resultat[i].annee);
          }
          //
          if (tabMois.indexOf(resultat[i].mois) == -1) {
            tabMois.push(resultat[i].mois);
            tabLibMois.push(this.apicalls.retourMois(resultat[i].mois));
          }

          //
          tabDonnee.push(tampon);
        }


        // Fill the ARRAY with '0' :
        var existe = false;
        var setLibMois = "";
        for (var k = 0; k < tabAnnee.length; k++) {
          for (var j = 0; j < tabLibMois.length; j++) {

            existe = false;
            setLibMois = tabLibMois[j];

            for (var l = 0; l < tabDonnee.length; l++) {
              if (tabLibMois[j] == tabDonnee[l].libMois) {
                // Set it :
                if (tabDonnee[l].annee == tabAnnee[k]) {
                  existe = true;
                  break;
                }
              }
            }

            // False ? Yes :
            if (!existe) {
              // Set it : 
              //alert('OK');
              var tamponDonnee: DonneGraphe = new DonneGraphe();
              tamponDonnee.annee = tabAnnee[k];
              tamponDonnee.mois = tabMois[j];
              tamponDonnee.tot = 0;
              tamponDonnee.libmois = setLibMois;
              tabDonnee.push(tamponDonnee);
            }

          }
        }

        // Organize Ressources & Depot:
        var tabDataset = [];
        // Organize DTA per YEAR
        for (var j = 0; j < tabAnnee.length; j++) {  // tabSigle

          var tampons: DonneTampon = new DonneTampon();
          var mTableau = [];
          for (var l = 0; l < tabMois.length; l++) {  // tabAnnee              
            for (var k = 0; k < tabDonnee.length; k++) {
              if ((tabAnnee[j] == tabDonnee[k].annee) && (tabMois[l] == tabDonnee[k].mois)) {
                tampons.sigle = tabDonnee[k].annee;
                mTableau.push(tabDonnee[k].tot);
                // 
                break;
              }
            }
          }

          //
          tampons.somme = new Array(mTableau.length);
          tampons.somme = mTableau;
          tabDataset.push(tampons);
        }


        var tabColueur = ["#056CCD", "#A9B2B1", "#908C7E", "#ED9C40", "#06A41E", "#C6D30A",
          "#8AD195", "#F3928B", "#6FD2CF", "#C6BC98", "#D7A2D4", "#BB8CF5", "#080808"];


        // Now, create a table to hold data :
        var tableHold = [];
        var cptColor = 0;
        for (var j = 0; j < tabDataset.length; j++) {
          tableHold.push(
            {
              label: tabDataset[j].sigle,
              backgroundColor: tabColueur[cptColor],
              borderColor: tabColueur[cptColor],
              data: tabDataset[j].somme,
              fill: false,
              borderWidth: 2
            });
            cptColor++;
        }

        //
        var ctx = $('#myChart');
        var myChart = new Chart("chartRDV", {
          type: 'line',
          data: {
            labels: tabLibMois,
            datasets: tableHold
          },
          plugins:[ChartDataLabels],
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });

        //}
        //45
      }
    );
  }





  // Get RDV graphe 
  getMonthlyDevisChart(): void {
    this.meswebservices.getcommercialdevischart().toPromise().then(
      resultat => {

        //if(resultat.length > 0){

        var tabDonnee = [];
        var tabAnnee = [];
        var tabMois = [];
        var tabLibMois = [];

        //
        for (var i = 0; i < resultat.length; i++) {

          var tampon: DonneGraphe = new DonneGraphe();

          // Now fill :
          tampon.annee = resultat[i].annee;
          tampon.mois = resultat[i].mois;
          tampon.libmois = this.apicalls.retourMois(resultat[i].mois);
          tampon.tot = resultat[i].tot;

          //
          if (tabAnnee.indexOf(resultat[i].annee) == -1) {
            tabAnnee.push(resultat[i].annee);
          }
          //
          if (tabMois.indexOf(resultat[i].mois) == -1) {
            tabMois.push(resultat[i].mois);
            tabLibMois.push(this.apicalls.retourMois(resultat[i].mois));
          }

          //
          tabDonnee.push(tampon);
        }


        // Fill the ARRAY with '0' :
        var existe = false;
        var setLibMois = "";
        for (var k = 0; k < tabAnnee.length; k++) {
          for (var j = 0; j < tabLibMois.length; j++) {

            existe = false;
            setLibMois = tabLibMois[j];

            for (var l = 0; l < tabDonnee.length; l++) {
              if (tabLibMois[j] == tabDonnee[l].libMois) {
                // Set it :
                if (tabDonnee[l].annee == tabAnnee[k]) {
                  existe = true;
                  break;
                }
              }
            }

            // False ? Yes :
            if (!existe) {
              // Set it : 
              //alert('OK');
              var tamponDonnee: DonneGraphe = new DonneGraphe();
              tamponDonnee.annee = tabAnnee[k];
              tamponDonnee.mois = tabMois[j];
              tamponDonnee.tot = 0;
              tamponDonnee.libmois = setLibMois;
              tabDonnee.push(tamponDonnee);
            }

          }
        }

        // Organize Ressources & Depot:
        var tabDataset = [];
        // Organize DTA per YEAR
        for (var j = 0; j < tabAnnee.length; j++) {  // tabSigle

          var tampons: DonneTampon = new DonneTampon();
          var mTableau = [];
          for (var l = 0; l < tabMois.length; l++) {  // tabAnnee              
            for (var k = 0; k < tabDonnee.length; k++) {
              if ((tabAnnee[j] == tabDonnee[k].annee) && (tabMois[l] == tabDonnee[k].mois)) {
                tampons.sigle = tabDonnee[k].annee;
                mTableau.push(tabDonnee[k].tot);
                // 
                break;
              }
            }
          }

          //
          tampons.somme = new Array(mTableau.length);
          tampons.somme = mTableau;
          tabDataset.push(tampons);
        }


        var tabColueur = ["#056CCD", "#A9B2B1", "#908C7E", "#ED9C40", "#06A41E", "#C6D30A",
          "#8AD195", "#F3928B", "#6FD2CF", "#C6BC98", "#D7A2D4", "#BB8CF5", "#080808"];


        // Now, create a table to hold data :
        var tableHold = [];
        var cptColor = 0;
        for (var j = 0; j < tabDataset.length; j++) {
          tableHold.push(
            {
              label: tabDataset[j].sigle,
              backgroundColor: tabColueur[cptColor],
              borderColor: tabColueur[cptColor],
              data: tabDataset[j].somme,
              fill: false,
              borderWidth: 2
            });
            cptColor++;
        }

        //
        var ctx = $('#myChart');
        var myChart = new Chart("chartDEVIS", {
          type: 'line',
          data: {
            labels: tabLibMois,
            datasets: tableHold
          },
          plugins:[ChartDataLabels],
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });

        //}
        //45
      }
    );
  }





  getStatBySector(): void {
    this.meswebservices.getStatSectorbyComChart().toPromise().then(
      resultat => {

        var tabDonnee = [];
        var tabAnnee = [];
        var tabMois = [];
        var tabLibMois = [];
        var tabCours = [];
        var tabCoursId = [];


        //
        for (var i = 0; i < resultat.length; i++) {

          var tampon: DataGrapheCours = new DataGrapheCours();
          // Now fill :
          tampon.cours = resultat[i].cours.toString();
          tampon.mois = resultat[i].mois;
          tampon.libmois = this.apicalls.retourMois(resultat[i].mois);
          tampon.tot = resultat[i].tot;
          tampon.id = resultat[i].id;

          //
          if (tabCoursId.indexOf(resultat[i].id) == -1) {
            tabCoursId.push(resultat[i].id);
            tabCours.push(resultat[i].cours);
          }
          //
          if (tabMois.indexOf(resultat[i].mois) == -1) {
            tabMois.push(resultat[i].mois);
            tabLibMois.push(this.apicalls.retourMois(resultat[i].mois));
          }

          //
          tabDonnee.push(tampon);
        }


        // Fill the ARRAY with '0' :
        /*var existe = false;
        var setIdCours = 0;
        var setId = 0;
        for (var k = 0; k < tabMois.length; k++) {
          for (var j = 0; j < tabCoursId.length; j++) {

            existe = false;
            setIdCours = j;

            for (var l = 0; l < tabDonnee.length; l++) {
              if (tabCoursId[j] == tabDonnee[l].id) {
                // Set it :
                if (tabDonnee[l].mois == tabMois[k]) {
                  existe = true;
                  break;
                }
              }
            }

            // False ? Yes :
            if (!existe) {
              // Set it : 
              //alert('OK');
              var tamponDonnee: DataGrapheCours = new DataGrapheCours();
              tamponDonnee.cours = tabCours[j];
              tamponDonnee.mois = tabMois[k];
              tamponDonnee.tot = 0;
              tamponDonnee.id = tabCoursId[j];
              tamponDonnee.libmois = tabLibMois[k];
              tabDonnee.push(tamponDonnee);
            }
          }
        }
        */

        // Organize Ressources & Depot:
        var tabDataset = [];
        // Organize DTA per YEAR
        for (var j = 0; j < tabCoursId.length; j++) {  // tabSigle

          var tampons: DonneTampon = new DonneTampon();
          var mTableau = [];
          for (var l = 0; l < tabMois.length; l++) {  // tabAnnee            
            for (var k = 0; k < tabDonnee.length; k++) {

              if ((tabCoursId[j] == tabDonnee[k].id) && (tabMois[l] == tabDonnee[k].mois)) {
                tampons.sigle = tabDonnee[k].cours;
                mTableau.push(tabDonnee[k].tot);
                // 
                break;
              }
            }
          }

          //
          tampons.somme = new Array(mTableau.length);
          tampons.somme = mTableau;
          tabDataset.push(tampons);
        }


        var tabColueur = ["#056CCD", "#A9B2B1", "#908C7E", "#ED9C40", "#06A41E", "#C6D30A",
          "#8AD195", "#F3928B", "#6FD2CF", "#C6BC98", "#D7A2D4", "#BB8CF5", "#080808"];


        // Now, create a table to hold data :
        var tableHold = [];
        var cptColor = 0;
        for (var j = 0; j < tabDataset.length; j++) {
          if (!(tabDataset[j].sigle == "---")) {
            tableHold.push(
              {
                label: tabDataset[j].sigle,
                backgroundColor: tabColueur[cptColor],
                borderColor: tabColueur[cptColor],
                data: tabDataset[j].somme,
                borderWidth: 2,
                fill: false
              });
              cptColor++;
          }
        }

        //alert("Taille tableHold : "+tableHold.length);


        //
        var ctx = $('#chartsecteur');
        Chart.helpers.merge(Chart.defaults.global.plugins.datalabels, {
          color: 'black',
          font: {
            weight: 'bold',
            size: 13
          }
        });
        var myChart = new Chart("chartsecteur", {
          type: 'line',
          data: {
            labels: tabLibMois,
            datasets: tableHold
          },
          plugins: [ChartDataLabels],
          options: {
            scales: {
              xAxes: [{
                gridLines: {
                  display: false
                },
                display: true
              }],
              yAxes: [
                {
                  gridLines: {
                    display: false
                  },
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });



        //}
        //45
      }
    );
  }

}
