import { Pipe, PipeTransform } from '@angular/core';
import { SuperHero } from './superheroInterface';

@Pipe({
  name: 'power'
})
export class PowerPipe implements PipeTransform {
  // value valeur passé au pipe de a
  transform(value: SuperHero){
    // variable qui contient la moyenne
    let avgPowerstats = 0; 
    // pour chaque valeur on multipli par 5 pour avoir une echelle de 5
    // diviser par 6 car il ya 6 pouvoir ou abilité
    // diviser par 100 car chaque abilité varie de 0 à 100
    Object.values(value.powerstats).forEach(val => avgPowerstats += val * 5 / 600);

    let html = ''; // html pour montrer de manière graphique
    // On utilise trunc pour avoir la parti entiere
    // ex si super hero a une moyenne de 3.5 <=> 3 etoile entier un demi et une vide
    const trunc = Math.trunc(avgPowerstats);

    if (avgPowerstats < 5) {
      console.log(trunc + " "  + avgPowerstats);
      for (let i = 0; i < trunc; i++) {
        html += `<i class="material-icons orange-text">star</i>`;
      }
      if ( (avgPowerstats - trunc) * 10 >= 5 ) {
        html += `<i class="material-icons orange-text">star_half</i>`;
        for (let i = 1; i < (5 - trunc); i++) {
          html += `<i class="material-icons orange-text">star_border</i>`;
        }
      } else {
        for (let i = 0; i < (5 - trunc); i++) {
          html += `<i class="material-icons orange-text">star_border</i>`;
        }
      }
    } else {
      // 5 etoile on affiche les 5 etoiles
      for (let i = 0; i < 5; i++) {
        html += `<i class="material-icons orange-text">star</i>`;
      }
    }
    return html;
  }

}
