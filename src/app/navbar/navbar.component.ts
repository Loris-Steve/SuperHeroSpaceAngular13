import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import * as M from 'materialize-css';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  @ViewChild('sidenav') sidenav : ElementRef = <ElementRef>{};
  navbarColor = environment.navbarColor;
  
  constructor() { }
  ngAfterViewInit(): void {
    M.Sidenav.init(this.sidenav.nativeElement);
  }

  ngOnInit(): void { }

  closeMenu(): void {
    const instance = M.Sidenav.getInstance(this.sidenav.nativeElement);
    instance.close();
  }

}
