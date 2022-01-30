import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { DonneGraphe } from 'src/app/mesbeans/donnegraphe';
import { DonneTampon } from 'src/app/mesbeans/donnetampon';
import { ReponseDonCom } from 'src/app/mesbeans/reponsedoncom';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';
import ChartDataLabels from 'node_modules/chartjs-plugin-datalabels';
import { DataGrapheCours } from 'src/app/mesbeans/dataGrapheCours';

declare const $: any;

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  // A t t r i b u t e s 
  reponseReport : ReponseDonCom = new ReponseDonCom();



  // M e t h o d e s :
  constructor(private meswebservices : MeswebservService) { }

  ngOnInit(): void {

    //
    this.getRdvGraphe();
    this.getStatByTeamMember();

    // init :
    this.reponseReport.commentaires = 0;
    this.reponseReport.commerciaux = 0;
    this.reponseReport.rapports = 0;
    this.reponseReport.rdv = 0;

    this.getsuperviseurptbyid();
  }


  // Get Data 
  getsuperviseurptbyid(): void{
    this.meswebservices.getsuperviseurptbyid().toPromise().then(
      resultat => {
        this.reponseReport.commentaires = resultat.commentaires;
        this.reponseReport.commerciaux = resultat.commerciaux;
        this.reponseReport.rapports = resultat.rapports;
        this.reponseReport.rdv = resultat.rdv;
      }
    );
  }



  // Get RDV graphe 
  getRdvGraphe(): void{
    this.meswebservices.getrepgraphe().toPromise().then(
      resultat => {

        //alert("Taille resultat : "+resultat.length);

        //if(resultat.length > 0){

          var tabDonnee = [];
          var tabAnnee = [];
          var tabMois = [];
          var tabLibMois = [];

          //
          for(var i=0; i<resultat.length; i++){            

            var tampon : DonneGraphe = new DonneGraphe();

            // Now fill :
            tampon.annee = resultat[i].annee;
            tampon.mois = resultat[i].mois;
            tampon.libmois = this.retourMois(resultat[i].mois);
            tampon.tot = resultat[i].tot;

            //
            if(tabAnnee.indexOf(resultat[i].annee) == -1){
              tabAnnee.push(resultat[i].annee);
            }
            //
            if(tabMois.indexOf(resultat[i].mois) == -1){
              tabMois.push(resultat[i].mois);
              tabLibMois.push(this.retourMois(resultat[i].mois));
            }

            //
            tabDonnee.push(tampon);
          }

          
          // Fill the ARRAY with '0' :
			    var existe = false;
			    var setLibMois = "";
			    for(var k=0; k < tabAnnee.length ; k++){
				    for(var j=0; j < tabLibMois.length ; j++){

              existe = false;
              setLibMois = tabLibMois[j];

              for(var l=0; l < tabDonnee.length ; l++){
                if(tabLibMois[j] == tabDonnee[l].libMois){	
                  // Set it :
                  if(tabDonnee[l].annee == tabAnnee[k]){
                    existe = true;
                    break;
                  }
                }
              }

              // False ? Yes :
              if(!existe){
                // Set it : 
                //alert('OK');
                var tamponDonnee : DonneGraphe = new DonneGraphe();
                tamponDonnee.annee = tabAnnee[k];
                tamponDonnee.mois = tabMois[j];
                tamponDonnee.tot =  0;
                tamponDonnee.libmois =  setLibMois;
                tabDonnee.push(tamponDonnee);		
              }

            }
          }

          // Organize Ressources & Depot:
          var tabDataset = [];				
          // Organize DTA per YEAR
          for(var j=0; j < tabAnnee.length ; j++){  // tabSigle
            var tampons : DonneTampon = new DonneTampon();              
            var mTableau = [];
            
            for(var l=0; l < tabMois.length ; l++){  // tabAnnee
              for(var k=0; k < tabDonnee.length ; k++){

                if((tabAnnee[j]==tabDonnee[k].annee) && (tabMois[l]==tabDonnee[k].mois)){								
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
          for(var j=0; j < tabDataset.length ; j++){
            tableHold.push(
            {
              label : tabDataset[j].sigle,
              backgroundColor: tabColueur[cptColor],
              borderColor: tabColueur[cptColor],
              data: tabDataset[j].somme,
              borderWidth: 1
            });
            cptColor++;
          }

          //
          var ctx = $('#myChart');
          var myChart = new Chart("chartRDV", {
            type: 'bar',
            data: {
              labels: tabLibMois,
              datasets: tableHold
            },
            plugins:[ChartDataLabels],
            options: {
                scales: {
                  yAxes:[
                    {
                      ticks:{
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




  getStatByTeamMember(): void {
    this.meswebservices.getTeamRdvStatbyManager().toPromise().then(
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
        var myChart = new Chart("chartequipe", {
          type: 'line',
          data: {
            labels: tabLibMois,
            datasets: tableHold
          },
          /*plugins: [ChartDataLabels],*/
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



      }
    );
  }
  

}
