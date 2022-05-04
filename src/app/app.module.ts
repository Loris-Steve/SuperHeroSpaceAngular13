import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppTest } from './apptest.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { FormsModule } from '@angular/forms';
import { SuperheroService } from './shared/superhero.service';
import { PowerPipe } from './shared/power.pipe';
import { PreloaderComponent } from './preloader/preloader.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PowerstatPipe } from './shared/powerstat.pipe';

@NgModule({
  //tous les modules qu'on importe et qui bénéficie des modules ci dessous
  declarations: [
    AppComponent,
    AppTest,
    HomeComponent,
    SearchComponent,
    FavoriteComponent,
    NavbarComponent,
    HeroDetailsComponent,
    HeroListComponent,
    PowerPipe,
    PowerstatPipe,
    PreloaderComponent,
    NotfoundComponent,
    ProfileComponent
  ],
  // tous les modules que nous allons lié à ce module 
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: SearchComponent },
      {path: 'favorite', component: FavoriteComponent },
      {path: 'search', component: SearchComponent },
      {path: 'profile/:id', component: ProfileComponent},
      {path: '**', component: HomeComponent}
    ])
  ],
  //Tous les services qu'on crée
  providers: [SuperheroService],
  //quel est le composant initial à partir du quel les autres vont être rendu(Racine)
  bootstrap: [AppComponent]
})
export class AppModule { }
