import { Component, OnInit } from '@angular/core';
import { InvitationRequest } from 'src/app/mesbeans/invitationrequest';
import { ApisCalls } from 'src/app/messervices/apis';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

declare const $: any;

@Component({
  selector: 'app-rdv',
  templateUrl: './rdv.component.html',
  styleUrls: ['./rdv.component.css']
})
export class RdvComponent implements OnInit {

  // Attributes :
  listeInvitationReq: InvitationRequest[];
  getInvitationReq = false;
  keepInvitationData: InvitationRequest;
  processEnCours = false;
  listeInvitationHis: InvitationRequest[];
  getInvitationHis = false;



  // Method :
  constructor(private meswebservices: MeswebservService, private apicall: ApisCalls) { }

  ngOnInit(): void {
    //
    this.getInvitationRequest();
    this.getRdvInvitationHisto();
  }



  displayInvitWindow(idrdv: string) {
    //
    for (let i = 0; i < this.listeInvitationReq.length; i++) {
      if (idrdv == this.listeInvitationReq[i].idrdv) {
        if (this.listeInvitationReq[i].choix == "0") {
          document.getElementById("infosrequest").innerHTML = "Réponse actuelle : Non";
        }
        else document.getElementById("infosrequest").innerHTML = "Réponse actuelle : OUI";

        this.keepInvitationData = new InvitationRequest();
        // Save :
        this.keepInvitationData = this.listeInvitationReq[i];
        break;
      }
    }

    // Open modal :
    $('#modalInvitation').modal();
  }


  // Save the ANSWER :
  repondreUser(choix: string) {
    if (!this.processEnCours) {

      this.processEnCours = true;
      this.keepInvitationData.choix = choix;

      //
      document.getElementById("infosrequest").innerHTML = "Veuillez patienter ...";
      $('#modalInvitation').modal('hide');

      this.meswebservices.respondToInvitation(this.keepInvitationData).toPromise()
        .then(
          resultat => {
            var response = resultat;
            if(response.profil == "data"){
              this.warnmessage("Veuillez consulter votre AGENDA pour éviter les chevauchements de date de RDV  !");
              setTimeout(function () {
                location.reload();
              }, 3000);
            } 
            else location.reload();
          },
          (error) => {
            location.reload();
          }
        )
    }

  }



  warnmessage(information: string) {
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


  /* get INVITATION Request :*/
  getInvitationRequest(): void {
    this.meswebservices.getRdvInvitationRequest().toPromise()
      .then(
        resultat => {
          if (resultat.length > 0) {
            this.listeInvitationReq = resultat;
          }

          this.getInvitationReq = true;
          this.initInvitationReqtable();

        },
        (error) => {
          this.getInvitationReq = true;
          this.initInvitationReqtable();
        }
      )
  }

  // Init the table :
  initInvitationReqtable() {
    setTimeout(function () {
      $('#datatableRequest').DataTable({
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

      //
      this.getInvitationReq = false;

    }, 500);
  }



  /* get INVITATION Request :*/
  getRdvInvitationHisto(): void {
    this.meswebservices.getRdvInvitationHisto().toPromise()
      .then(
        resultat => {
          if (resultat.length > 0) {
            this.listeInvitationHis = resultat;
          }

          this.getInvitationHis = true;
          this.initInvitationHistable();

        },
        (error) => {
          this.getInvitationHis = true;
          this.initInvitationHistable();
        }
      )
  }

  // Init the table :
  initInvitationHistable() {
    setTimeout(function () {
      $('#datatableInvHis').DataTable({
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
