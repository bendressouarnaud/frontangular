import { Component, OnInit } from '@angular/core';
import { Annee } from 'src/app/mesbeans/annee';
import { Mois } from 'src/app/mesbeans/mois';
import { Performance } from 'src/app/mesbeans/performance';
import { Utilisateur } from 'src/app/mesbeans/utilisateur';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';
import { Location } from '@angular/common';
import { PerfRest } from 'src/app/mesbeans/reponseperform';
import { PerfRestModif } from 'src/app/mesbeans/perfrestmodif';

declare const $: any;

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit {

  /* ATTRIBUTES  */
  listeCommerciaux: Utilisateur[];
  listePerformTeam: PerfRestModif[];
  listeMois: Mois[];
  listeAnne: Annee[];
  getListeCom = false;
  performance: Performance = new Performance();
  traitementEnCours = false;
  getListeteam = false;
  modifierPerformance = 0;
  listeMyPerformTeam: PerfRest[];
  getMyPerform = false;
  userId = 0;


  /* METHODS  */
  constructor(private meswebservices: MeswebservService, private location: Location) { }

  ngOnInit(): void {
    // init 
    this.performance.identifiant = "";

    this.getusersbyprofilandid();
    this.getPerformanceTeam();
    this.getMois();
    this.getAnnees();
    //
    this.performance.choix = 1;
    this.getMyperformance();

  }

  ouvrirzonegestion(): void {
    // Open modal :
    this.modifierPerformance = 0;
    $('#myModal').modal();
  }



  // GET my TEAM's people 
  getusersbyprofilandid(): void {
    this.meswebservices.getusersbyprofilandid("commercial").toPromise().then(
      resultat => {
        if (resultat.length > 0) {
          //alert("Taille : "+resultat.length)
          this.listeCommerciaux = resultat;
          this.performance.identifiant = this.listeCommerciaux[0].identifiant;
          this.userId = this.listeCommerciaux[0].iduser;
        }
        else {
          // Disable the button :
          $('#butenreg').hide();
          document.getElementById("infos").innerHTML = "Veuillez sélectionner au préalable un collaborateur ! ";
        }
      }
    )
  }




  // GET MONTHS 
  getMois(): void {
    this.meswebservices.getListeMois().toPromise().then(
      resultat => {
        if (resultat.length > 0) {
          this.listeMois = resultat;
          //
          this.performance.mois = this.listeMois[0].idm;
        }
      }
    )
  }


  // GET YEARS 
  getAnnees(): void {
    this.meswebservices.getListeAnnees().toPromise().then(
      resultat => {
        if (resultat.length > 0) {
          this.listeAnne = resultat;
          //
          this.performance.annee = this.listeAnne[0].idan
        }
      }
    )
  }


  // GET YEARS 
  getPerformanceTeam(): void {
    this.meswebservices.getperformanceteam().toPromise().then(
      resultat => {
        if (resultat.length > 0) {
          this.listePerformTeam = resultat;
        }
        this.initTable();
      },
      (error) => {
        this.initTable();
      }
    )
  }



  /* Enregistrer une performance : */
  enregistrerPerf() {

    // Set value for performance.identifiant : 
    this.performance.identifiant = this.userId.toString();    

    // Check Performance VALUE :
    if (this.checkPerformancevalue()) {

      if (this.modifierPerformance == 0) {
        document.getElementById("infos").innerHTML = "Veuillez patienter...";

        if (!this.traitementEnCours) {
          this.traitementEnCours = true;
          this.meswebservices.enregistrerPerf(this.performance).toPromise().then(
            resultat => {
              if (resultat.element == "ok") {
                // 
                $('#myModal').modal('hide');
                this.traitementEnCours = false;
                document.getElementById("infos").innerHTML = "";                
                this.getPerformanceTeam();
              }
            },
            (error) => {
              // reinit :
              this.traitementEnCours = false;
              document.getElementById("infos").innerHTML = "Impossible d'enregistrer les données !";
            }
          )
        }
      }
      else this.modifierPerf();
    }
    else  document.getElementById("infos").innerHTML = "La valeur de la performance est incorrect !";
  }


  initTable() {
    if (!this.getListeteam) {
      //
      this.getListeteam = true;

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
      }, 500);
    }
  }


  checkPerformancevalue(): boolean {
    if (this.performance.valeur.toString().match(/^[0-9]+$/)) return true;
    return false;
  }


  //
  affichePerformance(id: number): void {
    // Display, browse :
    for (var i = 0; i <= this.listePerformTeam.length; i++) {
      if (id == this.listePerformTeam[i].idper) {
        // Init the obet :
        this.performance.annee = this.listePerformTeam[i].annee;
        this.performance.choix = this.listePerformTeam[i].choix;
        this.performance.identifiant = this.listePerformTeam[i].identifiant;
        this.performance.mois = this.listePerformTeam[i].mois;
        this.performance.valeur = this.listePerformTeam[i].valeur;
        this.userId = this.listePerformTeam[i].idemp;
        // Display :
        this.modifierPerformance = id;
        $('#myModal').modal();
        break;
      }
    }

  }



  /* Enregistrer une performance : */
  modifierPerf() {
    document.getElementById("infos").innerHTML = "Veuillez patienter...";

    if (!this.traitementEnCours) {
      this.traitementEnCours = true;
      this.meswebservices.modifierPerf(this.performance, this.modifierPerformance).toPromise().then(
        resultat => {
          if (resultat.element == "ok") {
            // 
            $('#myModal').modal('hide');
            this.traitementEnCours = false;
            //location.reload();
            document.getElementById("infos").innerHTML = "";
            this.getPerformanceTeam();
          }
        },
        (error) => {
          // reinit :
          this.traitementEnCours = false;
          document.getElementById("infos").innerHTML = "Impossible d'enregistrer les données !";
        }
      )
    }
  }



  // GET YEARS 
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