import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Classe } from 'src/app/mesbeans/classe';
import { Cours } from 'src/app/mesbeans/cours';
import { Ecue } from 'src/app/mesbeans/ecue';
import { Lienrespue } from 'src/app/mesbeans/lienrespue';
import { Professeur } from 'src/app/mesbeans/professeur';
import { Reponse } from 'src/app/mesbeans/reponse';
import { ReponseUser } from 'src/app/mesbeans/reponseuser';
import { Responsable } from 'src/app/mesbeans/responsable';
import { Uniteenseigne } from 'src/app/mesbeans/uniteenseigne';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';
import { ProfesseurComponent } from '../professeur/professeur.component';

declare const $: any;

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {

  // Attributes :
  listeUe: Uniteenseigne[];
  listeResponsable : Responsable[];
  liste : ReponseUser[];
  getListe = false;
  alreadyInit = false;
  lienrespue : Lienrespue = new Lienrespue();
  /****/
  listeProf : Professeur[];
  listeEcue : Ecue[];
  listeClasse : Classe[];
  cours : Cours = new Cours();
  basicDatepicker = "";
  getDate = new Date();


  // Methods :
  constructor(private meswebservices: MeswebservService) { }

  ngOnInit(): void {
    this.getAllProf();
    this.getAllEcueObject();
    this.getAllClasses();
    this.getAllData();
  }


  ouvrirzonegestion(): void {
    // Open modal :
    $('#myModal').modal();
  }

  // Get Professeurs :
  getAllProf(): void {
    this.meswebservices.getAllProfesseurs().toPromise()
      .then(
        resultat => {
          // Succes
          if (resultat.length > 0) {
            this.listeProf = resultat;
          }
        }
      )
  }

  // Get ECUE :
  getAllEcueObject(): void {
    this.meswebservices.getAllEcueObject().toPromise()
      .then(
        resultat => {
          // Succes
          if (resultat.length > 0) {
            this.listeEcue = resultat;
          }
        }
      )
  }

// Get CLASSE :
getAllClasses(): void {
  this.meswebservices.getAllClasses().toPromise()
    .then(
      resultat => {
        // Succes
        if (resultat.length > 0) {
          this.listeClasse = resultat;
        }
      }
    )
}



  /* Get All Activities */
  getAllData(): void {
    this.meswebservices.getAllCours().toPromise()
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
    
    // Process the date :         
    let momentVariable = moment(this.getDate, 'MM-DD-YYYY');
    let dates = momentVariable.format('YYYY-MM-DD');

    this.cours.idcou = 0;
    this.meswebservices.enregistrerCours(this.cours, dates).toPromise().then(
      resultat => {
        if (resultat.element == "ok") {
          // 
          this.getAllData();
        }
      }
    )

  }


  getAllUe(): void {
    this.meswebservices.getAllUe().toPromise()
      .then(
        resultat => {
          // Succes
          if (resultat.length > 0) {
            this.listeUe = resultat;
          }
        }
      )
  }


  getAllResponsable(): void {
    this.meswebservices.getAllResponsables().toPromise()
      .then(
        resultat => {
          // Succes
          if (resultat.length > 0) {
            this.listeResponsable = resultat;
          }
        }
      )
  }
}
