import { Component, OnInit } from '@angular/core';
//import { SuperHero } from '../hero-details/hero-details.component';
import { SuperheroService } from '../shared/superhero.service';
import { SuperHero } from '../shared/superheroInterface';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  superheroesFav: SuperHero[] = [];

  constructor(private superheroService: SuperheroService) { }

  ngOnInit(): void {
    this.superheroService.superheroes$.subscribe((sh:SuperHero[]) => this.superheroesFav = sh.filter(superhero => superhero.favorite))
    //this.superheroesFav = this.superheroService.getSuperHero().filter(hero => hero.favorite);
  }

}
