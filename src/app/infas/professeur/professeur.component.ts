import { Component, OnInit } from '@angular/core';
import { Professeur } from 'src/app/mesbeans/professeur';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

declare const $: any;

@Component({
  selector: 'app-professeur',
  templateUrl: './professeur.component.html',
  styleUrls: ['./professeur.component.css']
})
export class ProfesseurComponent implements OnInit {

  // Attributes :
  liste : Professeur[];
  getListe = false;
  alreadyInit = false;
  professeur : Professeur = new Professeur();

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
    this.meswebservices.getAllProfesseurs().toPromise()
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
    this.professeur.idprof = 0;
    this.meswebservices.enregistrerProf(this.professeur).toPromise().then(
      resultat => {
        if (resultat.element == "ok") {
          this.getAllData();
        }
      }
    )
  }

}
