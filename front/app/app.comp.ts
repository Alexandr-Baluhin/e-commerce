import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app',
  template: `
    <header-comp></header-comp>
    <router-outlet></router-outlet>
  `
})

export class AppComp {

  constructor() { }

  public ngOnInit(): void { }

  public ngOnDestroy(): void { }

}