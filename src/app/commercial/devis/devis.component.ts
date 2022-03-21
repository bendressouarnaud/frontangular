import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Activite } from 'src/app/mesbeans/activite';
import { BeanDonneDevis } from 'src/app/mesbeans/beandonneedevis';
import { Civilite } from 'src/app/mesbeans/civilite';
import { ClientRest } from 'src/app/mesbeans/clientrest';
import { Detailequipe } from 'src/app/mesbeans/detailequipe';
import { Detailtable } from 'src/app/mesbeans/detailnomenclature';
import { Indemnitemax } from 'src/app/mesbeans/indemnitemax';
import { Paysdestination } from 'src/app/mesbeans/paysdestination';
import { RestClient } from 'src/app/mesbeans/restclientcom';
import { RestPolice } from 'src/app/mesbeans/restpolice';
import { StatsDevisUser } from 'src/app/mesbeans/statsdevisuser';
import { UtilisateurInfo } from 'src/app/mesbeans/utilisateurinfo';
import { Zonedestination } from 'src/app/mesbeans/zonedestination';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';
import { Traitements } from 'src/app/messervices/traitements';

declare const $: any;

export interface IndemniteItems {
  amount: number;
  libelle: string;
}

export interface Destinations {
  id: number;
  libelle: string;
}

export const lesIndemnites: IndemniteItems[] = [
  { amount: 2500000, libelle: '2 500 000' },
  { amount: 5000000, libelle: '5 000 000' },
  { amount: 7500000, libelle: '7 500 000' },
  { amount: 10000000, libelle: '10 000 000' },
  { amount: 15000000, libelle: '15 000 000' },
  { amount: 20000000, libelle: '20 000 000' },
  { amount: 30000000, libelle: '30 000 000' },
  { amount: 50000000, libelle: '50 000 000' },
  { amount: 60000000, libelle: '60 000 000' },
  { amount: 70000000, libelle: '70 000 000' },
];


export const lesZonesDestinations: Destinations[] = [
  { id: 1, libelle: 'AFRIQUE' },
  { id: 2, libelle: 'EUROPE' },
  { id: 3, libelle: 'AMERIQUE' },
  { id: 3, libelle: 'ASIE' },
  { id: 3, libelle: 'OCEANIE' }
];

export const lesPaysDestinations: Destinations[] = [
  { id: 1, libelle: 'FRANCE' },
  { id: 2, libelle: 'ALLEMAGNE' },
  { id: 3, libelle: 'ETATS-UNIS' },
  { id: 3, libelle: 'BURKINA-FASO' },
  { id: 3, libelle: 'AFRIQUE DU SUD' },
  { id: 3, libelle: 'MAROC' },
  { id: 3, libelle: 'BELGIQUE' },
  { id: 3, libelle: 'SUISSE' },
  { id: 3, libelle: 'MALI' }
];


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
  getPoliceAccident = false;
  getPoliceVoyage = false;
  setPolice = "";
  idCliendDone = "0";
  idClient = "0";

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
  // Puissance du VEHICULE :
  listePuissanceVehicule: Detailtable[];

  // Field for DROP DOWN List :
  fraisdetraitement = 10;
  energievehicule = 1;
  puissanceVehicule = 1;
  nombreplacevehicule = 1;
  dureecontrat = 18;
  offrecommerciale = 23;
  chargeutile = "0";
  puissancevehicule = "0";
  plafondindemnisation = "0";

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
  lesCivilite: Civilite[];
  //
  choixGarantie = "3";
  coutproduit = 0;
  displayCout = "0";
  //
  indemnitemax = 2500000;
  menuIndemniteItems: any[];
  menuZoneItems: any[];
  menuPaysItems: any[];
  //
  typeclient = 1;
  // 
  getCurrentDate = new Date();
  customerBirthDate = new Date();
  id_devisauto = 0;

  //
  listeDevisAuto: BeanDonneDevis[];
  listeDevisAccident: BeanDonneDevis[];
  listeDevisVoyage: BeanDonneDevis[];
  listeDevisMrh: BeanDonneDevis[];
  getDevisAuto = false;
  getDevisAccident = false;
  getDevisVoyage = false;
  getDevisMrh = false;
  statsdevisuser = new StatsDevisUser();
  //
  cotationECO = "0";
  cotationSTANDARD = "0";
  cotationCONFORT = "0";
  cotationPRESTIGE = "0";

  // Accident 
  capitaldeces = "0";
  capitalinfirmite = "0";
  id_accident = 0;

  // Voyage :
  listeZoneDestination: Zonedestination[];
  listePaysDestination: Paysdestination[];
  zonedestination = 1;
  paysdestination = 1;
  getJourDepart = new Date();
  getJourRetour = new Date();
  getNaissVoyage = new Date();
  basicjourdepart = "";
  basicjourretour = "";
  basicnaissvoyage = "";
  id_voyage = 0;
  updateDevVoyage = false;
  updatePaysDevVoyage = 0;

  // AUTO 
  listeIdemniteAuto: Indemnitemax[];

  // MRH 
  listeFormuleMrh: Detailtable[];
  getNaissanceMrh = new Date();
  getDateEffet = new Date();
  getDateExpiration = new Date();
  basicDatepickerMrh = "";
  basicDateEffet = "";
  basicDateExpiration = "";
  formulemrh = 1;
  choixformule = 0;
  coutreelmrh = "0";
  qualiteproposant = 1;
  adressegeographique = "";
  situationgeographique = "";
  id_mrh = 0;






  // M e t h o d :
  constructor(private meswebservices: MeswebservService, private traitements: Traitements) { }

  ngOnInit(): void {

    // Set DATA :
    this.statsdevisuser.auto = "0";
    this.statsdevisuser.accident = "0";
    this.statsdevisuser.voyage = "0";
    this.statsdevisuser.mrh = "0";

    //this.menuIndemniteItems = lesIndemnites.filter(menuItem => menuItem);
    this.menuZoneItems = lesZonesDestinations.filter(menuItem => menuItem);
    this.menuPaysItems = lesPaysDestinations.filter(menuItem => menuItem);

    this.getclientforoperations();
    this.getLesCivilite();
    //this.getCivilite();
    this.getFraisTraitemente();
    this.getFormuleMrh();
    this.getAllActivities();
    this.getzonedestination();

    // For ASSURANCE AUTO
    this.getDureeContrat();
    this.getEnergieVehicule();
    this.getPuissanceVehicule();
    this.getNombrePlace();
    this.getlesindemnitesauto();

    // Display DATA :
    this.getDevisAutoByTrader();
    this.getDevisAccidentByTrader();
    this.getDevisVoyageByTrader();
    this.getDevisMrhByTrader();

    //
    this.separateurMillierOnFields();

    //
    this.getStatsDevisForUser();

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
      if (parseInt(this.idCliendDone) == customer.IdClient) {

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
      this.idCliendDone = item.item_id;

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
    this.meswebservices.getlespolicesbyclient(this.idCliendDone).toPromise()
      .then(
        resultat => {
          this.listePolices = resultat;
          this.getPolice = true;
        }
      )
  }



  // Go to pull FORMULE MRH , id : 13 :
  getFormuleMrh(): void {
    this.meswebservices.getdonneeparametree("13").toPromise()
      .then(
        resultat => {
          this.listeFormuleMrh = resultat;
          // Init 
          this.choixformule = resultat[0].idnmd;

          // :
          this.selectformule();
        }
      )
  }


  // Get ZONE DESTINATION :
  getzonedestination() {
    this.meswebservices.getzonedestination().toPromise()
      .then(
        resultat => {
          this.listeZoneDestination = resultat;
          this.zonedestination = resultat[0].idzon;
          // Refresh :
          this.getpaysdestination();
        }
      )
  }

  // PAYS de destination :
  getpaysdestination(): void {
    this.meswebservices.getpaysdestination(this.zonedestination.toString()).toPromise()
      .then(
        resultat => {
          this.listePaysDestination = resultat;
          if (!this.updateDevVoyage) this.paysdestination = resultat[0].iddes;
          else {
            this.updateDevVoyage = false;
            this.paysdestination = this.updatePaysDevVoyage;
          }
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

  // Go to pull PUISSANCE VEHICULE data , id : 12 :
  getPuissanceVehicule(): void {
    this.meswebservices.getdonneeparametree("12").toPromise()
      .then(
        resultat => {
          this.listePuissanceVehicule = resultat;
          // Init 
          this.puissanceVehicule = resultat[0].idnmd;
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



  // Go to IDEMNITE for 'DEVIS AUTO'
  getlesindemnitesauto(): void {
    this.meswebservices.getlesindemnitesauto().toPromise()
      .then(
        resultat => {
          this.listeIdemniteAuto = resultat;
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



  displayAllPropositions(setOffre: number) {
    let coutCotation = 0;
    switch (setOffre) {
      case 23:
        // ECO : 
        switch (this.dureecontrat) {
          case 19:
            // 3 mois :
            coutCotation = 57040;
            this.cotationECO = coutCotation.toLocaleString();
            break;

          case 20:
            // 6 mois :
            coutCotation = 88338;
            this.cotationECO = coutCotation.toLocaleString();
            break;

          case 21:
            // 9 mois :
            coutCotation = 119635;
            this.cotationECO = coutCotation.toLocaleString();
            break;

          case 22:
            // 12 mois :
            coutCotation = 139196;
            this.cotationECO = coutCotation.toLocaleString();
            break;
        }
        break;


      case 24:
        // STANDARD :
        coutCotation = this.traitements.calculerCout(this.indemnitemax, setOffre, this.dureecontrat);
        this.cotationSTANDARD = coutCotation.toLocaleString();
        break;

      case 25:
        // CONFORT :
        coutCotation = this.traitements.calculerCout(this.indemnitemax, setOffre, this.dureecontrat);
        this.cotationCONFORT = coutCotation.toLocaleString();
        break;

      case 26:
        // PRESTIGE : 
        coutCotation = this.traitements.calculerCout(this.indemnitemax, setOffre, this.dureecontrat);
        this.cotationPRESTIGE = coutCotation.toLocaleString();
        break;
    }
  }


  // Select Formule :
  selectformule() {
    switch (this.choixformule) {
      case 1039:
        $('#form1').css('background-color', '#697FD0'); // Formule 1
        $('#form2').css('background-color', '#d1caca');
        $('#form3').css('background-color', '#d1caca');
        $('#form4').css('background-color', '#d1caca');
        break;

      case 1040:
        $('#form1').css('background-color', '#d1caca');
        $('#form2').css('background-color', '#697FD0'); // Formule 1
        $('#form3').css('background-color', '#d1caca');
        $('#form4').css('background-color', '#d1caca');
        break;

      case 1041:
        $('#form1').css('background-color', '#d1caca');
        $('#form2').css('background-color', '#d1caca');
        $('#form3').css('background-color', '#697FD0'); // Formule 3
        $('#form4').css('background-color', '#d1caca');
        break;

      case 1042:
        $('#form1').css('background-color', '#d1caca');
        $('#form2').css('background-color', '#d1caca');
        $('#form3').css('background-color', '#d1caca');
        $('#form4').css('background-color', '#697FD0'); // Formule 4
        break;

      default:
        $('#form1').css('background-color', '#697FD0'); // Formule 1
        $('#form2').css('background-color', '#d1caca');
        $('#form3').css('background-color', '#d1caca');
        $('#form4').css('background-color', '#d1caca');
        break;
    }
  }


  // Compute the price :
  computePrice() {

    // Call This :
    //this.disableIndemnite();

    this.displayAllPropositions(23);
    this.displayAllPropositions(24);
    this.displayAllPropositions(25);
    this.displayAllPropositions(26);

    switch (this.offrecommerciale) {
      case 23:
        // ECO : 
        switch (this.dureecontrat) {
          case 19:
            // 3 mois :
            this.coutproduit = 57040;
            this.displayCout = this.coutproduit.toLocaleString();
            break;

          case 20:
            // 6 mois :
            this.coutproduit = 88338;
            this.displayCout = this.coutproduit.toLocaleString();
            break;

          case 21:
            // 9 mois :
            this.coutproduit = 119635;
            this.displayCout = this.coutproduit.toLocaleString();
            break;

          case 22:
            // 12 mois :
            this.coutproduit = 139196;
            this.displayCout = this.coutproduit.toLocaleString();
            break;
        }
        break;


      case 24:
        // STANDARD :
        this.coutproduit = this.traitements.calculerCout(this.indemnitemax, this.offrecommerciale, this.dureecontrat);
        this.displayCout = this.coutproduit.toLocaleString();
        break;

      case 25:
        // CONFORT :
        this.coutproduit = this.traitements.calculerCout(this.indemnitemax, this.offrecommerciale, this.dureecontrat);
        this.displayCout = this.coutproduit.toLocaleString();
        break;

      case 26:
        // PRESTIGE : 
        this.coutproduit = this.traitements.calculerCout(this.indemnitemax, this.offrecommerciale, this.dureecontrat);
        this.displayCout = this.coutproduit.toLocaleString();
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


  // Mrh
  afficherMrh() {
    // Clear :
    if (this.formData.has("photo")) this.formData.delete("photo");
    if (this.formData.has("cni")) this.formData.delete("cni");
    this.presencePhoto = false;
    this.presenceCni = false;

    // Reset :
    this.membresId = [];
    this.selectedItems = [];
    this.clientRest.activite = 1;
    $('#modalMrh').modal();
  }


  // Voyage
  afficherVoyage() {
    // Clear :
    if (this.formData.has("photo")) this.formData.delete("photo");
    if (this.formData.has("cni")) this.formData.delete("cni");
    this.presencePhoto = false;
    this.presenceCni = false;

    // Reset :
    this.membresId = [];
    this.selectedItems = [];
    this.clientRest.activite = 1;
    $('#modalVoyage').modal();
  }


  // Accident
  afficherAccident() {
    // Clear :
    if (this.formData.has("photo")) this.formData.delete("photo");
    if (this.formData.has("cni")) this.formData.delete("cni");
    this.presencePhoto = false;
    this.presenceCni = false;

    // Reset :
    this.membresId = [];
    this.selectedItems = [];
    this.clientRest.activite = 1;
    $('#modalAccident').modal();
  }

  // Auto :
  afficherAuto() {

    // clear :
    if (this.formData.has("photo")) this.formData.delete("photo");
    if (this.formData.has("cni")) this.formData.delete("cni");
    this.presencePhoto = false;
    this.presenceCni = false;


    this.clientRest.nom = "";
    this.clientRest.prenom = "";
    this.clientRest.contact = "";
    this.clientRest.email = "";

    this.puissancevehicule = "0";
    this.chargeutile = "0";
    this.id_devisauto = 0;
    this.idCliendDone = "0";
    this.idClient = "0";

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
  setRadioBut(id: number) {
    //alert("choixGarantie : "+ id);
    switch (id) {
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
    switch (this.offrecommerciale) {
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
    //$('#garantieslink').click();

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


  // Disable 'INDEMNITE MAX' if OFFRE COMMERCIALE is equal to 'ECO'
  disableIndemnite() {
    // $( "#x" ).prop( "disabled", true );
    if (this.offrecommerciale == 23) $("#selectIdemn").prop("disabled", true); // DISABLE
    else $("#selectIdemn").prop("disabled", false); // ENABLE
  }




  // Save the DEVIS MRH :
  enregDevisMrh() {

    // set the date :
    let momentVariable = moment(this.getNaissanceMrh, 'MM-DD-YYYY');
    let dates = momentVariable.format('YYYY-MM-DD');
    // Date effet :
    let momentEffet = moment(this.getDateEffet, 'MM-DD-YYYY');
    let dateEffet = momentEffet.format('YYYY-MM-DD');
    // Date expiration :
    let momentExpiration = moment(this.getDateExpiration, 'MM-DD-YYYY');
    let dateExpiration = momentExpiration.format('YYYY-MM-DD');


    var diffYear = (this.getCurrentDate.getTime() - this.getNaissanceMrh.getTime()) / 1000;
    diffYear /= (60 * 60 * 24);
    let difference = Math.abs(Math.round(diffYear / 365.25));

    if (this.clientRest.nom.trim().toString().length == 0) {
      this.warnmessage("Le nom du client n'est pas renseigné !");
      return;
    }

    if (this.clientRest.prenom.trim().toString().length == 0) {
      this.warnmessage("Le prénom du client n'est pas renseigné !");
      return;
    }

    if (this.clientRest.contact.trim().toString().length == 0) {
      this.warnmessage("Le contact du client n'est pas renseigné !");
      return;
    }

    if (this.clientRest.email.trim().toString().length == 0) {
      this.warnmessage("L'adresse mail du client n'est pas renseignée !");
      return;
    }

    // adresse geographique :
    if (this.adressegeographique.trim().toString().length == 0) {
      this.warnmessage("L'adresse géographique n'est pas renseignée !");
      return;
    }

    // situationgeographique
    if (this.situationgeographique.trim().toString().length == 0) {
      this.warnmessage("La situation géographique n'est pas renseignée !");
      return;
    }

    // Vérification sur le cout reel du bien :
    let tpCharge = this.coutreelmrh.replace(/[^0-9]/g, '');
    if (!/^[0-9]+$/.test(tpCharge)) {
      this.warnmessage("Le cout réel du bien renseigné n'est pas correct !");
      return;
    }


    // Now prepare the data :
    if (difference >= 18) {
      this.formData.append("nom", this.clientRest.nom.toString());
      this.formData.append("prenom", this.clientRest.prenom.toString());
      this.formData.append("contact", this.clientRest.contact.toString());
      this.formData.append("email", this.clientRest.email.toString());
      this.formData.append("datenaissance", dates);
      this.formData.append("civilite", this.clientRest.civilite.toString());
      this.formData.append("activite", this.clientRest.activite.toString());
      this.formData.append("typeduclient", this.typeclient.toString());
      this.formData.append("adressegeographique", this.adressegeographique.trim());
      this.formData.append("situationgeographique", this.situationgeographique.trim());
      this.formData.append("qualiteproposant", this.qualiteproposant.toString());
      this.formData.append("choixformule", this.choixformule.toString());
      this.formData.append("coutreelbien", tpCharge);
      this.formData.append("dateeffet", dateEffet);
      this.formData.append("dateexpiration", dateExpiration);
      this.formData.append("iddevismrh", this.id_mrh.toString());
      this.formData.append("idCliendDone", this.idCliendDone);
      this.formData.append("idclient", this.idClient);

      // Call :
      this.meswebservices.sendDevisMrh(this.formData).toPromise()
        .then(
          resultat => {
            if (resultat.code == "ok") {
              location.reload();
            }
          },
          (error) => {
            this.warnmessage("Impossible de d'enregistrer le RAPPORT !");
          }
        );
    }
    else {
      this.warnmessage("Le client est mineur pour souscrire à ce produit d'assurance !");
    }
  }




  // Save the DEVIS AUTO :
  enregDevisAuto() {

    // set the date :
    let momentVariable = moment(this.customerBirthDate, 'MM-DD-YYYY');
    let dates = momentVariable.format('YYYY-MM-DD');

    var diffYear = (this.getCurrentDate.getTime() - this.customerBirthDate.getTime()) / 1000;
    diffYear /= (60 * 60 * 24);
    let difference = Math.abs(Math.round(diffYear / 365.25));

    if (this.clientRest.nom.toString().length == 0) {
      this.warnmessage("Le nom du client n'est pas renseigné !");
      return;
    }

    if (this.clientRest.prenom.toString().length == 0) {
      this.warnmessage("Le prénom du client n'est pas renseigné !");
      return;
    }

    if (this.clientRest.contact.toString().length == 0) {
      this.warnmessage("Le contact du client n'est pas renseigné !");
      return;
    }

    if (this.clientRest.email.toString().length == 0) {
      this.warnmessage("L'adresse mail du client n'est pas renseignée !");
      return;
    }

    // Vérification sur la charge utile :
    let tpCharge = this.chargeutile.replace(/[^0-9]/g, '');
    if (!/^[0-9]+$/.test(tpCharge)) {
      this.warnmessage("La charge utile du véhicule renseignée n'est pas correcte !");
      return;
    }

    // Vérification sur la puissance du vehicule
    /*let tpPuissance = this.puissancevehicule.replace(/[^0-9]/g, '');
    if (!/^[0-9]+$/.test(tpPuissance)) {
      this.warnmessage("La puissance du véhicule renseignée n'est pas correcte !");
      return;
    }
    */


    // Now prepare the data :
    if (difference >= 18) {
      this.formData.append("nom", this.clientRest.nom.toString());
      this.formData.append("prenom", this.clientRest.prenom.toString());
      this.formData.append("contact", this.clientRest.contact.toString());
      this.formData.append("email", this.clientRest.email.toString());
      this.formData.append("datenaissance", dates);
      this.formData.append("civilite", this.clientRest.civilite.toString());
      this.formData.append("activite", this.clientRest.activite.toString());
      this.formData.append("typeduclient", this.typeclient.toString());
      this.formData.append("energievehicule", this.energievehicule.toString());
      this.formData.append("nombredeplace", this.nombreplacevehicule.toString());
      this.formData.append("puissancevehicule", this.puissanceVehicule.toString());
      this.formData.append("chargeutile", tpCharge.trim());
      this.formData.append("dureecontrat", this.dureecontrat.toString());
      this.formData.append("offrecommerciale", this.offrecommerciale.toString());
      this.formData.append("plafondindemnisation", this.plafondindemnisation);
      this.formData.append("indemnitemax", this.indemnitemax.toString());
      this.formData.append("coutproduit", this.coutproduit.toString());
      this.formData.append("iddevisauto", this.id_devisauto.toString());
      this.formData.append("idCliendDone", this.idCliendDone);
      this.formData.append("idclient", this.idClient);

      // Call :
      this.meswebservices.sendDevisAuto(this.formData).toPromise()
        .then(
          resultat => {
            if (resultat.code == "ok") {
              location.reload();
            }
          },
          (error) => {
            this.warnmessage("Impossible de d'enregistrer le RAPPORT !");
          }
        );
    }
    else {
      this.warnmessage("Le client est mineur pour souscrire à ce produit d'assurance !");
    }
  }



  // Enregistrer 'DEVIS - ACCIDENT'
  // Save the DEVIS AUTO :
  enregDevisAccident() {

    // set the date :
    let momentVariable = moment(this.getDate, 'MM-DD-YYYY');
    let dates = momentVariable.format('YYYY-MM-DD');

    var diffYear = (this.getCurrentDate.getTime() - this.getDate.getTime()) / 1000;
    diffYear /= (60 * 60 * 24);
    let difference = Math.abs(Math.round(diffYear / 365.25));

    if (this.clientRest.nom.toString().length == 0) {
      this.warnmessage("Le nom du client n'est pas renseigné !");
      return;
    }

    if (this.clientRest.prenom.toString().length == 0) {
      this.warnmessage("Le prénom du client n'est pas renseigné !");
      return;
    }

    if (this.clientRest.contact.toString().length == 0) {
      this.warnmessage("Le contact du client n'est pas renseigné !");
      return;
    }

    if (this.clientRest.email.toString().length == 0) {
      this.warnmessage("L'adresse mail du client n'est pas renseignée !");
      return;
    }

    // Vérification sur le CAPITAL DECES :
    let tpCapitaldeces = this.capitaldeces.replace(/[^0-9]/g, '');
    if (!/^[0-9]+$/.test(tpCapitaldeces)) {
      this.warnmessage("Le Capital Décès renseigné est incorrect !");
      return;
    }

    // Vérification sur le CAPITAL - INFIRMITE
    let tpCapitalinfirmite = this.capitalinfirmite.replace(/[^0-9]/g, '');
    if (!/^[0-9]+$/.test(tpCapitalinfirmite)) {
      this.warnmessage("Ld Capital Infirmité est pas incorrect !");
      return;
    }


    // Now prepare the data :
    if (difference >= 18) {
      this.formData.append("nom", this.clientRest.nom.toString());
      this.formData.append("prenom", this.clientRest.prenom.toString());
      this.formData.append("contact", this.clientRest.contact.toString());
      this.formData.append("email", this.clientRest.email.toString());
      this.formData.append("datenaissance", dates);
      this.formData.append("civilite", this.clientRest.civilite.toString());
      this.formData.append("activite", this.clientRest.activite.toString());
      this.formData.append("typeduclient", this.typeclient.toString());
      this.formData.append("capitaldeces", tpCapitaldeces);
      this.formData.append("capitalinfirmite", tpCapitalinfirmite);
      this.formData.append("fraisdetraitement", this.fraisdetraitement.toString());
      this.formData.append("idaccident", this.id_accident.toString());
      this.formData.append("idCliendDone", this.idCliendDone);
      this.formData.append("idclient", this.idClient);

      // Call :
      this.meswebservices.sendDevisAccident(this.formData).toPromise()
        .then(
          resultat => {
            if (resultat.code == "ok") {
              location.reload();
            }
          },
          (error) => {
            this.warnmessage("Impossible de d'enregistrer le RAPPORT !");
          }
        );
    }
    else {
      this.warnmessage("Le client est mineur pour souscrire à ce produit d'assurance !");
    }
  }






  // Save the DEVIS AUTO :
  enregDevisVoyage() {

    // set the date :
    let momentVariable = moment(this.getNaissVoyage, 'MM-DD-YYYY');
    let dates = momentVariable.format('YYYY-MM-DD');
    // : 
    let momentVariableDepart = moment(this.getJourDepart, 'MM-DD-YYYY');
    let dateDepart = momentVariableDepart.format('YYYY-MM-DD');
    // : 
    let momentVariableRetour = moment(this.getJourRetour, 'MM-DD-YYYY');
    let dateRetour = momentVariableRetour.format('YYYY-MM-DD');

    var diffYear = (this.getCurrentDate.getTime() - this.getNaissVoyage.getTime()) / 1000;
    diffYear /= (60 * 60 * 24);
    let difference = Math.abs(Math.round(diffYear / 365.25));

    if (this.clientRest.nom.toString().length == 0) {
      this.warnmessage("Le nom du client n'est pas renseigné !");
      return;
    }

    if (this.clientRest.prenom.toString().length == 0) {
      this.warnmessage("Le prénom du client n'est pas renseigné !");
      return;
    }

    if (this.clientRest.contact.toString().length == 0) {
      this.warnmessage("Le contact du client n'est pas renseigné !");
      return;
    }

    if (this.clientRest.email.toString().length == 0) {
      this.warnmessage("L'adresse mail du client n'est pas renseignée !");
      return;
    }

    // Now prepare the data :
    if (difference >= 18) {
      this.formData.append("nom", this.clientRest.nom.toString());
      this.formData.append("prenom", this.clientRest.prenom.toString());
      this.formData.append("contact", this.clientRest.contact.toString());
      this.formData.append("email", this.clientRest.email.toString());
      this.formData.append("datenaissance", dates);
      this.formData.append("civilite", this.clientRest.civilite.toString());
      this.formData.append("activite", this.clientRest.activite.toString());
      this.formData.append("typeduclient", this.typeclient.toString());

      this.formData.append("zone", this.zonedestination.toString());
      this.formData.append("pays", this.paysdestination.toString());
      this.formData.append("jourdepart", dateDepart);
      this.formData.append("jourretour", dateRetour);
      this.formData.append("idvoyage", this.id_voyage.toString());
      this.formData.append("idCliendDone", this.idCliendDone);
      this.formData.append("idclient", this.idClient);

      // Call :
      this.meswebservices.sendDevisVoyage(this.formData).toPromise()
        .then(
          resultat => {
            if (resultat.code == "ok") {
              location.reload();
            }
          },
          (error) => {
            this.warnmessage("Impossible de d'enregistrer le RAPPORT !");
          }
        );
    }
    else {
      this.warnmessage("Le client est mineur pour souscrire à ce produit d'assurance !");
    }
  }


  // Get DATA from MRH devis :
  getDevisMrhByTrader() {
    this.meswebservices.getDevisMrhByTrader().toPromise()
      .then(
        resultat => {
          this.listeDevisMrh = resultat;
          this.getDevisMrh = true;
          this.initTableMrh();
        },
        (error) => {
          this.getDevisMrh = true;
          this.initTableMrh();
        }
      );
  }



  // Get DATA from VOYAGE devis :
  getDevisVoyageByTrader() {
    this.meswebservices.getDevisVoyageByTrader().toPromise()
      .then(
        resultat => {
          this.listeDevisVoyage = resultat;
          this.getDevisVoyage = true;
          this.initTableVoyage();
        },
        (error) => {
          this.getDevisVoyage = true;
          this.initTableVoyage();
        }
      );
  }



  // Get DATA from AUTO devis :
  getDevisAutoByTrader() {
    this.meswebservices.getDevisAutoByTrader().toPromise()
      .then(
        resultat => {
          this.listeDevisAuto = resultat;
          this.getDevisAuto = true;
          this.initTableAuto();
          //this.separateurMillierOnTable();
        },
        (error) => {
          this.getDevisAuto = true;
          this.initTableAuto();
        }
      );
  }



  // Get DATA from AUTO devis :
  getDevisAccidentByTrader() {
    this.meswebservices.getDevisAccidentByTrader().toPromise()
      .then(
        resultat => {
          this.listeDevisAccident = resultat;
          this.getDevisAccident = true;
          this.initTableAccident();
          //this.separateurMillierOnTable();
        },
        (error) => {
          this.getDevisAccident = true;
          this.initTableAccident();
        }
      );
  }


  // Get DATA from AUTO devis :
  getStatsDevisForUser() {
    this.meswebservices.getStatsDevisForUser().toPromise()
      .then(
        resultat => {
          this.statsdevisuser = resultat;
        },
        (error) => {
        }
      );
  }


  // Display PAYMENT METHOD :
  choixpaiement( idDevis : string, devisType : number){
    // 1 : AUTO
    $('#modalpayment').modal();
  }


  // Get DATA from AUTO devis :
  getDevisAutoByIdauto(idauto: string) {
    this.meswebservices.getDevisAutoByIdauto(idauto).toPromise()
      .then(
        resultat => {
          // Process :
          this.clientRest.nom = resultat.nom;
          this.clientRest.prenom = resultat.prenom;
          this.clientRest.contact = resultat.contact;
          this.clientRest.email = resultat.email;

          this.clientRest.civilite = resultat.civilite;
          this.clientRest.activite = resultat.activite;
          this.typeclient = resultat.typeclient;
          this.energievehicule = resultat.energie;
          this.nombreplacevehicule = resultat.place;

          // Puissance vehicule :
          this.puissanceVehicule = parseInt(resultat.puissance.toString());
          //this.puissancevehicule = resultat.puissance.toString();

          this.chargeutile = resultat.chargeutile.toString();
          this.dureecontrat = resultat.dureecontrat;
          this.offrecommerciale = resultat.offrecommerciale;
          this.plafondindemnisation = resultat.plafond.toString();
          this.indemnitemax = resultat.indemnitemax;
          this.coutproduit = resultat.cout;
          this.id_devisauto = parseInt(idauto);
          this.idCliendDone = resultat.idCliendDone.toString();
          this.idClient = resultat.idClient.toString();

          //
          //let tDate = resultat.dates.toString().split("T");
          //this.getDate = new Date(tDate[0] + 'T' + resultat.heure);
          this.customerBirthDate = new Date(resultat.dates.toString());
          //alert("Dates : "+this.getDate);

          this.membresId = [];
          this.selectedItems = [];
          $('#modalAutomobile').modal();
          this.computePrice();
          //alert("OK");
        },
        (error) => {

        }
      );
  }





  // Get DATA from ACCIDENT devis :
  getDevisAccidentByIdacc(idacc: string) {

    this.meswebservices.getDevisAccidentByIdacc(idacc).toPromise()
      .then(
        resultat => {
          // Process :
          this.clientRest.nom = resultat.nom;
          this.clientRest.prenom = resultat.prenom;
          this.clientRest.contact = resultat.contact;
          this.clientRest.email = resultat.email;

          this.clientRest.civilite = resultat.civilite;
          this.clientRest.activite = resultat.activite;
          this.typeclient = resultat.typeclient;

          // ACCIDENT data :
          this.capitaldeces = resultat.capitaldeces.toString();
          this.capitalinfirmite = resultat.capitalinfirmite.toString();
          this.fraisdetraitement = resultat.fraisdetraitement;

          this.id_accident = resultat.idacc;
          this.idCliendDone = resultat.idCliendDone.toString();
          this.idClient = resultat.idClient.toString();

          //
          this.getDate = new Date(resultat.dates.toString());

          this.membresId = [];
          this.selectedItems = [];
          $('#modalAccident').modal();
        },
        (error) => {
        }
      );
  }




  // Get DATA from VOYAGE devis :
  getDevisVoyageByIdvoy(idvoy: string) {

    this.meswebservices.getDevisVoyageByIdvoy(idvoy).toPromise()
      .then(
        resultat => {

          // Process :
          this.clientRest.nom = resultat.nom;
          this.clientRest.prenom = resultat.prenom;
          this.clientRest.contact = resultat.contact;
          this.clientRest.email = resultat.email;

          this.clientRest.civilite = resultat.civilite;
          this.clientRest.activite = resultat.activite;
          this.typeclient = resultat.typeclient;


          this.id_voyage = resultat.idvoy;
          this.idCliendDone = resultat.idCliendDone.toString();
          this.idClient = resultat.idClient.toString();

          //
          //alert(resultat.datenaissance.toString());
          //alert(resultat.datedepart.toString());
          //alert(resultat.dateretour.toString());
          this.getNaissVoyage = new Date(resultat.datenaissance.toString());
          this.getJourDepart = new Date(resultat.datedepart.toString());
          this.getJourRetour = new Date(resultat.dateretour.toString());

          // VOYAGE data :
          this.zonedestination = resultat.zonedestination;
          // update the 'DROPDOWN list'
          this.getpaysdestination();
          this.updateDevVoyage = true;
          this.updatePaysDevVoyage = resultat.paysdestination;
          //this.paysdestination = resultat.paysdestination;


          this.membresId = [];
          this.selectedItems = [];
          $('#modalVoyage').modal();
        },
        (error) => {
        }
      );
  }




  // Get DATA from ACCIDENT devis :
  getDevisMrhByIdacc(idmrh: string) {
    this.meswebservices.getDevisMrhByIdacc(idmrh).toPromise()
      .then(
        resultat => {
          // Process :
          this.clientRest.nom = resultat.nom;
          this.clientRest.prenom = resultat.prenom;
          this.clientRest.contact = resultat.contact;
          this.clientRest.email = resultat.email;
          this.clientRest.civilite = resultat.civilite;
          this.clientRest.activite = resultat.activite;
          this.typeclient = resultat.typeclient;

          // MRH data :
          this.adressegeographique = resultat.adresse.toString();
          this.situationgeographique = resultat.situation.toString();
          this.qualiteproposant = resultat.proposant;
          this.choixformule = resultat.formule;
          this.coutreelmrh = resultat.coutbien.toString();

          this.id_mrh = resultat.idmrh;
          this.idCliendDone = resultat.idCliendDone.toString();
          this.idClient = resultat.idClient.toString();

          //
          this.getNaissanceMrh = new Date(resultat.dates.toString());
          this.getDateEffet = new Date(resultat.dateeffet.toString());
          this.getDateExpiration = new Date(resultat.dateexpiration.toString());

          // Update 'RUBRIQUE'
          this.selectformule();

          // change 'COUT REEL BIEN' :


          this.membresId = [];
          this.selectedItems = [];
          $('#modalMrh').modal();
        },
        (error) => {
        }
      );
  }





  initTableAuto() {
    setTimeout(function () {
      $('#datatableAuto').DataTable({
        "pagingType": "full_numbers",
        "lengthMenu": [
          [10, 25, 50, -1],
          [10, 25, 50, "All"]
        ],
        responsive: true,
        language: {
          search: "_INPUT_",
          searchPlaceholder: "Search records",
        },
        "order": [[4, "desc"]]
      });
    }, 500);
  }


  // initTableAccident
  initTableAccident() {
    setTimeout(function () {
      $('#datatableAccident').DataTable({
        "pagingType": "full_numbers",
        "lengthMenu": [
          [10, 25, 50, -1],
          [10, 25, 50, "All"]
        ],
        responsive: true,
        language: {
          search: "_INPUT_",
          searchPlaceholder: "Search records",
        },
        "order": [[4, "desc"]]
      });
    }, 500);
  }


  // initTableMrh
  initTableMrh() {
    setTimeout(function () {
      $('#datatableMrh').DataTable({
        "pagingType": "full_numbers",
        "lengthMenu": [
          [10, 25, 50, -1],
          [10, 25, 50, "All"]
        ],
        responsive: true,
        language: {
          search: "_INPUT_",
          searchPlaceholder: "Search records",
        },
        "order": [[3, "desc"]]
      });
    }, 500);
  }


  // initTableVoyage
  initTableVoyage() {
    setTimeout(function () {
      $('#datatableVoyage').DataTable({
        "pagingType": "full_numbers",
        "lengthMenu": [
          [10, 25, 50, -1],
          [10, 25, 50, "All"]
        ],
        responsive: true,
        language: {
          search: "_INPUT_",
          searchPlaceholder: "Search records",
        },
        "order": [[3, "desc"]]
      });
    }, 500);
  }



  warnmessage(information: string) {
    $.notify({
      icon: 'notifications',
      message: information
    }, {
      type: 'danger',
      timer: 3000,
      placement: {
        from: 'top',
        align: 'left'
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




  separateurMillierOnFields() {
    $('.keymontant').each(function () {
      if (/^[0-9]+$/.test($(this).val())) {
        var tampon = parseInt($(this).val());
        $(this).val(tampon.toLocaleString());
      }
    }).focus(function () {
      var mtamp = $(this).val();
      if (!/^([0-9]*\.[0-9]+|[0-9]+)$/.test(mtamp)) {
        $(this).val(mtamp.replace(/[^-0-9]/g, ''));
      }
    }).blur(function () {
      if (/^\-?[0-9]+$/.test($(this).val())) {
        var tampon = parseInt($(this).val());
        $(this).val(tampon.toLocaleString());
      }
      else $(this).val("0");
    });
  }



  separateurMillierOnTable() {
    setTimeout(function () {
      $('.displaycout').each(function () {
        if (/^[0-9]+$/.test($(this).val())) {
          var tampon = parseInt($(this).val());
          $(this).val(tampon.toLocaleString());
        }
      });/*.focus(function () {
        var mtamp = $(this).val();

        if (!/^([0-9]*\.[0-9]+|[0-9]+)$/.test(mtamp) ) {
          $(this).val(mtamp.replace(/[^-0-9]/g, ''));
        }
		
      }).blur(function () {
        if (/^\-?[0-9]+$/.test($(this).val())) {
          var tampon = parseInt($(this).val());
          $(this).val(tampon.toLocaleString());
        }
      });*/

    }, 500);
  }


}
