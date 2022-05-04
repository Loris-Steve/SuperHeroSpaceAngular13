import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IData } from '../shared/dataInterface';
import { SuperheroService } from '../shared/superhero.service';
import { SuperHero } from '../shared/superheroInterface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  objectKeys = Object.keys;
//  superhero : SuperHero = <SuperHero>{};
  data: IData = <IData>{};
  superhero: SuperHero | undefined = <SuperHero>{};
  //superhero = {} as SuperHero | undefined;
  
  constructor(private superheroService: SuperheroService, private route: ActivatedRoute, private router: Router) {
    // if (!this.superhero) {
    //   console.log("hero inconnu !");
    //   this.router.navigate(['/'])
    // }
    // else {
    //   console.log("hero connu ! ");
    // }
  }

  ngOnInit(): void {
    //let id = this.route.snapshot.paramMap.get('id');
    // paramMap est un observable du coup on y souscrit
    //this.superheroService.superheroes$.subscribe(sh => {
      // this.superhero = sh.find(superhero => (superhero.id as unknown as string) === params.get('id'))!;
      //  this.superhero = sh.find(superhero => (superhero.id as unknown as String) === id);
      //let newSh = sh.find(superhero => (superhero.id as unknown as string) === params.get('id'));
      
    //});

    this.route.paramMap.subscribe(params => {
      this.superheroService.superheroes$.subscribe( sh => {
        this.superhero = sh.find(superhero => (superhero.id as unknown as string) === params.get('id'));

       });
    });
    this.data = this.superheroService.getData();

  }

  addFavorite() {
    if (this.superhero)
      this.superheroService.setFavorite(this.superhero.id);
  }

}
