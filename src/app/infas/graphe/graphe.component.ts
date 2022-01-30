import { Component, OnInit } from '@angular/core';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';
import { Chart } from 'node_modules/chart.js';
import ChartDataLabels from 'node_modules/chartjs-plugin-datalabels';
import { DonneGraphe } from 'src/app/mesbeans/donnegraphe';
import { DonneTampon } from 'src/app/mesbeans/donnetampon';
import { GrapheCours } from 'src/app/mesbeans/graphecours';
import { DataGrapheCours } from 'src/app/mesbeans/dataGrapheCours';

declare const $: any;


@Component({
  selector: 'app-graphe',
  templateUrl: './graphe.component.html',
  styleUrls: ['./graphe.component.css']
})
export class GrapheComponent implements OnInit {

  constructor(private meswebservices: MeswebservService) { }

  ngOnInit(): void {
    this.getGraphe();
    this.getGrapheCours();
  }

  // Get RDV graphe 
  getGraphe(): void {
    this.meswebservices.getgraphecours().toPromise().then(
      resultat => {

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
          tampon.libmois = this.retourMois(resultat[i].mois);
          tampon.tot = resultat[i].tot;

          //
          if (tabAnnee.indexOf(resultat[i].annee) == -1) {
            tabAnnee.push(resultat[i].annee);
          }
          //
          if (tabMois.indexOf(resultat[i].mois) == -1) {
            tabMois.push(resultat[i].mois);
            tabLibMois.push(this.retourMois(resultat[i].mois));
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

        //alert("Taille tabDonnee : "+tabDonnee.length);



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





        // Now, create a table to hold data :
        var tableHold = [];
        for (var j = 0; j < tabDataset.length; j++) {
          tableHold.push(
            {
              label: tabDataset[j].sigle,
              backgroundColor: 'rgba(55, 111, 225, 0.5)',
              borderColor: 'rgba(4, 9, 20, 0.9)',
              data: tabDataset[j].somme,
              borderWidth: 1
            });
        }

        //alert("Taille tableHold : "+tableHold.length);


        //
        var ctx = $('#myChart');
        var myChart = new Chart("chartRDV", {
          type: 'bar',
          data: {
            labels: tabLibMois,
            datasets: tableHold
          },
          plugins: [ChartDataLabels],
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
  getGrapheCours(): void {
    this.meswebservices.grapheCoursmois().toPromise().then(
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


        // Fill the ARRAY with '0' :
        var existe = false;
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

        //alert("Taille tabDonnee : "+tabDonnee.length);



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


        var tabColueur = [];
        tabColueur.push("#8EC3F5"); // blue 
        tabColueur.push("#ED9C40"); // orange 
        tabColueur.push("#C6D30A"); // Jaune 
        tabColueur.push("#06A41E"); // vert 
        tabColueur.push("#8AD195"); // vert foncé 
        tabColueur.push("#F3928B"); // rouge
        tabColueur.push("#6FD2CF"); // bleu grisé
        tabColueur.push("#A9B2B1"); // gris
        tabColueur.push("#C6BC98"); // marron
        tabColueur.push("#D7A2D4"); // rose
        tabColueur.push("#BB8CF5"); // violet
        tabColueur.push("#080808");


        // Now, create a table to hold data :
        var tableHold = [];
        for (var j = 0; j < tabDataset.length; j++) {
          if (!(tabDataset[j].sigle == "---")) {
            tableHold.push(
              {
                label: tabDataset[j].sigle,
                backgroundColor: tabColueur[j],
                borderColor: 'rgba(4, 9, 20, 0.9)',
                data: tabDataset[j].somme,
                borderWidth: 1
              });
          }
        }

        //alert("Taille tableHold : "+tableHold.length);


        //
        var ctx = $('#volumehoraire');
        Chart.helpers.merge(Chart.defaults.global.plugins.datalabels, {
          color: 'black',
          font: {
            weight: 'bold',
            size: 13
          }
        });
        var myChart = new Chart("volumehoraire", {
          type: 'bar',
          data: {
            labels: tabLibMois,
            datasets: tableHold
          },
          plugins: [ChartDataLabels],
          options: {
            scales: {
              xAxes: [{
                stacked: true,
                gridLines: {
                  display: false
                },
                display: true
              }],
              yAxes: [
                {
                  stacked: true,
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



}
