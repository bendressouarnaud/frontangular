import { Component, OnInit } from '@angular/core';
import { Rapport } from 'src/app/mesbeans/rapport';
import { ReponseRdv } from 'src/app/mesbeans/reponserdv';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

declare const $: any;

@Component({
  selector: 'app-gestionrapport',
  templateUrl: './gestionrapport.component.html',
  styleUrls: ['./gestionrapport.component.css']
})
export class GestionrapportComponent implements OnInit {

  listeRapport: ReponseRdv[];
  listeRapportPerso: Rapport[];
  getListeRapport = false;
  getRapportPerso = false;
  initAlready = false;
  rapportId: Number = 0;
  saisiecommentaire: String = "";

  constructor(private meswebservices: MeswebservService) { }

  ngOnInit(): void {

    //
    this.getRapportlist();
    this.getRapportByCommercial();

  }


  ouvrirzonecom(id: Number): void {
    // Open modal :
    this.rapportId = id;
    $('#myModal').modal();
  }



  /* get RAPPORT list :*/
  getRapportlist(): void {
    this.meswebservices.getrapportlistesuper().toPromise()
      .then(
        resultat => {
          if (resultat.length > 0) {
            this.listeRapport = resultat;
          }

          //
          this.getListeRapport = true;
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
            this.getRapportlist();
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

          
        },
        (error) => {
          // 
          this.getRapportPerso = true;
        }
      )
  }



}
