import { Component, OnInit } from '@angular/core';
import { Rapport } from 'src/app/mesbeans/rapport';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

declare const $: any;

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css']
})
export class RapportComponent implements OnInit {

  // Attributes :
  listeRapport: Rapport[];
  getListe = false;

  constructor(private meswebservices: MeswebservService) { }

  ngOnInit(): void {
    //
    this.getRapportByCommercial();
  }

  getRapportByCommercial(): void {
    this.meswebservices.getRapportByCommercial().toPromise()
      .then(
        resultat => {
          if (resultat == null) { }
          else {
            // Succes
            if (resultat.length > 0) {
              this.listeRapport = resultat;              
            }
          }

          //
          this.getListe = true;

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

        },
        (error) => {
          // 
          this.getListe = true;
        }
      )
  }

}
