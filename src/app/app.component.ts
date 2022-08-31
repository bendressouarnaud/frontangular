import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Spinkit } from 'ng-http-loader';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { AppService } from './messervices/appservice';
declare const $: any;

@Component({
  selector: 'app-my-app',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  // A t t r i b u t es :
  public spinkit = Spinkit;
  private _router: Subscription;
  idleState = 'Not started.';
  timedOut = false;
  timedIsGoingOut = false;
  lastPing?: Date = null;
  title = 'angular-idle-timeout';

  // WebSite I got help from :
  //   https://blog.bitsrc.io/how-to-implement-idle-timeout-in-angular-af61eefdb13b


  // M e t h o d s :
  constructor(private router: Router, private idle: Idle, private keepalive: Keepalive, private appService: AppService) {
    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(1800);  // 1800 s = 60s * 30 mn
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      if (localStorage.length > 0) {
        if (localStorage.getItem('userid')) {

          //this.idleState = 'No longer idle.'
          //console.log(this.idleState);
          this.timedIsGoingOut = false;
          this.reset();

        }
      }

    });

    idle.onTimeout.subscribe(() => {
      //this.idleState = 'Timed out!';
      this.timedOut = true;
      this.timedIsGoingOut = false;
      //console.log(this.idleState);

      if (localStorage.length > 0) {
        localStorage.clear();
        //window.location.href = "/";
      }

      // Set the FLAG :
      //this.router.navigate(['/']);
      window.location.href = "/";
    });


    idle.onIdleStart.subscribe(() => {

      if (localStorage.length > 0) {
        if (localStorage.getItem('userid')) {
          //this.idleState = 'You\'ve gone idle!'
          //console.log(this.idleState);
        }
        else {
          this.reset();
          //console.log("Utilisateur non connecté");
        }
      }
      else {
        this.reset();
        //console.log("Utilisateur non connecté");
      }

    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      if(!this.timedIsGoingOut){
        this.timedIsGoingOut = true;
        this.warnmessage("Votre session se déconnectera d'ici moins de 5s !");
      }
      //this.idleState = 'You will time out in ' + countdown + ' seconds!'
      //console.log(this.idleState);
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

    // Perform :
    /*
    this.appService.getUserLoggedIn().subscribe(userLoggedIn => {

      if (userLoggedIn) {
        alert("OK");
        //idle.watch();
        this.timedOut = false;
      } else {
        alert("POK");
        //idle.stop();
      }
    });
    */


    this.reset();
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
    this.timedIsGoingOut = false;
  }

  ngOnInit() {
    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      const body = document.getElementsByTagName('body')[0];
      const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
      if (body.classList.contains('modal-open')) {
        body.classList.remove('modal-open');
        modalBackdrop.remove();
      }
    });
  }


  warnmessage(information: string) {
    $.notify({
      icon: 'notifications',
      message: information
    }, {
      type: 'danger',
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
}
