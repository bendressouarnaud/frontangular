import { Component, OnInit } from '@angular/core';
import { Activite } from 'src/app/mesbeans/activite';
import { Civilite } from 'src/app/mesbeans/civilite';
import { ClientRest } from 'src/app/mesbeans/clientrest';
import { Detailequipe } from 'src/app/mesbeans/detailequipe';
import { Detailtable } from 'src/app/mesbeans/detailnomenclature';
import { RestClient } from 'src/app/mesbeans/restclientcom';
import { RestPolice } from 'src/app/mesbeans/restpolice';
import { UtilisateurInfo } from 'src/app/mesbeans/utilisateurinfo';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

declare const $: any;

@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.css']
})
export class DevisComponent implements OnInit {

  // A t t r i b u t e s
  dropdownList = [];
  tempUsers = [];
  selectedItems = [];
  dropdownSettings = {};
  tempSelectedItems = [];
  listeClients: UtilisateurInfo[];
  listeDesClients: RestClient[];
  membresId = [];
  clientRest = new ClientRest();
  //
  listeCivilite: Detailtable[];
  listePolices: RestPolice[];
  getPolice = false;
  setPolice = "";
  getClientId = "";

  listeFraisTraitement: Detailtable[];
  // Energie vehicule : 
  listeEnergieVehicule: Detailtable[];
  // Nombre de place : 
  listePlaceVehicule: Detailtable[];
  // Duree Contrat : 
  listeDureeContrat: Detailtable[];
  // Offre commerciale AUTO : 
  listeOffreCommerciale: Detailtable[];
  // Liste des GARANTIES :
  listeGaranties: Detailtable[];

  // Field for DROP DOWN List :
  fraisdetraitement = 10;
  energievehicule = 1;
  nombreplacevehicule = 1;
  dureecontrat = 18;
  offrecommerciale = 23;
  chargeutile = "";
  puissancevehicule = "";
  plafondindemnisation = "";

  // Fields for GARANTIES :
  dropdownListGarantie = [];
  tempUsersGarantie = [];
  selectedItemsGarantie = [];
  dropdownSettingsGarantie = {};
  tempSelectedItemsGarantie = [];
  garantiesId = [];



  getDate = new Date();
  basicDatepicker = "";
  basicDatepickerAuto = "";

  listeActivite: Activite[];
  getListeActivite = false;

  //
  formData = new FormData();
  presenceCni = true;
  presencePhoto = true;
  lesCivilite : Civilite[];
  //
  choixGarantie = "3";
  coutproduit = 0;



  // M e t h o d :
  constructor(private meswebservices: MeswebservService) { }

  ngOnInit(): void {
    this.getclientforoperations();
    this.getLesCivilite();
    //this.getCivilite();
    this.getFraisTraitemente();
    this.getAllActivities();

    // For ASSURANCE AUTO
    this.getDureeContrat();
    this.getEnergieVehicule();
    this.getNombrePlace();
    

  }


  getPersonalData(idcli: string): void {
    this.meswebservices.getclientpersonaldata(idcli).toPromise()
      .then(
        resultat => {
          this.clientRest = resultat;
        }
      )
  }


  /* get MEMBRES from same team :*/
  getclientforoperations(): void {
    //this.meswebservices.getclientforoperations().toPromise()
    this.meswebservices.getapilesclientsbyid().toPromise()
      .then(
        resultat => {
          if (resultat.length > 0) {
            this.listeDesClients = resultat;
          }

          // Init 
          /*this.tempUsers.push({
            item_id: 0,
            item_text: 'Aucun choix'
          });
          */

          // Browse :
          if (resultat.length > 0) {
            for (var i = 0; i < this.listeDesClients.length; i++) {
              var deq = new Detailequipe();
              this.tempUsers.push({
                item_id: this.listeDesClients[i].IdClient,
                item_text: this.listeDesClients[i].RAISONSOCIALE.toString()
              });
            }
          }

          this.dropdownList = this.tempUsers;

          // Init :
          this.dropdownSettings = {
            singleSelection: true,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Sélectionner tout',
            unSelectAllText: 'Supprimer les sélections',
            itemsShowLimit: 5,
            maxHeight: 400,
            allowSearchFilter: true
          };

        }
      )
  }

  // Display Customer name :
  displayCustomerName() {
    for (var customer of this.listeDesClients) {
      if (parseInt(this.getClientId) == customer.IdClient) {

        // set TELEPHONE Id :
        this.clientRest.contact = customer.TELEP1;

        var tampNom = customer.RAISONSOCIALE.split(" ");
        switch (tampNom.length) {
          case 1:
            this.clientRest.nom = tampNom[0];
            break;

          case 2:
            this.clientRest.nom = tampNom[0];
            this.clientRest.prenom = tampNom[1];
            break;

          case 3:
            this.clientRest.nom = tampNom[0];
            this.clientRest.prenom = tampNom[1] + " " + tampNom[2];
            break;

          case 4:
            this.clientRest.nom = tampNom[0];
            this.clientRest.prenom = tampNom[1] + " " + tampNom[2] + " " + tampNom[3];
            break;

          default:
            this.clientRest.nom = tampNom[0];
            this.clientRest.prenom = tampNom[1];
            break;

        }

        // close doors : 
        break;
      }
    }
  }

  // whenever an item is selected :
  onItemSelect(item: any) {
    if (parseInt(item.item_id) > 0) {
      // Add user'id
      this.membresId.push(item.item_id);
      this.getClientId = item.item_id;

      // Display User DATA :
      this.displayCustomerName();
    }
  }

  // whenever an item is deselected :
  onItemDeSelect(item: any) {
    //
    this.membresId.forEach((element, index) => {
      if (element == item.item_id) {
        this.membresId.splice(index, 1);

        // Clean :
        this.clientRest.nom = "";
        this.clientRest.prenom = "";
        this.clientRest.contact = "";

      }
    });
  }

  // Whenever all items are selected :
  onSelectAll(items: any) {
    // Reset the table :
    this.membresId = [];
    for (let i = 0; i < items.length; i++) {
      if (parseInt(items[i].item_id) > 0) {
        this.membresId.push(items[i].item_id);
      }
    }
  }

  // Go to pull CIVILITE data , id : 7 :
  getCivilite(): void {
    this.meswebservices.getdonneeparametree("7").toPromise()
      .then(
        resultat => {
          this.listeCivilite = resultat;
          // Init 
          this.clientRest.civilite = resultat[0].idnmd;
        }
      )
  }



  // Afficher les POLICES :
  getlespolicesbyclient(): void {
    this.meswebservices.getlespolicesbyclient(this.getClientId).toPromise()
      .then(
        resultat => {
          this.listePolices = resultat;
          this.getPolice = true;
        }
      )
  }



  // Go to pull FRAIS TRAITEMENT data , id : 4 :
  getFraisTraitemente(): void {
    this.meswebservices.getdonneeparametree("4").toPromise()
      .then(
        resultat => {
          this.listeFraisTraitement = resultat;
          // Init 
          this.fraisdetraitement = resultat[0].idnmd;
        }
      )
  }

  // Go to pull ENERGIE VEHICULE data , id : 1 :
  getEnergieVehicule(): void {
    this.meswebservices.getdonneeparametree("1").toPromise()
      .then(
        resultat => {
          this.listeEnergieVehicule = resultat;
          // Init 
          this.energievehicule = resultat[0].idnmd;
        }
      )
  }

  // Go to pull NOMBRE DE PLACE data , id : 2 :
  getNombrePlace(): void {
    this.meswebservices.getdonneeparametree("2").toPromise()
      .then(
        resultat => {
          this.listePlaceVehicule = resultat;
          // Init 
          this.nombreplacevehicule = resultat[0].idnmd;
        }
      )
  }

  // Go to pull DUREE CONTRAT data , id : 3 :
  getDureeContrat(): void {
    this.meswebservices.getdonneeparametree("3").toPromise()
      .then(
        resultat => {
          this.listeDureeContrat = resultat;
          // Init 
          this.dureecontrat = resultat[0].idnmd;

          // Call this :
          this.getOffreCommerciale();
        }
      )
  }

  // Go to pull OFFRE COMMERCIALE data , id : 8 :
  getOffreCommerciale(): void {
    this.meswebservices.getdonneeparametree("8").toPromise()
      .then(
        resultat => {
          this.listeOffreCommerciale = resultat;
          // Init 
          this.offrecommerciale = resultat[0].idnmd;

          // Display the Price fom there :
          this.computePrice();
        }
      )
  }


  // Compute the price :
  computePrice(){
    switch(this.offrecommerciale){
      case 23:
        // ECO : 
        switch(this.dureecontrat){
          case 19:
            // 3 mois :
            this.coutproduit = 57040;
            break;

          case 20:
            // 6 mois :
            this.coutproduit = 88338;
            break;

          case 21:
            // 9 mois :
            this.coutproduit = 119635;
            break;

          case 22:
            // 12 mois :
            this.coutproduit = 119635;
            break;            
        }
        break;


      default:
        this.coutproduit = 0;
        break;
    }
  }


  // Get CIVILITE :
  getLesCivilite(): void {
    this.meswebservices.getallcivilite().toPromise()
      .then(
        resultat => {
          this.lesCivilite = resultat;
          this.clientRest.civilite = resultat[0].idciv;
        }
      )
  }


  afficherAccident() {
    // Reset :
    this.membresId = [];
    this.selectedItems = [];
    this.clientRest.activite = 1;
    $('#modalAccident').modal();
  }

  // Auto :
  afficherAuto() {
    // Reset :
    this.membresId = [];
    this.selectedItems = [];
    this.clientRest.activite = 1;
    $('#modalAutomobile').modal();
  }


  getAllActivities(): void {
    this.meswebservices.getAllActivities().toPromise()
      .then(
        resultat => {

          // Succes
          if (resultat.length > 0) {
            this.listeActivite = resultat;
            this.getListeActivite = true;
          }

        }
      )
  }


  onCniSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      if (this.formData.has("cni")) this.formData.delete("cni");
      this.formData.append("cni", file);
      this.presenceCni = true;
    }
    else {
      if (this.formData.has("cni")) {
        this.presenceCni = false;
        this.formData.delete("cni");
      }
    }
  }

  onPhotoSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      if (this.formData.has("photo")) this.formData.delete("photo");
      this.formData.append("photo", file);
      this.presencePhoto = true;
    }
    else {
      if (this.formData.has("photo")) {
        this.presencePhoto = false;
        this.formData.delete("photo");
      }
    }
  }


  // Get GARANTIES based on 'OFFRE COMMERCIALE' :
  getGarantie(): void {
    // this.offrecommerciale
  }


  // Work :
  setRadioBut(id: number){
    //alert("choixGarantie : "+ id);
    switch(id){
      case 1:
        // ECO : 
        this.offrecommerciale = 23;
        break;

      case 2:
        // STANDARD : 
        this.offrecommerciale = 24;
        break;

      case 3:
          // CONFORT : 
          this.offrecommerciale = 25;
          break;  
          
      case 4:
        // PRESTIGE : 
        this.offrecommerciale = 26;
        break;           
    }
  }


  //
  displayOffre(): void {
    //alert("Id offre : "+this.offrecommerciale);

    // Based on the value, TICK the RIGHT RADIO BUTTON :
    switch(this.offrecommerciale){
      case 23:
        // ECO : 
        this.choixGarantie = "1";
        break;

      case 24:
        // STANDARD : 
        this.choixGarantie = "2";
        break;

      case 25:
        // CONFORT : 
        this.choixGarantie = "3";
        break;

      case 26:
        // PRESTIGE : 
        this.choixGarantie = "4";
        break;
    }
    // Compute price :
    this.computePrice();
    // Make a WAIT :
    $('#garantieslink').click();

    /*
    this.meswebservices.getgarantieformule(this.offrecommerciale.toString()).toPromise()
      .then(
        resultat => {
          this.listeGaranties = resultat;

          // Browse :
          if (this.tempUsersGarantie.length > 0) this.tempUsersGarantie = [];
          if (resultat.length > 0) {
            for (var i = 0; i < this.listeGaranties.length; i++) {
              var deq = new Detailequipe();
              this.tempUsersGarantie.push({
                item_id: this.listeGaranties[i].idnmd,
                item_text: this.listeGaranties[i].libelle
              });
            }
          }

          // reinit :
          if (this.dropdownListGarantie.length > 0) this.dropdownListGarantie = [];
          this.dropdownListGarantie = this.tempUsersGarantie;

          // Init :
          this.dropdownSettingsGarantie = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Sélectionner tout',
            unSelectAllText: 'Supprimer les sélections',
            itemsShowLimit: 5,
            maxHeight: 400,
            allowSearchFilter: true
          };

        }
      )
      */
  }



  // whenever an item is selected :
  onItemSelectGarantie(item: any) {
    if (parseInt(item.item_id) > 0) {
      // Add user'id
      this.garantiesId.push(item.item_id);
    }
  }

  // whenever an item is deselected :
  onItemDeSelectGarantie(item: any) {
    //
    this.garantiesId.forEach((element, index) => {
      if (element == item.item_id) this.garantiesId.splice(index, 1);
    });
  }

  // Whenever all items are selected :
  onSelectAllGarantie(items: any) {
    // Reset the table :
    this.garantiesId = [];
    for (let i = 0; i < items.length; i++) {
      if (parseInt(items[i].item_id) > 0) {
        this.garantiesId.push(items[i].item_id);
      }
    }
  }


}
