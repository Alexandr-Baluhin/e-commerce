import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

@Component({
  moduleId: module.id,
  selector: 'header-comp',
  styleUrls: ['./header.comp.css'],
  templateUrl: './header.comp.html'
})

export class HeaderComp {

  private headerText: string;

  private btnLabel: string;
  private btnType: string;

  private isDisplayAuth: boolean;
  
  constructor(private guard: AuthGuard, private router: Router, private route: ActivatedRoute) {
    
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        if (e.url.match(/(\/request\/)[0-9]+/g) != null) {
          this.headerText = 'Pieprasījuma pārskats';
        } else {
          this.headerText = 'Publisko pasākumu organizēšanas atļauju iesniegšana';
        }
      }
    });
    
    this.guard.canGoToEndpoint$.subscribe(res => {
      if (res) {
        this.btnLabel = 'Iziet no profila';
        this.btnType = 'logout';
      } else {
        this.btnLabel = 'Autorizēties';
        this.btnType = 'login';                
      }
    });
  }

  public ngOnInit(): void {
    this.isDisplayAuth = false;
  }

  public ngOnDestroy(): void {}

  private toggleDisplay(value: boolean): void {
    this.isDisplayAuth = value;
  }

  private processAuth(): void {
    if (this.btnType == 'login') {
      this.isDisplayAuth = true;
    } else {
      this.guard.logout();
      this.router.navigate(['/request/create']);
    }
  }
}