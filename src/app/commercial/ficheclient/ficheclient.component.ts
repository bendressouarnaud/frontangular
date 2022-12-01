import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BeanClientRdvStat } from 'src/app/mesbeans/beanclientrdvstat';
import { Clientprofil } from 'src/app/mesbeans/clientprofil';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

@Component({
  selector: 'app-ficheclient',
  templateUrl: './ficheclient.component.html',
  styleUrls: ['./ficheclient.component.css']
})
export class FicheclientComponent implements OnInit {

  // Attributes :
  idcli = "";
  clientprofil : Clientprofil;
  listeStatRdv : BeanClientRdvStat;
  getStatRdv = false;



  // Methods :
  constructor(private meswebservices: MeswebservService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      // Get parameters :
      this.idcli = params['idcli'];
    });

    this.getprofilclient();
    this.getprofilclientrdv();
  }

  // Get PROFIL :
  getprofilclient(): void {
    this.meswebservices.getprofilclient(this.idcli).toPromise()
      .then(
        resultat => {
          this.clientprofil = resultat;
        }
      )
  }

  // Rdv
  getprofilclientrdv(): void {
    this.meswebservices.getprofilclientrdv(this.idcli).toPromise()
      .then(
        resultat => {
          this.listeStatRdv = resultat;
          this.getStatRdv = true;
        }
      )
  }

}
