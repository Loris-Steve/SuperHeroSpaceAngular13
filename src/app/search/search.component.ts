import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IData } from '../shared/dataInterface';
import { SuperheroService } from '../shared/superhero.service';
import { SuperHero } from '../shared/superheroInterface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  mot = "";
  errorText = "";
  superheroes : SuperHero[] = [];
  //birthday = new Date(1988, 3, 15);
  //possibilité de mettre << ids : any[] = [] ; >> car any prend tout type 
  ids : string[] = []; // identite des supero reçu de l'api
  loading = false;
  notFound = false;
  data: IData = <IData>{};

  @ViewChild('circlePro') favBtn: ElementRef = <ElementRef>{};
  percent : number = 100;
  pct : number = 0;
  constructor(private superheroService: SuperheroService) { }

  ngOnInit(): void {
    //on lis la variable observable et non directement la private
    this.superheroService.superheroes$.subscribe(sh => this.superheroes = sh);
    this.data = this.superheroService.getData();
    this.data.link = '/search';
    this.superheroService.setData(this.data);
    // if (this.data.searchWord !== '') { this.mot = this.data.searchWord; this.formSubmit(); }
    if (this.data.ids.length !== 0) { this.ids = this.data.ids; }

  }

  changeCircle(){
    var val = this.percent;
    var $circle = this.favBtn.nativeElement;
    
    
    var r = $circle.r.baseVal.value //attr('r');
    console.log("r : ",r);
    
    var c = Math.PI*(r*2);
    
    if (val < 0) { val = 0;}
    if (val > 100) { val = 100;}
    
    this.pct = ((100-val)/100)*c;
    
    console.log("percent : "+this.percent+" pct : "+ ((100-val)/100)*c);
      console.log("$circle.strokeDashoffset : ",$circle.strokeDashoffset);
     // $circle.strokeDashoffset = 30;

//      $circle.css({ strokeDashoffset: pct});
      //[style.stroke-dashoffset]
      //   $('#cont').attr('data-pct',val);
    }

  changeSearch(){

  }

  formSubmit(){
    this.notFound = false;
    if(this.mot.length < 4){
      this.errorText = "La recherche doit comporter plus de 3 lettres ";
    }
    else{
      this.data.searchWord = this.mot;
      this.superheroService.setData(this.data);

      this.loading = true;
      this.errorText = this.mot;
      this.ids = []; //on renitialize
      let shTemp: SuperHero[] = []; // tamporaire
      // subscribe perme de souscrire à l'observale 
      // cette connexion permet d'être de notifier une la réponse reçu
      this.superheroService.loadSuperHeroes(this.mot).subscribe((resultat:any) => {
        //console.log(resultat['results']);
        if(resultat['response'] === 'success'){

          shTemp = resultat['results'].map( (result:SuperHero) => {
            result.favorite = false; // on initialize favori à faux
            this.ids.push(result.id as unknown as string); // on ajoute l'id dans ceux qu'on à reçu de la requête
            this.data.ids = this.ids;
            this.superheroService.setData(this.data);
            return result;
          });
          console.log(shTemp);
          this.loading = false;
          this.superheroService.updateSuperHeroes(shTemp);// on le met ici pour que lo'n attend d'avoir la variable complete aa=vant de la traiter
        }
        else{
          this.loading = false;
          this.notFound = true;
        }
      });
    }
  }
}
