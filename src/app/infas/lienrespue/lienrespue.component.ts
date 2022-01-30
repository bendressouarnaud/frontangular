import { Component, OnInit } from '@angular/core';
import { Lienrespue } from 'src/app/mesbeans/lienrespue';
import { Reponse } from 'src/app/mesbeans/reponse';
import { Responsable } from 'src/app/mesbeans/responsable';
import { Uniteenseigne } from 'src/app/mesbeans/uniteenseigne';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

declare const $: any;


@Component({
  selector: 'app-lienrespue',
  templateUrl: './lienrespue.component.html',
  styleUrls: ['./lienrespue.component.css']
})
export class LienrespueComponent implements OnInit {

  // Attributes :
  listeUe: Uniteenseigne[];
  listeResponsable : Responsable[];
  liste : Reponse[];
  getListe = false;
  alreadyInit = false;
  lienrespue : Lienrespue = new Lienrespue();


  constructor(private meswebservices: MeswebservService) { }

  ngOnInit(): void {
    this.getAllData();
    this.getAllUe();
    this.getAllResponsable();
  }


  ouvrirzonegestion(): void {
    // Open modal :
    $('#myModal').modal();
  }


  /* Get All Activities */
  getAllData(): void {
    this.meswebservices.getAllLiens().toPromise()
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
    this.lienrespue.idlue = 0;
    this.meswebservices.enregistrerLienrespue(this.lienrespue).toPromise().then(
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


  getAllResponsable(): void {
    this.meswebservices.getAllResponsables().toPromise()
      .then(
        resultat => {
          // Succes
          if (resultat.length > 0) {
            this.listeResponsable = resultat;
          }
        }
      )
  }

}
