import { EventEmitter, Injectable, Output, inject } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidebarService {

  open = true;

  private sidebarPositionSubject = new BehaviorSubject<boolean>(false);

  public sidebarPosition$ = this.sidebarPositionSubject.asObservable();

  emiSidebarPosition() {
    this.sidebarPositionSubject.next(this.open);
  }


}

