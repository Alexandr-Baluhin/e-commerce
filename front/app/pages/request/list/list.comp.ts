import { Component } from '@angular/core';

import { ListService } from './list.service';

@Component({
  moduleId: module.id,
  selector: 'list-comp',
  styleUrls: ['./list.comp.css'],
  templateUrl: './list.comp.html'
})

export class ListComp {
  
  private requests: Object[];

  constructor(private _service: ListService) {}

  public ngOnInit(): void {
    this._service.getList().subscribe(res => {
      this.requests = res;
    });
  }

  public ngOnDestroy(): void {}

  public gotoDetail(): void { 
    console.log(123);
  }
}