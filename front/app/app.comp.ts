import { Component, HostListener } from '@angular/core';

import { AuthGuard } from './shared/guards/auth.guard';

@Component({
  moduleId: module.id,
  selector: 'app',
  template: `
    <header-comp></header-comp>
    <router-outlet></router-outlet>
  `
})

export class AppComp {

  private secretKeyCombination: Array<string>;

  constructor(private guard: AuthGuard) {
    this.secretKeyCombination = [];
  }

  public ngOnInit(): void { }

  public ngOnDestroy(): void { }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    this.secretKeyCombination.push(event.key);
    if (this.secretKeyCombination.join('').indexOf('batman') != -1) {
      this.guard.activateSecret(true);
    }
  }

}