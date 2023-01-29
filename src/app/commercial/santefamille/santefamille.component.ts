import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Civilite } from 'src/app/mesbeans/civilite';
import { Detailtable } from 'src/app/mesbeans/detailnomenclature';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';
import * as moment from 'moment';
import { Detailresumefamille } from 'src/app/mesbeans/detailresumefamille';
import { Detailconjoint } from 'src/app/mesbeans/detailconjoint';
import { Detailenfant } from 'src/app/mesbeans/detailenfant';

declare const $: any;

@Component({
  selector: 'app-santefamille',
  templateUrl: './santefamille.component.html',
  styleUrls: ['./santefamille.component.css']
})
export class SantefamilleComponent implements OnInit {

  // A t t r i b u t e s :
  idsan = "";
  idenf = "0";
  formData = new FormData();
  presenceCni = true;
  presencePhoto = true;
  /* conjoint(e) */
  nomconjoint = "";
  prenomconjoint = "";
  contactconjoint = "";
  tailleconjoint = "0";
  poidsconjoint = "0";
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
  tailleEnfantUn = "0";
  poidsEnfantUn = "0";
  sexeEnfantUn = 0;
  contactEnfantUn = "";
  groupesanguinEnfantUn = 0;
  tensionarterielleEnfantUn = "";
  getNaissanceSanteEnfantUn = new Date();
  basicDatepickerSanteEnfantUn = "";
  lieunaissanceEnfantUn = "";
  villeEnfantUn = "";
  emailEnfantUn = "";
  getCurrentDate = new Date();

  // Data : 
  lesCivilite: Civilite[];
  listeGroupeSanguin: Detailtable[];


  // Questionnaire medical :
  maladieConjoint = 0;
  maladieEnfantUn = 0;
  // Perte de poids
  pertepoidsConjoint = 0;
  pertepoidsEnfantUn = 0;
  // Ganglions
  ganglionConjoint = 0;
  ganglionEnfantUn = 0;
  // Coeur
  coeurConjoint = 0;
  coeurEnfantUn = 0;
  // Appareil digestif, foie
  foieConjoint = 0;
  foieEnfantUn = 0;
  // Appareil digestif, foie
  glandeConjoint = 0;
  glandeEnfantUn = 0;
  // anemie
  anemieConjoint = 0;
  anemieEnfantUn = 0;
  // colique
  coliqueConjoint = 0;
  coliqueEnfantUn = 0;
  // colique
  prostateConjoint = 0;
  prostateEnfantUn = 0;
  // enceinte
  enceinteConjoint = 0;
  enceinteEnfantUn = 0;
  // arthrose
  arthroseConjoint = 0;
  arthroseEnfantUn = 0;
  // yeux
  yeuxConjoint = 0;
  yeuxEnfantUn = 0;
  // lunettes
  lunettesConjoint = 0;
  lunettesEnfantUn = 0;
  // hospitalise
  hospitaliseConjoint = 0;
  hospitaliseEnfantUn = 0;
  // traitement
  traitementConjoint = 0;
  traitementEnfantUn = 0;
  // 
  getResume = false;
  listeResumeFamille: Detailresumefamille[];
  getConjoint = false;
  listeDetailconjoint: Detailconjoint[];
  getEnfant = false;
  listeDetailenfant: Detailenfant[];

  // For 'CHOIX and Comment : 
  listeMaladieSurprime: Detailtable[];
  precisionmaladie = "";
  maladieSettings = {};
  maladieList = [];
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
  typeadh = 0;





  // M e t h o d s :
  constructor(private meswebservices: MeswebservService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      // Get parameters :
      this.idsan = params['idsan'];
      //alert("Data : "+this.idsan);
    });

    // Call this : 
    this.getLesCivilite();
    this.getGroupeSanguin();
    this.getResumeFamille();
    this.getConjointHistorique();
    this.getEnfantHistorique();
    this.getMaladieSurprime();
    this.separateurMillierOnFields();
  }


  resetTables() {
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

    // Comments too :
    this.precisionanemie = "";
    this.precisionarthrose = "";
    this.precisioncoeur  = "";
    this.precisioncolique = "";
    this.precisionenceinte = "";
    this.precisionfoie = "";
    this.precisionfracture = "";
    this.precisionganglions = "";
    this.precisionglande = "";
    this.precisionlunette = "";
    this.precisionmaladie = "";
    this.precisionpertepoids = "";
  }


  // Conjoint :
  afficherConjoint() {
    this.typeadh = 1;
    this.resetTables();
    // clear :
    if (this.formData.has("photo")) this.formData.delete("photo");
    if (this.formData.has("cni")) this.formData.delete("cni");
    this.presencePhoto = false;
    this.presenceCni = false;

    this.nomconjoint = "";
    this.prenomconjoint = "";
    this.contactconjoint = "";
    this.tailleconjoint = "0";
    this.poidsconjoint = "0";
    this.tensionarterielleconjoint = "";
    this.basicDatepickerSanteConjoint = "";
    this.lieunaissanceconjoint = "";
    this.quartierresidenceconjoint = "";
    this.adressepostaleconjoint = "";
    $('#modalCONJOINT').modal();
  }


  // Enfant :
  afficherEnfant() {
    this.typeadh = 2;
    this.resetTables();
    // clear :
    if (this.formData.has("photo")) this.formData.delete("photo");
    if (this.formData.has("cni")) this.formData.delete("cni");
    this.presencePhoto = false;
    this.presenceCni = false;
    this.sexeEnfantUn = 0;

    this.nomEnfantUn = "";
    this.prenomEnfantUn = "";
    this.contactEnfantUn = "";
    this.tailleEnfantUn = "0";
    this.poidsEnfantUn = "0";
    this.tensionarterielleEnfantUn = "";
    this.basicDatepickerSanteEnfantUn = "";
    this.lieunaissanceEnfantUn = "";
    $('#modalENFANT').modal();
  }


  // Get CIVILITE :
  getLesCivilite(): void {
    this.meswebservices.getallcivilite().toPromise()
      .then(
        resultat => {
          this.lesCivilite = resultat;
          this.civiliteconjoint = resultat[0].idciv;
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
          this.groupesanguinconjoint = resultat[0].idnmd;
          this.groupesanguinEnfantUn = resultat[0].idnmd;
        }
      )
  }

  // Convert :
  convertStringToInt(field: string): Number {
    let retour = 0;
    try {
      retour = parseInt(field);
    }
    catch (error) {

    }
    return retour;
  }


  // Get  :
  getResumeFamille(): void {
    this.meswebservices.getResumeFamille(this.idsan).toPromise()
      .then(
        resultat => {
          this.listeResumeFamille = resultat;
          this.getResume = true;
        }
      )
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


  // Get  :
  getConjointHistorique(): void {
    this.meswebservices.getConjointHistorique(this.idsan).toPromise()
      .then(
        resultat => {
          this.listeDetailconjoint = resultat;
          this.getConjoint = true;
          //
          if(this.listeDetailconjoint.length > 0) $("#btconj").prop("disabled", true); // DISABLE
        }
      )
  }


  // Get ENFANT :
  getEnfantHistorique(): void {
    this.meswebservices.getEnfantHistorique(this.idsan).toPromise()
      .then(
        resultat => {
          this.listeDetailenfant = resultat;
          this.getEnfant = true;
          this.initTableEnfant();
        },
        (error) => {
          this.getEnfant = true;
          this.initTableEnfant();
        }
      )
  }


  // Save Conjoint DATA : "
  enregConjoint(): void {
    // Naissance 'Conjoint' :
    let momentVariable = moment(this.getNaissanceSanteConjoint, 'MM-DD-YYYY');
    let dateConjoint = momentVariable.format('YYYY-MM-DD');

    var diffYear = (this.getCurrentDate.getTime() - this.getNaissanceSanteConjoint.getTime()) / 1000;
    diffYear /= (60 * 60 * 24);
    let ageConjoint = Math.abs(Math.round(diffYear / 365.25));

    if (this.nomconjoint.trim().toString().length == 0) {
      this.warnmessage("Le nom n'est pas renseigné !");
      return;
    }

    if (this.prenomconjoint.trim().toString().length == 0) {
      this.warnmessage("Le prénom n'est pas renseigné !");
      return;
    }

    if (this.contactconjoint.trim().toString().length == 0) {
      this.warnmessage("Le contact n'est pas renseigné !");
      return;
    }

    this.formData.append("nom", this.nomconjoint.toString());
    this.formData.append("prenom", this.prenomconjoint.toString());
    this.formData.append("contact", this.contactconjoint.toString());
    this.formData.append("naissance", dateConjoint);
    this.formData.append("age", ageConjoint.toString());
    this.formData.append("civilite", this.civiliteconjoint.toString());
    this.formData.append("taille", this.convertStringToInt(this.tailleconjoint).toString());
    this.formData.append("poids", this.convertStringToInt(this.poidsconjoint).toString());
    this.formData.append("groupesanguin", this.groupesanguinconjoint.toString());
    this.formData.append("tension", this.tensionarterielleconjoint);
    this.formData.append("lieunaissance", this.lieunaissanceconjoint);
    this.formData.append("residence", this.quartierresidenceconjoint);
    this.formData.append("adresse", this.adressepostaleconjoint);

    // Questionnaire medical :
    this.formData.append("maladie", this.maladieConjoint.toString());
    this.formData.append("pertepoids", this.pertepoidsConjoint.toString());
    this.formData.append("ganglion", this.ganglionConjoint.toString());
    this.formData.append("coeur", this.coeurConjoint.toString());
    this.formData.append("foie", this.foieConjoint.toString());
    this.formData.append("glande", this.glandeConjoint.toString());
    this.formData.append("anemie", this.anemieConjoint.toString());
    this.formData.append("colique", this.coliqueConjoint.toString());
    this.formData.append("prostate", this.prostateConjoint.toString());
    this.formData.append("enceinte", this.enceinteConjoint.toString());
    this.formData.append("arthrose", this.arthroseConjoint.toString());
    this.formData.append("yeux", this.yeuxConjoint.toString());
    this.formData.append("lunettes", this.lunettesConjoint.toString());
    this.formData.append("hospitalise", this.hospitaliseConjoint.toString());
    this.formData.append("traitement", this.traitementConjoint.toString());

    // Data PERSONAL :
    this.formData.append("idsan", this.idsan.toString());

    // call function to feed DATA :
    this.processQuestionnaire(this.formData);

    // Call :
    this.meswebservices.sendDevisSanteConjoint(this.formData).toPromise()
      .then(
        resultat => {
          if (resultat.code == "ok") {
            location.reload();
          }
        },
        (error) => {
          this.warnmessage("Impossible d'enregistrer les données du Conjoint !");
        }
      );
  }





  // Save Conjoint DATA : "
  enregEnfant(): void {
    // Naissance 'Conjoint' :
    let momentVariable = moment(this.getNaissanceSanteEnfantUn, 'MM-DD-YYYY');
    let dateEnfantUn = momentVariable.format('YYYY-MM-DD');

    if (this.nomEnfantUn.trim().toString().length == 0) {
      this.warnmessage("Le nom n'est pas renseigné !");
      return;
    }

    if (this.prenomEnfantUn.trim().toString().length == 0) {
      this.warnmessage("Le prénom n'est pas renseigné !");
      return;
    }

    /*if (this.contactEnfantUn.trim().toString().length == 0) {
      this.warnmessage("Le contact n'est pas renseigné !");
      return;
    }*/

    this.formData.append("nom", this.nomEnfantUn.toString());
    this.formData.append("prenom", this.prenomEnfantUn.toString());
    this.formData.append("contact", this.contactEnfantUn.toString());
    this.formData.append("naissance", dateEnfantUn);
    this.formData.append("taille", this.convertStringToInt(this.tailleEnfantUn).toString());
    this.formData.append("poids", this.convertStringToInt(this.poidsEnfantUn).toString());
    this.formData.append("groupesanguin", this.groupesanguinEnfantUn.toString());
    this.formData.append("tension", this.tensionarterielleEnfantUn);
    this.formData.append("lieunaissance", this.lieunaissanceEnfantUn);
    this.formData.append("residence", this.villeEnfantUn);
    this.formData.append("email", this.emailEnfantUn);
    this.formData.append("sexe", this.sexeEnfantUn.toString());

    // Questionnaire medical :
    this.formData.append("maladie", this.maladieEnfantUn.toString());
    this.formData.append("pertepoids", this.pertepoidsEnfantUn.toString());
    this.formData.append("ganglion", this.ganglionEnfantUn.toString());
    this.formData.append("coeur", this.coeurEnfantUn.toString());
    this.formData.append("foie", this.foieEnfantUn.toString());
    this.formData.append("glande", this.glandeEnfantUn.toString());
    this.formData.append("anemie", this.anemieEnfantUn.toString());
    this.formData.append("colique", this.coliqueEnfantUn.toString());
    this.formData.append("prostate", this.prostateEnfantUn.toString());
    this.formData.append("enceinte", this.enceinteEnfantUn.toString());
    this.formData.append("arthrose", this.arthroseEnfantUn.toString());
    this.formData.append("yeux", this.yeuxEnfantUn.toString());
    this.formData.append("lunettes", this.lunettesEnfantUn.toString());
    this.formData.append("hospitalise", this.hospitaliseEnfantUn.toString());
    this.formData.append("traitement", this.traitementEnfantUn.toString());

    // Data PERSONAL :
    this.formData.append("idsan", this.idsan.toString());
    this.formData.append("idenf", this.idenf.toString());

    // call function to feed DATA :
    this.processQuestionnaire(this.formData);

    // Call :
    this.meswebservices.sendDevisSanteEnfantFam(this.formData).toPromise()
      .then(
        resultat => {
          if (resultat.code == "ok") {
            location.reload();
          }
        },
        (error) => {
          this.warnmessage("Impossible d'enregistrer les données du Conjoint !");
        }
      );
  }




  // Get DATA from SANTE devis :
  displayconjoint(idsan: string) {
    this.meswebservices.getconjointsantedata(idsan).toPromise()
      .then(
        resultat => {
          this.typeadh = 1;
          // Assure :
          this.nomconjoint = resultat.nom;
          this.prenomconjoint = resultat.prenom;
          this.contactconjoint = resultat.contact;
          //this.emailEnfantUn = resultat.email;
          this.civiliteconjoint = resultat.civilite;
          this.getNaissanceSanteConjoint = new Date(resultat.naissance.toString());
          // Info SANTE :
          this.tensionarterielleconjoint = resultat.tension;
          this.lieunaissanceconjoint = resultat.lieunaissance;
          this.quartierresidenceconjoint = resultat.residence;
          this.adressepostaleconjoint = resultat.adresse;
          this.tailleconjoint = resultat.taille.toString();
          this.poidsconjoint = resultat.poids.toString();
          this.groupesanguinconjoint = resultat.groupesanguin;
          // Questionnaire MEDICAL :
          this.maladieConjoint = resultat.maladie;
          this.pertepoidsConjoint = resultat.pertepoids;
          this.ganglionConjoint = resultat.ganglion;
          this.coeurConjoint = resultat.coeur;
          this.foieConjoint = resultat.foie;
          this.glandeConjoint = resultat.glande;
          this.anemieConjoint = resultat.anemie;
          this.coliqueConjoint = resultat.colique;
          this.prostateConjoint = resultat.prostate;
          this.enceinteConjoint = resultat.enceinte;
          this.arthroseConjoint = resultat.arthrose;
          this.yeuxConjoint = resultat.yeux;
          this.lunettesConjoint = resultat.lunettes;
          this.hospitaliseConjoint = resultat.hospitalise;
          this.traitementConjoint = resultat.traitement;
          this.idsan = idsan;

          // Process 'COMMENTAIRE' and 'CHOIX'
          if (resultat.surprimes.length > 0) {

            let tpData = [];
            let tempMalSelectedItems = [];
            this.selectedMaladieItems = [];

            this.resetTables();

            var tampSurprime = resultat.surprimes.split(",");
            tampSurprime.forEach(
              su => {
                this.listeMaladieSurprime.forEach(
                  d => {
                    if (d.idnmd === parseInt(su)) {

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

          $('#modalCONJOINT').modal();
        },
        (error) => {
          //alert("Erreur SANTE getting");
        }
      );
  }


  displayenfant(idenf: string) {
    this.meswebservices.getenfantsantedata(idenf, this.idsan).toPromise()
      .then(
        resultat => {
          this.typeadh = 2;
          // Assure :
          this.nomEnfantUn = resultat.nom;
          this.prenomEnfantUn = resultat.prenom;
          this.contactEnfantUn = resultat.contact;
          this.emailEnfantUn = resultat.email;
          this.sexeEnfantUn = resultat.civilite;
          this.getNaissanceSanteEnfantUn = new Date(resultat.naissance.toString());
          // Info SANTE :
          this.tensionarterielleEnfantUn = resultat.tension;
          this.lieunaissanceEnfantUn = resultat.lieunaissance;
          this.villeEnfantUn = resultat.residence;
          this.tailleEnfantUn = resultat.taille.toString();
          this.poidsEnfantUn = resultat.poids.toString();
          this.groupesanguinEnfantUn = resultat.groupesanguin;
          // Questionnaire MEDICAL :
          this.maladieEnfantUn = resultat.maladie;
          this.pertepoidsEnfantUn = resultat.pertepoids;
          this.ganglionEnfantUn = resultat.ganglion;
          this.coeurEnfantUn = resultat.coeur;
          this.foieEnfantUn = resultat.foie;
          this.glandeEnfantUn = resultat.glande;
          this.anemieEnfantUn = resultat.anemie;
          this.coliqueEnfantUn = resultat.colique;
          this.prostateEnfantUn = resultat.prostate;
          this.enceinteEnfantUn = resultat.enceinte;
          this.arthroseEnfantUn = resultat.arthrose;
          this.yeuxEnfantUn = resultat.yeux;
          this.lunettesEnfantUn = resultat.lunettes;
          this.hospitaliseEnfantUn = resultat.hospitalise;
          this.traitementEnfantUn = resultat.traitement;
          this.idenf = idenf;

          // Process 'COMMENTAIRE' and 'CHOIX'
          if (resultat.surprimes.length > 0) {

            let tpData = [];
            let tempMalSelectedItems = [];
            this.selectedMaladieItems = [];

            this.resetTables();

            var tampSurprime = resultat.surprimes.split(",");
            tampSurprime.forEach(
              su => {
                this.listeMaladieSurprime.forEach(
                  d => {
                    if (d.idnmd === parseInt(su)) {

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

          $('#modalENFANT').modal();
        },
        (error) => {
          //alert("Erreur SANTE getting");
        }
      );
  }


  initTableEnfant() {
    setTimeout(function () {
      $('#datatableEnfant').DataTable({
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





  // Display :
  selectchoix(id: number, typeadh: number) {

    // 1 : conjoint  ---  2 : enfant
    this.typeadh = typeadh;

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

    if (typeadh === 1) document.getElementById("modalCONJOINT").style.visibility = "hidden";
    else document.getElementById("modalENFANT").style.visibility = "hidden";
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
    if (this.typeadh === 1) document.getElementById("modalCONJOINT").style.visibility = "visible";
    else document.getElementById("modalENFANT").style.visibility = "visible";
    document.getElementById("modalmaladie").style.visibility = "hidden";
  }

  //
  checkwindows() {
    if (document.getElementById("modalmaladie").style.visibility === "hidden") {
      $('#modalmaladie').modal('hide');
      //$('#modalSante').modal('hide');
      if (this.typeadh === 1) $('#modalCONJOINT').modal('hide');
      else $('#modalENFANT').modal('hide');
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

}
