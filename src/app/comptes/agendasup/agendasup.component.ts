import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import PerfectScrollbar from 'perfect-scrollbar';
import { Rdv } from 'src/app/mesbeans/rdv';
import { MeswebservService } from 'src/app/messervices/meswebserv.service';

declare const $: any;

@Component({
  selector: 'app-agendasup',
  templateUrl: './agendasup.component.html',
  styleUrls: ['./agendasup.component.css']
})
export class AgendasupComponent implements OnInit {

  // A t t r i b u t e s :
  listeRdv : Rdv[];
  evenements : any[] = [];
  evenementsPers : any[] = [];
  ladate : Date;
  compteur = 0;
  compteurPers = 0;


  // M e t h o d s :
  constructor(private meswebservices: MeswebservService) { }

  ngOnInit(): void {

    //this.getbackallrdv();
    this.getTeamAgenda();
    this.getbackallrdv();

  }


  processDate() : void {    

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

      select: function (start: any, end: any) {

        // on select we show the Sweet Alert modal with an input
        swal.fire({
          title: 'Create an Event',
          html: '<div class="form-group">' +
            '<input class="form-control" placeholder="Event Title" id="input-field">' +
            '</div>',
          showCancelButton: true,
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger',
          },
          buttonsStyling: false
        }).then(function (result: any) {

          let eventData;
          const event_title = $('#input-field').val();

          if (event_title) {
            eventData = {
              title: event_title,
              start: start,
              end: end
            };
            $calendar.fullCalendar('renderEvent', eventData, true); // stick? = true
          }

          $calendar.fullCalendar('unselect');

        });
      },
      editable: true,
      eventLimit: true, // allow "more" link when too many events


      // color classes: [ event-blue | event-azure | event-green | event-orange | event-red ]
      events : this.evenements      
    });
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

      select: function (start: any, end: any) {

        // on select we show the Sweet Alert modal with an input
        swal.fire({
          title: 'Create an Event',
          html: '<div class="form-group">' +
            '<input class="form-control" placeholder="Event Title" id="input-field">' +
            '</div>',
          showCancelButton: true,
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger',
          },
          buttonsStyling: false
        }).then(function (result: any) {

          let eventData;
          const event_title = $('#input-field').val();

          if (event_title) {
            eventData = {
              title: event_title,
              start: start,
              end: end
            };
            $calendar.fullCalendar('renderEvent', eventData, true); // stick? = true
          }

          $calendar.fullCalendar('unselect');

        });
      },
      editable: true,
      eventLimit: true, // allow "more" link when too many events


      // color classes: [ event-blue | event-azure | event-green | event-orange | event-red ]
      events : this.evenementsPers      
    });
  }



  getTeamAgenda(): void {
    this.meswebservices.getTeamAgenda('commercial').toPromise().then(
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
        this.processDate();
      }
    )


    // Call here :
    //this.getbackallrdv();
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
