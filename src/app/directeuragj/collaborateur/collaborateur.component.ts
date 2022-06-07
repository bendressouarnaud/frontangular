import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/mesbeans/utilisateur';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

declare const $: any;

@Component({
  selector: 'app-collaborateur',
  templateUrl: './collaborateur.component.html',
  styleUrls: ['./collaborateur.component.css']
})
export class CollaborateurComponent implements OnInit {

  // A t t r i b u t e s   :
  listeCommerciaux: Utilisateur[];
  getListeCom = false;



  // M E T H O D S :
  constructor(private meswebservices: MeswebservService) { }

  ngOnInit(): void {
    this.getcollaborateurs();
  }



  getcollaborateurs(): void {
    this.meswebservices.getcollaborateurs().toPromise().then(
      resultat => {
        if (resultat.length > 0) {
          this.listeCommerciaux = resultat;    
        }

        //
        this.getListeCom = true;

        setTimeout(function () {

          if (!this.tableauCom) {
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
          }
          else {
            $('#datatables').DataTable();
          }

          this.tableauCom = true;
        }, 1000);

      }
    )
  }

}
