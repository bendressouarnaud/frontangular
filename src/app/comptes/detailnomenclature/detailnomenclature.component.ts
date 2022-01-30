import { Component, OnInit } from '@angular/core';
import { DetailNomenclature } from 'src/app/mesbeans/detailhistonomenclature';
import { Detailtable } from 'src/app/mesbeans/detailnomenclature';
import { Nomenclature } from 'src/app/mesbeans/nomenclature';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

declare const $: any;

@Component({
  selector: 'app-detailnomenclature',
  templateUrl: './detailnomenclature.component.html',
  styleUrls: ['./detailnomenclature.component.css']
})
export class DetailnomenclatureComponent implements OnInit {

  // A t t r i b u t e s  :
  listeDetail: DetailNomenclature[];
  listeNomenclature: Nomenclature[];
  getDetail: boolean = false;
  id = "0";
  libelle = "";
  alreadyInit = false;
  idmot = 0;
  detailtable = new Detailtable();


  // M e t h o d s :
  constructor(private meswebservices: MeswebservService) { }

  ngOnInit(): void {
    this.getAllNomenclatures();
    this.getInformation();
  }

  afficherDonnee(idnmd: string, detail: string, idnom: string) {
    this.detailtable.idnmd = parseInt(idnmd);
    this.detailtable.idnom = parseInt(idnom);
    this.detailtable.libelle = detail;
    $('#myModal').modal();
  }

  ouvrirzonegestion(): void {
    // Open modal :
    this.detailtable.idnmd = 0;
    this.detailtable.idnom = 1;
    this.detailtable.libelle = "";
    $('#myModal').modal();
  }

  //
  getAllNomenclatures(): void {
    this.meswebservices.getAllNomenclatures().toPromise()
      .then(
        resultat => {
          // Succes
          if (resultat.length > 0) {
            this.listeNomenclature = resultat;
          }
        }
      )
  }

  /* Get All Activities */
  getInformation(): void {
    this.meswebservices.getAllHistoriqueDetailTable().toPromise()
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

    this.meswebservices.enregistrerDetailNomenclature( this.detailtable ).toPromise().then(
      resultat => {
        if (resultat.element == "ok") {
          this.getInformation();
        }
      }
    )
  }

}
