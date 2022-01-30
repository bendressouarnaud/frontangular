import { Component, OnInit } from '@angular/core';
import { Classe } from 'src/app/mesbeans/classe';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

declare const $: any;

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css']
})
export class ClasseComponent implements OnInit {

  // Attributes :
  liste : Classe[];
  getListe = false;
  alreadyInit = false;
  classe : Classe = new Classe();


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
    this.meswebservices.getAllClasses().toPromise()
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
    this.classe.idcl = 0;
    this.meswebservices.enregistrerCl(this.classe).toPromise().then(
      resultat => {
        if (resultat.element == "ok") {
          this.getAllData();
        }
      }
    )
  }



}
