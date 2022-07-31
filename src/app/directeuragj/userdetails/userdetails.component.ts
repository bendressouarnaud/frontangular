import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

import { Chart } from 'node_modules/chart.js';
import ChartDataLabels from 'node_modules/chartjs-plugin-datalabels';
import { DataGrapheCours } from 'src/app/mesbeans/dataGrapheCours';
import { DonneTampon } from 'src/app/mesbeans/donnetampon';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  // Attributes :
  userContact = "";



  // Methods :
  constructor(private meswebservices: MeswebservService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      // Get parameters :
      this.userContact = params['contact'];
    });

    // Call this : 
    this.getStatsRdvRapportDevisForUser();
    this.getChartRdvforUniqueUser();
    this.getChartRapportforUniqueUser();
    this.getChartDevisforUniqueUser();
    this.getObjectifMonthlyforUser();
  }


  // Get Portfeuille :
  getStatsRdvRapportDevisForUser(): void {
    this.meswebservices.getStatsRdvRapportDevisForUser(this.userContact).toPromise().then(
      resultat => {

        var tabLibelle = [];
        var tabTotal = [];

        //
        for (var i = 0; i < resultat.length; i++) {
          tabLibelle.push(resultat[i].libelle);
          tabTotal.push((resultat[i].total));
        }

        //let colorHex = ['#4B6281','#2C6FCA','#BBC0C8','#AABCD8'];
        //let colorHex = ['#2C6FCA','#a89907','#90908c','#AABCD8'];
        let colorHex = ['rgba(7, 116, 246, 0.9)', 'rgba(255, 159, 64, 0.9)', 'rgba(44, 189, 12, 0.9)', 'rgba(189, 23, 12, 0.9)'];

        let myChart = new Chart("piechartrdvrapportdevis", {
          type: 'pie',
          data: {
            datasets: [{
              data: tabTotal,
              backgroundColor: colorHex
            }],
            labels: tabLibelle
          },
          plugins: [ChartDataLabels],
          options: {
            responsive: true,
            legend: {
              position: 'bottom'
            },
            plugins: {
              datalabels: {
                display: true,
                color: '#fff',
                anchor: 'end',
                align: 'start',
                offset: -1,
                borderWidth: 2,
                borderColor: '#fff',
                borderRadius: 25,
                backgroundColor: (context) => {
                  return context.dataset.backgroundColor;
                },
                font: {
                  weight: 'bold',
                  size: '10'
                }/*,                
                formatter: (value, context) =>{
                  return context.chart.data.labels[context.dataIndex];
                },*/
                , formatter: (value) => {
                  //return value+' %';
                  return value;
                }
              }
            }
          },


        });



      }
    );
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



  // Display CHART based on user's RDV :
  getChartRdvforUniqueUser(): void {
    this.meswebservices.getChartRdvforUniqueUser(this.userContact).toPromise().then(
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
          tampon.libmois = this.retourMois(resultat[i].mois);
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
            tabLibMois.push(this.retourMois(resultat[i].mois));
          }

          //
          tabDonnee.push(tampon);
        }

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

        var tabCouleur = [];
        tabCouleur.push({ couleur: 'rgba(7, 116, 246, 0.3)' }); // blue
        tabCouleur.push({ couleur: 'rgba(255, 159, 64, 0.2)' }); // orangé
        tabCouleur.push({ couleur: 'rgba(44, 189, 12, 0.3)' }); // vert
        tabCouleur.push({ couleur: 'rgba(189, 23, 12, 0.3)' }); // rouge
        tabCouleur.push({ couleur: 'rgba(107, 22, 203, 0.3)' }); // violet


        // Now, create a table to hold data :
        var tableHold = [];
        var cptColor = 0;
        for (var j = 0; j < tabDataset.length; j++) {
          if (!(tabDataset[j].sigle == "---")) {
            tableHold.push(
              {
                label: tabDataset[j].sigle,
                backgroundColor: tabCouleur[cptColor].couleur,
                borderColor: tabCouleur[cptColor].couleur,
                data: tabDataset[j].somme,
                borderWidth: 2,
                fill: true
              });
            cptColor++;
          }
        }


        //
        //var ctx = $('#chartsecteur');
        Chart.helpers.merge(Chart.defaults.global.plugins.datalabels, {
          color: 'black',
          font: {
            weight: 'bold',
            size: 13
          }
        });
        var myChart = new Chart("chartrdv", {
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
                    display: true
                  },
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });
      }
    );
  }




  // Display CHART based on user's RAPPORT :
  getChartRapportforUniqueUser(): void {
    this.meswebservices.getChartRapportforUniqueUser(this.userContact).toPromise().then(
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
          tampon.libmois = this.retourMois(resultat[i].mois);
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
            tabLibMois.push(this.retourMois(resultat[i].mois));
          }

          //
          tabDonnee.push(tampon);
        }

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


        var tabCouleur = [];
        tabCouleur.push({ couleur: 'rgba(7, 116, 246, 0.3)' }); // blue
        tabCouleur.push({ couleur: 'rgba(255, 159, 64, 0.2)' }); // orangé
        tabCouleur.push({ couleur: 'rgba(44, 189, 12, 0.3)' }); // vert
        tabCouleur.push({ couleur: 'rgba(189, 23, 12, 0.3)' }); // rouge
        tabCouleur.push({ couleur: 'rgba(107, 22, 203, 0.3)' }); // violet

        // Now, create a table to hold data :
        var tableHold = [];
        var cptColor = 0;
        for (var j = 0; j < tabDataset.length; j++) {
          if (!(tabDataset[j].sigle == "---")) {
            tableHold.push(
              {
                label: tabDataset[j].sigle,
                backgroundColor: tabCouleur[cptColor].couleur,
                borderColor: tabCouleur[cptColor].couleur,
                data: tabDataset[j].somme,
                borderWidth: 2,
                fill: true
              });
            cptColor++;
          }
        }


        //
        //var ctx = $('#chartsecteur');
        Chart.helpers.merge(Chart.defaults.global.plugins.datalabels, {
          color: 'black',
          font: {
            weight: 'bold',
            size: 13
          }
        });
        var myChart = new Chart("chartrapport", {
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
                    display: true
                  },
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });
      }
    );
  }




  // Display CHART based on user's DEVIS :
  getChartDevisforUniqueUser(): void {
    this.meswebservices.getChartDevisforUniqueUser(this.userContact).toPromise().then(
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
          tampon.libmois = this.retourMois(resultat[i].mois);
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
            tabLibMois.push(this.retourMois(resultat[i].mois));
          }

          //
          tabDonnee.push(tampon);
        }

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


        var tabCouleur = [];
        tabCouleur.push({ couleur: 'rgba(7, 116, 246, 0.3)' }); // blue
        tabCouleur.push({ couleur: 'rgba(255, 159, 64, 0.2)' }); // orangé
        tabCouleur.push({ couleur: 'rgba(44, 189, 12, 0.3)' }); // vert
        tabCouleur.push({ couleur: 'rgba(189, 23, 12, 0.3)' }); // rouge
        tabCouleur.push({ couleur: 'rgba(107, 22, 203, 0.3)' }); // violet


        // Now, create a table to hold data :
        var tableHold = [];
        var cptColor = 0;
        for (var j = 0; j < tabDataset.length; j++) {
          if (!(tabDataset[j].sigle == "---")) {
            tableHold.push(
              {
                label: tabDataset[j].sigle,
                backgroundColor: tabCouleur[cptColor].couleur,
                borderColor: tabCouleur[cptColor].couleur,
                data: tabDataset[j].somme,
                borderWidth: 2,
                fill: true
              });
            cptColor++;
          }
        }


        //
        //var ctx = $('#chartsecteur');
        Chart.helpers.merge(Chart.defaults.global.plugins.datalabels, {
          color: 'black',
          font: {
            weight: 'bold',
            size: 13
          }
        });
        var myChart = new Chart("chartdevis", {
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
                    display: true
                  },
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });
      }
    );
  }


  // Display CHART based on user's RDV & PERFORMANCE :
  getObjectifMonthlyforUser(): void {
    this.meswebservices.getObjectifMonthlyforUser(this.userContact).toPromise().then(
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
          tampon.libmois = this.retourMois(resultat[i].mois);
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
            tabLibMois.push(this.retourMois(resultat[i].mois));
          }

          //
          tabDonnee.push(tampon);
        }

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

        var tabCouleur = [];
        tabCouleur.push({ couleur: 'rgba(7, 116, 246, 0.5)' }); // blue
        tabCouleur.push({ couleur: 'rgba(255, 159, 64, 0.5)' }); // orangé
        tabCouleur.push({ couleur: 'rgba(44, 189, 12, 0.3)' }); // vert
        tabCouleur.push({ couleur: 'rgba(189, 23, 12, 0.3)' }); // rouge
        tabCouleur.push({ couleur: 'rgba(107, 22, 203, 0.3)' }); // violet


        // Now, create a table to hold data :
        var tableHold = [];
        var cptColor = 0;
        for (var j = 0; j < tabDataset.length; j++) {
          if (!(tabDataset[j].sigle == "---")) {
            tableHold.push(
              {
                label: tabDataset[j].sigle,
                backgroundColor: tabCouleur[cptColor].couleur,
                borderColor: tabCouleur[cptColor].couleur,
                data: tabDataset[j].somme,
                borderWidth: 2,
                fill: true
              });
            cptColor++;
          }
        }


        //
        //var ctx = $('#chartsecteur');
        Chart.helpers.merge(Chart.defaults.global.plugins.datalabels, {
          color: 'black',
          font: {
            weight: 'bold',
            size: 13
          }
        });
        var myChart = new Chart("chartrdvperformance", {
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
                    display: true
                  },
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });
      }
    );
  }

}