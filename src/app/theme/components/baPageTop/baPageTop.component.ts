import {Component} from '@angular/core';

import {GlobalState} from '../../../global.state';
import {AuthService} from '../../../services/auth.service'

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss']
})
export class BaPageTop {

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;
  public image: any = '';
  constructor(private _state:GlobalState, public authService: AuthService) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
    this.image = (JSON.parse(localStorage.getItem('user')) === null) ? '' : JSON.parse(localStorage.getItem('user')).photoURL;

  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }
}
