import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Activite } from 'src/app/mesbeans/activite';
import { BeanDonneDevis } from 'src/app/mesbeans/beandonneedevis';
import { Civilite } from 'src/app/mesbeans/civilite';
import { ClientRest } from 'src/app/mesbeans/clientrest';
import { Detailequipe } from 'src/app/mesbeans/detailequipe';
import { Detailtable } from 'src/app/mesbeans/detailnomenclature';
import { Indemnitemax } from 'src/app/mesbeans/indemnitemax';
import { Motifpaiement } from 'src/app/mesbeans/motifpaiement';
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
  getPoliceMrh = false;
  getPoliceSante = false
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
  chequeFormData = new FormData();
  presenceCni = true;
  presencePhoto = true;
  presencePhotoCheque = false;
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
  origineclient = 0;
  // 
  getCurrentDate = new Date();
  customerBirthDate = new Date();
  id_devisauto = 0;

  //
  listeDevisAuto: BeanDonneDevis[];
  listeDevisAccident: BeanDonneDevis[];
  listeDevisVoyage: BeanDonneDevis[];
  listeDevisMrh: BeanDonneDevis[];
  listeDevisSante: BeanDonneDevis[];
  getDevisAuto = false;
  getDevisAccident = false;
  getDevisVoyage = false;
  getDevisMrh = false;
  getDevisSante = false;
  statsdevisuser = new StatsDevisUser();
  totalStatsdevis = "0";
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

  // SANTE :
  taille = 0;
  poids = 0;
  listeGroupeSanguin: Detailtable[];
  listeFormuleSante: Detailtable[];
  getListeFormuleSante = false;
  formulesante = 0;
  groupesanguin = 0;
  idsante = 0;

  numpolice = "";
  numclient = "";
  nmapporteur = "";
  libcode = "";
  libinspection = "";

  tensionarterielle = "";
  getNaissanceSante = new Date();
  basicDatepickerSante = "";
  lieunaissance = "";
  quartierresidence = "";
  adressepostale = "";
  id_devissante = 0;
  /* conjoint(e) */
  nomconjoint = "";
  prenomconjoint = "";
  contactconjoint = "";
  tailleconjoint = 0;
  poidsconjoint = 0;
  groupesanguinconjoint = 0;
  tensionarterielleconjoint = "";
  getNaissanceSanteConjoint = new Date();
  basicDatepickerSanteConjoint = "";
  lieunaissanceconjoint = "";
  quartierresidenceconjoint = "";
  adressepostaleconjoint = "";
  civiliteconjoint : number;
  /* 1er ENFANT */
  nomEnfantUn = "";
  prenomEnfantUn = "";
  tailleEnfantUn = 0;
  poidsEnfantUn = 0;
  sexeEnfantUn = 0;
  contactEnfantUn = "";
  groupesanguinEnfantUn = 0;
  tensionarterielleEnfantUn = "";
  getNaissanceSanteEnfantUn = new Date();
  basicDatepickerSanteEnfantUn = "";
  lieunaissanceEnfantUn = "";
  villeEnfantUn = "";
  emailEnfantUn = "";
  /* 2eme ENFANT */
  nomEnfantDe = "";
  prenomEnfantDe = "";
  tailleEnfantDe = 0;
  poidsEnfantDe = 0;
  sexeEnfantDe = 0;
  contactEnfantDe = "";
  groupesanguinEnfantDe = 0;
  tensionarterielleEnfantDe = "";
  getNaissanceSanteEnfantDe = new Date();
  basicDatepickerSanteEnfantDe = "";
  lieunaissanceEnfantDe = "";
  villeEnfantDe = "";
  emailEnfantDe = "";
  /* 3eme ENFANT */
  nomEnfantTr = "";
  prenomEnfantTr = "";
  tailleEnfantTr = 0;
  poidsEnfantTr = 0;
  sexeEnfantTr = 0;
  contactEnfantTr = "";
  groupesanguinEnfantTr = 0;
  tensionarterielleEnfantTr = "";
  getNaissanceSanteEnfantTr = new Date();
  basicDatepickerSanteEnfantTr = "";
  lieunaissanceEnfantTr = "";
  villeEnfantTr = "";
  emailEnfantTr = "";
  /* 4eme ENFANT */
  nomEnfantQu = "";
  prenomEnfantQu = "";
  tailleEnfantQu = 0;
  poidsEnfantQu = 0;
  sexeEnfantQu = 0;
  contactEnfantQu = "";
  groupesanguinEnfantQu = 0;
  tensionarterielleEnfantQu = "";
  getNaissanceSanteEnfantQu = new Date();
  basicDatepickerSanteEnfantQu = "";
  lieunaissanceEnfantQu = "";
  villeEnfantQu = "";
  emailEnfantQu = "";

  // Questionnaire medical :
  maladieAdherent = 0;
  maladieConjoint = 0;
  maladieEnfantUn = 0;
  maladieEnfantDe = 0;
  maladieEnfantTr = 0;
  maladieEnfantQu = 0;
  // Perte de poids
  pertepoidsAdherent = 0;
  pertepoidsConjoint = 0;
  pertepoidsEnfantUn = 0;
  pertepoidsEnfantDe = 0;
  pertepoidsEnfantTr = 0;
  pertepoidsEnfantQu = 0;
  // Ganglions
  ganglionAdherent = 0;
  ganglionConjoint = 0;
  ganglionEnfantUn = 0;
  ganglionEnfantDe = 0;
  ganglionEnfantTr = 0;
  ganglionEnfantQu = 0;
  // Coeur
  coeurAdherent = 0;
  coeurConjoint = 0;
  coeurEnfantUn = 0;
  coeurEnfantDe = 0;
  coeurEnfantTr = 0;
  coeurEnfantQu = 0;
  // Appareil digestif, foie
  foieAdherent = 0;
  foieConjoint = 0;
  foieEnfantUn = 0;
  foieEnfantDe = 0;
  foieEnfantTr = 0;
  foieEnfantQu = 0;
  // Appareil digestif, foie
  glandeAdherent = 0;
  glandeConjoint = 0;
  glandeEnfantUn = 0;
  glandeEnfantDe = 0;
  glandeEnfantTr = 0;
  glandeEnfantQu = 0;
  // anemie
  anemieAdherent = 0;
  anemieConjoint = 0;
  anemieEnfantUn = 0;
  anemieEnfantDe = 0;
  anemieEnfantTr = 0;
  anemieEnfantQu = 0;
  // colique
  coliqueAdherent = 0;
  coliqueConjoint = 0;
  coliqueEnfantUn = 0;
  coliqueEnfantDe = 0;
  coliqueEnfantTr = 0;
  coliqueEnfantQu = 0;
  // colique
  prostateAdherent = 0;
  prostateConjoint = 0;
  prostateEnfantUn = 0;
  prostateEnfantDe = 0;
  prostateEnfantTr = 0;
  prostateEnfantQu = 0;
  // enceinte
  enceinteAdherent = 0;
  enceinteConjoint = 0;
  enceinteEnfantUn = 0;
  enceinteEnfantDe = 0;
  enceinteEnfantTr = 0;
  enceinteEnfantQu = 0;
  // arthrose
  arthroseAdherent = 0;
  arthroseConjoint = 0;
  arthroseEnfantUn = 0;
  arthroseEnfantDe = 0;
  arthroseEnfantTr = 0;
  arthroseEnfantQu = 0;
  // yeux
  yeuxAdherent = 0;
  yeuxConjoint = 0;
  yeuxEnfantUn = 0;
  yeuxEnfantDe = 0;
  yeuxEnfantTr = 0;
  yeuxEnfantQu = 0;
  // lunettes
  lunettesAdherent = 0;
  lunettesConjoint = 0;
  lunettesEnfantUn = 0;
  lunettesEnfantDe = 0;
  lunettesEnfantTr = 0;
  lunettesEnfantQu = 0;
  // hospitalise
  hospitaliseAdherent = 0;
  hospitaliseConjoint = 0;
  hospitaliseEnfantUn = 0;
  hospitaliseEnfantDe = 0;
  hospitaliseEnfantTr = 0;
  hospitaliseEnfantQu = 0;
  // traitement
  traitementAdherent = 0;
  traitementConjoint = 0;
  traitementEnfantUn = 0;
  traitementEnfantDe = 0;
  traitementEnfantTr = 0;
  traitementEnfantQu = 0;

  // Cheque :
  numerocheque = "";
  idvirement = "";
  clientcheque = "";
  montantcheque = "0";
  banquemettrice = "";
  ribclient = "";
  donneurordre = "";
  id_devis = "0";
  getDateCheque = new Date();
  basicDatecheque = "";
  getDateVirement = new Date();
  basicDateVirement = "";
  chequebarre = true;
  devisType = 1;
  listeMotifPaiement: Motifpaiement[];
  idMotifPaiement = 0;
  devispaye = "";
  modepaiement = "";





  // M e t h o d :
  constructor(private meswebservices: MeswebservService, private traitements: Traitements) { }

  ngOnInit(): void {

    // Set DATA :
    this.statsdevisuser.auto = "0";
    this.statsdevisuser.accident = "0";
    this.statsdevisuser.voyage = "0";
    this.statsdevisuser.mrh = "0";
    this.statsdevisuser.sante = "0";
    this.statsdevisuser.total = "0";

    //this.menuIndemniteItems = lesIndemnites.filter(menuItem => menuItem);
    this.menuZoneItems = lesZonesDestinations.filter(menuItem => menuItem);
    this.menuPaysItems = lesPaysDestinations.filter(menuItem => menuItem);

    this.getclientforoperations();
    this.getLesCivilite();
    //this.getCivilite();
    this.getFraisTraitemente();
    this.getFormuleMrh();
    this.getGroupeSanguin();
    this.getFormuleSante();
    this.getAllActivities();
    this.getzonedestination();
    this.getMotifsPaiement();

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
    this.getDevisSanteByTrader();

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


  // make a test :
  displayPolice(){
    //alert("Police : "+this.setPolice);
  }


  // Afficher les POLICES AUTO :
  getlespolicesbyclient(): void {
    this.getPoliceAccident = false;
    this.meswebservices.getlespolicesbyclient(this.idCliendDone).toPromise()
      .then(
        resultat => {
          this.listePolices = resultat;
          // Pick first value of the list :
          if(this.setPolice.trim().length == 0) this.setPolice = resultat[0].Police.toString();
          this.getPolice = true;
        }
      )
  }

  getlespolicesaccidentbyclient(): void {
    this.getPoliceAccident = false;
    this.meswebservices.getlespolicesbyclient(this.idCliendDone).toPromise()
      .then(
        resultat => {
          this.listePolices = resultat;
          // Pick first value of the list :
          if(this.setPolice.trim().length == 0) this.setPolice = resultat[0].Police.toString();
          this.getPoliceAccident = true;
        }
      )
  }


  getlespolicesvoyagebyclient(): void {
    this.getPoliceVoyage = false;
    this.meswebservices.getlespolicesbyclient(this.idCliendDone).toPromise()
      .then(
        resultat => {
          this.listePolices = resultat;
          // Pick first value of the list :
          if(this.setPolice.trim().length == 0) this.setPolice = resultat[0].Police.toString();
          this.getPoliceVoyage = true;
        }
      )
  }


  getlespolicesmrhbyclient(): void {
    this.getPoliceMrh = false;
    this.meswebservices.getlespolicesbyclient(this.idCliendDone).toPromise()
      .then(
        resultat => {
          this.listePolices = resultat;
          // Pick first value of the list :
          if(this.setPolice.trim().length == 0) this.setPolice = resultat[0].Police.toString();
          this.getPoliceMrh = true;
        }
      )
  }


  // Look for 'POLICE' devis SANTE:
  getlespolicessantebyclient(): void {
    this.getPoliceSante = false;
    this.meswebservices.getlespolicesbyclient(this.idCliendDone).toPromise()
      .then(
        resultat => {
          this.listePolices = resultat;
          // Pick first value of the list :
          if(this.setPolice.trim().length == 0) this.setPolice = resultat[0].Police.toString();
          this.getPoliceSante = true;
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


  // Go to pull GROUPE SANGUIN , id : 14 :
  getGroupeSanguin(): void {
    this.meswebservices.getdonneeparametree("14").toPromise()
      .then(
        resultat => {
          this.listeGroupeSanguin = resultat;
          // Init 
          this.groupesanguin = resultat[0].idnmd;
          this.groupesanguinconjoint = resultat[0].idnmd;
          this.groupesanguinEnfantUn = resultat[0].idnmd;
          this.groupesanguinEnfantDe = resultat[0].idnmd;
          this.groupesanguinEnfantTr = resultat[0].idnmd;
          this.groupesanguinEnfantQu = resultat[0].idnmd;
        }
      )
  }


  // Go to pull FORMULE SANTE , id : 15 :
  getFormuleSante(): void {
    this.meswebservices.getdonneeparametree("15").toPromise()
      .then(
        resultat => {
          this.listeFormuleSante = resultat;
          this.getListeFormuleSante = true;
          this.formulesante = resultat[0].idnmd;
        }
      )
  }


  // Get MOTIF PAIEMENT :
  getMotifsPaiement() {
    this.meswebservices.getMotifsPaiement().toPromise()
      .then(
        resultat => {
          this.listeMotifPaiement = resultat;
          this.idMotifPaiement = resultat[0].idmot;
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
      case 46:
        $('#form1').css('background-color', '#697FD0'); // Formule 1
        $('#form2').css('background-color', '#d1caca');
        $('#form3').css('background-color', '#d1caca');
        $('#form4').css('background-color', '#d1caca');
        break;

      case 47:
        $('#form1').css('background-color', '#d1caca');
        $('#form2').css('background-color', '#697FD0'); // Formule 1
        $('#form3').css('background-color', '#d1caca');
        $('#form4').css('background-color', '#d1caca');
        break;

      case 48:
        $('#form1').css('background-color', '#d1caca');
        $('#form2').css('background-color', '#d1caca');
        $('#form3').css('background-color', '#697FD0'); // Formule 3
        $('#form4').css('background-color', '#d1caca');
        break;

      case 49:
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
          this.civiliteconjoint = resultat[0].idciv;
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

    // Set values :
    this.setPolice = "";
    this.getPoliceMrh = false;
    this.clientRest.origine = 0;
    this.clientRest.observation = "";

    $('#modalMrh').modal();
  }



  // SANTE
  afficherSante() {
    // Clear :
    //if (this.formData.has("photo")) this.formData.delete("photo");
    //if (this.formData.has("cni")) this.formData.delete("cni");
    //this.presencePhoto = false;
    //this.presenceCni = false;

    // Reset :
    this.membresId = [];
    this.selectedItems = [];
    this.clientRest.activite = 1;

    // Set values :
    this.setPolice = "";
    this.getPoliceSante = false;
    this.clientRest.origine = 0;
    this.clientRest.observation = "";

    // 
    this.poids = 0;
    this.taille = 0;
    //
    this.tailleconjoint = 0;
    this.poidsconjoint = 0;

    $('#modalSante').modal();
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

    // Set values :
    this.setPolice = "";
    this.getPoliceVoyage = false;
    this.clientRest.origine = 0;
    this.clientRest.observation = "";

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

    // Set values :
    this.setPolice = "";
    this.getPoliceAccident = false;
    this.clientRest.origine = 0;
    this.clientRest.observation = "";

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
    //
    this.clientRest.origine = 0;
    this.clientRest.observation = "";

    // Reset : 
    this.membresId = [];
    this.selectedItems = [];
    this.clientRest.activite = 1;

    // Set values :
    this.setPolice = "";
    this.getPolice = false;

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


  onPhotoChequeSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      if (this.chequeFormData.has("photocheque")) this.chequeFormData.delete("photocheque");
      this.chequeFormData.append("photocheque", file);
      this.presencePhotoCheque = true;
    }
    else {
      if (this.chequeFormData.has("photocheque")) {
        this.presencePhotoCheque = false;
        this.chequeFormData.delete("photocheque");
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



  // Save DEVIS sante :
  enregDevisSante(){
    // Naissance 'ASSURE' :
    let momentVariable = moment(this.getNaissanceSante, 'MM-DD-YYYY');
    let dateAssure = momentVariable.format('YYYY-MM-DD');
    // Naissance 'Conjoint' :
    let momentConjoint = moment(this.getNaissanceSanteConjoint, 'MM-DD-YYYY');
    let dateConjoint = momentConjoint.format('YYYY-MM-DD');
    // Naissance '1er Enfant' :
    let momentEnfUn = moment(this.getNaissanceSanteEnfantUn, 'MM-DD-YYYY');
    let dateEnfUn = momentEnfUn.format('YYYY-MM-DD');
    // Naissance '2eme Enfant' :
    let momentEnfDe = moment(this.getNaissanceSanteEnfantDe, 'MM-DD-YYYY');
    let dateEnfDe = momentEnfDe.format('YYYY-MM-DD');
    // Naissance '3eme Enfant' :
    let momentEnfTr = moment(this.getNaissanceSanteEnfantTr, 'MM-DD-YYYY');
    let dateEnfTr = momentEnfTr.format('YYYY-MM-DD');
    // Naissance '4eme Enfant' :
    let momentEnfQu = moment(this.getNaissanceSanteEnfantQu, 'MM-DD-YYYY');
    let dateEnfQu = momentEnfQu.format('YYYY-MM-DD');


    var diffYear = (this.getCurrentDate.getTime() - this.getNaissanceSante.getTime()) / 1000;
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

    // Now prepare the data :
    if (difference >= 18) {
      // Assure
      this.formData.append("nomAssure", this.clientRest.nom.toString());
      this.formData.append("prenomAssure", this.clientRest.prenom.toString());
      this.formData.append("contactAssure", this.clientRest.contact.toString());
      this.formData.append("emailAssure", this.clientRest.email.toString());
      this.formData.append("naissanceAssure", dateAssure);
      this.formData.append("civiliteAssure", this.clientRest.civilite.toString());
      this.formData.append("activiteAssure", this.clientRest.activite.toString());
      this.formData.append("typeduclientAssure", this.typeclient.toString());
      this.formData.append("tailleAssure", this.taille.toString());
      this.formData.append("poidsAssure", this.poids.toString());
      this.formData.append("groupesanguinAssure", this.groupesanguin.toString());
      this.formData.append("tensionAssure", this.tensionarterielle);
      this.formData.append("lieunaissanceAssure", this.lieunaissance);
      this.formData.append("residenceAssure", this.quartierresidence);
      this.formData.append("adresseAssure", this.adressepostale);
      // Conjoint
      this.formData.append("civiliteConjoint", this.civiliteconjoint.toString());
      this.formData.append("tailleConjoint", this.tailleconjoint.toString());
      this.formData.append("poidsConjoint", this.poidsconjoint.toString());
      this.formData.append("groupesanguinConjoint", this.groupesanguinconjoint.toString());
      this.formData.append("tensionConjoint", this.tensionarterielleconjoint);
      this.formData.append("nomConjoint", this.nomconjoint.toString());
      this.formData.append("prenomConjoint", this.prenomconjoint.toString());
      this.formData.append("naissanceConjoint", dateConjoint);
      this.formData.append("lieunaissanceConjoint", this.lieunaissanceconjoint);
      this.formData.append("residenceConjoint", this.quartierresidenceconjoint);
      this.formData.append("adresseConjoint", this.adressepostaleconjoint);
      this.formData.append("contactConjoint", this.contactconjoint);
      // 1er Enfant
      this.formData.append("nomEnfantUn", this.nomEnfantUn);
      this.formData.append("tailleEnfantUn", this.tailleEnfantUn.toString());
      this.formData.append("prenomEnfantUn", this.prenomEnfantUn.toString());
      this.formData.append("poidsEnfantUn", this.poidsEnfantUn.toString());
      this.formData.append("sexeEnfantUn", this.sexeEnfantUn.toString());
      this.formData.append("groupesanguinEnfantUn", this.groupesanguinEnfantUn.toString());
      this.formData.append("tensionEnfantUn", this.tensionarterielleEnfantUn);
      this.formData.append("naissanceEnfantUn", dateEnfUn);
      this.formData.append("lieunaissanceEnfantUn", this.lieunaissanceEnfantUn);
      this.formData.append("contactEnfantUn", this.contactEnfantUn);
      this.formData.append("emailEnfantUn", this.emailEnfantUn);
      this.formData.append("villeEnfantUn", this.villeEnfantUn);
      // 2eme Enfant
      this.formData.append("nomEnfantDe", this.nomEnfantDe);
      this.formData.append("tailleEnfantDe", this.tailleEnfantDe.toString());
      this.formData.append("prenomEnfantDe", this.prenomEnfantDe.toString());
      this.formData.append("poidsEnfantDe", this.poidsEnfantDe.toString());
      this.formData.append("sexeEnfantDe", this.sexeEnfantDe.toString());
      this.formData.append("groupesanguinEnfantDe", this.groupesanguinEnfantDe.toString());
      this.formData.append("tensionEnfantDe", this.tensionarterielleEnfantDe);
      this.formData.append("naissanceEnfantDe", dateEnfUn);
      this.formData.append("lieunaissanceEnfantDe", this.lieunaissanceEnfantDe);
      this.formData.append("contactEnfantDe", this.contactEnfantDe);
      this.formData.append("emailEnfantDe", this.emailEnfantDe);
      this.formData.append("villeEnfantDe", this.villeEnfantDe);
      // 3eme Enfant
      this.formData.append("nomEnfantTr", this.nomEnfantTr);
      this.formData.append("tailleEnfantTr", this.tailleEnfantTr.toString());
      this.formData.append("prenomEnfantTr", this.prenomEnfantTr.toString());
      this.formData.append("poidsEnfantTr", this.poidsEnfantTr.toString());
      this.formData.append("sexeEnfantTr", this.sexeEnfantTr.toString());
      this.formData.append("groupesanguinEnfantTr", this.groupesanguinEnfantTr.toString());
      this.formData.append("tensionEnfantTr", this.tensionarterielleEnfantTr);
      this.formData.append("naissanceEnfantTr", dateEnfUn);
      this.formData.append("lieunaissanceEnfantTr", this.lieunaissanceEnfantTr);
      this.formData.append("contactEnfantTr", this.contactEnfantTr);
      this.formData.append("emailEnfantTr", this.emailEnfantTr);
      this.formData.append("villeEnfantTr", this.villeEnfantTr);
      // 4eme Enfant
      this.formData.append("nomEnfantQu", this.nomEnfantQu);
      this.formData.append("tailleEnfantQu", this.tailleEnfantQu.toString());
      this.formData.append("prenomEnfantQu", this.prenomEnfantQu.toString());
      this.formData.append("poidsEnfantQu", this.poidsEnfantQu.toString());
      this.formData.append("sexeEnfantQu", this.sexeEnfantQu.toString());
      this.formData.append("groupesanguinEnfantQu", this.groupesanguinEnfantQu.toString());
      this.formData.append("tensionEnfantQu", this.tensionarterielleEnfantQu);
      this.formData.append("naissanceEnfantQu", dateEnfUn);
      this.formData.append("lieunaissanceEnfantQu", this.lieunaissanceEnfantQu);
      this.formData.append("contactEnfantQu", this.contactEnfantQu);
      this.formData.append("emailEnfantQu", this.emailEnfantQu);
      this.formData.append("villeEnfantQu", this.villeEnfantQu);

      // Questionnaire medical :
      this.formData.append("maladieAdherent", this.maladieAdherent.toString());
      this.formData.append("maladieConjoint", this.maladieConjoint.toString());
      this.formData.append("maladieEnfantUn", this.maladieEnfantUn.toString());
      this.formData.append("maladieEnfantDe", this.maladieEnfantDe.toString());
      this.formData.append("maladieEnfantTr", this.maladieEnfantTr.toString());
      this.formData.append("maladieEnfantQu", this.maladieEnfantQu.toString());
      // Perte de poids
      this.formData.append("pertepoidsAdherent", this.pertepoidsAdherent.toString());
      this.formData.append("pertepoidsConjoint", this.pertepoidsConjoint.toString());
      this.formData.append("pertepoidsEnfantUn", this.pertepoidsEnfantUn.toString());
      this.formData.append("pertepoidsEnfantDe", this.pertepoidsEnfantDe.toString());
      this.formData.append("pertepoidsEnfantTr", this.pertepoidsEnfantTr.toString());
      this.formData.append("pertepoidsEnfantQu", this.pertepoidsEnfantQu.toString());
      // Ganglions
      this.formData.append("ganglionAdherent", this.ganglionAdherent.toString());
      this.formData.append("ganglionConjoint", this.ganglionConjoint.toString());
      this.formData.append("ganglionEnfantUn", this.ganglionEnfantUn.toString());
      this.formData.append("ganglionEnfantDe", this.ganglionEnfantDe.toString());
      this.formData.append("ganglionEnfantTr", this.ganglionEnfantTr.toString());
      this.formData.append("ganglionEnfantQu", this.ganglionEnfantQu.toString());
      // Coeur
      this.formData.append("coeurAdherent", this.coeurAdherent.toString());
      this.formData.append("coeurConjoint", this.coeurConjoint.toString());
      this.formData.append("coeurEnfantUn", this.coeurEnfantUn.toString());
      this.formData.append("coeurEnfantDe", this.coeurEnfantDe.toString());
      this.formData.append("coeurEnfantTr", this.coeurEnfantTr.toString());
      this.formData.append("coeurEnfantQu", this.coeurEnfantQu.toString());
      // Appareil digestif, foie
      this.formData.append("foieAdherent", this.foieAdherent.toString());
      this.formData.append("foieConjoint", this.foieConjoint.toString());
      this.formData.append("foieEnfantUn", this.foieEnfantUn.toString());
      this.formData.append("foieEnfantDe", this.foieEnfantDe.toString());
      this.formData.append("foieEnfantTr", this.foieEnfantTr.toString());
      this.formData.append("foieEnfantQu", this.foieEnfantQu.toString());
      // glande
      this.formData.append("glandeAdherent", this.glandeAdherent.toString());
      this.formData.append("glandeConjoint", this.glandeConjoint.toString());
      this.formData.append("glandeEnfantUn", this.glandeEnfantUn.toString());
      this.formData.append("glandeEnfantDe", this.glandeEnfantDe.toString());
      this.formData.append("glandeEnfantTr", this.glandeEnfantTr.toString());
      this.formData.append("glandeEnfantQu", this.glandeEnfantQu.toString());
      // anemie
      this.formData.append("anemieAdherent", this.anemieAdherent.toString());
      this.formData.append("anemieConjoint", this.anemieConjoint.toString());
      this.formData.append("anemieEnfantUn", this.anemieEnfantUn.toString());
      this.formData.append("anemieEnfantDe", this.anemieEnfantDe.toString());
      this.formData.append("anemieEnfantTr", this.anemieEnfantTr.toString());
      this.formData.append("anemieEnfantQu", this.anemieEnfantQu.toString());
      // colique
      this.formData.append("coliqueAdherent", this.coliqueAdherent.toString());
      this.formData.append("coliqueConjoint", this.coliqueConjoint.toString());
      this.formData.append("coliqueEnfantUn", this.coliqueEnfantUn.toString());
      this.formData.append("coliqueEnfantDe", this.coliqueEnfantDe.toString());
      this.formData.append("coliqueEnfantTr", this.coliqueEnfantTr.toString());
      this.formData.append("coliqueEnfantQu", this.coliqueEnfantQu.toString());
      // colique
      this.formData.append("prostateAdherent", this.prostateAdherent.toString());
      this.formData.append("prostateConjoint", this.prostateConjoint.toString());
      this.formData.append("prostateEnfantUn", this.prostateEnfantUn.toString());
      this.formData.append("prostateEnfantDe", this.prostateEnfantDe.toString());
      this.formData.append("prostateEnfantTr", this.prostateEnfantTr.toString());
      this.formData.append("prostateEnfantQu", this.prostateEnfantQu.toString());
      // enceinte
      this.formData.append("enceinteAdherent", this.enceinteAdherent.toString());
      this.formData.append("enceinteConjoint", this.enceinteConjoint.toString());
      this.formData.append("enceinteEnfantUn", this.enceinteEnfantUn.toString());
      this.formData.append("enceinteEnfantDe", this.enceinteEnfantDe.toString());
      this.formData.append("enceinteEnfantTr", this.enceinteEnfantTr.toString());
      this.formData.append("enceinteEnfantQu", this.enceinteEnfantQu.toString());
      // arthrose
      this.formData.append("arthroseAdherent", this.arthroseAdherent.toString());
      this.formData.append("arthroseConjoint", this.arthroseConjoint.toString());
      this.formData.append("arthroseEnfantUn", this.arthroseEnfantUn.toString());
      this.formData.append("arthroseEnfantDe", this.arthroseEnfantDe.toString());
      this.formData.append("arthroseEnfantTr", this.arthroseEnfantTr.toString());
      this.formData.append("arthroseEnfantQu", this.arthroseEnfantQu.toString());
      // yeux                                  
      this.formData.append("yeuxAdherent", this.yeuxAdherent.toString());
      this.formData.append("yeuxConjoint", this.yeuxConjoint.toString());
      this.formData.append("yeuxEnfantUn", this.yeuxEnfantUn.toString());
      this.formData.append("yeuxEnfantDe", this.yeuxEnfantDe.toString());
      this.formData.append("yeuxEnfantTr", this.yeuxEnfantTr.toString());
      this.formData.append("yeuxEnfantQu", this.yeuxEnfantQu.toString());
      // lunettes                             
      this.formData.append("lunettesAdherent", this.lunettesAdherent.toString());
      this.formData.append("lunettesConjoint", this.lunettesConjoint.toString());
      this.formData.append("lunettesEnfantUn", this.lunettesEnfantUn.toString());
      this.formData.append("lunettesEnfantDe", this.lunettesEnfantDe.toString());
      this.formData.append("lunettesEnfantTr", this.lunettesEnfantTr.toString());
      this.formData.append("lunettesEnfantQu", this.lunettesEnfantQu.toString());
      // hospitalise                          
      this.formData.append("hospitaliseAdherent", this.hospitaliseAdherent.toString());
      this.formData.append("hospitaliseConjoint", this.hospitaliseConjoint.toString());
      this.formData.append("hospitaliseEnfantUn", this.hospitaliseEnfantUn.toString());
      this.formData.append("hospitaliseEnfantDe", this.hospitaliseEnfantDe.toString());
      this.formData.append("hospitaliseEnfantTr", this.hospitaliseEnfantTr.toString());
      this.formData.append("hospitaliseEnfantQu", this.hospitaliseEnfantQu.toString());
      // traitement                           
      this.formData.append("traitementAdherent", this.traitementAdherent.toString());
      this.formData.append("traitementConjoint", this.traitementConjoint.toString());
      this.formData.append("traitementEnfantUn", this.traitementEnfantUn.toString());
      this.formData.append("traitementEnfantDe", this.traitementEnfantDe.toString());
      this.formData.append("traitementEnfantTr", this.traitementEnfantTr.toString());
      this.formData.append("traitementEnfantQu", this.traitementEnfantQu.toString());

      // Data PERSONAL :
      this.formData.append("iddevissante", this.id_devissante.toString());
      this.formData.append("idCliendDone", this.idCliendDone);
      this.formData.append("idclient", this.idClient);
      //
      this.formData.append("origine", this.clientRest.origine.toString());
      this.formData.append("observation", this.clientRest.observation.toString());
      this.formData.append("police", this.setPolice);

      // Call :
      this.meswebservices.sendDevisSante(this.formData).toPromise()
        .then(
          resultat => {
            if (resultat.code == "ok") {
              location.reload();
            }
          },
          (error) => {
            this.warnmessage("Impossible d'enregistrer le DEVIS SANTE !");
          }
        );
    }
    else {
      this.warnmessage("Le client est mineur pour souscrire à ce produit d'assurance !");
    }

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
      //
      this.formData.append("origine", this.clientRest.origine.toString());
      this.formData.append("observation", this.clientRest.observation.toString());
      this.formData.append("police", this.setPolice);

      // Call :
      this.meswebservices.sendDevisMrh(this.formData).toPromise()
        .then(
          resultat => {
            if (resultat.code == "ok") {
              location.reload();
            }
          },
          (error) => {
            this.warnmessage("Impossible d'enregistrer le DEVIS MRH !");
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
      //
      this.formData.append("origine", this.clientRest.origine.toString());
      this.formData.append("observation", this.clientRest.observation.toString());
      this.formData.append("police", this.setPolice);

      // Call :
      this.meswebservices.sendDevisAuto(this.formData).toPromise()
        .then(
          resultat => {
            if (resultat.code == "ok") {
              location.reload();
            }
          },
          (error) => {
            this.warnmessage("Impossible d'enregistrer le DEVIS AUTO !");
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
      //
      this.formData.append("origine", this.clientRest.origine.toString());
      this.formData.append("observation", this.clientRest.observation.toString());
      this.formData.append("police", this.setPolice);

      // Call :
      this.meswebservices.sendDevisAccident(this.formData).toPromise()
        .then(
          resultat => {
            if (resultat.code == "ok") {
              location.reload();
            }
          },
          (error) => {
            this.warnmessage("Impossible d'enregistrer le DEBIS ACCIDENT !");
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

      //
      this.formData.append("origine", this.clientRest.origine.toString());
      this.formData.append("observation", this.clientRest.observation.toString());
      this.formData.append("police", this.setPolice);

      // Call :
      this.meswebservices.sendDevisVoyage(this.formData).toPromise()
        .then(
          resultat => {
            if (resultat.code == "ok") {
              location.reload();
            }
          },
          (error) => {
            this.warnmessage("Impossible d'enregistrer le DEVIS VOYAGE !");
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



  // Get DATA from SANTE devis :
  getDevisSanteByTrader() {
    this.meswebservices.getDevisSanteByTrader().toPromise()
      .then(
        resultat => {
          this.listeDevisSante = resultat;
          this.getDevisSante = true;
          this.initTableSante();
        },
        (error) => {
          this.getDevisSante = true;
          this.initTableSante();
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


  // Display MORE DATA :
  infonsia(idsan: string){
    this.meswebservices.getInfoSanteByIdsan(idsan).toPromise()
      .then(
        resultat => {
          this.numpolice = resultat.numpolice;
          this.numclient = resultat.numclient;
          this.nmapporteur = resultat.apporteur;
          this.libcode = resultat.code;
          this.libinspection = resultat.inspection;
          this.formulesante = resultat.formule != 0 ? resultat.formule : this.formulesante;
          this.idsante = resultat.idsan;
        },
        (error) => {
        }
      )
    $('#infonsia').modal();
  }


  // Save INFONSIA :
  enregInfoSante(){
    var formInfoData = new FormData();
    formInfoData.append("numpolice", this.numpolice);
    formInfoData.append("numclient", this.numclient);
    formInfoData.append("nmapporteur", this.nmapporteur);
    formInfoData.append("libcode", this.libcode);
    formInfoData.append("libinspection", this.libinspection);
    formInfoData.append("formulesante", this.formulesante.toString());
    //
    formInfoData.append("idsan", this.idsante.toString());
    // sendInfoSante 
    this.meswebservices.sendInfoSante(formInfoData).toPromise()
    .then(
      resultat => {
        if (resultat.code == "ok") {
          location.reload();
        }
      },
      (error) => {
        this.warnmessage("Impossible d'enregistrer les informations SANTE supplémentaires  !");
      }
    );
  }


  // Display PAYMENT METHOD :
  choixpaiement(idDevis: string, devisType: number, nomclient: string, devispaye: string, modepaiement: string) {
    // 1 : AUTO
    // 2 : Voyage
    // 3 : Accident
    // 4 : Mrh
    this.devisType = devisType;
    this.id_devis = idDevis;
    this.clientcheque = nomclient;
    this.devispaye = devispaye;
    this.modepaiement = modepaiement;
    $('#modalpayment').modal();
  }


  // Choix interface :
  choixinterface(choix: number) {
    $('#modalpayment').modal('hide');
    // Go to PICK DATA , base on 'id_devis' and 'choix'
    if(choix == 1){
      // CHEQUE
      if((this.devispaye == "Oui") && (this.modepaiement =="Chèque")){
        // Call 'getChequeData' to display DATA :
        this.meswebservices.getChequeData(this.id_devis).toPromise()
        .then(
          resultat => {

            // Process :
            this.numerocheque = resultat.numerocheque.toString();
            this.clientcheque = resultat.nomemetteur.toString();
            this.montantcheque = resultat.montant.toString();
            this.banquemettrice = resultat.banquemettrice.toString();

            this.ribclient = resultat.rib.toString();
            this.getDateCheque = new Date(resultat.datemission.toString());
            this.donneurordre = resultat.donneurordre.toString();

            this.chequebarre = resultat.chequebarre == 1 ? true:false;
            this.idMotifPaiement = resultat.motif;

            // Display 
            $('#modalcheque').modal();
          },
          (error) => {
          }
        );
      }
      else if(this.modepaiement =="Virement") this.warnmessage("Ce devis avait été réglé premièrement par VIREMENT !");
      else $('#modalcheque').modal();
    }
    else{
      // Virement 
      if((this.devispaye == "Oui") && (this.modepaiement =="Virement")){
        // Call 'getChequeData' to display DATA :
        this.meswebservices.getVirementData(this.id_devis).toPromise()
        .then(
          resultat => {

            // Process :
            this.idvirement = resultat.numerocheque.toString();
            this.clientcheque = resultat.nomemetteur.toString();
            this.montantcheque = resultat.montant.toString();
            this.banquemettrice = resultat.banquemettrice.toString();

            this.ribclient = resultat.rib.toString();
            // Set DATE :
            this.getDateVirement = new Date(resultat.datemission.toString());
            this.donneurordre = resultat.donneurordre.toString();
            this.idMotifPaiement = resultat.motif;

            // Display 
            $('#modalvirement').modal();
          },
          (error) => {
          }
        );
      }
      else if(this.modepaiement =="Chèque") this.warnmessage("Ce devis avait été réglé premièrement par CHEQUE !");
      else $('#modalvirement').modal();
    } 
  }


  //
  enregCheque() {
    //alert("Statut : "+this.chequebarre);

    if((!this.presencePhotoCheque) || (!this.chequeFormData.has("photocheque"))){
      // Return :
      this.warnmessage("La photo du chèque n'a pas été ajoutée !");
      return;
    }

    if (this.numerocheque.trim().toString().length == 0) {
      this.warnmessage("Le numéro de chèque n'est pas renseigné !");
      return;
    }

    if (this.clientcheque.trim().toString().length == 0) {
      this.warnmessage("Le nom du client n'est pas renseigné !");
      return;
    }

    if (this.banquemettrice.trim().toString().length == 0) {
      this.warnmessage("Le libellé de la banque n'est pas renseigné !");
      return;
    }

    // RIB :
    if (this.ribclient.trim().toString().length == 0) {
      this.warnmessage("Le RIB n'est pas renseigné !");
      return;
    }

    // Donneur d'ordre :
    if (this.donneurordre.trim().toString().length == 0) {
      this.warnmessage("Le donneur d'ordre n'est pas spécifié !");
      return;
    }

    // Montant
    let tpCharge = this.montantcheque.replace(/[^0-9]/g, '');
    if (!/^[0-9]+$/.test(tpCharge)) {
      this.warnmessage("Le montant du chèque renseigné n'est pas correct !");
      return;
    }

    // Set DATA :
    this.chequeFormData.append("numerocheque", this.numerocheque.trim());
    this.chequeFormData.append("clientcheque", this.clientcheque.trim());
    this.chequeFormData.append("montantcheque", tpCharge);
    this.chequeFormData.append("banquemettrice", this.banquemettrice.trim());
    this.chequeFormData.append("ribclient", this.ribclient.trim());
    this.chequeFormData.append("iddevis", this.id_devis.trim());

    // date emission :
    let momentVariable = moment(this.getDateCheque, 'MM-DD-YYYY');
    let dateCheque = momentVariable.format('YYYY-MM-DD');
    this.chequeFormData.append("datemission", dateCheque);
    this.chequeFormData.append("donneurordre", this.donneurordre.trim());
    this.chequeFormData.append("chequebarre", (this.chequebarre == true ? "1" : "0"));
    this.chequeFormData.append("motif", this.idMotifPaiement.toString());

    // now call API to save data :
    this.meswebservices.sendPaiementCheque(this.chequeFormData).toPromise()
      .then(
        resultat => {
          if (resultat.code == "ok") {
            location.reload();
          }
        },
        (error) => {
          this.warnmessage("Impossible d'enregistrer le PAIEMENT !");
        }
      );
  }



    //
    enregVirement() {
  
      if (this.idvirement.trim().toString().length == 0) {
        this.warnmessage("L'identifiant du virement n'est pas renseigné !");
        return;
      }
  
      if (this.clientcheque.trim().toString().length == 0) {
        this.warnmessage("Le nom du client n'est pas renseigné !");
        return;
      }
  
      if (this.banquemettrice.trim().toString().length == 0) {
        this.warnmessage("Le libellé de la banque n'est pas renseigné !");
        return;
      }
  
      // RIB :
      if (this.ribclient.trim().toString().length == 0) {
        this.warnmessage("Le RIB n'est pas renseigné !");
        return;
      }
  
      // Donneur d'ordre :
      if (this.donneurordre.trim().toString().length == 0) {
        this.warnmessage("Le donneur d'ordre n'est pas spécifié !");
        return;
      }
  
      // Montant
      let tpCharge = this.montantcheque.replace(/[^0-9]/g, '');
      if (!/^[0-9]+$/.test(tpCharge)) {
        this.warnmessage("Le montant du virement renseigné n'est pas correct !");
        return;
      }
  
      // Set DATA :
      var ourFormData = new FormData();
      ourFormData.append("idvirement", this.idvirement.trim());
      ourFormData.append("clientcheque", this.clientcheque.trim());
      ourFormData.append("montant", tpCharge);
      ourFormData.append("banquemettrice", this.banquemettrice.trim());
      ourFormData.append("ribclient", this.ribclient.trim());
      ourFormData.append("iddevis", this.id_devis.trim());
  
      // date emission :
      let momentVariable = moment(this.getDateVirement, 'MM-DD-YYYY');
      let dateCheque = momentVariable.format('YYYY-MM-DD');
      ourFormData.append("datemission", dateCheque);
      ourFormData.append("donneurordre", this.donneurordre.trim());
      ourFormData.append("motif", this.idMotifPaiement.toString());
  
      // now call API to save data :
      this.meswebservices.sendPaiementVirement(ourFormData).toPromise()
        .then(
          resultat => {
            if (resultat.code == "ok") {
              location.reload();
            }
          },
          (error) => {
            this.warnmessage("Impossible d'enregistrer le PAIEMENT par VIREMENT !");
          }
        );
    }



  togglechequebarre(e) {
    this.chequebarre = e.checked;
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

          // Set up values for 'CUSTOMER DOP DOWN List':
          this.setPolice = resultat.police.toString();
          this.idCliendDone = resultat.idCliendDone.toString();
          if( parseInt(this.idCliendDone) > 0){
            this.selectedItems = [];
            this.membresId = [];
            // Set the drop down list values :
            for (var i = 0; i < this.listeDesClients.length; i++) {
              if (parseInt(this.idCliendDone) == this.listeDesClients[i].IdClient) {
                this.membresId.push({ 
                  item_id: this.listeDesClients[i].IdClient.toString(), 
                  item_text: this.listeDesClients[i].RAISONSOCIALE.toString() 
                });
                break;
              }
            }
            //
            this.selectedItems = this.membresId;


            // Process for 'POLICE':
            if(this.setPolice.trim().length > 0){
              this.getlespolicesbyclient();
            }
          }
          else{
            this.membresId = [];
            this.selectedItems = [];
          }


          this.idClient = resultat.idClient.toString();

          //
          this.clientRest.origine = resultat.origine;
          this.clientRest.observation = resultat.observation;

          //
          //let tDate = resultat.dates.toString().split("T");
          //this.getDate = new Date(tDate[0] + 'T' + resultat.heure);
          this.customerBirthDate = new Date(resultat.dates.toString());
          //alert("Dates : "+this.getDate);

          //this.membresId = [];
          //this.selectedItems = [];
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

          
          // Set up values for 'CUSTOMER DOP DOWN List':
          this.setPolice = resultat.police.toString();
          if( parseInt(this.idCliendDone) > 0){
            this.selectedItems = [];
            this.membresId = [];
            // Set the drop down list values :
            for (var i = 0; i < this.listeDesClients.length; i++) {
              if (parseInt(this.idCliendDone) == this.listeDesClients[i].IdClient) {
                this.membresId.push({ 
                  item_id: this.listeDesClients[i].IdClient.toString(), 
                  item_text: this.listeDesClients[i].RAISONSOCIALE.toString() 
                });
                break;
              }
            }
            //
            this.selectedItems = this.membresId;

            // Process for 'POLICE':
            if(this.setPolice.trim().length > 0){
              this.getlespolicesaccidentbyclient();
            }
          }
          else{
            this.membresId = [];
            this.selectedItems = [];
          }

          //
          this.clientRest.origine = resultat.origine;
          this.clientRest.observation = resultat.observation;
          
          //
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


          // Set up values for 'CUSTOMER DOP DOWN List':
          this.setPolice = resultat.police.toString();
          this.idCliendDone = resultat.idCliendDone.toString();
          this.membresId = [];
          this.selectedItems = [];
          if( parseInt(this.idCliendDone) > 0){
            // Set the drop down list values :
            for (var i = 0; i < this.listeDesClients.length; i++) {
              if (parseInt(this.idCliendDone) == this.listeDesClients[i].IdClient) {
                this.membresId.push({ 
                  item_id: this.listeDesClients[i].IdClient.toString(), 
                  item_text: this.listeDesClients[i].RAISONSOCIALE.toString() 
                });
                break;
              }
            }
            //
            this.selectedItems = this.membresId;

            // Process for 'POLICE':
            if(this.setPolice.trim().length > 0){
              this.getlespolicesvoyagebyclient();
            }
          }

          //
          this.clientRest.origine = resultat.origine;
          this.clientRest.observation = resultat.observation;
          $('#modalVoyage').modal();
        },
        (error) => {
        }
      );
  }




  // Get DATA from SANTE devis :
  getDevisSanteByIdsan(idsan: string) {
    this.meswebservices.getDevisSanteByIdsan(idsan).toPromise()
      .then(
        resultat => {
          // Assure :
          this.clientRest.nom = resultat.nomAssure;
          this.clientRest.prenom = resultat.prenomAssure;
          this.clientRest.contact = resultat.contactAssure;
          this.clientRest.email = resultat.emailAssure;
          this.clientRest.civilite = resultat.civiliteAssure;
          this.clientRest.activite = resultat.activiteAssure;
          this.typeclient = resultat.typeduclientAssure;
          this.getNaissanceSante = new Date(resultat.naissanceAssure.toString());
          // Info SANTE :
          this.tensionarterielle = resultat.tensionAssure;
          this.lieunaissance = resultat.lieunaissanceAssure;
          this.quartierresidence = resultat.residenceAssure;
          this.adressepostale = resultat.adresseAssure;
          this.taille = resultat.tailleAssure;
          this.poids = resultat.poidsAssure;
          this.groupesanguin = resultat.groupesanguinAssure;
          // Questionnaire MEDICAL :
          this.maladieAdherent = resultat.maladieAdherent;
          this.pertepoidsAdherent = resultat.pertepoidsAdherent;
          this.ganglionAdherent = resultat.ganglionAdherent;
          this.coeurAdherent = resultat.coeurAdherent;
          this.foieAdherent = resultat.foieAdherent;
          this.glandeAdherent = resultat.glandeAdherent;
          this.anemieAdherent = resultat.anemieAdherent;
          this.coliqueAdherent = resultat.coliqueAdherent;
          this.prostateAdherent = resultat.prostateAdherent;
          this.enceinteAdherent = resultat.enceinteAdherent;
          this.arthroseAdherent = resultat.arthroseAdherent;
          this.yeuxAdherent = resultat.yeuxAdherent;
          this.lunettesAdherent = resultat.lunettesAdherent;
          this.hospitaliseAdherent = resultat.hospitaliseAdherent;
          this.traitementAdherent = resultat.traitementAdherent;


          // Conjoint :
          this.nomconjoint = resultat.nomConjoint;
          this.prenomconjoint = resultat.prenomConjoint;
          this.contactconjoint = resultat.contactConjoint;
          this.civiliteconjoint = resultat.civiliteConjoint;
          this.getNaissanceSanteConjoint = new Date(resultat.naissanceConjoint.toString());
          // Info SANTE :
          this.tensionarterielleconjoint = resultat.tensionConjoint;
          this.lieunaissanceconjoint = resultat.lieunaissanceConjoint;
          this.quartierresidenceconjoint = resultat.residenceConjoint;
          this.adressepostaleconjoint = resultat.adresseConjoint;
          this.tailleconjoint = resultat.tailleConjoint;
          this.poidsconjoint = resultat.poidsConjoint;
          this.groupesanguinconjoint = resultat.groupesanguinConjoint;
          // Questionnaire MEDICAL :
          this.maladieConjoint = resultat.maladieConjoint;
          this.pertepoidsConjoint = resultat.pertepoidsConjoint;
          this.ganglionConjoint = resultat.ganglionConjoint;
          this.coeurConjoint = resultat.coeurConjoint;
          this.foieConjoint = resultat.foieConjoint;
          this.glandeConjoint = resultat.glandeConjoint;
          this.anemieConjoint = resultat.anemieConjoint;
          this.coliqueConjoint = resultat.coliqueConjoint;
          this.prostateConjoint = resultat.prostateConjoint;
          this.enceinteConjoint = resultat.enceinteConjoint;
          this.arthroseConjoint = resultat.arthroseConjoint;
          this.yeuxConjoint = resultat.yeuxConjoint;
          this.lunettesConjoint = resultat.lunettesConjoint;
          this.hospitaliseConjoint = resultat.hospitaliseConjoint;
          this.traitementConjoint = resultat.traitementConjoint;


          // 1er ENFANT :
          this.nomEnfantUn = resultat.nomEnfantUn;
          this.prenomEnfantUn = resultat.prenomEnfantUn;
          this.contactEnfantUn = resultat.contactEnfantUn;
          this.sexeEnfantUn = resultat.sexeEnfantUn;
          this.emailEnfantUn = resultat.emailEnfantUn;
          this.getNaissanceSanteEnfantUn = new Date(resultat.naissanceEnfantUn.toString());
          // Info SANTE :
          this.tensionarterielleEnfantUn = resultat.tensionEnfantUn;
          this.lieunaissanceEnfantUn = resultat.lieunaissanceEnfantUn;
          this.villeEnfantUn = resultat.residenceEnfantUn;
          this.tailleEnfantUn = resultat.tailleEnfantUn;
          this.poidsEnfantUn = resultat.poidsEnfantUn;
          this.groupesanguinEnfantUn = resultat.groupesanguinEnfantUn;
          // Questionnaire MEDICAL :
          this.maladieEnfantUn = resultat.maladieEnfantUn;
          this.pertepoidsEnfantUn = resultat.pertepoidsEnfantUn;
          this.ganglionEnfantUn = resultat.ganglionEnfantUn;
          this.coeurEnfantUn = resultat.coeurEnfantUn;
          this.foieEnfantUn = resultat.foieEnfantUn;
          this.glandeEnfantUn = resultat.glandeEnfantUn;
          this.anemieEnfantUn = resultat.anemieEnfantUn;
          this.coliqueEnfantUn = resultat.coliqueEnfantUn;
          this.prostateEnfantUn = resultat.prostateEnfantUn;
          this.enceinteEnfantUn = resultat.enceinteEnfantUn;
          this.arthroseEnfantUn = resultat.arthroseEnfantUn;
          this.yeuxEnfantUn = resultat.yeuxEnfantUn;
          this.lunettesEnfantUn = resultat.lunettesEnfantUn;
          this.hospitaliseEnfantUn = resultat.hospitaliseEnfantUn;
          this.traitementEnfantUn = resultat.traitementEnfantUn;


          // 2eme ENFANT :
          this.nomEnfantDe = resultat.nomEnfantDe;
          this.prenomEnfantDe = resultat.prenomEnfantDe;
          this.contactEnfantDe = resultat.contactEnfantDe;
          this.sexeEnfantDe = resultat.sexeEnfantDe;
          this.emailEnfantDe = resultat.emailEnfantDe;
          this.getNaissanceSanteEnfantDe = new Date(resultat.naissanceEnfantDe.toString());
          // Info SANTE :
          this.tensionarterielleEnfantDe = resultat.tensionEnfantDe;
          this.lieunaissanceEnfantDe = resultat.lieunaissanceEnfantDe;
          this.villeEnfantDe = resultat.residenceEnfantDe;
          this.tailleEnfantDe = resultat.tailleEnfantDe;
          this.poidsEnfantDe = resultat.poidsEnfantDe;
          this.groupesanguinEnfantDe = resultat.groupesanguinEnfantDe;
          // Questionnaire MEDICAL :
          this.maladieEnfantDe = resultat.maladieEnfantDe;
          this.pertepoidsEnfantDe = resultat.pertepoidsEnfantDe;
          this.ganglionEnfantDe = resultat.ganglionEnfantDe;
          this.coeurEnfantDe = resultat.coeurEnfantDe;
          this.foieEnfantDe = resultat.foieEnfantDe;
          this.glandeEnfantDe = resultat.glandeEnfantDe;
          this.anemieEnfantDe = resultat.anemieEnfantDe;
          this.coliqueEnfantDe = resultat.coliqueEnfantDe;
          this.prostateEnfantDe = resultat.prostateEnfantDe;
          this.enceinteEnfantDe = resultat.enceinteEnfantDe;
          this.arthroseEnfantDe = resultat.arthroseEnfantDe;
          this.yeuxEnfantDe = resultat.yeuxEnfantDe;
          this.lunettesEnfantDe = resultat.lunettesEnfantDe;
          this.hospitaliseEnfantDe = resultat.hospitaliseEnfantDe;
          this.traitementEnfantDe = resultat.traitementEnfantDe;


          // 3eme ENFANT :
          this.nomEnfantTr = resultat.nomEnfantTr;
          this.prenomEnfantTr = resultat.prenomEnfantTr;
          this.contactEnfantTr = resultat.contactEnfantTr;
          this.sexeEnfantTr = resultat.sexeEnfantTr;
          this.emailEnfantTr = resultat.emailEnfantTr;
          this.getNaissanceSanteEnfantTr = new Date(resultat.naissanceEnfantTr.toString());
          // Info SANTE :
          this.tensionarterielleEnfantTr = resultat.tensionEnfantTr;
          this.lieunaissanceEnfantTr = resultat.lieunaissanceEnfantTr;
          this.villeEnfantTr = resultat.residenceEnfantTr;
          this.tailleEnfantTr = resultat.tailleEnfantTr;
          this.poidsEnfantTr = resultat.poidsEnfantTr;
          this.groupesanguinEnfantTr = resultat.groupesanguinEnfantTr;
          // Questionnaire MEDICAL :
          this.maladieEnfantTr = resultat.maladieEnfantTr;
          this.pertepoidsEnfantTr = resultat.pertepoidsEnfantTr;
          this.ganglionEnfantTr = resultat.ganglionEnfantTr;
          this.coeurEnfantTr = resultat.coeurEnfantTr;
          this.foieEnfantTr = resultat.foieEnfantTr;
          this.glandeEnfantTr = resultat.glandeEnfantTr;
          this.anemieEnfantTr = resultat.anemieEnfantTr;
          this.coliqueEnfantTr = resultat.coliqueEnfantTr;
          this.prostateEnfantTr = resultat.prostateEnfantTr;
          this.enceinteEnfantTr = resultat.enceinteEnfantTr;
          this.arthroseEnfantTr = resultat.arthroseEnfantTr;
          this.yeuxEnfantTr = resultat.yeuxEnfantTr;
          this.lunettesEnfantTr = resultat.lunettesEnfantTr;
          this.hospitaliseEnfantTr = resultat.hospitaliseEnfantTr;
          this.traitementEnfantTr = resultat.traitementEnfantTr;

          // 4eme ENFANT :
          this.nomEnfantQu = resultat.nomEnfantQu;
          this.prenomEnfantQu = resultat.prenomEnfantQu;
          this.contactEnfantQu = resultat.contactEnfantQu;
          this.sexeEnfantQu = resultat.sexeEnfantQu;
          this.emailEnfantQu = resultat.emailEnfantQu;
          this.getNaissanceSanteEnfantQu = new Date(resultat.naissanceEnfantQu.toString());
          // Info SANTE :
          this.tensionarterielleEnfantQu = resultat.tensionEnfantQu;
          this.lieunaissanceEnfantQu = resultat.lieunaissanceEnfantQu;
          this.villeEnfantQu = resultat.residenceEnfantQu;
          this.tailleEnfantQu = resultat.tailleEnfantQu;
          this.poidsEnfantQu = resultat.poidsEnfantQu;
          this.groupesanguinEnfantQu = resultat.groupesanguinEnfantQu;
          // Questionnaire MEDICAL :
          this.maladieEnfantQu = resultat.maladieEnfantQu;
          this.pertepoidsEnfantQu = resultat.pertepoidsEnfantQu;
          this.ganglionEnfantQu = resultat.ganglionEnfantQu;
          this.coeurEnfantQu = resultat.coeurEnfantQu;
          this.foieEnfantQu = resultat.foieEnfantQu;
          this.glandeEnfantQu = resultat.glandeEnfantQu;
          this.anemieEnfantQu = resultat.anemieEnfantQu;
          this.coliqueEnfantQu = resultat.coliqueEnfantQu;
          this.prostateEnfantQu = resultat.prostateEnfantQu;
          this.enceinteEnfantQu = resultat.enceinteEnfantQu;
          this.arthroseEnfantQu = resultat.arthroseEnfantQu;
          this.yeuxEnfantQu = resultat.yeuxEnfantQu;
          this.lunettesEnfantQu = resultat.lunettesEnfantQu;
          this.hospitaliseEnfantQu = resultat.hospitaliseEnfantQu;
          this.traitementEnfantQu = resultat.traitementEnfantQu;
          

          this.id_devissante = resultat.idsan;
          this.idCliendDone = resultat.idCliendDone.toString();
          this.idClient = resultat.idClient.toString();

          // Set up values for 'CUSTOMER DOP DOWN List':
          this.setPolice = resultat.police.toString();
          this.membresId = [];
          this.selectedItems = [];
          if( parseInt(this.idCliendDone) > 0){
            // Set the drop down list values :
            for (var i = 0; i < this.listeDesClients.length; i++) {
              if (parseInt(this.idCliendDone) == this.listeDesClients[i].IdClient) {
                this.membresId.push({ 
                  item_id: this.listeDesClients[i].IdClient.toString(), 
                  item_text: this.listeDesClients[i].RAISONSOCIALE.toString() 
                });
                break;
              }
            }
            //
            this.selectedItems = this.membresId;

            // Process for 'POLICE':
            if(this.setPolice.trim().length > 0){
              this.getlespolicessantebyclient();
            }
          }          

          //
          this.clientRest.origine = resultat.origine;
          this.clientRest.observation = resultat.observation;

          $('#modalSante').modal();
        },
        (error) => {
          //alert("Erreur SANTE getting");
        }
      );
  }  




  // Get DATA from MRH devis :
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

          // Set up values for 'CUSTOMER DOP DOWN List':
          this.setPolice = resultat.police.toString();
          this.idCliendDone = resultat.idCliendDone.toString();
          this.membresId = [];
          this.selectedItems = [];
          if( parseInt(this.idCliendDone) > 0){
            // Set the drop down list values :
            for (var i = 0; i < this.listeDesClients.length; i++) {
              if (parseInt(this.idCliendDone) == this.listeDesClients[i].IdClient) {
                this.membresId.push({ 
                  item_id: this.listeDesClients[i].IdClient.toString(), 
                  item_text: this.listeDesClients[i].RAISONSOCIALE.toString() 
                });
                break;
              }
            }
            //
            this.selectedItems = this.membresId;

            // Process for 'POLICE':
            if(this.setPolice.trim().length > 0){
              this.getlespolicesmrhbyclient();
            }
          }          

          //
          this.clientRest.origine = resultat.origine;
          this.clientRest.observation = resultat.observation;

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


  initTableSante() {
    setTimeout(function () {
      $('#datatableSante').DataTable({
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
        "order": [[4, "desc"]]
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
