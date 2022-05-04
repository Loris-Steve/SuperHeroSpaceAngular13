import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { SuperHero } from '../shared/superheroInterface';
import { SuperheroService } from '../shared/superhero.service';

// import des modules de materialize npm i --save-dev @types/materialize-css
import * as M from 'materialize-css';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})
export class HeroDetailsComponent implements OnInit, AfterViewInit, OnDestroy{
  /* 
  Définition static des propriétés du superhero
  @Input() name = "Captain America";
  description = "I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.";
  @Input('imgSrc') imgUrl = 'https://tetu.com/wp-content/uploads/2021/03/captain.jpg'; //seconde valeur sera prise en compte si la première n'existe pas
  colspanValue = 2;
  fontTitle = 'bold';*/ //permet de prendre les elements defini au niveau de l'html
  @ViewChild('favBtn') favBtn: ElementRef = <ElementRef>{};
  @ViewChild('remBtn') remBtn: ElementRef = <ElementRef>{};

  @Input() superhero : SuperHero = <SuperHero>{};

 // @Output('addToFavorite') addToFavoriteTo = new EventEmitter;
  @Output('addToFavorite') addToFavoriteTo = new EventEmitter;

  constructor(private superheroService: SuperheroService) { }

  //LiveCycleHook
  ngAfterViewInit(): void {
    M.Tooltip.init(this.favBtn.nativeElement);
  }

  ngOnInit(): void {
  }

  addFavorite(event : Event) {
    // var e = (event.target as HTMLInputElement).textContent; //type = HTMLInputElement or .value
    // console.log(event);
    // this.addToFavoriteTo.emit(this.superhero.id);
    this.superheroService.setFavorite(this.superhero.id);
  }

  ngOnDestroy() {
    const instance = M.Tooltip.getInstance(this.favBtn.nativeElement);
    instance.destroy();
  }

}

/*
export interface SuperHero {
  id : number,
  name : string,
  description : string,
  imgSrc : string,
  favorite : boolean
}
*/