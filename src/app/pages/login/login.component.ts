import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { UserLog } from 'src/app/mesbeans/userlogin';
import { UserLogChg } from 'src/app/mesbeans/userloginchg';
import { AppService } from 'src/app/messervices/appservice';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

declare var $: any;

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;

    /*  */
    private identifiant: String = "";
    private motdepasse: String = "";
    private motdepassedeux: String = "";
    private passwordFlag = false;
    private actionEnCours = false;
    private emailaddress = "";



    constructor(private element: ElementRef, private meswebservices: MeswebservService, private appService: AppService) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit() {

        // Hide BLOC for password reset :
        $("#blocreset").hide();

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

        if (!this.actionEnCours) {

            // Set it :
            this.actionEnCours = true;

            //
            document.getElementById("infos").innerHTML = "Connexion ...";
            // Create our LOGIN obect :
            var userlog = new UserLog();
            userlog.identifiant = this.identifiant.trim();
            userlog.motdepasse = this.motdepasse.trim();

            if (!this.passwordFlag) {
                this.meswebservices.lookforAuthentication(userlog).toPromise()
                    .then(
                        resultat => {
                            // Succes
                            if (resultat.userexist == '1') {
                                if (resultat.code == '200') {
                                    if (resultat.paswordchange == '1') {
                                        // Keep the TOKEN :
                                        this.meswebservices.setToken(resultat.data);
                                        // Move on :
                                        localStorage.setItem("userid", this.identifiant.trim());
                                        localStorage.setItem("profil", resultat.profil.toString());
                                        localStorage.setItem("identifiant", resultat.identifiant.toString());
                                        localStorage.setItem("mtoken", resultat.data);
                                        switch (resultat.profil.toString()) {
                                            case 'superviseur':
                                                window.location.href = "#/gestion/accueilsup"; // 
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

                                            case "tresorier":
                                                window.location.href = "#/tresorier/accueil";
                                                break;

                                            default:
                                                window.location.href = "/";
                                                break;
                                        }
                                    }
                                    else {
                                        document.getElementById("infos").innerHTML = "";
                                        // Display BLOC to reset password :
                                        $("#blocreset").show();
                                        // Set FLAG :
                                        this.passwordFlag = true;
                                        this.actionEnCours = false;
                                        document.getElementById("infos").innerHTML = "<span style='color:red'>Veuillez changer le mot de passe. " +
                                            "Le mot de passe doit contenir au moins 1 lettre majuscule, 1 lette minuscule et 1 chiffre, 1 caract&egrave;re sp&eacute;cial"+
                                            " parmi cette liste _ * + $ @ # ! ( ) [ ] { } -    et tenir sur au moins 8 caract&egrave;res !</span>";
                                    }
                                }
                                else{
                                    document.getElementById("infos").innerHTML = "";
                                    this.warnmessage("Impossible de d'authentifier l'utilisateur !");
                                } 
                            }
                            else if (resultat.userexist == '2') {
                                document.getElementById("infos").innerHTML = "";
                                this.warnmessage("Votre compte a été verrouillé suite à 3 tentatives infructueuses d'accès. "+
                                "Veuillez vous adresser à l'administrateur !");
                            }
                            else{
                                this.warnmessage("L'identifiant ou le mot de passe est incorrect !");
                                document.getElementById("infos").innerHTML = "";
                            }
                        },
                        (error) => {
                            document.getElementById("infos").innerHTML = "";
                            this.warnmessage("Impossible de joindre le serveur !");
                        }
                    )
            }
            else {
                // Request for PASSWORD CHANGE :
                if (this.checkPassword()) {
                    // Good, now process :
                    var userloginchg = new UserLogChg();
                    userloginchg.identifiant = this.identifiant.trim().toString();
                    userloginchg.motdepasse = this.motdepasse.trim().toString();
                    userloginchg.motdepassedeux = this.motdepassedeux.trim().toString();

                    this.meswebservices.lookforPasswordReset(userloginchg).toPromise()
                        .then(
                            resultat => {
                                // Succes
                                if (resultat.actions == '1') {
                                    if (resultat.code == '200') {

                                        // Set the FLAG :
                                        this.appService.setUserLoggedIn(true)

                                        // Keep the TOKEN :
                                        this.meswebservices.setToken(resultat.data);
                                        // Move on :
                                        localStorage.setItem("userid", this.identifiant.trim());
                                        localStorage.setItem("profil", resultat.profil.toString());
                                        localStorage.setItem("identifiant", resultat.identifiant.toString());
                                        localStorage.setItem("mtoken", resultat.data);
                                        switch (resultat.profil.toString()) {
                                            case 'superviseur':
                                                window.location.href = "#/gestion/accueilsup"; // 
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
                                    else this.warnmessage("Impossible de d'authentifier l'utilisateur !");
                                }
                                else this.warnmessage("L'identifiant ou le mot de passe est incorrect !");
                            },
                            (error) => {
                                this.warnmessage("Impossible de joindre le serveur !");
                            }
                        )
                }
                else this.warnmessage("Le mot de passe doit contenir au moins 1 lettre majuscule, 1 lette minuscule et 1 chiffre et un" 
                +" caractère spécial parmi cette liste _ * + $ @ # ! ( ) [ ] { } -");
            }
        }
    }


    warnmessage(information: string) {

        // Reset it GLOBALLY :
        this.actionEnCours = false;

        document.getElementById("infos").innerHTML = "";
        $.notify({
            icon: 'notifications',
            message: information
        }, {
            type: 'success',
            timer: 5000,
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
        if (this.motdepasse == this.motdepassedeux) {
            if (this.motdepasse.trim().length >= 8) {
                // clean :
                document.getElementById("infos").innerHTML = "";

                // && this.motdepasse.match(/[_\*\+\$@\#\!\(\)\[\]\{\}-]+/)

                if (this.motdepasse.match(/([a-z]+)/) && this.motdepasse.match(/([A-Z]+)/)
                    && this.motdepasse.match(/([0-9]+)/) ) return true;
                else return false;
            }
            else {
                this.warnmessage("Le mot de passe doit contenir 8 caractères minimum !");
                return false;
            }
        }
        else {
            document.getElementById("infos").innerHTML = "Les mots de passe doivent correspondre !";
            return false;
        }
    }


}
