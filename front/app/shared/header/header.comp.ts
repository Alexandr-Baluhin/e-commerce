import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

@Component({
  moduleId: module.id,
  selector: 'header-comp',
  styleUrls: ['./header.comp.css'],
  templateUrl: './header.comp.html'
})

export class HeaderComp {

  private btnLabel: string;
  private btnType: string;

  private isDisplayAuth: boolean;
  
  constructor(private guard: AuthGuard, private router: Router) {
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