import { Component, OnInit } from '@angular/core';
import { HistoRest } from 'src/app/mesbeans/historest';
import { RdvInfoRest } from 'src/app/mesbeans/rdvinforest';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

declare const $: any;

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {

  // A t t r i b u t e s   :
  listeHitoToday : HistoRest[];
  listeHistoMois : HistoRest[];
  listeRdvDuMois : RdvInfoRest[];
  setHistoToday = false;
  setHistoMois = false;
  setRdvCurrentMois = false;
  initAlreadyToday = false;
  downloadFile = false;


  constructor(private meswebservices: MeswebservService) { }

  ngOnInit(): void {
    this.gethistotoday();
    this.gethistomois();
    this.getRdvCurrentMonth();
  }


  // Current DAY :
  gethistotoday(): void {
    this.meswebservices.gethistotoday().toPromise()
      .then(
        resultat => {
          if (resultat.length > 0) {
            this.listeHitoToday = resultat;
          }

          //
          //this.setHistoToday = true;
          this.initTodayTable();
        },
        (error) => {
            this.initTodayTable();
        }
      )
  }


  // Current Month :
  gethistomois(): void {
    this.meswebservices.gethistomois().toPromise()
      .then(
        resultat => {
          if (resultat.length > 0) {
            this.listeHistoMois = resultat;
          }

          //
          this.setHistoMois = true;
          this.initTodayTable();
        },
        (error) => {
          this.setHistoMois = true;
          this.initTodayTable();
        }
      )
  }


  // RDV created for Current Month :
  getRdvCurrentMonth(): void {
    this.meswebservices.getMonthRdvCreated().toPromise()
      .then(
        resultat => {
          if (resultat.length > 0) {
            this.listeRdvDuMois = resultat;
          }

          //
          this.setRdvCurrentMois = true;
          this.initTodayTable();
        },
        (error) => {
          this.setRdvCurrentMois = true;
          this.initTodayTable();
        }
      )
  }


  initTodayTable(){
    if (!this.initAlreadyToday) {
      
      this.setHistoToday = true;
      this.initAlreadyToday = true;

      setTimeout(function () {
        $('.table-hover').DataTable({
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
          "order": [[ 3, "desc" ]]
        });
      },
        500);
    }
  }




  // Link to download file :
  downloadfiche(idrdv: number): void {

    this.downloadFile = false;
    this.meswebservices.getFicheVisite(idrdv.toString()).toPromise().then(
      resultat => {
        //
        this.downloadFile = true;
        let file = new Blob([resultat], { type: 'application/octet-stream' });
        let fileUrl = window.URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = fileUrl;
        var filename = "fichevisite_" + idrdv.toString() + ".pdf";
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
      },
      (error) => {
        this.downloadFile = true;
      }
    );
  }


}
