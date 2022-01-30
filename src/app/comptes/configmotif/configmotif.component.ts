import { Component, OnInit } from '@angular/core';
import { Motif } from 'src/app/mesbeans/motif';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

declare const $: any;

@Component({
  selector: 'app-configmotif',
  templateUrl: './configmotif.component.html',
  styleUrls: ['./configmotif.component.css']
})
export class ConfigmotifComponent implements OnInit {

  // A t t r i b u t e s  :
  listeMotif: Motif[];
  getMotif: boolean = false;
  id = "0";
  libelle = "";
  alreadyInit = false;
  idmot = 0;


  // M e t h o d s :
  constructor(private meswebservices: MeswebservService) { }

  ngOnInit(): void {
    this.getAllMotifs();
  }

  affichermotif(idmot : string, libelle : string){
    this.id = idmot;
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
  getAllMotifs(): void {
    this.meswebservices.getAllMotifs().toPromise()
      .then(
        resultat => {
          // Succes
          if (resultat.length > 0) {
            this.listeMotif = resultat;
          }

          // Get it :
          this.getMotif = true;

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

    this.meswebservices.enregistrerMotif(this.libelle, this.id).toPromise().then(
      resultat => {
        if (resultat.element == "ok") {
          this.getAllMotifs();
        }
      }
    )
  }

}
