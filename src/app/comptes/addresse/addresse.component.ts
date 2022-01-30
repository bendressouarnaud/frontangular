import { Component, OnInit } from '@angular/core';
import { MacRest } from 'src/app/mesbeans/macrest';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

declare const $: any;

@Component({
  selector: 'app-addresse',
  templateUrl: './addresse.component.html',
  styleUrls: ['./addresse.component.css']
})
export class AddresseComponent implements OnInit {

  // A t t r i b u t e s   :
  listeMac: MacRest[];
  setMac = false;


  // M e t h o d s :
  constructor(private meswebservices: MeswebservService) { }


  ngOnInit(): void {
    this.getMacAddresses();
  }


  // 
  getMacAddresses(): void {
    this.meswebservices.getMacAddresses().toPromise()
      .then(
        resultat => {
          if (resultat.length > 0) {
            this.listeMac = resultat;
          }

          //
          this.setMac = true;
          this.initTable();
        },
        (error) => {
          this.setMac = true;
          this.initTable();
        }
      )
  }


  initTable() {

    setTimeout(function () {
      $('.table-hover').DataTable({
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
    },
      500);
  }

}
