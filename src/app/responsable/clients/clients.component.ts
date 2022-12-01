import { Component, OnInit } from '@angular/core';
import { Clientportefeuille } from 'src/app/mesbeans/clientportefeuille';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { animate, state, style, transition, trigger } from '@angular/animations';

declare const $: any;

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-90deg)' })),
      transition('rotated => default', animate('2000ms ease-out')),
      transition('default => rotated', animate('2000ms ease-in'))
    ])
  ]
})
export class ClientsComponent implements OnInit {

  // A t t r i b u t e s   :
  listeClients: Clientportefeuille[];
  listeReseauClients: Clientportefeuille[];
  getListeClient = false;
  getListeReseauClient = false;
  emailClient = "";
  information = "";
  idcli = "";
  suppression = false;
  //
  customerPhoto: SafeResourceUrl;
  state: string = 'default';
  largeurInitial = 0;
  hauteurInitial = 0;
  zoom = 0;
  imageToShow: any = null;
  photocustom: any = null;



  // M e t h o d s  ;
  constructor(private meswebservices: MeswebservService, private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // Call this :
    this.getmycustomers();
    this.getreseauxsociauxmycustomers();
  }


  // 
  transformer(email: string, idcli: string): void {
    // Open modal :
    this.emailClient = email;
    this.information = "";
    this.idcli = idcli;
    $('#modalchange').modal();
  }


    // 
    afficherCNI(email: string, idcli: string): void {
      // Open modal :
      this.emailClient = email;
      this.idcli = idcli;
  
      //this.meswebservices.getcnipicture(this.idcli).toPromise()
      this.meswebservices.getclientpicture(this.idcli).toPromise()
        .then(
          resultat => {
  
            let file = new Blob([resultat], { type: 'image/jpeg' });
            let fileUrl = window.URL.createObjectURL(file);
  
            // Display :
            this.zoom = 0;
            if (this.largeurInitial > 0) {
              // we reset if PICTURE has been already manipulated :
              $('#cniid').css({ 'width': (this.largeurInitial.toString() + 'px'), 'height': (this.hauteurInitial.toString() + 'px') });
            }
  
            this.photocustom = this._sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
            $('#modalphotohard').modal();
          },
          (error) => {
          }
        );
    }
  
  
    telechargerCNI(email: string, idcli: string): void {
      // Open modal :
      this.emailClient = email;
      this.idcli = idcli;
      this.largeurInitial = 0;
  
      this.meswebservices.getclientpicture(this.idcli).toPromise()
        .then(
          resultat => {
  
            //alert("Size : "+resultat.size);
            let file = new Blob([resultat], { type: 'image/jpeg' });
            let fileUrl = window.URL.createObjectURL(file);
            
            const link = document.createElement('a');
            link.href = fileUrl;
            var filename = "fichecni_" + idcli.toString() + ".jpeg";
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
          },
          (error) => {
          }
        );
    } 
  


  //
  rotate() {
    this.state = (this.state === 'default' ? 'rotated' : 'default');
  }

  agrandir() {
    var largeur = $('#cniid').css("width");
    var tpLargeur = largeur.replace("px", "");
    var valeur_Largeur = parseFloat(tpLargeur) + 30;
    if (this.largeurInitial == 0) this.largeurInitial = parseFloat(tpLargeur);
    //
    var hauteur = $('#cniid').css("height");
    var tpHauteur = hauteur.replace("px", "");
    var valeur_Hauteur = parseFloat(tpHauteur) + 50;
    if (this.hauteurInitial == 0) this.hauteurInitial = parseFloat(tpHauteur);

    // Update :
    this.zoom++;

    $('#cniid').css({ 'width': (valeur_Largeur.toString() + 'px'), 'height': (valeur_Hauteur.toString() + 'px') });
  }


  reduire() {
    if (this.zoom > 0) {
      var largeur = $('#cniid').css("width");
      var tpLargeur = largeur.replace("px", "");
      var valeur_Largeur = parseFloat(tpLargeur) - 30;
      if (this.largeurInitial == 0) this.largeurInitial = parseFloat(tpLargeur);
      //
      var hauteur = $('#cniid').css("height");
      var tpHauteur = hauteur.replace("px", "");
      var valeur_Hauteur = parseFloat(tpHauteur) - 50;
      if (this.hauteurInitial == 0) this.hauteurInitial = parseFloat(tpHauteur);

      // Update :
      this.zoom--;

      $('#cniid').css({ 'width': (valeur_Largeur.toString() + 'px'), 'height': (valeur_Hauteur.toString() + 'px') });
    }
  }


  // Supprimer :
  lancerTransformation() {

    if (!this.suppression) {

      // Set it :
      this.suppression = true;

      // Display message :
      this.information = "Patientez svp ...";

      this.meswebservices.prospectenclient(this.idcli).toPromise()
        .then(
          resultat => {

            this.suppression = false;

            // Succes
            if (resultat.element == "ok") {
              location.reload();
            }
            else {
              // Display message :
              this.information = "Impossible de traiter l'opération !";
            }
          },
          (error) => {
            this.suppression = false;
            this.information = "";
          }
        );
    }
  }


  getmycustomers(): void {
    this.meswebservices.getclientportfeuille().toPromise().then(
      resultat => {
        if (resultat.length > 0) {
          this.listeClients = resultat;
        }

        //
        this.getListeClient = true;

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

          this.tableauCom = true;
        }, 1000);

      }
    )
  }




  getreseauxsociauxmycustomers(): void {
    this.meswebservices.getreseauxsociauxmycustomers().toPromise().then(
      resultat => {
        if (resultat.length > 0) {
          this.listeReseauClients = resultat;
        }

        //
        this.getListeReseauClient = true;

        setTimeout(function () {

          $('#datatablesreseauxsociaux').DataTable({
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

          this.tableauCom = true;
        }, 1000);

      }
    )
  }

}
