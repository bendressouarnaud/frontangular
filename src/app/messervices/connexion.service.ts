import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class ConnexionService implements CanActivate{
    
    // Constructor 
    constructor(private router:Router){}

    // Implementation of canActivate :
    canActivate() : boolean {
        if(localStorage.length > 0){
            if(localStorage.getItem('userid')){
                return true;
            }
            else {
                this.router.navigateByUrl('/pages/login');
                return false;
            }
        }
        else  {
            this.router.navigateByUrl('/pages/login');
            return false;
        }
    }
    
}