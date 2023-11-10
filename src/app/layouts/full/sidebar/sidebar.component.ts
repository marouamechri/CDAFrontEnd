import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { jwtDecode } from 'jwt-decode';
import { Menu, MenuItems } from 'src/app/shared/menu-items';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class SidebarComponent implements OnDestroy, OnInit {
  mobileQuery: MediaQueryList;
  userAuthorities: any;
  token: any = localStorage.getItem('accessToken');
  tokenPayload: any;
  public menuItemsUser:Array<any>=[];

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher ,
    private menuItemsService:MenuItems  
  ) {

    this.tokenPayload=jwtDecode(this.token);
    this.userAuthorities=this.tokenPayload?.authorities;
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngOnInit(): void {


    this.menuItemsUser = this.menuActive(this.menuItemsService);
 
  }
  menuActive(menuItems :MenuItems) {
    let menuItemsUser:Array<Menu>= [];
    //verifier si l'utilisateur a l'authority attendu 
    menuItems.getMenuitem().forEach((menuItem )=> {
      let hasAuthority: boolean;
      hasAuthority = this.userAuthorities.includes(menuItem.authority);
      if(hasAuthority){
        menuItemsUser.push(menuItem);
      }
    });
    return menuItemsUser;
  }

}
