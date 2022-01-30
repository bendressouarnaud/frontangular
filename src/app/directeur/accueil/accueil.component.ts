import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { DonneTampon } from 'src/app/mesbeans/donnetampon';
import { ReponseDonCom } from 'src/app/mesbeans/reponsedoncom';
import { StatGenLib } from 'src/app/mesbeans/statgenlib';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';
import ChartDataLabels from 'node_modules/chartjs-plugin-datalabels';

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

  // init :
  this.reponseReport.commentaires = 0;
  this.reponseReport.commerciaux = 0;
  this.reponseReport.rapports = 0;
  this.reponseReport.rdv = 0;

  this.getstatmanager();

  //
  this.getGraphe();
  this.getStatistiqueSuperviseur();
  this.getStatistiqueInspecteur();
  this.getStatistiqueResponsable();
}


// Get Data 
getstatmanager(): void{
  this.meswebservices.getstatmanager().toPromise().then(
    resultat => {
      this.reponseReport.commentaires = resultat.commentaires;
      this.reponseReport.commerciaux = resultat.commerciaux;
      this.reponseReport.rapports = resultat.rapports;
      this.reponseReport.rdv = resultat.rdv;
    }
  );
}



// Get RDV graphe 
getStatistiqueResponsable(): void{
  this.meswebservices.getRdvStatsforUserBasedonProfil(7).toPromise().then(
    resultat => {

        var tabDonnee = [];
        var tabAnnee = [];
        var tabMois = [];
        var tabLibMois = [];
        var tabIdpro = [];
        var tabCode = [];

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
        tabColueur.push("#080808"); // noir

        //
        for(var i=0; i<resultat.length; i++){            

          var tampon : StatGenLib = new StatGenLib();

          // Now fill :
          tampon.idpro = resultat[i].idpro;
          tampon.mois = resultat[i].mois;
          tampon.libmois = this.retourMois(resultat[i].mois);
          tampon.code = resultat[i].code;
          tampon.total = resultat[i].total;

          //
          if(tabMois.indexOf(resultat[i].mois) == -1){
            tabMois.push(resultat[i].mois);
            tabLibMois.push(this.retourMois(resultat[i].mois));
          }

          if(tabIdpro.indexOf(resultat[i].idpro) == -1){
            tabIdpro.push(resultat[i].idpro);
            tabCode.push(resultat[i].code);
          }

          //
          tabDonnee.push(tampon);
        }                    

        // Organize Ressources & Depot:
        var tabDataset = [];				
        // Organize DTA per YEAR
        for(var j=0; j < tabIdpro.length ; j++){  // tabSigle
          var tampons : DonneTampon = new DonneTampon();              
          var mTableau = [];
          
          for(var l=0; l < tabMois.length ; l++){  // tabAnnee
            for(var k=0; k < tabDonnee.length ; k++){

              if((tabIdpro[j]==tabDonnee[k].idpro) && (tabMois[l]==tabDonnee[k].mois)){								
                tampons.sigle = tabCode[j];    
                mTableau.push(tabDonnee[k].total);
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
        for(var j=0; j < tabDataset.length ; j++){
          tableHold.push(
          {
            label : tabDataset[j].sigle,
            backgroundColor: tabColueur[j],
            data: tabDataset[j].somme,
            borderColor: tabColueur[j],
            fill: false       
          });
        }

        //
        //var ctx = $('#myChart');
        var myChart = new Chart("chartResponsable", {
          type: 'line',
          data: {
            labels: tabLibMois,
            datasets: tableHold
          },
          plugins:[ChartDataLabels],
          options: {
              scales: {
                xAxes: [{
                  display: true,
                  scaleLabel: {
                    display: false,
                    labelString: 'Années'
                  },
                  gridLines: {
                    display:false
                  }
                }],
                yAxes:[
                  {
                    ticks:{
                      beginAtZero: true
                    },
                    gridLines: {
                      display:true
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
getStatistiqueInspecteur(): void{
  this.meswebservices.getRdvStatsforUserBasedonProfil(5).toPromise().then(
    resultat => {

        var tabDonnee = [];
        var tabAnnee = [];
        var tabMois = [];
        var tabLibMois = [];
        var tabIdpro = [];
        var tabCode = [];

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
        tabColueur.push("#080808"); // noir

        //
        for(var i=0; i<resultat.length; i++){            

          var tampon : StatGenLib = new StatGenLib();

          // Now fill :
          tampon.idpro = resultat[i].idpro;
          tampon.mois = resultat[i].mois;
          tampon.libmois = this.retourMois(resultat[i].mois);
          tampon.code = resultat[i].code;
          tampon.total = resultat[i].total;

          //
          if(tabMois.indexOf(resultat[i].mois) == -1){
            tabMois.push(resultat[i].mois);
            tabLibMois.push(this.retourMois(resultat[i].mois));
          }

          if(tabIdpro.indexOf(resultat[i].idpro) == -1){
            tabIdpro.push(resultat[i].idpro);
            tabCode.push(resultat[i].code);
          }

          //
          tabDonnee.push(tampon);
        }                    

        // Organize Ressources & Depot:
        var tabDataset = [];				
        // Organize DTA per YEAR
        for(var j=0; j < tabIdpro.length ; j++){  // tabSigle
          var tampons : DonneTampon = new DonneTampon();              
          var mTableau = [];
          
          for(var l=0; l < tabMois.length ; l++){  // tabAnnee
            for(var k=0; k < tabDonnee.length ; k++){

              if((tabIdpro[j]==tabDonnee[k].idpro) && (tabMois[l]==tabDonnee[k].mois)){								
                tampons.sigle = tabCode[j];    
                mTableau.push(tabDonnee[k].total);
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
        for(var j=0; j < tabDataset.length ; j++){
          tableHold.push(
          {
            label : tabDataset[j].sigle,
            backgroundColor: tabColueur[j],
            data: tabDataset[j].somme,
            borderColor: tabColueur[j],
            fill: false       
          });
        }

        //
        //var ctx = $('#myChart');
        var myChart = new Chart("chartInspecteur", {
          type: 'line',
          data: {
            labels: tabLibMois,
            datasets: tableHold
          },
          plugins:[ChartDataLabels],
          options: {
              scales: {
                xAxes: [{
                  display: true,
                  scaleLabel: {
                    display: false,
                    labelString: 'Années'
                  },
                  gridLines: {
                    display:false
                  }
                }],
                yAxes:[
                  {
                    ticks:{
                      beginAtZero: true
                    },
                    gridLines: {
                      display:true
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






// Get RDV graphe SUPERVISEUR
getStatistiqueSuperviseur(): void{
  this.meswebservices.getRdvStatsforUserBasedonProfil(3).toPromise().then(
    resultat => {

        var tabDonnee = [];
        var tabAnnee = [];
        var tabMois = [];
        var tabLibMois = [];
        var tabIdpro = [];
        var tabCode = [];

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
        tabColueur.push("#080808"); // noir

        //
        for(var i=0; i<resultat.length; i++){            

          var tampon : StatGenLib = new StatGenLib();

          // Now fill :
          tampon.idpro = resultat[i].idpro;
          tampon.mois = resultat[i].mois;
          tampon.libmois = this.retourMois(resultat[i].mois);
          tampon.code = resultat[i].code;
          tampon.total = resultat[i].total;

          //
          if(tabMois.indexOf(resultat[i].mois) == -1){
            tabMois.push(resultat[i].mois);
            tabLibMois.push(this.retourMois(resultat[i].mois));
          }

          if(tabIdpro.indexOf(resultat[i].idpro) == -1){
            tabIdpro.push(resultat[i].idpro);
            tabCode.push(resultat[i].code);
          }

          //
          tabDonnee.push(tampon);
        }                    

        // Organize Ressources & Depot:
        var tabDataset = [];				
        // Organize DTA per YEAR
        for(var j=0; j < tabIdpro.length ; j++){  // tabSigle
          var tampons : DonneTampon = new DonneTampon();              
          var mTableau = [];
          
          for(var l=0; l < tabMois.length ; l++){  // tabAnnee
            for(var k=0; k < tabDonnee.length ; k++){

              if((tabIdpro[j]==tabDonnee[k].idpro) && (tabMois[l]==tabDonnee[k].mois)){								
                tampons.sigle = tabCode[j];    
                mTableau.push(tabDonnee[k].total);
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
        for(var j=0; j < tabDataset.length ; j++){
          tableHold.push(
          {
            label : tabDataset[j].sigle,
            backgroundColor: tabColueur[j],
            data: tabDataset[j].somme,
            borderColor: tabColueur[j],
            fill: false       
          });
        }

        //
        //var ctx = $('#myChart');
        var myChart = new Chart("chartSuperviseur", {
          type: 'line',
          data: {
            labels: tabLibMois,
            datasets: tableHold
          },
          plugins:[ChartDataLabels],
          options: {
              scales: {
                xAxes: [{
                  display: true,
                  scaleLabel: {
                    display: false,
                    labelString: 'Années'
                  },
                  gridLines: {
                    display:false
                  }
                }],
                yAxes:[
                  {
                    ticks:{
                      beginAtZero: true
                    },
                    gridLines: {
                      display:true
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
getGraphe(): void{
  this.meswebservices.generateGrapheManager().toPromise().then(
    resultat => {

      //alert("Taille resultat : "+resultat.length);

      //if(resultat.length > 0){

        var tabDonnee = [];
        var tabAnnee = [];
        var tabMois = [];
        var tabLibMois = [];
        var tabIdpro = [];
        var tabCode = [];

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
        tabColueur.push("#080808"); // noir

        //
        for(var i=0; i<resultat.length; i++){            

          var tampon : StatGenLib = new StatGenLib();

          // Now fill :
          tampon.idpro = resultat[i].idpro;
          tampon.mois = resultat[i].mois;
          tampon.libmois = this.retourMois(resultat[i].mois);
          tampon.code = resultat[i].code;
          tampon.total = resultat[i].total;

          //
          if(tabMois.indexOf(resultat[i].mois) == -1){
            tabMois.push(resultat[i].mois);
            tabLibMois.push(this.retourMois(resultat[i].mois));
          }

          if(tabIdpro.indexOf(resultat[i].idpro) == -1){
            tabIdpro.push(resultat[i].idpro);
            tabCode.push(resultat[i].code);
          }

          //
          tabDonnee.push(tampon);
        }                    

        // Organize Ressources & Depot:
        var tabDataset = [];				
        // Organize DTA per YEAR
        for(var j=0; j < tabIdpro.length ; j++){  // tabSigle
          var tampons : DonneTampon = new DonneTampon();              
          var mTableau = [];
          
          for(var l=0; l < tabMois.length ; l++){  // tabAnnee
            for(var k=0; k < tabDonnee.length ; k++){

              if((tabIdpro[j]==tabDonnee[k].idpro) && (tabMois[l]==tabDonnee[k].mois)){								
                tampons.sigle = tabCode[j];    
                mTableau.push(tabDonnee[k].total);
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
        for(var j=0; j < tabDataset.length ; j++){
          tableHold.push(
          {
            label : tabDataset[j].sigle,
            backgroundColor: tabColueur[j],
            data: tabDataset[j].somme,
            borderColor: tabColueur[j],
            fill: false       
          });
        }

        //
        //var ctx = $('#myChart');
        var myChart = new Chart("chartRDV", {
          type: 'line',
          data: {
            labels: tabLibMois,
            datasets: tableHold
          },
          plugins:[ChartDataLabels],
          options: {
              scales: {
                xAxes: [{
                  display: true,
                  scaleLabel: {
                    display: false,
                    labelString: 'Années'
                  },
                  gridLines: {
                    display:false
                  }
                }],
                yAxes:[
                  {
                    ticks:{
                      beginAtZero: true
                    },
                    gridLines: {
                      display:true
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


}
