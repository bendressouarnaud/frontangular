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
                        else if (periode == 21) cout = 867278; // 9 mois
                        else if (periode == 22) cout = 1018776; // 12 mois
                        break;

                    case 60000000:
                        if (periode == 19) cout = 524750; // 3 mois
                        else if (periode == 20) cout = 859426; // 6 mois
                        else if (periode == 21) cout = 1194103; // 9 mois
                        else if (periode == 22) cout = 1403276; // 12 mois
                        break;

                    case 70000000:
                        if (periode == 19) cout = 602701; // 3 mois
                        else if (periode == 20) cout = 987941; // 6 mois
                        else if (periode == 21) cout = 1373181; // 9 mois
                        else if (periode == 22) cout = 1613956; // 12 mois
                        break;
                }
                break;

            case 25:
                // CONFORT : 
                switch (indemnite) {
                    case 2500000:
                        if (periode == 19) cout = 76899; // 3 mois
                        else if (periode == 20) cout = 121078; // 6 mois
                        else if (periode == 21) cout = 165257; // 9 mois
                        else if (periode == 22) cout = 192869; // 12 mois
                        break;

                    case 5000000:
                        if (periode == 19) cout = 100794; // 3 mois
                        else if (periode == 20) cout = 160473; // 6 mois
                        else if (periode == 21) cout = 220152; // 9 mois
                        else if (periode == 22) cout = 257451; // 12 mois
                        break;

                    case 7500000:
                        if (periode == 19) cout = 127359; // 3 mois
                        else if (periode == 20) cout = 204270; // 6 mois
                        else if (periode == 21) cout = 281180; // 9 mois
                        else if (periode == 22) cout = 329249; // 12 mois
                        break;

                    case 10000000:
                        if (periode == 19) cout = 154971; // 3 mois
                        else if (periode == 20) cout = 249791; // 6 mois
                        else if (periode == 21) cout = 344612; // 9 mois
                        else if (periode == 22) cout = 403875; // 12 mois
                        break;

                    case 15000000:
                        if (periode == 19) cout = 198878; // 3 mois
                        else if (periode == 20) cout = 322179; // 6 mois
                        else if (periode == 21) cout = 445479; // 9 mois
                        else if (periode == 22) cout = 522542; // 12 mois
                        break;

                    case 20000000:
                        if (periode == 19) cout = 250874; // 3 mois
                        else if (periode == 20) cout = 407902; // 6 mois
                        else if (periode == 21) cout = 564930; // 9 mois
                        else if (periode == 22) cout = 663072; // 12 mois
                        break;

                    case 30000000:
                        if (periode == 19) cout = 329629; // 3 mois
                        else if (periode == 20) cout = 537742; // 6 mois
                        else if (periode == 21) cout = 745854; // 9 mois
                        else if (periode == 22) cout = 875924; // 12 mois
                        break;

                    case 50000000:
                        if (periode == 19) cout = 499220; // 3 mois
                        else if (periode == 20) cout = 817337; // 6 mois
                        else if (periode == 21) cout = 1135455; // 9 mois
                        else if (periode == 22) cout = 1334278; // 12 mois
                        break;

                    case 60000000:
                        if (periode == 19) cout = 692515; // 3 mois
                        else if (periode == 20) cout = 1136013; // 6 mois
                        else if (periode == 21) cout = 1579510; // 9 mois
                        else if (periode == 22) cout = 1856696; // 12 mois
                        break;

                    case 70000000:
                        if (periode == 19) cout = 798427; // 3 mois
                        else if (periode == 20) cout = 1310625; // 6 mois
                        else if (periode == 21) cout = 1822823; // 9 mois
                        else if (periode == 22) cout = 2142946; // 12 mois
                        break;
                }
                break;

            case 26:
                // PRESTIGE : 
                switch (indemnite) {
                    case 2500000:
                        if (periode == 19) cout = 87146; // 3 mois
                        else if (periode == 20) cout = 137972; // 6 mois
                        else if (periode == 21) cout = 188798; // 9 mois
                        else if (periode == 22) cout = 220564; // 12 mois
                        break;

                    case 5000000:
                        if (periode == 19) cout = 124901; // 3 mois
                        else if (periode == 20) cout = 200216; // 6 mois
                        else if (periode == 21) cout = 275531; // 9 mois
                        else if (periode == 22) cout = 322604; // 12 mois
                        break;

                    case 7500000:
                        if (periode == 19) cout = 166874; // 3 mois
                        else if (periode == 20) cout = 269415; // 6 mois
                        else if (periode == 21) cout = 371956; // 9 mois
                        else if (periode == 22) cout = 436044; // 12 mois
                        break;

                    case 10000000:
                        if (periode == 19) cout = 210500; // 3 mois
                        else if (periode == 20) cout = 341339; // 6 mois
                        else if (periode == 21) cout = 472179; // 9 mois
                        else if (periode == 22) cout = 553953; // 12 mois
                        break;

                    case 15000000:
                        if (periode == 19) cout = 279873; // 3 mois
                        else if (periode == 20) cout = 455711; // 6 mois
                        else if (periode == 21) cout = 631549 ; // 9 mois
                        else if (periode == 22) cout = 741448; // 12 mois
                        break;

                    case 20000000:
                        if (periode == 19) cout = 362027; // 3 mois
                        else if (periode == 20) cout = 591154; // 6 mois
                        else if (periode == 21) cout = 820280; // 9 mois
                        else if (periode == 22) cout = 963485; // 12 mois
                        break;

                    case 30000000:
                        if (periode == 19) cout = 486460; // 3 mois
                        else if (periode == 20) cout = 796301; // 6 mois
                        else if (periode == 21) cout = 1106141; // 9 mois
                        else if (periode == 22) cout = 1299791; // 12 mois
                        break;

                    case 50000000:
                        if (periode == 19) cout = 754414; // 3 mois
                        else if (periode == 20) cout = 1238062; // 6 mois
                        else if (periode == 21) cout = 1721710; // 9 mois
                        else if (periode == 22) cout = 2023990; // 12 mois
                        break;

                    case 60000000:
                        if (periode == 19) cout = 1059820; // 3 mois
                        else if (periode == 20) cout = 1741569; // 6 mois
                        else if (periode == 21) cout = 2423318; // 9 mois
                        else if (periode == 22) cout = 2849411; // 12 mois
                        break;

                    case 70000000:
                        if (periode == 19) cout = 1227161; // 3 mois
                        else if (periode == 20) cout = 2017456; // 6 mois
                        else if (periode == 21) cout = 2807752; // 9 mois
                        else if (periode == 22) cout = 3301686 ; // 12 mois
                        break;
                }
                break;
        }

        return cout;
    }
}