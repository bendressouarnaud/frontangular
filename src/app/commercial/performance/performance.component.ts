import { Component, OnInit } from '@angular/core';
import { Annee } from 'src/app/mesbeans/annee';
import { Mois } from 'src/app/mesbeans/mois';
import { Performance } from 'src/app/mesbeans/performance';
import { Utilisateur } from 'src/app/mesbeans/utilisateur';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';
import { Location } from '@angular/common';
import { PerfRest } from 'src/app/mesbeans/reponseperform';

declare const $: any;

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit {

  /* ATTRIBUTES  */
  listeCommerciaux: Utilisateur[];
  listePerformTeam: PerfRest[];
  listeMois: Mois[];
  listeAnne: Annee[];
  getListeCom = false;
  performance: Performance = new Performance();
  traitementEnCours = false;
  getListeteam = false;
  modifierPerformance = 0;
  listeMyPerformTeam: PerfRest[];
  getMyPerform = false;


  /* METHODS  */
  constructor(private meswebservices: MeswebservService, private location: Location) { }

  ngOnInit(): void {
    this.getMyperformance();
  }

  getMyperformance(): void {
    this.meswebservices.getMyperformance().toPromise().then(
      resultat => {
        if (resultat.length > 0) {
          this.listeMyPerformTeam = resultat;
        }
        this.initMyTable();
      },
      (error) => {
        this.initMyTable();
      }
    )
  }



  initMyTable() {
    if (!this.getMyPerform) {
      //
      this.getMyPerform = true;

      setTimeout(function () {
        $('#datatableMy').DataTable({
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
    }
  }

}
