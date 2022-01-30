import { Component, OnInit } from '@angular/core';
import { Ecue } from 'src/app/mesbeans/ecue';
import { Reponse } from 'src/app/mesbeans/reponse';
import { Uniteenseigne } from 'src/app/mesbeans/uniteenseigne';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

declare const $: any;

@Component({
  selector: 'app-ecue',
  templateUrl: './ecue.component.html',
  styleUrls: ['./ecue.component.css']
})
export class EcueComponent implements OnInit {

  // Attributes :
  listeUe: Uniteenseigne[];
  liste : Reponse[];
  getListe = false;
  alreadyInit = false;
  ecue : Ecue = new Ecue();


  constructor(private meswebservices: MeswebservService) { }

  ngOnInit(): void {
    this.getAllData();
    this.getAllUe();
  }


  ouvrirzonegestion(): void {
    // Open modal :
    $('#myModal').modal();
  }


  /* Get All Activities */
  getAllData(): void {
    this.meswebservices.getAllEcue().toPromise()
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
    this.ecue.idecu = 0;
    this.meswebservices.enregistrerEcue(this.ecue).toPromise().then(
      resultat => {
        if (resultat.element == "ok") {
          this.getAllData();
        }
      }
    )
  }


  getAllUe(): void {
    this.meswebservices.getAllUe().toPromise()
      .then(
        resultat => {
          // Succes
          if (resultat.length > 0) {
            this.listeUe = resultat;
          }
        }
      )
  }

}
