import { Component, OnInit } from '@angular/core';
import { Rapport } from 'src/app/mesbeans/rapport';
import { ReponseRdv } from 'src/app/mesbeans/reponserdv';
import { RepRdvClient } from 'src/app/mesbeans/reprdvclient';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

declare const $: any;

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css']
})
export class RapportComponent implements OnInit {

  listeRapport: RepRdvClient[];
  listeRapportSuperv: RepRdvClient[];
  listeRapportInspec: RepRdvClient[];
  listeRapportPerso: Rapport[];
  getListeRapport = false;
  getRapportPerso = false;
  getRapportSuperv = false;
  getRapportInspec = false;
  initAlready = false;
  rapportId: Number = 0;
  saisiecommentaire: String = "";

  constructor(private meswebservices: MeswebservService) { }

  ngOnInit(): void {

    //
    this.getTraderReport();
    this.getSuperviseurReport();
    this.getInspecteurReport();
    this.getRapportByCommercial();

  }


  ouvrirzonecom(id: Number): void {
    // Open modal :
    this.rapportId = id;
    $('#myModal').modal();
  }



  /* get RAPPORT list :*/
  getTraderReport(): void {
    this.meswebservices.getTraderReportManager().toPromise()
      .then(
        resultat => {
          if (resultat.length > 0) {
            this.listeRapport = resultat;
          }

          //
          this.getListeRapport = true;
          this.initDatable();
        }
      )
  }


  getSuperviseurReport(): void {
    this.meswebservices.getSuperviseurReportManager().toPromise()
      .then(
        resultat => {
          if (resultat.length > 0) {
            this.listeRapportSuperv = resultat;
          }
          //
          this.getRapportSuperv = true;
          this.initDatable();
        }
      )
  }

  // Rapport INPECTEUR :
  getInspecteurReport(): void {
    this.meswebservices.getInspecteurReportManager().toPromise()
      .then(
        resultat => {
          if (resultat.length > 0) {
            this.listeRapportInspec = resultat;
          }
          //
          this.getRapportInspec = true;
          this.initDatable();
        }
      )
  }


  /* Enregistrer le commentaire */
  validercoment(): void {
    //alert("Commentaire : "+this.saisiecommentaire);
    this.meswebservices.soumissioncommentairerap(this.saisiecommentaire.toString(),
      this.rapportId).toPromise()
      .then(
        resultat => {

          if (resultat.element == "ok") {
            //window.location.href = "#/gestion/rapportcom";
            //this.getTraderReport();
            location.reload();
          }

        }
      )
  }



  /*  */
  getRapportByCommercial(): void {
    this.meswebservices.getRapportByCommercial().toPromise()
      .then(
        resultat => {
          if (resultat == null) { }
          else {
            // Succes
            if (resultat.length > 0) {
              this.listeRapportPerso = resultat;
            }
          }

          //
          this.getRapportPerso = true;
          this.initDatable();
        },
        (error) => {
          // 
          this.getRapportPerso = true;
        }
      )
  }


  initDatable() {
    if (!this.initAlready) {
      this.initAlready = true;
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
          }

        });
      },
        500);
    }
  }


}
