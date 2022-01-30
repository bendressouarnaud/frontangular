import { Component, OnInit } from '@angular/core';
import { Activite } from 'src/app/mesbeans/activite';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

declare const $: any;

@Component({
  selector: 'app-configactivite',
  templateUrl: './configactivite.component.html',
  styleUrls: ['./configactivite.component.css']
})
export class ConfigactiviteComponent implements OnInit {

  // A t t r i b u t e s  :
  listeActivites: Activite[];
  getActivite: boolean = false;
  id = "";
  activite = "";
  actif = "1";
  alreadyInit = false;


  // M e t h o d s :
  constructor(private meswebservices: MeswebservService) { }

  ngOnInit(): void {
    this.getAllActivities();
  }

  ouvrirzonegestion(): void {
    // Open modal :
    $('#myModal').modal();
  }

  /* Get All Activities */
  getAllActivities(): void {
    this.meswebservices.getAllActivities().toPromise()
      .then(
        resultat => {
          // Succes
          if (resultat.length > 0) {
            this.listeActivites = resultat;
          }

          // Get it :
          this.getActivite = true;

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
            }, 1000);

            this.alreadyInit = true;
          }

        }
      )
  }

  // Save 
  enregistrerAct(): void {

    //alert("id : " + this.id + "   --  actif : " + this.actif + "   ---   activite : " + this.activite);

    this.meswebservices.enregistrerAct(this.activite, this.actif).toPromise().then(
      resultat => {
        if (resultat.element == "ok") {
          this.getAllActivities();
        }
      }
    )
  }

}
