import { MediaMatcher } from '@angular/cdk/layout';

import { ChangeDetectorRef, Component, OnDestroy, AfterViewInit, OnInit } from '@angular/core';

/** @title Responsive sidenav */
@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: []
})
export class FullComponent implements OnDestroy, OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
      console.log(localStorage);
  }
}
