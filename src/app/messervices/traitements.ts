import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})



export class Traitements {


    // Methods :
    constructor() { }

    calculerCout(indemnite: number, offrecommerciale: number, periode: number): number {

        var cout = 0;

        switch (offrecommerciale) {
            case 24:
                // STANDARD :
                switch (indemnite) {
                    case 2500000:
                        if (periode == 19) cout = 71656; // 3 mois
                        else if (periode == 20) cout = 112434; // 6 mois
                        else if (periode == 21) cout = 153213; // 9 mois
                        else if (periode == 22) cout = 178699; // 12 mois
                        break;

                    case 5000000:
                        if (periode == 19) cout = 89243; // 3 mois
                        else if (periode == 20) cout = 141429; // 6 mois
                        else if (periode == 21) cout = 193615; // 9 mois
                        else if (periode == 22) cout = 226232; // 12 mois
                        break;

                    case 7500000:
                        if (periode == 19) cout = 108795; // 3 mois
                        else if (periode == 20) cout = 173664; // 6 mois
                        else if (periode == 21) cout = 238532; // 9 mois
                        else if (periode == 22) cout = 279075; // 12 mois
                        break;

                    case 10000000:
                        if (periode == 19) cout = 129117; // 3 mois
                        else if (periode == 20) cout = 207168; // 6 mois
                        else if (periode == 21) cout = 285218; // 9 mois
                        else if (periode == 22) cout = 334000; // 12 mois
                        break;

                    case 15000000:
                        if (periode == 19) cout = 161433; // 3 mois
                        else if (periode == 20) cout = 260445; // 6 mois
                        else if (periode == 21) cout = 359456; // 9 mois
                        else if (periode == 22) cout = 421339; // 12 mois
                        break;

                    case 20000000:
                        if (periode == 19) cout = 199702; // 3 mois
                        else if (periode == 20) cout = 323537; // 6 mois
                        else if (periode == 21) cout = 447372; // 9 mois
                        else if (periode == 22) cout = 524769; // 12 mois
                        break;

                    case 30000000:
                        if (periode == 19) cout = 257666; // 3 mois
                        else if (periode == 20) cout = 419099; // 6 mois
                        else if (periode == 21) cout = 580532; // 9 mois
                        else if (periode == 22) cout = 681428; // 12 mois
                        break;

                    case 50000000:
                        if (periode == 19) cout = 382485; // 3 mois
                        else if (periode == 20) cout = 624881; // 6 mois
                        else if (periode == 21) cout = 867278 ; // 9 mois
                        else if (periode == 22) cout = 1018776; // 12 mois
                        break;
                }
                break;

            case 25:
                // CONFORT : 
                break;

            case 26:
                // PRESTIGE : 
                break;
        }

        return 0;
    }
}