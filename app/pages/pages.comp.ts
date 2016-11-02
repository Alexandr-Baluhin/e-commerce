import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'pages-comp',
  template: '<router-outlet></router-outlet>'
})

export class PagesComp {
  
  constructor() {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {}

}