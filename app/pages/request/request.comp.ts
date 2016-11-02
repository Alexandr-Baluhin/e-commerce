import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'request-comp',
  template: '<router-outlet></router-outlet>'
})

export class RequestComp {
  
  constructor() {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {}

}