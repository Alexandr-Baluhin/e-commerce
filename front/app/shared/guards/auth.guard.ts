import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  
  private canGoToEndpointSource = new BehaviorSubject<boolean>(false);

  public canGoToEndpoint$ = this.canGoToEndpointSource.asObservable();
  
  constructor() { }

  public login(): void {
    this.canGoToEndpointSource.next(true);
  }

  public logout(): void {
    this.canGoToEndpointSource.next(false);
  }

  public canActivate(): boolean {
    if (this.canGoToEndpointSource.getValue()) {
      console.log('Ok!');
    } else {
      console.log('Not authorized!');
    }
    return this.canGoToEndpointSource.getValue();
  }
}