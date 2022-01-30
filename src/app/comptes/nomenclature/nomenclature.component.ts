import { Component, OnInit } from '@angular/core';
import { Nomenclature } from 'src/app/mesbeans/nomenclature';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

declare const $: any;

@Component({
  selector: 'app-nomenclature',
  templateUrl: './nomenclature.component.html',
  styleUrls: ['./nomenclature.component.css']
})
export class NomenclatureComponent implements OnInit {

  // A t t r i b u t e s  :
  listeNomenclature: Nomenclature[];
  getNomenclature: boolean = false;
  id = "0";
  libelle = "";
  alreadyInit = false;
  idmot = 0;


  constructor(private meswebservices: MeswebservService) { }

  ngOnInit(): void {
    this.getAllNomenclatures();
  }


  afficherDonnee(idnom: string, libelle: string) {
    this.id = idnom;
    this.libelle = libelle;
    $('#myModal').modal();
  }

  ouvrirzonegestion(): void {
    // Open modal :
    this.libelle = "";
    this.id = "0";
    $('#myModal').modal();
  }

  /* Get All Activities */
  getAllNomenclatures(): void {
    this.meswebservices.getAllNomenclatures().toPromise()
      .then(
        resultat => {
          // Succes
          if (resultat.length > 0) {
            this.listeNomenclature = resultat;
          }

          // Get it :
          this.getNomenclature = true;

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

    this.meswebservices.enregistrerNomenclature(this.libelle, this.id).toPromise().then(
      resultat => {
        if (resultat.element == "ok") {
          this.getAllNomenclatures();
        }
      }
    )
  }


}
