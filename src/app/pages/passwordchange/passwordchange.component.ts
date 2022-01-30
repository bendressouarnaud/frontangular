import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { UserLog } from 'src/app/mesbeans/userlogin';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

declare var $: any;

@Component({
  selector: 'app-passwordchange',
  templateUrl: './passwordchange.component.html',
  styleUrls: ['./passwordchange.component.css']
})
export class PasswordchangeComponent implements OnInit {

  test: Date = new Date();
  private toggleButton: any;
  private sidebarVisible: boolean;
  private nativeElement: Node;

  /*  */
  private identifiant: String = "";
  private motdepasse: String = "";
  private motdepasseDeux: String = "";
  userlogin = new UserLog();


  constructor(private element: ElementRef, private meswebservices: MeswebservService) {
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  ngOnInit() {

    //
    this.userlogin.identifiant = "";
    this.userlogin.motdepasse = "";

    //document.getElementById("infos").innerHTML = "Connexion ...";
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');
    body.classList.add('off-canvas-sidebar');
    const card = document.getElementsByClassName('card')[0];
    setTimeout(function () {
      // after 1000 ms we add the class animated to the login/register card
      card.classList.remove('card-hidden');
    }, 700);

    // Kill : 
    if (localStorage.getItem('userid')) {
      localStorage.removeItem('identifiant');
      localStorage.removeItem("userid");
      localStorage.removeItem("profil");
    }
  }
  sidebarToggle() {
    var toggleButton = this.toggleButton;
    var body = document.getElementsByTagName('body')[0];
    var sidebar = document.getElementsByClassName('navbar-collapse')[0];
    if (this.sidebarVisible == false) {
      setTimeout(function () {
        toggleButton.classList.add('toggled');
      }, 500);
      body.classList.add('nav-open');
      this.sidebarVisible = true;
    } else {
      this.toggleButton.classList.remove('toggled');
      this.sidebarVisible = false;
      body.classList.remove('nav-open');
    }
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');
    body.classList.remove('off-canvas-sidebar');
  }

  /* Try to authenticate the user */
  onAutentication(): void {

    //
    document.getElementById("infos").innerHTML = "Connexion ...";

    /*this.meswebservices.lookforPasswordReset(this.userlogin).toPromise().then(
      resultat => {
        if (resultat.element != null) {
          if (resultat.element.length > 0) {
            if (resultat.element == "ok") {
              this.warnmessage("Le mot de passe a été réinitialisé !");
            }
            else this.warnmessage("Impossible de réinitialiser le mot de passe !");
          }
          this.warnmessage("Impossible de joindre le serveur !");
        }
        this.warnmessage("Impossible de joindre le serveur !");
      },
      (error) => {
        this.warnmessage("Impossible de joindre le serveur !");
      }
    )
    */

    /*this.meswebservices.lookforAuthentication(this.identifiant.trim(), this.motdepasse.trim()).toPromise()
      .then(
        resultat => {
          // Succes
          if (resultat.element != null) {
            if (resultat.element.length > 0) {
              if (resultat.element == "ok") {
                // Move on :
                localStorage.setItem("userid", this.identifiant.trim());
                localStorage.setItem("profil", resultat.profil.toString());
                //alert("Profil : "+resultat.profil.toString());
                localStorage.setItem("identifiant", resultat.identifiant.toString());
                switch (resultat.profil.toString()) {
                  case 'superviseur':
                    window.location.href = "#/gestion/accueilsup"; // 
                    //window.location.href = "#/gestion/portefeuille"; // 
                    break

                  case 'admin':
                    window.location.href = "#/gestion/comptes";
                    break;

                  case "commercial":
                    window.location.href = "#/gcommercial/accueilcom";
                    break;

                  case "infas":
                    window.location.href = "#/infas/professeur";
                    break;

                  case "inspecteur":
                    window.location.href = "#/inspecteur/accueil";
                    break;

                  case "respreseau":
                    window.location.href = "#/responsable/accueil";
                    break;

                  case "dircomadj":
                    window.location.href = "#/directeuragj/accueil";
                    break;

                  case "dircom":
                    window.location.href = "#/directeur/accueil";
                    break;

                  default:
                    window.location.href = "/";
                    break;
                }

              }
              else this.warnmessage("Parametres de connexion incorrects !");
            }
            else this.warnmessage("Impossible de joindre le serveur !");
          }
          else this.warnmessage("Impossible de joindre le serveur !");
        },
        (error) => {
          this.warnmessage("Impossible de joindre le serveur !");
        }
      )
      */
  }


  warnmessage(information: string) {
    document.getElementById("infos").innerHTML = "";
    $.notify({
      icon: 'notifications',
      message: information
    }, {
      type: 'success',
      timer: 3000,
      placement: {
        from: 'bottom',
        align: 'center'
      },
      template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }

  /*  */
  checkPassword(): boolean {
    if (this.userlogin.motdepasse.trim() == this.motdepasseDeux) {
      // clean :
      document.getElementById("infos").innerHTML = "";

      if (this.motdepasse.match(/([a-z]+)/) && this.motdepasse.match(/([A-Z]+)/)
        && this.motdepasse.match(/([0-9]+)/)) return true;
      else return false;
    }
    else {
      document.getElementById("infos").innerHTML = "Les mots de passe doivent correspondre !";
      return false;
    }
  }

}
