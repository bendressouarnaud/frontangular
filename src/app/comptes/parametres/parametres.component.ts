import { Component, OnInit } from '@angular/core';
import { ParamWeb } from 'src/app/mesbeans/paramweb';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

declare const $: any;

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.css']
})
export class ParametresComponent implements OnInit {

  // Attributes :
  listeParametres: ParamWeb[];
  getListePar = false;
  initTable = false;
  notifMail = "1";



  constructor(private meswebservices: MeswebservService) {}


  ngOnInit(): void {
    this.getparametresweb();
  }


  /* Get user */
  getparametresweb(): void {
    this.meswebservices.getparametresweb().toPromise()
      .then(
        resultat => {
          // Succes
          if (resultat.length > 0) {
            this.listeParametres = resultat;
            this.getListePar = true;

            //
            //alert("Statut : "+resultat[0].statut);
            this.notifMail = resultat[0].statut == "Activé" ? "1" : "0";

            if (!this.initTable) {
              //
              this.initTable = true;

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
            }
          }
        }
      )
  }


  ouvrirzonecom(): void {
    // Open modal :
    $('#myModalParametres').modal();
  }



  enregistrer(){
    // Display message :
    //this.information = "Patientez svp ...";

    this.meswebservices.managewebparameters(this.notifMail).toPromise()
        .then(
          resultat => {
            // Succes
            if (resultat.element == "ok") {
              location.reload();
            }
          },
          (error) => {
            location.reload();
          }
        )
  }

}
