import { Component, OnInit } from '@angular/core';
import { Uniteenseigne } from 'src/app/mesbeans/uniteenseigne';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

declare const $: any;

@Component({
  selector: 'app-unitenseigne',
  templateUrl: './unitenseigne.component.html',
  styleUrls: ['./unitenseigne.component.css']
})
export class UnitenseigneComponent implements OnInit {

  // Attributes :
  liste : Uniteenseigne[];
  getListe = false;
  alreadyInit = false;
  ue : Uniteenseigne = new Uniteenseigne();


  constructor(private meswebservices: MeswebservService) { }

  ngOnInit(): void {
    this.getAllData();
  }


  ouvrirzonegestion(): void {
    // Open modal :
    $('#myModal').modal();
  }


  /* Get All Activities */
  getAllData(): void {
    this.meswebservices.getAllUe().toPromise()
      .then(
        resultat => {
          // Succes
          if (resultat.length > 0) {
            this.liste = resultat;
          }

          // Get it :
          this.getListe = true;

          if (!this.alreadyInit) {
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
            }, 200);

            this.alreadyInit = true;
          }

        }
      )
  }


  // Save 
  enregistrerAct(): void {
    this.ue.idue = 0;
    this.meswebservices.enregistrerUe(this.ue).toPromise().then(
      resultat => {
        if (resultat.element == "ok") {
          this.getAllData();
        }
      }
    )
  }

}
