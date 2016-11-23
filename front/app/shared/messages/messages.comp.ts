import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Message } from 'primeng/primeng';

@Component({
  moduleId: module.id,
  selector: 'msg-comp',
  styleUrls: ['./messages.comp.css'],
  templateUrl: './messages.comp.html'
})

export class MessagesComp {

  @Input() msgs: Message[];
  @Output() hideNotificationEvent = new EventEmitter();
  
  constructor() {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {}

  // Hide message lock
  private hideNotification(): void {
    this.hideNotificationEvent.emit([]);
  }

}