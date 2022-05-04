import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IData } from './dataInterface';
import { SuperHero } from './superheroInterface';
//import { SuperHero } from '../hero-details/hero-details.component';

@Injectable({
  providedIn: 'root'
})
export class SuperheroService {
  
    // superheroes: SuperHero[] = [
    //   {
    //     id: 0,
    //     name: 'Captain America',
    //     description: 'description du super hero',
    //     imgSrc: 'https://tetu.com/wp-content/uploads/2021/03/captain.jpg',
    //     favorite: true
    //   },
    //   {
    //     id: 1,
    //     name: 'Spiderman',
    //     description: 'description du super hero',
    //     imgSrc: 'https://image.api.playstation.com/vulcan/img/rnd/202010/2122/19xis9VT5XfnXsLSMkxUjvVd.png?w=440',
    //     favorite: false
    //   },
    //   {
    //     id: 2,
    //     name: 'Captain Marvel',
    //     description: 'description du super hero',
    //     imgSrc: 'https://d1fmx1rbmqrxrr.cloudfront.net/cnet/optim/i/edit/2019/01/captain-marvel-tout-savoir__w1200.jpg',
    //     favorite: true
    //   },
    //   {
    //     id: 3,
    //     name: 'Thor',
    //     description: 'description du super hero',
    //     imgSrc: 'https://img-4.linternaute.com/AUzRChpWK7F8d2-VfyzYj14Q6Kc=/1240x/smart/7447f5dde6af4bb684ef7791cc9a828e/ccmcms-linternaute/23558036.jpg',
    //     favorite: false
    //   },
    //   {
    //     id: 4,
    //     name: 'Iron Man',
    //     description: 'description du super hero',
    //     imgSrc: 'https://fr.web.img3.acsta.net/medias/nmedia/18/62/89/45/18876909.jpg',
    //     favorite: false
    //   }
  
    // ];

  accessToken = '470187951378464';
  //url = 'https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/';
  url = 'https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/';
  //superheroes: SuperHero[] = [];

  // private pour que seul cette class modifier la variable
//  BehaviorSubject permet de rendre la variable observable par plusieurs élément
  private superheroes = new BehaviorSubject<SuperHero[]>(<SuperHero[]>[]);
  //On permet l'onservation de la variable sans rendre la modification possible
  superheroes$ = this.superheroes.asObservable();

  data: IData = { link: '/search', searchWord: '', ids: []};
  constructor(private httpClient:HttpClient) { }

  loadSuperHeroes(name:string): Observable<SuperHero[]> {
    return this.httpClient.get<SuperHero[]>(this.url + this.accessToken + '/search/' + name);
  }
  
  getSuperHero(): SuperHero[] {
    //return this.superheroes;
    return this.superheroes.getValue();
  }

  setFavorite(id: number) {
    //this.superheroes[id].favorite = !this.superheroes[id].favorite; 
    let shTemp: SuperHero[] = this.superheroes.getValue();
    shTemp.forEach( superhero => {
      if (superhero.id === id ) {
        superhero.favorite = !superhero.favorite;
      }
    })
    this.superheroes.next(shTemp); //la variable superheroes de type Behavior... prend une nouvelle liste comme valeur
  }

  updateSuperHeroes(sh: SuperHero[]) {
    let shTemp: SuperHero[] = this.superheroes.getValue();
    shTemp = shTemp.filter(superhero => superhero.favorite === true);
    sh.forEach(superhero => {
      if (!this.shIncluded(shTemp, superhero)) {
        shTemp.push(superhero);
      }
    });
    this.superheroes.next(shTemp);
  }
// regarde si il existe un super hero dans liste possede le même id que le super heor reçu en paramètre
// si il est inclu on retourne true sinon on retourne false
  shIncluded(sh: SuperHero[], superhero: SuperHero) {
    if(sh.some(e => e.id === superhero.id)) { return true;}
    return false;
  }

  getData(): IData {
    return this.data;
  }

  setData(dt: IData) {
    this.data = dt;
  }
}
