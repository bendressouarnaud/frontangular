import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { Rdv } from 'src/app/mesbeans/rdv';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

declare const $: any;

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  // A t t r i b u t e s :
  listeRdv : Rdv[];
  evenements : any[] = [];
  evenementsSuperv : any[] = [];
  evenementsInspec : any[] = [];
  evenementsPers : any[] = [];
  ladate : Date;
  compteur = 0;
  compteurPers = 0;
  compteurSuperv = 0;
  compteurInspec = 0;

  constructor(private meswebservices: MeswebservService) { }

  ngOnInit(): void {
    this.getTraderAgenda();
    this.getSupervAgenda();
    this.getInspecAgenda();
    this.getbackallrdv();
  }

  /* TRADER */
  getTraderAgenda(): void {
    this.meswebservices.getraderagendabymanag().toPromise().then(
      resultat => {
        if (resultat.length > 0) {
          //  
          for(var i=0; i<resultat.length; i++){
            // get HOUR :
            var times = resultat[i].heure.split(":");
            var heure = parseInt(times[0]);
            var minute = parseInt(times[1]);
            this.ladate = new Date(resultat[i].dte);
            //
            const y = this.ladate.getFullYear();
            const m = this.ladate.getMonth();
            const d = this.ladate.getDate();

            var events = {
              title: resultat[i].commercial,
              start : new Date(y, m, d, heure, minute),
              className: this.generateColor()
            }            

            //
            this.evenements.push(events);
          }                   
          
        }

        // Call :
        this.processDate(this.evenements);
      }
    )
  }



  processDate(evenements : any[]) : void {    

    const $calendar = $('#traderCalendar');

    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth();
    const d = today.getDate();

    $calendar.fullCalendar({
      viewRender: function (view: any, element: any) {
        // We make sure that we activate the perfect scrollbar when the view isn't on Month
        if (view.name != 'month') {
          var elem = $(element).find('.fc-scroller')[0];
          let ps = new PerfectScrollbar(elem);
        }
      },
      header: {
        left: 'title',
        center: 'month, agendaWeek, agendaDay',
        right: 'prev, next, today'
      },
      defaultDate: today,
      selectable: true,
      selectHelper: true,
      views: {
        month: { // name of view
          titleFormat: 'MMMM YYYY'
          // other view-specific options here
        },
        week: {
          titleFormat: ' MMMM D YYYY'
        },
        day: {
          titleFormat: 'D MMM, YYYY'
        }
      },
      editable: true,
      eventLimit: true, // allow "more" link when too many events

      // color classes: [ event-blue | event-azure | event-green | event-orange | event-red ]
      events : evenements      
    });
  }




  getSupervAgenda(): void {
    this.meswebservices.getsupervagendabymanag().toPromise().then(
      resultat => {
        if (resultat.length > 0) {
          //  
          for(var i=0; i<resultat.length; i++){
            // get HOUR :
            var times = resultat[i].heure.split(":");
            var heure = parseInt(times[0]);
            var minute = parseInt(times[1]);
            this.ladate = new Date(resultat[i].dte);
            //
            const y = this.ladate.getFullYear();
            const m = this.ladate.getMonth();
            const d = this.ladate.getDate();

            var events = {
              title: resultat[i].commercial,
              start : new Date(y, m, d, heure, minute),
              className: this.generateColorSuperv()
            }            

            //
            this.evenementsSuperv.push(events);
          }                   
          
        }

        // Call :
        this.processDateSuperv(this.evenementsSuperv);
      }
    )
  }



  processDateSuperv(evenements : any[]) : void {    

    const $calendar = $('#superviseurCalendar');

    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth();
    const d = today.getDate();

    $calendar.fullCalendar({
      viewRender: function (view: any, element: any) {
        // We make sure that we activate the perfect scrollbar when the view isn't on Month
        if (view.name != 'month') {
          var elem = $(element).find('.fc-scroller')[0];
          let ps = new PerfectScrollbar(elem);
        }
      },
      header: {
        left: 'title',
        center: 'month, agendaWeek, agendaDay',
        right: 'prev, next, today'
      },
      defaultDate: today,
      selectable: true,
      selectHelper: true,
      views: {
        month: { // name of view
          titleFormat: 'MMMM YYYY'
          // other view-specific options here
        },
        week: {
          titleFormat: ' MMMM D YYYY'
        },
        day: {
          titleFormat: 'D MMM, YYYY'
        }
      },
      editable: true,
      eventLimit: true, // allow "more" link when too many events

      // color classes: [ event-blue | event-azure | event-green | event-orange | event-red ]
      events : evenements      
    });
  }



  //
  getInspecAgenda(): void {
    this.meswebservices.getinspecagendabymanag().toPromise().then(
      resultat => {
        if (resultat.length > 0) {
          //  
          for(var i=0; i<resultat.length; i++){
            // get HOUR :
            var times = resultat[i].heure.split(":");
            var heure = parseInt(times[0]);
            var minute = parseInt(times[1]);
            this.ladate = new Date(resultat[i].dte);
            //
            const y = this.ladate.getFullYear();
            const m = this.ladate.getMonth();
            const d = this.ladate.getDate();

            var events = {
              title: resultat[i].commercial,
              start : new Date(y, m, d, heure, minute),
              className: this.generateColorInspec()
            }            

            //
            this.evenementsInspec.push(events);
          }                   
          
        }

        // Call :
        this.processDateInspec(this.evenementsInspec);
      }
    )
  }



  processDateInspec(evenements : any[]) : void {    

    const $calendar = $('#inspecteurCalendar');

    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth();
    const d = today.getDate();

    $calendar.fullCalendar({
      viewRender: function (view: any, element: any) {
        // We make sure that we activate the perfect scrollbar when the view isn't on Month
        if (view.name != 'month') {
          var elem = $(element).find('.fc-scroller')[0];
          let ps = new PerfectScrollbar(elem);
        }
      },
      header: {
        left: 'title',
        center: 'month, agendaWeek, agendaDay',
        right: 'prev, next, today'
      },
      defaultDate: today,
      selectable: true,
      selectHelper: true,
      views: {
        month: { // name of view
          titleFormat: 'MMMM YYYY'
          // other view-specific options here
        },
        week: {
          titleFormat: ' MMMM D YYYY'
        },
        day: {
          titleFormat: 'D MMM, YYYY'
        }
      },
      editable: true,
      eventLimit: true, // allow "more" link when too many events

      // color classes: [ event-blue | event-azure | event-green | event-orange | event-red ]
      events : evenements      
    });
  }



  getbackallrdv(): void {
    this.meswebservices.getbackallrdv().toPromise().then(
      resultat => {
        if (resultat.length > 0) {
          //  
          for(var i=0; i<resultat.length; i++){
            let tDate = resultat[i].dates.toString().split("T");
            // get HOUR :
            var times = resultat[i].heure.split(":");
            var heure = parseInt(times[0]);
            var minute = parseInt(times[1]);
            this.ladate = new Date(tDate[0]);
            //
            const y = this.ladate.getFullYear();
            const m = this.ladate.getMonth();
            const d = this.ladate.getDate();

            var events = {
              title: resultat[i].nom,
              start : new Date(y, m, d, heure, minute),
              className: this.generatPerseColor()
            }
            

            //
            this.evenementsPers.push(events);
          }                   
          
        }

        // Call :
        this.processPersonnalDate();
      }
    )
  }



  processPersonnalDate() : void {    

    const $calendar = $('#personnalCalendar');

    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth();
    const d = today.getDate();

    $calendar.fullCalendar({
      viewRender: function (view: any, element: any) {
        // We make sure that we activate the perfect scrollbar when the view isn't on Month
        if (view.name != 'month') {
          var elem = $(element).find('.fc-scroller')[0];
          let ps = new PerfectScrollbar(elem);
        }
      },
      header: {
        left: 'title',
        center: 'month, agendaWeek, agendaDay',
        right: 'prev, next, today'
      },
      defaultDate: today,
      selectable: true,
      selectHelper: true,
      views: {
        month: { // name of view
          titleFormat: 'MMMM YYYY'
          // other view-specific options here
        },
        week: {
          titleFormat: ' MMMM D YYYY'
        },
        day: {
          titleFormat: 'D MMM, YYYY'
        }
      },
      editable: true,
      eventLimit: true, // allow "more" link when too many events


      // color classes: [ event-blue | event-azure | event-green | event-orange | event-red ]
      events : this.evenementsPers      
    });
  }



  // Generate color :
  generateColor() : string{
    if(this.compteur == 8) this.compteur = 0; 
    this.compteur++;

    if(this.compteur == 1) return "";
    else if(this.compteur == 2) return "event-default";
    else if(this.compteur == 3) return "event-rose";
    else if(this.compteur == 4) return "event-blue";
    else if(this.compteur == 5) return "event-azure";
    else if(this.compteur == 6) return "event-green";
    else if(this.compteur == 7) return "event-orange";
    else if(this.compteur == 8) return "event-red";

    // event-blue | event-azure | event-green | event-orange | event-red
  }


  generateColorSuperv() : string{
    if(this.compteurSuperv == 8) this.compteurSuperv = 0; 
    this.compteurSuperv++;

    if(this.compteurSuperv == 1) return "";
    else if(this.compteurSuperv == 2) return "event-default";
    else if(this.compteurSuperv == 3) return "event-rose";
    else if(this.compteurSuperv == 4) return "event-blue";
    else if(this.compteurSuperv == 5) return "event-azure";
    else if(this.compteurSuperv == 6) return "event-green";
    else if(this.compteurSuperv == 7) return "event-orange";
    else if(this.compteurSuperv == 8) return "event-red";

    // event-blue | event-azure | event-green | event-orange | event-red
  }


  generateColorInspec() : string{
    if(this.compteurInspec == 8) this.compteurInspec = 0; 
    this.compteurInspec++;

    if(this.compteurInspec == 1) return "";
    else if(this.compteurInspec == 2) return "event-default";
    else if(this.compteurInspec == 3) return "event-rose";
    else if(this.compteurInspec == 4) return "event-blue";
    else if(this.compteurInspec == 5) return "event-azure";
    else if(this.compteurInspec == 6) return "event-green";
    else if(this.compteurInspec == 7) return "event-orange";
    else if(this.compteurInspec == 8) return "event-red";

    // event-blue | event-azure | event-green | event-orange | event-red
  }

  // Generate color :
  generatPerseColor() : string{
    if(this.compteurPers == 8) this.compteurPers = 0; 
    this.compteurPers++;

    if(this.compteurPers == 1) return "";
    else if(this.compteurPers == 2) return "event-default";
    else if(this.compteurPers == 3) return "event-rose";
    else if(this.compteurPers == 4) return "event-blue";
    else if(this.compteurPers == 5) return "event-azure";
    else if(this.compteurPers == 6) return "event-green";
    else if(this.compteurPers == 7) return "event-orange";
    else if(this.compteurPers == 8) return "event-red";

    // event-blue | event-azure | event-green | event-orange | event-red
  }


}
