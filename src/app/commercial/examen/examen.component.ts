import { Component, OnInit } from '@angular/core';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

declare const $: any;

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {

  // Attributes :
  coordonnee = "";
  mouvement = "";
  affichage = "";
  formData = new FormData();


  // Method :
  constructor(private meswebservices: MeswebservService) { }

  ngOnInit(): void {
  }

  // Auto :
  afficherExamen() {

    // clear :
    $('#modalExamen').modal();
  }


  onForetSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      if (this.formData.has("foret")) this.formData.delete("foret");
      this.formData.append("foret", file);
    }
    else {
      if (this.formData.has("foret")) {
        this.formData.delete("foret");
      }
    }
  }



  // Envoi du fichier :
  transmettre() {
    this.meswebservices.sendforet(this.formData).toPromise()
      .then(
        resultat => {
          if (resultat.code == "ok") {
            this.affichage = "Le Fichier a été chargé !";
          }
        },
        (error) => {
          alert("Impossible de d'enregistrer le RAPPORT !");
        }
      );
  }

  //
  soumettre() {
    this.meswebservices.deplacement(this.coordonnee, this.mouvement).toPromise()
      .then(
        resultat => {
          this.affichage = resultat.code.toString();
        },
        (error) => {
          alert("Erreur survenue !");
        }
      );
  }


}
