import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Activite } from 'src/app/mesbeans/activite';
import { Activiteia } from 'src/app/mesbeans/activiteia';
import { BeanDonneDevis } from 'src/app/mesbeans/beandonneedevis';
import { Civilite } from 'src/app/mesbeans/civilite';
import { ClientFullRest } from 'src/app/mesbeans/clentrestnew';
import { ClientRest } from 'src/app/mesbeans/clientrest';
import { Detailequipe } from 'src/app/mesbeans/detailequipe';
import { Detailtable } from 'src/app/mesbeans/detailnomenclature';
import { Indemnitemax } from 'src/app/mesbeans/indemnitemax';
import { Marque } from 'src/app/mesbeans/marque';
import { Motifpaiement } from 'src/app/mesbeans/motifpaiement';
import { Paysdestination } from 'src/app/mesbeans/paysdestination';
import { RestClient } from 'src/app/mesbeans/restclientcom';
import { RestClientFull } from 'src/app/mesbeans/restclientfull';
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
  listeDesClients: RestClientFull[];// ClientFullRest[];
  membresId = [];
  clientRest = new ClientRest();
  //
  listeCivilite: Detailtable[];
  listeMaladieSurprime: Detailtable[];
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
  listeActiviteIa: Activiteia[];
  getListeActiviteIa = false;

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
  cotationaccident = "0";
  cotationvoyage = "0";
  cotationmrh = "0";
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
  listeMarque: Marque[];
  immatriculationauto = "";
  dateCirculation = new Date();
  basicdatecirculation = "";
  idmarque = 0;
  presenceCertificat = false;

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
  listeCouvertureSante: Detailtable[];
  getListeCouvertureSante = false;
  listeSituationMaritale: Detailtable[];
  getListeSituationMaritale = false;
  formulesante = 0;
  typecouverture = 0;
  situationmaritale = 0
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
  civiliteconjoint: number;
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

  // Identifiant Profession IA :
  idpia: Number;
  idpiabeneficiaire: Number;
  preferencemanuelle = 0;
  nombeneficiaire = "";
  prenombeneficiaire = "";
  adressebeneficiaire = "";

  precisionmaladie = "";
  maladieSettings = {};
  maladieList = [];

  // 
  selectedMaladieItems = [];
  pertepoidsId = [];
  precisionpertepoids = "";
  ganglionsId = [];
  precisionganglions = "";
  coeurId = [];
  precisioncoeur = "";
  foieId = [];
  precisionfoie = "";
  glandeId = [];
  precisionglande = "";
  anemieId = [];
  precisionanemie = "";
  coliqueId = [];
  precisioncolique = "";
  prostateId = [];
  precisionprostate = "";
  arthroseId = [];
  precisionarthrose = "";
  yeuxId = [];
  precisionyeux = "";
  fractureId = [];
  traitementId = [];
  precisionfracture = "";
  precisiontraitement = "";
  precisionenceinte = "";
  precisionlunette = "";

  keepSurprimeId = 0;
  tamponquestionnaire = "";
  reinitWindows = false;





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
    this.getTypeCouverture();
    this.getSituationMaritale();
    this.getAllActivities();
    this.getAllActivitiesAccident();
    this.getzonedestination();
    this.getMotifsPaiement();

    // For ASSURANCE AUTO
    this.getDureeContrat();
    this.getEnergieVehicule();
    this.getPuissanceVehicule();
    this.getNombrePlace();
    this.getlesindemnitesauto();
    this.getlesmarquesauto();

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
    this.getMaladieSurprime();

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

          // Browse : this.listeDesClients[i].RAISONSOCIALE !== undefined ? this.listeDesClients[i].RAISONSOCIALE.toString() : ""
          if (resultat.length > 0) {
            for (var i = 0; i < this.listeDesClients.length; i++) {
              var deq = new Detailequipe();
              this.tempUsers.push({
                item_id: this.listeDesClients[i].idclient,
                item_text: this.listeDesClients[i].raisonsociale.toString()
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
      if (parseInt(this.idCliendDone) == customer.idclient) {

        // set TELEPHONE Id :
        this.clientRest.contact = customer.contact;

        var tampNom = customer.raisonsociale.split(" ");
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

        // From there, pick client 'idcli' :
        this.idClient = customer.idcliloc.toString();

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
  displayPolice() {
    //alert("Police : "+this.setPolice);
  }


  // Afficher les POLICES AUTO :
  getlespolicesbyclient(): void {
    this.getPoliceAccident = false;
    //this.meswebservices.getlespolicesbyclient(this.idCliendDone).toPromise()
    this.meswebservices.getNewlespolicesbyclient(this.idCliendDone, this.idClient.toString(), 3).toPromise()
      .then(
        resultat => {
          this.listePolices = resultat;
          // Pick first value of the list :
          if (this.setPolice.trim().length == 0) this.setPolice = resultat[0].Police.toString();
          this.getPolice = true;
        }
      )
  }

  getlespolicesaccidentbyclient(): void {
    this.getPoliceAccident = false;
    //this.meswebservices.getlespolicesbyclient(this.idCliendDone).toPromise()
    this.meswebservices.getNewlespolicesbyclient(this.idCliendDone, this.idClient.toString(), 1).toPromise()
      .then(
        resultat => {
          if (resultat !== null) {
            this.listePolices = resultat;
            // Pick first value of the list :
            if (this.setPolice.trim().length == 0) this.setPolice = resultat[0].Police.toString();
            this.getPoliceAccident = true;
          }
        }
      )
  }


  getlespolicesvoyagebyclient(): void {
    this.getPoliceVoyage = false;
    //this.meswebservices.getlespolicesbyclient(this.idCliendDone).toPromise()
    this.meswebservices.getNewlespolicesbyclient(this.idCliendDone, this.idClient.toString(), 2).toPromise()
      .then(
        resultat => {
          this.listePolices = resultat;
          // Pick first value of the list :
          if (this.setPolice.trim().length == 0) this.setPolice = resultat[0].Police.toString();
          this.getPoliceVoyage = true;
        }
      )
  }


  getlespolicesmrhbyclient(): void {
    this.getPoliceMrh = false;
    //this.meswebservices.getlespolicesbyclient(this.idCliendDone).toPromise()
    this.meswebservices.getNewlespolicesbyclient(this.idCliendDone, this.idClient.toString(), 4).toPromise()
      .then(
        resultat => {
          this.listePolices = resultat;
          // Pick first value of the list :
          if (this.setPolice.trim().length == 0) this.setPolice = resultat[0].Police.toString();
          this.getPoliceMrh = true;
        }
      )
  }


  // Look for 'POLICE' devis SANTE:
  getlespolicessantebyclient(): void {
    this.getPoliceSante = false;
    //this.meswebservices.getlespolicesbyclient(this.idCliendDone).toPromise()
    this.meswebservices.getNewlespolicesbyclient(this.idCliendDone, this.idClient.toString(), 5).toPromise()
      .then(
        resultat => {
          this.listePolices = resultat;
          // Pick first value of the list :
          if (this.setPolice.trim().length == 0) this.setPolice = resultat[0].Police.toString();
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


  // Go to pull TYPE DE COUVERTURE , id : 17 :
  getTypeCouverture(): void {
    this.meswebservices.getdonneeparametree("17").toPromise()
      .then(
        resultat => {
          this.listeCouvertureSante = resultat;
          this.getListeCouvertureSante = true;
          this.typecouverture = resultat[0].idnmd;
        }
      )
  }


  // Go to pull TYPE DE COUVERTURE , id : 16 :
  getSituationMaritale(): void {
    this.meswebservices.getdonneeparametree("16").toPromise()
      .then(
        resultat => {
          this.listeSituationMaritale = resultat;
          this.situationmaritale = resultat[0].idnmd;
          this.getListeSituationMaritale = true;
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

          this.computeVoyagePrice();
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



  // Get les MARQUES for 'DEVIS AUTO'
  getlesmarquesauto(): void {
    this.meswebservices.getlesmarquesauto().toPromise()
      .then(
        resultat => {
          this.listeMarque = resultat;
          this.idmarque = resultat[1].idmarque;
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
        this.cotationmrh = (30780).toLocaleString();
        break;

      case 47:
        $('#form1').css('background-color', '#d1caca');
        $('#form2').css('background-color', '#697FD0'); // Formule 1
        $('#form3').css('background-color', '#d1caca');
        $('#form4').css('background-color', '#d1caca');
        this.cotationmrh = (61560).toLocaleString();
        break;

      case 48:
        $('#form1').css('background-color', '#d1caca');
        $('#form2').css('background-color', '#d1caca');
        $('#form3').css('background-color', '#697FD0'); // Formule 3
        $('#form4').css('background-color', '#d1caca');
        this.cotationmrh = (102600).toLocaleString();
        break;

      case 49:
        $('#form1').css('background-color', '#d1caca');
        $('#form2').css('background-color', '#d1caca');
        $('#form3').css('background-color', '#d1caca');
        $('#form4').css('background-color', '#697FD0'); // Formule 4
        this.cotationmrh = (143640).toLocaleString();
        break;

      default:
        $('#form1').css('background-color', '#697FD0'); // Formule 1
        $('#form2').css('background-color', '#d1caca');
        $('#form3').css('background-color', '#d1caca');
        $('#form4').css('background-color', '#d1caca');
        this.cotationmrh = (30780).toLocaleString();
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


  prepareFields() {
    this.clientRest.nom = "";
    this.clientRest.prenom = "";
    this.clientRest.contact = "";
    this.clientRest.email = "";
    //
    this.idCliendDone = "0";
    this.idClient = "0";
    this.setPolice = "";
    this.getPolice = false;

    this.presencePhoto = false;
    this.presenceCni = false;
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
    this.prepareFields();

    $('#modalMrh').modal();
  }



  // SANTE
  afficherSante() {
    // Clear :
    if (this.formData.has("photo")) this.formData.delete("photo");
    if (this.formData.has("cni")) this.formData.delete("cni");

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

    this.prepareFields();

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
    this.prepareFields();

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
    this.prepareFields();

    $('#modalAccident').modal();
    this.computeAccidentPrice();
  }

  // Auto :
  afficherAuto() {

    // clear :
    if (this.formData.has("photo")) this.formData.delete("photo");
    if (this.formData.has("cni")) this.formData.delete("cni");
    this.presencePhoto = false;
    this.presenceCni = false;

    this.puissancevehicule = "0";
    this.chargeutile = "0";
    this.id_devisauto = 0;
    //
    this.clientRest.origine = 0;
    this.clientRest.observation = "";
    this.prepareFields();

    // Reset : 
    this.membresId = [];
    this.selectedItems = [];
    this.clientRest.activite = 1;

    // Set values :
    this.setPolice = "";
    this.getPolice = false;

    $('#modalAutomobile').modal();
  }


  getAllActivitiesAccident(): void {
    this.meswebservices.getAllActivitiesAccident().toPromise()
      .then(
        resultat => {

          // Succes
          if (resultat.length > 0) {
            this.listeActiviteIa = resultat;
            this.idpia = this.listeActiviteIa[1].idpia;
            this.idpiabeneficiaire = this.listeActiviteIa[2].idpia;
            this.getListeActiviteIa = true;
          }

        }
      )
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

  // Certificat de visite technique
  onCertificatSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      if (this.formData.has("certificatvisite")) this.formData.delete("certificatvisite");
      this.formData.append("certificatvisite", file);
      this.presenceCertificat = true;
    }
    else {
      if (this.formData.has("certificatvisite")) {
        this.presenceCertificat = false;
        this.formData.delete("certificatvisite");
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
  enregDevisSante() {
    // Naissance 'ASSURE' :
    let momentVariable = moment(this.getNaissanceSante, 'MM-DD-YYYY');
    let dateAssure = momentVariable.format('YYYY-MM-DD');

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
      // situationmaritale 
      this.formData.append("situationmaritale", this.situationmaritale.toString());
      this.formData.append("formulesante", this.formulesante.toString());
      this.formData.append("typecouverture", this.typecouverture.toString());

      // Questionnaire medical :
      this.formData.append("maladieAdherent", this.maladieAdherent.toString());
      this.formData.append("pertepoidsAdherent", this.pertepoidsAdherent.toString());
      this.formData.append("ganglionAdherent", this.ganglionAdherent.toString());
      this.formData.append("coeurAdherent", this.coeurAdherent.toString());
      this.formData.append("foieAdherent", this.foieAdherent.toString());
      this.formData.append("glandeAdherent", this.glandeAdherent.toString());
      this.formData.append("anemieAdherent", this.anemieAdherent.toString());
      this.formData.append("coliqueAdherent", this.coliqueAdherent.toString());
      this.formData.append("prostateAdherent", this.prostateAdherent.toString());
      this.formData.append("enceinteAdherent", this.enceinteAdherent.toString());
      this.formData.append("arthroseAdherent", this.arthroseAdherent.toString());
      this.formData.append("yeuxAdherent", this.yeuxAdherent.toString());
      this.formData.append("lunettesAdherent", this.lunettesAdherent.toString());
      this.formData.append("hospitaliseAdherent", this.hospitaliseAdherent.toString());
      this.formData.append("traitementAdherent", this.traitementAdherent.toString());

      // Data PERSONAL :
      this.formData.append("iddevissante", this.id_devissante.toString());
      this.formData.append("idCliendDone", this.idCliendDone);
      this.formData.append("idclient", this.idClient);
      //
      this.formData.append("origine", this.clientRest.origine.toString());
      this.formData.append("observation", this.clientRest.observation.toString());
      this.formData.append("police", this.setPolice);

      // call function to feed DATA :
      this.processQuestionnaire(this.formData);

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
      this.formData.append("police", this.setPolice);//
      this.formData.append("coutmrh", this.cotationmrh.replace(/[^0-9]/g, ''));

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
    // Dat circulation :
    let momentCirculation = moment(this.dateCirculation, 'MM-DD-YYYY');
    let dateCirc = momentCirculation.format('YYYY-MM-DD');

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
      // New ONE :
      this.formData.append("immatriculation", this.immatriculationauto.trim());
      this.formData.append("idmarque", this.idmarque.toString());
      this.formData.append("datecirculation", dateCirc);

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
      this.formData.append("activite", this.idpia.toString());
      this.formData.append("typeduclient", this.typeclient.toString());
      this.formData.append("capitaldeces", tpCapitaldeces);
      this.formData.append("capitalinfirmite", tpCapitalinfirmite);
      this.formData.append("fraisdetraitement", this.fraisdetraitement.toString());
      this.formData.append("idaccident", this.id_accident.toString());
      this.formData.append("idCliendDone", this.idCliendDone);
      this.formData.append("idclient", this.idClient);
      //
      this.formData.append("cout", this.cotationaccident.replace(/[^0-9]/g, ''));
      //
      this.formData.append("origine", this.clientRest.origine.toString());
      this.formData.append("observation", this.clientRest.observation.toString());
      this.formData.append("police", this.setPolice);
      // Pour le souscripteur :
      this.formData.append("nomsouscripteur", this.nombeneficiaire);
      this.formData.append("prenomsouscripteur", this.prenombeneficiaire);
      this.formData.append("adressesouscripteur", this.adressebeneficiaire);
      this.formData.append("professionsouscripteur", this.idpiabeneficiaire.toString());
      this.formData.append("preferencemanuelle", this.preferencemanuelle.toString());

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
      //
      this.formData.append("cout", this.cotationvoyage.replace(/[^0-9]/g, ''));

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
  infonsia(idsan: string) {
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
  enregInfoSante() {
    var formInfoData = new FormData();
    formInfoData.append("numpolice", this.numpolice);
    formInfoData.append("numclient", this.numclient);
    formInfoData.append("nmapporteur", this.nmapporteur);
    formInfoData.append("libcode", this.libcode);
    formInfoData.append("libinspection", this.libinspection);
    //formInfoData.append("formulesante", this.formulesante.toString());
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
    if (choix == 1) {
      // CHEQUE
      if ((this.devispaye == "Oui") && (this.modepaiement == "Chèque")) {
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

              this.chequebarre = resultat.chequebarre == 1 ? true : false;
              this.idMotifPaiement = resultat.motif;

              // Display 
              $('#modalcheque').modal();
            },
            (error) => {
            }
          );
      }
      else if (this.modepaiement == "Virement") this.warnmessage("Ce devis avait été réglé premièrement par VIREMENT !");
      else $('#modalcheque').modal();
    }
    else {
      // Virement 
      if ((this.devispaye == "Oui") && (this.modepaiement == "Virement")) {
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
      else if (this.modepaiement == "Chèque") this.warnmessage("Ce devis avait été réglé premièrement par CHEQUE !");
      else $('#modalvirement').modal();
    }
  }


  //
  enregCheque() {
    //alert("Statut : "+this.chequebarre);

    if ((!this.presencePhotoCheque) || (!this.chequeFormData.has("photocheque"))) {
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
          if (parseInt(this.idCliendDone) > 0) {
            this.selectedItems = [];
            this.membresId = [];
            // Set the drop down list values :
            for (var i = 0; i < this.listeDesClients.length; i++) {
              if (parseInt(this.idCliendDone) == this.listeDesClients[i].idclient) {
                this.membresId.push({
                  item_id: this.listeDesClients[i].idclient.toString(),
                  item_text: this.listeDesClients[i].raisonsociale.toString()
                });
                break;
              }
            }
            //
            this.selectedItems = this.membresId;


            // Process for 'POLICE':
            if (this.setPolice.trim().length > 0) {
              this.getlespolicesbyclient();
            }
          }
          else {
            this.membresId = [];
            this.selectedItems = [];
          }


          this.idClient = resultat.idClient.toString();

          //
          this.clientRest.origine = resultat.origine;
          this.clientRest.observation = resultat.observation;

          //
          this.customerBirthDate = new Date(resultat.dates.toString());
          this.dateCirculation = new Date(resultat.datecirculation.toString())
          this.immatriculationauto = resultat.immatriculation.toString();
          this.idmarque = resultat.idmarque;

          //this.membresId = [];
          //this.selectedItems = [];
          $('#modalAutomobile').modal();
          this.computePrice();
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
          this.idpia = resultat.activite;
          this.typeclient = resultat.typeclient;

          // ACCIDENT data :
          this.capitaldeces = resultat.capitaldeces.toLocaleString();
          this.capitalinfirmite = resultat.capitalinfirmite.toLocaleString();
          this.fraisdetraitement = resultat.fraisdetraitement;

          this.id_accident = resultat.idacc;
          this.idCliendDone = resultat.idCliendDone.toString();
          this.idClient = resultat.idClient.toString();
          this.cotationaccident = resultat.cout.toLocaleString();

          //
          this.getDate = new Date(resultat.dates.toString());

          // 
          this.nombeneficiaire = resultat.nomsouscripteur;
          this.prenombeneficiaire = resultat.prenomsouscripteur;
          this.adressebeneficiaire = resultat.adresse;
          this.idpiabeneficiaire = resultat.profession;
          this.preferencemanuelle = resultat.preferencemanuelle;


          // Set up values for 'CUSTOMER DOP DOWN List':
          this.setPolice = resultat.police.toString();
          if (parseInt(this.idCliendDone) > 0) {
            this.selectedItems = [];
            this.membresId = [];
            // Set the drop down list values :
            for (var i = 0; i < this.listeDesClients.length; i++) {
              if (parseInt(this.idCliendDone) == this.listeDesClients[i].idclient) {
                this.membresId.push({
                  item_id: this.listeDesClients[i].idclient.toString(),
                  item_text: this.listeDesClients[i].raisonsociale.toString()
                });
                break;
              }
            }
            //
            this.selectedItems = this.membresId;

            // Process for 'POLICE':
            if (this.setPolice.trim().length > 0) {
              this.getlespolicesaccidentbyclient();
            }
          }
          else {
            this.membresId = [];
            this.selectedItems = [];
          }

          //
          this.clientRest.origine = resultat.origine;
          this.clientRest.observation = resultat.observation;

          //
          $('#modalAccident').modal();
          this.computeAccidentPrice();
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
          if (parseInt(this.idCliendDone) > 0) {
            // Set the drop down list values :
            for (var i = 0; i < this.listeDesClients.length; i++) {
              if (parseInt(this.idCliendDone) == this.listeDesClients[i].idclient) {
                this.membresId.push({
                  item_id: this.listeDesClients[i].idclient.toString(),
                  item_text: this.listeDesClients[i].raisonsociale.toString()
                });
                break;
              }
            }
            //
            this.selectedItems = this.membresId;

            // Process for 'POLICE':
            if (this.setPolice.trim().length > 0) {
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
    this.meswebservices.getDevisSanteByIdsanNew(idsan).toPromise()
      .then(
        resultat => {
          // Assure :
          this.clientRest.nom = resultat.nom;
          this.clientRest.prenom = resultat.prenom;
          this.clientRest.contact = resultat.contact;
          this.clientRest.email = resultat.email;
          this.clientRest.civilite = resultat.civilite;
          this.clientRest.activite = resultat.activite;
          this.typeclient = resultat.typeduclient;
          this.getNaissanceSante = new Date(resultat.naissance.toString());
          // Info SANTE :
          this.tensionarterielle = resultat.tension;
          this.lieunaissance = resultat.lieunaissance;
          this.quartierresidence = resultat.residence;
          this.adressepostale = resultat.adresse;
          this.taille = resultat.taille;
          this.poids = resultat.poids;
          this.groupesanguin = resultat.groupesanguin;
          // Questionnaire MEDICAL :
          this.maladieAdherent = resultat.maladie;
          this.pertepoidsAdherent = resultat.pertepoids;
          this.ganglionAdherent = resultat.ganglion;
          this.coeurAdherent = resultat.coeur;
          this.foieAdherent = resultat.foie;
          this.glandeAdherent = resultat.glande;
          this.anemieAdherent = resultat.anemie;
          this.coliqueAdherent = resultat.colique;
          this.prostateAdherent = resultat.prostate;
          this.enceinteAdherent = resultat.enceinte;
          this.arthroseAdherent = resultat.arthrose;
          this.yeuxAdherent = resultat.yeux;
          this.lunettesAdherent = resultat.lunettes;
          this.hospitaliseAdherent = resultat.hospitalise;
          this.traitementAdherent = resultat.traitement;

          // Set situationmaritale, formule, couverture
          this.situationmaritale = resultat.situationmaritale;
          this.formulesante = resultat.formule;
          this.typecouverture = resultat.couverture;

          this.id_devissante = resultat.idsan;
          this.idCliendDone = resultat.idCliendDone.toString();
          this.idClient = resultat.idClient.toString();

          // Set up values for 'CUSTOMER DOP DOWN List':
          this.setPolice = resultat.police.toString();
          this.membresId = [];
          this.selectedItems = [];
          if (parseInt(this.idCliendDone) > 0) {
            // Set the drop down list values :
            for (var i = 0; i < this.listeDesClients.length; i++) {
              if (parseInt(this.idCliendDone) == this.listeDesClients[i].idclient) {
                this.membresId.push({
                  item_id: this.listeDesClients[i].idclient.toString(),
                  item_text: this.listeDesClients[i].raisonsociale.toString()
                });
                break;
              }
            }
            //
            this.selectedItems = this.membresId;

            // Process for 'POLICE':
            if (this.setPolice.trim().length > 0) {
              this.getlespolicessantebyclient();
            }
          }

          //
          this.clientRest.origine = resultat.origine;
          this.clientRest.observation = resultat.observation;


          // Process 'COMMENTAIRE' and 'CHOIX'
          if (resultat.surprimes.length > 0) {

            let tpData = [];
            let tempMalSelectedItems = [];
            this.selectedMaladieItems = [];

            this.pertepoidsId = [];
            this.ganglionsId = [];
            this.coeurId = [];
            this.foieId = [];
            this.glandeId = [];
            this.anemieId = [];
            this.coliqueId = [];
            this.prostateId = [];
            this.arthroseId = [];
            this.yeuxId = [];
            this.fractureId = [];
            this.traitementId = [];

            var tampSurprime = resultat.surprimes.split(",");
            tampSurprime.forEach(
              su => {
                this.listeMaladieSurprime.forEach(
                  d => {
                    if (d.idnmd === parseInt(su)) {
                      /*tpData.push({
                        item_id: d.idnmd,
                        item_text: d.libelle
                      });*/

                      // perte de poids, fièvres répétées, fatigue chronique   68, 69, 70
                      if (parseInt(su) === 68 || parseInt(su) === 69 || parseInt(su) === 70) this.pertepoidsId.push(su);
                      //  ganglions, des furoncles, des abcès ou des maladies de peau
                      else if (parseInt(su) === 71 || parseInt(su) === 102 || parseInt(su) === 103 || parseInt(su) === 104) this.ganglionsId.push(su);
                      //  coeur, infections chroniques,pneumopathies, tuberculose
                      else if (parseInt(su) === 105 || parseInt(su) === 72 || parseInt(su) === 73 || parseInt(su) === 74) this.coeurId.push(su);
                      //  l’appareil digestif, foie, intestin, et anus (hémorroïdes, ulcère, hépatite….)
                      else if (parseInt(su) === 75 || parseInt(su) === 76 || parseInt(su) === 77 || parseInt(su) === 78
                        || parseInt(su) === 79) this.foieId.push(su);
                      //  glandes endocrines, de la nutrition, diabète, goitre
                      else if (parseInt(su) === 80 || parseInt(su) === 81 || parseInt(su) === 82 || parseInt(su) === 83) this.glandeId.push(su);
                      //  anémie, drépanocytose
                      else if (parseInt(su) === 84 || parseInt(su) === 85) this.anemieId.push(su);
                      //  coliques néphrétiques,dialyses, troubles urinaires, calcul rénal
                      else if (parseInt(su) === 86 || parseInt(su) === 87 || parseInt(su) === 88 || parseInt(su) === 89) this.coliqueId.push(su);
                      //  prostate,Fibrome, kyste
                      else if (parseInt(su) === 90 || parseInt(su) === 91 || parseInt(su) === 92) this.prostateId.push(su);
                      //  arthrose, rhumatisme
                      else if (parseInt(su) === 93 || parseInt(su) === 94) this.arthroseId.push(su);
                      //  yeux, de l’ouïe, du nez
                      else if (parseInt(su) === 95 || parseInt(su) === 96 || parseInt(su) === 97) this.yeuxId.push(su);
                      //  fracture, traumatisme crânien,brulures, AVC
                      else if (parseInt(su) === 98 || parseInt(su) === 99 || parseInt(su) === 100 || parseInt(su) === 101) this.fractureId.push(su);
                      //  traitement
                      else if (parseInt(su) === 106 || parseInt(su) === 107 || parseInt(su) === 108 || parseInt(su) === 109
                        || parseInt(su) === 110 || parseInt(su) === 111) this.traitementId.push(su);

                      return;
                    }
                  }
                );
              }
            );
          }

          // Now, set comment :
          this.precisionmaladie = resultat.cmtmaladie;
          this.precisionpertepoids = resultat.cmtpertepoids;
          this.precisionganglions = resultat.cmtganglion;
          this.precisioncoeur = resultat.cmtcoeur;
          this.precisionfoie = resultat.cmtfoie;
          this.precisionglande = resultat.cmtglande;
          this.precisionanemie = resultat.cmtanemie;
          this.precisioncolique = resultat.cmtcolique;
          this.precisionprostate = resultat.cmtprostate;
          this.precisionenceinte = resultat.cmtenceinte;
          this.precisionarthrose = resultat.cmtarthrose;
          this.precisionyeux = resultat.cmtyeux;
          this.precisionlunette = resultat.cmtlunette;
          this.precisionfracture = resultat.cmthospitalise;
          this.precisiontraitement = resultat.cmttraitement;

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
          if (parseInt(this.idCliendDone) > 0) {
            // Set the drop down list values :
            for (var i = 0; i < this.listeDesClients.length; i++) {
              if (parseInt(this.idCliendDone) == this.listeDesClients[i].idclient) {
                this.membresId.push({
                  item_id: this.listeDesClients[i].idclient.toString(),
                  item_text: this.listeDesClients[i].raisonsociale.toString()
                });
                break;
              }
            }
            //
            this.selectedItems = this.membresId;

            // Process for 'POLICE':
            if (this.setPolice.trim().length > 0) {
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


  callAccidentPrice() {
    this.capitaldeces = this.capitaldeces.replace(/[^0-9]/g, '');
    if (/^[0-9]+$/.test(this.capitaldeces)) {
      // Call to display the PRICE :
      //this.computeAccidentPrice(parseInt(this.capitaldeces));
      this.computeAccidentPrice();
    }
  }


  callVoyagePrice() {
    this.computeVoyagePrice();
  }


  onKeyUpDeces() { // appending the updated value to the variable
    /*let tpCapitaldeces = x.target.value.replace(/[^0-9]/g, '');
    if (/^[0-9]+$/.test(tpCapitaldeces)) {
      // Call to display the PRICE :
      this.computeAccidentPrice(parseInt(tpCapitaldeces));
    }*/
    this.computeAccidentPrice();
  }

  onKeyUpInfirmite() { // appending the updated value to the variable
    //alert("capitalinfirmite : "+this.capitalinfirmite);
    this.computeAccidentPrice();
  }


  // Process FRAIS de TRAITEMENT : 125.000
  processTraitement(classe: string): number {
    let ret = 0;
    let lockButton = false;

    if (classe === '01') {
      if (this.fraisdetraitement == 10) ret = 4000; // 125.000
      else if (this.fraisdetraitement == 11) ret = 6000; // 250.000
      else if (this.fraisdetraitement == 12) ret = 9500; // 500.000
      else if (this.fraisdetraitement == 13) ret = 12500; // 750.000
      else if (this.fraisdetraitement == 14) ret = 15750; // 1.000.000
      else ret = 0; // aucun
    }
    else if (classe === '02') {
      if (this.fraisdetraitement == 10) ret = 6000; // 125.000
      else if (this.fraisdetraitement == 11) ret = 10000; // 250.000
      else if (this.fraisdetraitement == 12) ret = 15000; // 500.000
      else if (this.fraisdetraitement == 13) ret = 18000; // 750.000
      else if (this.fraisdetraitement == 14) ret = 21500; // 1.000.000
      else ret = 0; // aucun
    }
    else if (classe === '03') {
      if (this.fraisdetraitement == 10) ret = 8500; // 125.000
      else if (this.fraisdetraitement == 11) ret = 12500; // 250.000
      else if (this.fraisdetraitement == 12) ret = 18000; // 500.000
      else if (this.fraisdetraitement == 13) ret = 23500; // 750.000
      else if (this.fraisdetraitement == 14) ret = 32000; // 1.000.000
      else ret = 0; // aucun
    }
    else if (classe === '04') {
      if (this.fraisdetraitement == 10) ret = 11000; // 125.000
      else if (this.fraisdetraitement == 11) ret = 16000; // 250.000
      else if (this.fraisdetraitement == 12) ret = 23500; // 500.000
      else if (this.fraisdetraitement == 13) ret = 30500; // 750.000
      else if (this.fraisdetraitement == 14) ret = 40500; // 1.000.000
      else ret = 0; // aucun
    }
    else if (classe === '05') {
      if (this.fraisdetraitement == 10) ret = 14500; // 125.000
      else if (this.fraisdetraitement == 11) ret = 19500; // 250.000
      else if (this.fraisdetraitement == 12) ret = 27000; // 500.000
      else if (this.fraisdetraitement == 13 || this.fraisdetraitement == 14) {
        // 750.000 - 1.000.000 
        lockButton = true;
      }
      else ret = 0; // aucun
    }

    if (lockButton) $("#btsaveaccident").prop("disabled", true); // DISABLE
    else $("#btsaveaccident").prop("disabled", false); // ENABLE
    return ret;
  }



  // Compute the price :
  computeAccidentPrice() {

    let tpDeces = this.capitaldeces.replace(/[^0-9]/g, '');
    let capdeces = 0;
    try {
      if (/^[0-9]+$/.test(tpDeces)) {
        // Call to display the PRICE :
        capdeces = parseInt(tpDeces);
      }
    }
    catch (e) { }


    let codeClasse = '00';
    this.listeActiviteIa.forEach(
      d => {
        if (d.idpia === this.idpia) {
          codeClasse = d.codeclasse;
          return;
        }
      }
    );

    // get the 'TAUX' :
    let tauxClasse = 0.0;
    if (codeClasse === '01') tauxClasse = 1.0;
    else if (codeClasse === '02') tauxClasse = 1.3;
    else if (codeClasse === '03') tauxClasse = 1.7;
    else if (codeClasse === '04') tauxClasse = 2.5;
    else if (codeClasse === '05') tauxClasse = 4.1;

    // Get the 'AGE' :
    var diffYear = (this.getCurrentDate.getTime() - this.getDate.getTime()) / 1000;
    diffYear /= (60 * 60 * 24);
    let difference = Math.abs(Math.round(diffYear / 365.25));

    // Compute TAUX AGE :
    let tauxAge = 0.0;
    if (difference <= 49) tauxAge = 1.0;
    else if (difference >= 49 && difference <= 65) tauxAge = 1.30;
    else if (difference >= 66 && difference <= 70) {
      tauxAge = 1.40;
      if (tauxClasse <= 2) tauxClasse = 2;
    }

    // Prime nette based on CAPITAL DECES :
    let primeNette = 0;
    //primeNette = (capdeces * (1 / 1000)) * tauxClasse * tauxAge;

    // Prime nette based on INFIRMITE PERMANENTE
    let tpInfirmite = this.capitalinfirmite.replace(/[^0-9]/g, '');
    let valeurInfirmite = 0;
    let primeInfirmite = 0;
    let primeDeces = 0;
    try {
      if (/^[0-9]+$/.test(tpInfirmite)) {
        // Call to display the PRICE :
        valeurInfirmite = parseInt(tpInfirmite);
      }
    }
    catch (e) { }

    primeInfirmite = (valeurInfirmite * (1 / 1000)) * tauxClasse * tauxAge;
    primeDeces = (capdeces * (1 / 1000)) * tauxClasse * tauxAge;
    let montantTraitement = this.processTraitement(codeClasse);

    primeNette = primeDeces + primeInfirmite + montantTraitement;
    let accessoires = this.computeAccessoire(primeNette);
    let taxe = (primeNette + accessoires) * 0.145;
    let primeTTC = primeNette + taxe + accessoires;

    // Afficher le 
    this.cotationaccident = Math.round(primeTTC).toLocaleString();
  }



  computeAccessoire(primeNette: number): number {
    let ret = 0;

    if (primeNette <= 100000) ret = 5000;
    else if (primeNette >= 100001 && primeNette <= 500000) ret = 7500;
    else if (primeNette >= 500001 && primeNette <= 1000000) ret = 10000;
    else if (primeNette >= 1000001 && primeNette <= 5000000) ret = 20000;
    else if (primeNette >= 5000001 && primeNette <= 10000000) ret = 30000;
    else if (primeNette >= 10000001 && primeNette <= 50000000) ret = 50000;
    else if (primeNette >= 50000000) ret = 100000;

    return ret;
  }





  test() {
    alert("OK");
  }


  // Display :
  selectchoix(id: number) {

    // Browse :
    let tpData = [];
    let tempMalSelectedItems = [];
    this.selectedMaladieItems = [];
    this.keepSurprimeId = id;

    switch (id) {
      case 1: // perte de poids, fièvres répétées, fatigue chronique
        this.listeMaladieSurprime.forEach(
          d => {
            if (d.idnmd === 68 || d.idnmd === 69 || d.idnmd === 70) {
              tpData.push({
                item_id: d.idnmd,
                item_text: d.libelle
              });
            }

            if (this.pertepoidsId.length > 0) {
              for (var i = 0; i < this.pertepoidsId.length; i++) {
                if (parseInt(this.pertepoidsId[i]) == d.idnmd) {
                  tempMalSelectedItems.push({
                    item_id: d.idnmd,
                    item_text: d.libelle
                  });
                }
              }

              this.selectedMaladieItems = tempMalSelectedItems;
            }
          }
        );
        break;


      case 2: //  ganglions, des furoncles, des abcès ou des maladies de peau
        this.listeMaladieSurprime.forEach(
          d => {
            if (d.idnmd === 71 || d.idnmd === 102 || d.idnmd === 103 || d.idnmd === 104) {
              tpData.push({
                item_id: d.idnmd,
                item_text: d.libelle
              });
            }

            if (this.ganglionsId.length > 0) {
              for (var i = 0; i < this.ganglionsId.length; i++) {
                if (parseInt(this.ganglionsId[i]) == d.idnmd) {
                  tempMalSelectedItems.push({
                    item_id: d.idnmd,
                    item_text: d.libelle
                  });
                }
              }

              this.selectedMaladieItems = tempMalSelectedItems;
            }
          }
        );
        break;

      case 3: //  coeur, infections chroniques,pneumopathies, tuberculose
        this.listeMaladieSurprime.forEach(
          d => {
            if (d.idnmd === 105 || d.idnmd === 72 || d.idnmd === 73 || d.idnmd === 74) {
              tpData.push({
                item_id: d.idnmd,
                item_text: d.libelle
              });
            }

            if (this.coeurId.length > 0) {
              for (var i = 0; i < this.coeurId.length; i++) {
                if (parseInt(this.coeurId[i]) == d.idnmd) {
                  tempMalSelectedItems.push({
                    item_id: d.idnmd,
                    item_text: d.libelle
                  });
                }
              }

              this.selectedMaladieItems = tempMalSelectedItems;
            }
          }
        );
        break;

      case 4: //  l’appareil digestif, foie, intestin, et anus (hémorroïdes, ulcère, hépatite….)
        this.listeMaladieSurprime.forEach(
          d => {
            if (d.idnmd === 75 || d.idnmd === 76 || d.idnmd === 77 || d.idnmd === 78 || d.idnmd === 79) {
              tpData.push({
                item_id: d.idnmd,
                item_text: d.libelle
              });
            }

            if (this.foieId.length > 0) {
              for (var i = 0; i < this.foieId.length; i++) {
                if (parseInt(this.foieId[i]) == d.idnmd) {
                  tempMalSelectedItems.push({
                    item_id: d.idnmd,
                    item_text: d.libelle
                  });
                }
              }

              this.selectedMaladieItems = tempMalSelectedItems;
            }
          }
        );
        break;

      case 5: //  glandes endocrines, de la nutrition, diabète, goitre
        this.listeMaladieSurprime.forEach(
          d => {
            if (d.idnmd === 80 || d.idnmd === 81 || d.idnmd === 82 || d.idnmd === 83) {
              tpData.push({
                item_id: d.idnmd,
                item_text: d.libelle
              });
            }

            if (this.glandeId.length > 0) {
              for (var i = 0; i < this.glandeId.length; i++) {
                if (parseInt(this.glandeId[i]) == d.idnmd) {
                  tempMalSelectedItems.push({
                    item_id: d.idnmd,
                    item_text: d.libelle
                  });
                }
              }

              this.selectedMaladieItems = tempMalSelectedItems;
            }
          }
        );
        break;

      case 6: //  anémie, drépanocytose
        this.listeMaladieSurprime.forEach(
          d => {
            if (d.idnmd === 84 || d.idnmd === 85) {
              tpData.push({
                item_id: d.idnmd,
                item_text: d.libelle
              });
            }

            if (this.anemieId.length > 0) {
              for (var i = 0; i < this.anemieId.length; i++) {
                if (parseInt(this.anemieId[i]) == d.idnmd) {
                  tempMalSelectedItems.push({
                    item_id: d.idnmd,
                    item_text: d.libelle
                  });
                }
              }

              this.selectedMaladieItems = tempMalSelectedItems;
            }
          }
        );
        break;

      case 7: //  coliques néphrétiques,dialyses, troubles urinaires, calcul rénal
        this.listeMaladieSurprime.forEach(
          d => {
            if (d.idnmd === 86 || d.idnmd === 87 || d.idnmd === 88 || d.idnmd === 89) {
              tpData.push({
                item_id: d.idnmd,
                item_text: d.libelle
              });
            }

            if (this.coliqueId.length > 0) {
              for (var i = 0; i < this.coliqueId.length; i++) {
                if (parseInt(this.coliqueId[i]) == d.idnmd) {
                  tempMalSelectedItems.push({
                    item_id: d.idnmd,
                    item_text: d.libelle
                  });
                }
              }

              this.selectedMaladieItems = tempMalSelectedItems;
            }
          }
        );
        break;

      case 8: //  prostate,Fibrome, kyste
        this.listeMaladieSurprime.forEach(
          d => {
            if (d.idnmd === 90 || d.idnmd === 91 || d.idnmd === 92) {
              tpData.push({
                item_id: d.idnmd,
                item_text: d.libelle
              });
            }

            if (this.prostateId.length > 0) {
              for (var i = 0; i < this.prostateId.length; i++) {
                if (parseInt(this.prostateId[i]) == d.idnmd) {
                  tempMalSelectedItems.push({
                    item_id: d.idnmd,
                    item_text: d.libelle
                  });
                }
              }

              this.selectedMaladieItems = tempMalSelectedItems;
            }
          }
        );
        break;

      case 9: //  arthrose, rhumatisme
        this.listeMaladieSurprime.forEach(
          d => {
            if (d.idnmd === 93 || d.idnmd === 94) {
              tpData.push({
                item_id: d.idnmd,
                item_text: d.libelle
              });
            }

            if (this.arthroseId.length > 0) {
              for (var i = 0; i < this.arthroseId.length; i++) {
                if (parseInt(this.arthroseId[i]) == d.idnmd) {
                  tempMalSelectedItems.push({
                    item_id: d.idnmd,
                    item_text: d.libelle
                  });
                }
              }

              this.selectedMaladieItems = tempMalSelectedItems;
            }
          }
        );
        break;

      case 10: //   yeux, de l’ouïe, du nez
        this.listeMaladieSurprime.forEach(
          d => {
            if (d.idnmd === 95 || d.idnmd === 96 || d.idnmd === 97) {
              tpData.push({
                item_id: d.idnmd,
                item_text: d.libelle
              });
            }

            if (this.yeuxId.length > 0) {
              for (var i = 0; i < this.yeuxId.length; i++) {
                if (parseInt(this.yeuxId[i]) == d.idnmd) {
                  tempMalSelectedItems.push({
                    item_id: d.idnmd,
                    item_text: d.libelle
                  });
                }
              }

              this.selectedMaladieItems = tempMalSelectedItems;
            }
          }
        );
        break;

      case 11: //   fracture, traumatisme crânien,brulures, AVC
        this.listeMaladieSurprime.forEach(
          d => {
            if (d.idnmd === 98 || d.idnmd === 99 || d.idnmd === 100 || d.idnmd === 101) {
              tpData.push({
                item_id: d.idnmd,
                item_text: d.libelle
              });
            }

            if (this.fractureId.length > 0) {
              for (var i = 0; i < this.fractureId.length; i++) {
                if (parseInt(this.fractureId[i]) == d.idnmd) {
                  tempMalSelectedItems.push({
                    item_id: d.idnmd,
                    item_text: d.libelle
                  });
                }
              }

              this.selectedMaladieItems = tempMalSelectedItems;
            }
          }
        );
        break;


      case 12: //   traitement
        this.listeMaladieSurprime.forEach(
          d => {
            if (d.idnmd === 106 || d.idnmd === 107 || d.idnmd === 108 || d.idnmd === 109 || d.idnmd === 110 || d.idnmd === 111) {
              tpData.push({
                item_id: d.idnmd,
                item_text: d.libelle
              });
            }

            if (this.traitementId.length > 0) {
              for (var i = 0; i < this.traitementId.length; i++) {
                if (parseInt(this.traitementId[i]) == d.idnmd) {
                  tempMalSelectedItems.push({
                    item_id: d.idnmd,
                    item_text: d.libelle
                  });
                }
              }

              this.selectedMaladieItems = tempMalSelectedItems;
            }
          }
        );
        break;
    }

    this.maladieList = tpData;
    this.maladieSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Sélectionner tout',
      unSelectAllText: 'Supprimer les sélections',
      itemsShowLimit: 5,
      maxHeight: 400,
      allowSearchFilter: true
    };

    document.getElementById("modalSante").style.visibility = "hidden";
    if (document.getElementById("modalmaladie").style.visibility === "hidden") {
      if (this.reinitWindows) {
        document.getElementById("modalmaladie").style.visibility = "visible"
        $('#modalmaladie').modal('show');
        this.reinitWindows = false;
      }
      else document.getElementById("modalmaladie").style.visibility = "visible"
    }
    else $('#modalmaladie').modal('show');

  }

  // Display it :
  enregistrerMaladie() {
    document.getElementById("modalSante").style.visibility = "visible";
    document.getElementById("modalmaladie").style.visibility = "hidden";
  }

  //
  checkwindows() {
    if (document.getElementById("modalmaladie").style.visibility === "hidden") {
      $('#modalmaladie').modal('hide');
      $('#modalSante').modal('hide');
      this.reinitWindows = true;
    }
  }


  // Go to pull MALADIE SURPRIME data , id : 17 :
  getMaladieSurprime(): void {
    this.meswebservices.getdonneeparametree("18").toPromise()
      .then(
        resultat => {
          this.listeMaladieSurprime = resultat;
        }
      )
  }

  // whenever an item is selected :
  onMaladieIItemSelect(item: any) {
    if (parseInt(item.item_id) > 0) {
      // Depending on the PRODUCT :
      switch (this.keepSurprimeId) {
        case 1: // perte de poids, fièvres répétées, fatigue chronique
          this.pertepoidsId.push(item.item_id);
          break;

        case 2: //  ganglions, des furoncles, des abcès ou des maladies de peau
          this.ganglionsId.push(item.item_id);
          break;

        case 3: //  coeur, infections chroniques,pneumopathies, tuberculose
          this.coeurId.push(item.item_id);
          break;

        case 4: //  l’appareil digestif, foie, intestin, et anus (hémorroïdes, ulcère, hépatite….)
          this.foieId.push(item.item_id);
          break;

        case 5: //  glandes endocrines, de la nutrition, diabète, goitre
          this.glandeId.push(item.item_id);
          break;

        case 6: //  anémie, drépanocytose
          this.anemieId.push(item.item_id);
          break;

        case 7: //  coliques néphrétiques,dialyses, troubles urinaires, calcul rénal
          this.coliqueId.push(item.item_id);
          break;

        case 8: //  prostate,Fibrome, kyste
          this.prostateId.push(item.item_id);
          break;

        case 9: //  arthrose, rhumatisme
          this.arthroseId.push(item.item_id);
          break;

        case 10: //   yeux, de l’ouïe, du nez
          this.yeuxId.push(item.item_id);
          break;

        case 11: //   fracture, traumatisme crânien,brulures, AVC
          this.fractureId.push(item.item_id);
          break;

        case 12: //   Traitement
          this.traitementId.push(item.item_id);
          break;
      }
    }
  }

  // whenever an item is deselected :
  onMaladieItemDeSelect(item: any) {
    //
    switch (this.keepSurprimeId) {
      case 1: // perte de poids, fièvres répétées, fatigue chronique
        this.pertepoidsId.forEach((element, index) => {
          if (element == item.item_id) this.pertepoidsId.splice(index, 1);
        });
        break;

      case 2: //  ganglions, des furoncles, des abcès ou des maladies de peau
        this.ganglionsId.forEach((element, index) => {
          if (element == item.item_id) this.ganglionsId.splice(index, 1);
        });
        break;

      case 3: //  coeur, infections chroniques,pneumopathies, tuberculose
        this.coeurId.forEach((element, index) => {
          if (element == item.item_id) this.coeurId.splice(index, 1);
        });
        break;

      case 4: //  l’appareil digestif, foie, intestin, et anus (hémorroïdes, ulcère, hépatite….)
        this.foieId.forEach((element, index) => {
          if (element == item.item_id) this.foieId.splice(index, 1);
        });
        break;

      case 5: //  glandes endocrines, de la nutrition, diabète, goitre
        this.glandeId.forEach((element, index) => {
          if (element == item.item_id) this.glandeId.splice(index, 1);
        });
        break;

      case 6: //  anémie, drépanocytose
        this.anemieId.forEach((element, index) => {
          if (element == item.item_id) this.anemieId.splice(index, 1);
        });
        break;

      case 7: //  coliques néphrétiques,dialyses, troubles urinaires, calcul rénal
        this.coliqueId.forEach((element, index) => {
          if (element == item.item_id) this.coliqueId.splice(index, 1);
        });
        break;

      case 8: //  prostate,Fibrome, kyste
        this.prostateId.forEach((element, index) => {
          if (element == item.item_id) this.prostateId.splice(index, 1);
        });
        break;

      case 9: //  arthrose, rhumatisme
        this.arthroseId.forEach((element, index) => {
          if (element == item.item_id) this.arthroseId.splice(index, 1);
        });
        break;

      case 10: //   yeux, de l’ouïe, du nez
        this.yeuxId.forEach((element, index) => {
          if (element == item.item_id) this.yeuxId.splice(index, 1);
        });
        break;

      case 11: //   fracture, traumatisme crânien,brulures, AVC
        this.fractureId.forEach((element, index) => {
          if (element == item.item_id) this.fractureId.splice(index, 1);
        });
        break;

      case 12: //   traitement
        this.traitementId.forEach((element, index) => {
          if (element == item.item_id) this.traitementId.splice(index, 1);
        });
        break;
    }

  }


  // Whenever all items are selected :
  onMaladieSelectAll(items: any) {
    // Reset the table :
    switch (this.keepSurprimeId) {
      case 1: // perte de poids, fièvres répétées, fatigue chronique
        this.pertepoidsId = [];
        for (let i = 0; i < items.length; i++) {
          this.pertepoidsId.push(items[i].item_id);
        }
        break;

      case 2: //  ganglions, des furoncles, des abcès ou des maladies de peau
        this.ganglionsId = [];
        for (let i = 0; i < items.length; i++) {
          this.ganglionsId.push(items[i].item_id);
        }
        break;

      case 3: //  coeur, infections chroniques,pneumopathies, tuberculose
        this.coeurId = [];
        for (let i = 0; i < items.length; i++) {
          this.coeurId.push(items[i].item_id);
        }
        break;

      case 4: //  l’appareil digestif, foie, intestin, et anus (hémorroïdes, ulcère, hépatite….)
        this.foieId = [];
        for (let i = 0; i < items.length; i++) {
          this.foieId.push(items[i].item_id);
        }
        break;

      case 5: //  glandes endocrines, de la nutrition, diabète, goitre
        this.glandeId = [];
        for (let i = 0; i < items.length; i++) {
          this.glandeId.push(items[i].item_id);
        }
        break;

      case 6: //  anémie, drépanocytose
        this.anemieId = [];
        for (let i = 0; i < items.length; i++) {
          this.anemieId.push(items[i].item_id);
        }
        break;

      case 7: //  coliques néphrétiques,dialyses, troubles urinaires, calcul rénal
        this.coliqueId = [];
        for (let i = 0; i < items.length; i++) {
          this.coliqueId.push(items[i].item_id);
        }
        break;

      case 8: //  prostate,Fibrome, kyste
        this.prostateId = [];
        for (let i = 0; i < items.length; i++) {
          this.prostateId.push(items[i].item_id);
        }
        break;

      case 9: //  arthrose, rhumatisme
        this.arthroseId = [];
        for (let i = 0; i < items.length; i++) {
          this.arthroseId.push(items[i].item_id);
        }
        break;

      case 10: //   yeux, de l’ouïe, du nez
        this.yeuxId = [];
        for (let i = 0; i < items.length; i++) {
          this.yeuxId.push(items[i].item_id);
        }
        break;

      case 11: //   fracture, traumatisme crânien,brulures, AVC
        this.fractureId = [];
        for (let i = 0; i < items.length; i++) {
          this.fractureId.push(items[i].item_id);
        }
        break;

      case 12: //   traitement
        this.traitementId = [];
        for (let i = 0; i < items.length; i++) {
          this.traitementId.push(items[i].item_id);
        }
        break;
    }
  }

  // Get the DATA :
  processQuestionnaire(formdata: FormData) {

    this.formData.append("commentmaladie", this.precisionmaladie);
    this.formData.append("commentenceinte", this.precisionenceinte);
    this.formData.append("commentlunette", this.precisionlunette);

    // perte de poids, fièvres répétées, fatigue chronique
    this.tamponquestionnaire = "";
    this.pertepoidsId.forEach(
      d => {
        if (this.tamponquestionnaire.length == 0) this.tamponquestionnaire = d;
        else this.tamponquestionnaire += "," + d;
      }
    );
    this.formData.append("choixpertepoids", this.tamponquestionnaire);
    this.formData.append("commentpertepoids", this.precisionpertepoids);

    //  ganglions, des furoncles, des abcès ou des maladies de peau
    this.tamponquestionnaire = "";
    this.ganglionsId.forEach(
      d => {
        if (this.tamponquestionnaire.length == 0) this.tamponquestionnaire = d;
        else this.tamponquestionnaire += "," + d;
      }
    );
    this.formData.append("choixganglions", this.tamponquestionnaire);
    this.formData.append("commentganglions", this.precisionganglions);

    //  coeur, infections chroniques,pneumopathies, tuberculose
    this.tamponquestionnaire = "";
    this.coeurId.forEach(
      d => {
        if (this.tamponquestionnaire.length == 0) this.tamponquestionnaire = d;
        else this.tamponquestionnaire += "," + d;
      }
    );
    this.formData.append("choixcoeur", this.tamponquestionnaire);
    this.formData.append("commentcoeur", this.precisioncoeur);

    //  l’appareil digestif, foie, intestin, et anus (hémorroïdes, ulcère, hépatite….)
    this.tamponquestionnaire = "";
    this.foieId.forEach(
      d => {
        if (this.tamponquestionnaire.length == 0) this.tamponquestionnaire = d;
        else this.tamponquestionnaire += "," + d;
      }
    );
    this.formData.append("choixfoie", this.tamponquestionnaire);
    this.formData.append("commentfoie", this.precisionfoie);

    //  glandes endocrines, de la nutrition, diabète, goitre
    this.tamponquestionnaire = "";
    this.glandeId.forEach(
      d => {
        if (this.tamponquestionnaire.length == 0) this.tamponquestionnaire = d;
        else this.tamponquestionnaire += "," + d;
      }
    );
    this.formData.append("choixglandes", this.tamponquestionnaire);
    this.formData.append("commentglandes", this.precisionglande);

    //  anémie, drépanocytose
    this.tamponquestionnaire = "";
    this.anemieId.forEach(
      d => {
        if (this.tamponquestionnaire.length == 0) this.tamponquestionnaire = d;
        else this.tamponquestionnaire += "," + d;
      }
    );
    this.formData.append("choixanemie", this.tamponquestionnaire);
    this.formData.append("commentanemie", this.precisionanemie);

    //  coliques néphrétiques,dialyses, troubles urinaires, calcul rénal
    this.tamponquestionnaire = "";
    this.coliqueId.forEach(
      d => {
        if (this.tamponquestionnaire.length == 0) this.tamponquestionnaire = d;
        else this.tamponquestionnaire += "," + d;
      }
    );
    this.formData.append("choixcoliques", this.tamponquestionnaire);
    this.formData.append("commentcoliques", this.precisioncolique);

    //  prostate,Fibrome, kyste
    this.tamponquestionnaire = "";
    this.prostateId.forEach(
      d => {
        if (this.tamponquestionnaire.length == 0) this.tamponquestionnaire = d;
        else this.tamponquestionnaire += "," + d;
      }
    );
    this.formData.append("choixprostate", this.tamponquestionnaire);
    this.formData.append("commentprostate", this.precisionprostate);

    //  arthrose, rhumatisme
    this.tamponquestionnaire = "";
    this.arthroseId.forEach(
      d => {
        if (this.tamponquestionnaire.length == 0) this.tamponquestionnaire = d;
        else this.tamponquestionnaire += "," + d;
      }
    );
    this.formData.append("choixarthrose", this.tamponquestionnaire);
    this.formData.append("commentarthrose", this.precisionarthrose);

    //   yeux, de l’ouïe, du nez
    this.tamponquestionnaire = "";
    this.yeuxId.forEach(
      d => {
        if (this.tamponquestionnaire.length == 0) this.tamponquestionnaire = d;
        else this.tamponquestionnaire += "," + d;
      }
    );
    this.formData.append("choixyeux", this.tamponquestionnaire);
    this.formData.append("commentyeux", this.precisionyeux);

    //   fracture, traumatisme crânien,brulures, AVC
    this.tamponquestionnaire = "";
    this.fractureId.forEach(
      d => {
        if (this.tamponquestionnaire.length == 0) this.tamponquestionnaire = d;
        else this.tamponquestionnaire += "," + d;
      }
    );
    this.formData.append("choixfracture", this.tamponquestionnaire);
    this.formData.append("commentfracture", this.precisionfracture);

    //   traitement
    this.tamponquestionnaire = "";
    this.traitementId.forEach(
      d => {
        if (this.tamponquestionnaire.length == 0) this.tamponquestionnaire = d;
        else this.tamponquestionnaire += "," + d;
      }
    );
    this.formData.append("choixtraitement", this.tamponquestionnaire);
    this.formData.append("commenttraitement", this.precisiontraitement);
  }



  // Compute the price :
  computeVoyagePrice() {

    // set the date :
    let momentVariable = moment(this.getNaissVoyage, 'MM-DD-YYYY');
    let dates = momentVariable.format('YYYY-MM-DD');
    // : 
    let momentVariableDepart = moment(this.getJourDepart, 'MM-DD-YYYY');
    let dateDepart = momentVariableDepart.format('YYYY-MM-DD');
    let ddt = new Date(dateDepart);
    // : 
    let momentVariableRetour = moment(this.getJourRetour, 'MM-DD-YYYY');
    let dateRetour = momentVariableRetour.format('YYYY-MM-DD');
    let drr = new Date(dateRetour);

    let dureeVoyage = Math.abs(Math.round(((drr.getTime() - ddt.getTime()) / 1000) / (60 * 60 * 24)));

    var diffYear = (this.getCurrentDate.getTime() - this.getNaissVoyage.getTime()) / 1000;
    diffYear /= (60 * 60 * 24);
    let difference = Math.abs(Math.round(diffYear / 365.25));

    // Keep
    this.cotationvoyage = this.setBackVoyagePrice(Math.abs(diffYear / 365.25), dureeVoyage).toLocaleString();
  }

  setBackVoyagePrice(age: number, duree: number): number {

    let retour = 0;

    switch (this.zonedestination) {
      case 1:
      case 2:
      case 3:
        // ZONE 1 : europe- afrique- moyen orient
        if (duree <= 7) {
          if (age <= 18) retour = 15401;
          else if (age > 18) retour = 19857;
        }
        else if (duree <= 10) {
          if (age <= 18) retour = 18559;
          else if (age > 18) retour = 22017;
        }
        else if (duree <= 15) {
          if (age <= 18) retour = 24083;
          else if (age > 18) retour = 25861;
        }
        else if (duree <= 21) {
          if (age <= 18) retour = 29619;
          else if (age > 18) retour = 32345;
        }
        else if (duree <= 32) {
          if (age <= 18) retour = 31865;
          else if (age > 18) retour = 33306;
        }
        else if (duree <= 45) {
          if (age <= 18) retour = 41472;
          else if (age > 18) retour = 54465;
        }
        else if (duree <= 62) {
          if (age <= 18) retour = 44990;
          else if (age > 18) retour = 59365;
        }
        else if (duree <= 93) { // 3 mois
          if (age <= 18) retour = 53817;
          else if (age > 18) retour = 71975;
        }
        else if (duree <= 186) { // 6 mois
          if (age <= 18) retour = 67940;
          else if (age > 18) retour = 92149;
        }
        else if (duree <= 365) { // 1 an
          if (age <= 18) retour = 79420;
          else if (age > 18) retour = 108541;
        }
        else if (duree <= 730) { // 2 an
          if (age <= 18) retour = 166796;
          else if (age > 18) retour = 233373;
        }
        break;

      case 4:
        // Zone 2 , monde entier :
        if (duree <= 7) {
          if (age <= 18) retour = 15798;
          else if (age > 18) retour = 21057;
        }
        else if (duree <= 10) {
          if (age <= 18) retour = 19268;
          else if (age > 18) retour = 23039;
        }
        else if (duree <= 15) {
          if (age <= 18) retour = 25356;
          else if (age > 18) retour = 30183;
        }
        else if (duree <= 21) {
          if (age <= 18) retour = 31433;
          else if (age > 18) retour = 36188;
        }
        else if (duree <= 32) {
          if (age <= 18) retour = 36645;
          else if (age > 18) retour = 44234;
        }
        else if (duree <= 45) {
          if (age <= 18) retour = 46203;
          else if (age > 18) retour = 65693;
        }
        else if (duree <= 62) {
          if (age <= 18) retour = 61767;
          else if (age > 18) retour = 83323;
        }
        else if (duree <= 93) { // 3 mois
          if (age <= 18) retour = 75001;
          else if (age > 18) retour = 102236;
        }
        else if (duree <= 186) { // 6 mois
          if (age <= 18) retour = 95307;
          else if (age > 18) retour = 131238;
        }
        else if (duree <= 365) { // 1 an
          if (age <= 18) retour = 109802;
          else if (age > 18) retour = 151953;
        }
        else if (duree <= 730) { // 2 an
          if (age <= 18) retour = 182095;
          else if (age > 18) retour = 255228;
        }
        break;
    }

    return retour;
  }

}
