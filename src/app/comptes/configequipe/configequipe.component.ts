import { Component, OnInit } from '@angular/core';
import { Activite } from 'src/app/mesbeans/activite';
import { Detailequipe } from 'src/app/mesbeans/detailequipe';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

declare const $: any;

@Component({
  selector: 'app-configequipe',
  templateUrl: './configequipe.component.html',
  styleUrls: ['./configequipe.component.css']
})
export class ConfigequipeComponent implements OnInit {

  // A t t r i b u t e s  :
  listeDetail: Detailequipe[];
  getDetail: boolean = false;
  id = "";
  libelle = "";
  alreadyInit = false;


  // M e t h o d s :
  constructor(private meswebservices: MeswebservService) { }

  ngOnInit(): void {
    this.getAllDetails();
  }

  ouvrirzonegestion(): void {
    // Open modal :
    this.libelle = "";
    $('#myModal').modal();
  }

  /* Get All Activities */
  getAllDetails(): void {
    this.meswebservices.getAllDetailEquipe().toPromise()
      .then(
        resultat => {
          // Succes
          if (resultat.length > 0) {
            this.listeDetail = resultat;
          }

          // Get it :
          this.getDetail = true;

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
  enregistrer(): void {

    //alert("id : " + this.id + "   --  actif : " + this.actif + "   ---   activite : " + this.activite);

    this.meswebservices.enregistrerDet(this.libelle).toPromise().then(
      resultat => {
        if (resultat.element == "ok") {
          this.getAllDetails();
        }
      }
    )
  }

}
