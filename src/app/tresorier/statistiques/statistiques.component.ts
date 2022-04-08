import { Component, OnInit } from '@angular/core';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';
import { Chart } from 'node_modules/chart.js';
import ChartDataLabels from 'node_modules/chartjs-plugin-datalabels';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {

  constructor(private meswebservices: MeswebservService) { }

  ngOnInit(): void {
    this.getStatsDevisPieChartForTresorier();
  }


  // Get Portfeuille for 'DEVIS CREE' :
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

}
