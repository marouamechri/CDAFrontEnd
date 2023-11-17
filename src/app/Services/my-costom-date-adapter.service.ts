import { Inject, Injectable, NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { formatDate } from '@angular/common'
import { NgxMatMomentAdapter } from '@angular-material-components/moment-adapter';
import { NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';


@Injectable({
  providedIn: 'root'
})
export class MyCostomDateAdapter extends NgxMatMomentAdapter  {

  formatWithMinutes(date: moment.Moment): string {
    // Formatage de la date avec les minutes
    return date.format('YYYY-MM-DD HH:mm');
  }
}
export const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
    monthInput: 'YYYY-MM',
    timeInput: 'HH:mm',
    datetimeInput: 'YYYY-MM-DD HH:mm',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthInput: 'YYYY-MM',
    timeInput: 'HH:mm',
    datetimeInput: 'YYYY-MM-DD HH:mm',
  },
};

