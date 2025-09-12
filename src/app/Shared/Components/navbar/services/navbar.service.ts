import { EventEmitter, Injectable, Output, inject } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavbarService {

  private navbarPositionSubject = new BehaviorSubject<boolean>(false);

  public navbarPosition$ = this.navbarPositionSubject.asObservable();

  public fixed = false;

  emitNavbarPosition() {
    this.navbarPositionSubject.next(this.fixed);
  }

}

