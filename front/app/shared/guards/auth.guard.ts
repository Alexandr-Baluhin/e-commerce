import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  
  private secretSource = new BehaviorSubject<boolean>(null);
  private userTypeSource = new BehaviorSubject<string>(null);
  private userIdSource = new BehaviorSubject<number>(null);  
  private canGoToEndpointSource = new BehaviorSubject<boolean>(false);

  public secret$ = this.secretSource.asObservable();
  public userType$ = this.userTypeSource.asObservable();
  public userId$ = this.userIdSource.asObservable();
  public canGoToEndpoint$ = this.canGoToEndpointSource.asObservable();
  
  constructor() { }

  public login(type: string, id: number): void {
    this.userTypeSource.next(type);
    this.userIdSource.next(id);
    this.canGoToEndpointSource.next(true);
  }

  public logout(): void {
    this.userTypeSource.next(null);
    this.userIdSource.next(null);        
    this.canGoToEndpointSource.next(false);
  }

  public activateSecret(bool): void {
    this.secretSource.next(bool);
  }

  public canActivate(): boolean {
    return this.canGoToEndpointSource.getValue();
  }
}