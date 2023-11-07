import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionanchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { MenuItems } from './menu-items';



@NgModule({
  declarations: [
    AccordionanchorDirective,
    AccordionLinkDirective,
    AccordionDirective
  ],
  exports: [
    AccordionanchorDirective,
    AccordionLinkDirective,
    AccordionDirective
  ],
  providers: [MenuItems]

})
export class SharedModule { }
