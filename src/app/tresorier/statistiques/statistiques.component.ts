import { Component, OnInit } from '@angular/core';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';
import { Chart } from 'node_modules/chart.js';
import ChartDataLabels from 'node_modules/chartjs-plugin-datalabels';
import { DonneTampon } from 'src/app/mesbeans/donnetampon';
import { DataGrapheCours } from 'src/app/mesbeans/dataGrapheCours';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {

  constructor(private meswebservices: MeswebservService) { }

  ngOnInit(): void {
    this.getStatsDevisPieChartForTresorier();
    this.getDevisCreatedforYearForTresorier();
    this.getStatsDevisPayePieChartForTresorier();
    this.getDevisPayeforYearForTresorier();
  }


  // Get Portfeuille for 'DEVIS CREE' :
  /*,                
                  formatter: (value, context) =>{
                    return context.chart.data.labels[context.dataIndex];
                  },*/
  getStatsDevisPieChartForTresorier(): void {
    this.meswebservices.getStatsDevisPieChartForTresorier().toPromise().then(
      resultat => {

        var tabLibelle = [];
        var tabTotal = [];

        //
        for (var i = 0; i < resultat.length; i++) {
          tabLibelle.push(resultat[i].libelle);
          tabTotal.push((resultat[i].total));
        }

        //let colorHex = ['#4B6281','#2C6FCA','#BBC0C8','#AABCD8'];
        let colorHex = ['#2C6FCA', '#a89907', '#90908c', '#AABCD8'];

        let myChart = new Chart("deviscrees", {
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
                }
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


  //
  retourMois(mois : Number) : string{
    var retour = "";

    if(mois==1) retour = "Jan";
		else if(mois==2) retour = "Fev";
		else if(mois==3) retour = "Mar";
		else if(mois==4) retour = "Avr";
		else if(mois==5) retour = "Mai";
		else if(mois==6) retour = "Jun";
		else if(mois==7) retour = "Jul";
		else if(mois==8) retour = "Aou";
		else if(mois==9) retour = "Sep";
		else if(mois==10) retour = "Oct";
		else if(mois==11) retour = "Nov";
		else if(mois==12) retour = "Dec";

    return retour;
  }


  getDevisCreatedforYearForTresorier(): void {
    this.meswebservices.getDevisCreatedforYearForTresorier().toPromise().then(
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


        //
        //var ctx = $('#chartsecteur');
        Chart.helpers.merge(Chart.defaults.global.plugins.datalabels, {
          color: 'black',
          font: {
            weight: 'bold',
            size: 13
          }
        });
        var myChart = new Chart("barchartdeviscree", {
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
  

  // Devis Payés :
  getStatsDevisPayePieChartForTresorier(): void {
    this.meswebservices.getStatsDevisPayePieChartForTresorier().toPromise().then(
      resultat => {

        var tabLibelle = [];
        var tabTotal = [];

        //
        for (var i = 0; i < resultat.length; i++) {
          tabLibelle.push(resultat[i].libelle);
          tabTotal.push((resultat[i].total));
        }

        //let colorHex = ['#4B6281','#2C6FCA','#BBC0C8','#AABCD8'];
        let colorHex = ['#2C6FCA', '#a89907', '#90908c', '#AABCD8'];

        let myChart = new Chart("devispayes", {
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
                }
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


  // Chart Devis Payés 
  getDevisPayeforYearForTresorier(): void {
    this.meswebservices.getDevisPayeforYearForTresorier().toPromise().then(
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


        //
        //var ctx = $('#chartsecteur');
        Chart.helpers.merge(Chart.defaults.global.plugins.datalabels, {
          color: 'black',
          font: {
            weight: 'bold',
            size: 13
          }
        });
        var myChart = new Chart("barchartdevispayes", {
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
