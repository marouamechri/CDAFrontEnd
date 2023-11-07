import { Directive, HostListener, Inject } from '@angular/core';

import { AccordionLinkDirective } from './accordion-link.directive';


@Directive({
  selector: '[appAccordionanchor]'
})
export class AccordionanchorDirective {

  protected navlink: AccordionLinkDirective;

  constructor(@Inject(AccordionLinkDirective) navlink: AccordionLinkDirective) {
    this.navlink = navlink;
  }

  @HostListener('click', ['$event'])
  onClick(e: any) {
    this.navlink.toggle();
  }

}
