import { Component, OnInit } from '@angular/core';
import { Responsable } from 'src/app/mesbeans/responsable';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

declare const $: any;

@Component({
  selector: 'app-responsable',
  templateUrl: './responsable.component.html',
  styleUrls: ['./responsable.component.css']
})
export class ResponsableComponent implements OnInit {

  // Attributes :
  liste : Responsable[];
  getListe = false;
  alreadyInit = false;
  responsable : Responsable = new Responsable();

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
    this.meswebservices.getAllResponsables().toPromise()
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
    this.responsable.idres = 0;
    this.meswebservices.enregistrerRes(this.responsable).toPromise().then(
      resultat => {
        if (resultat.element == "ok") {
          this.getAllData();
        }
      }
    )
  }

}
