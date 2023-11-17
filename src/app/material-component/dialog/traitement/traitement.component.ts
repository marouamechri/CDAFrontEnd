import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment-timezone';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
  selector: 'app-traitement',
  templateUrl: './traitement.component.html',
  styleUrls: ['./traitement.component.css']
})
export class TraitementComponent implements OnInit {
  @Input() parentForm:any= FormGroup;
  minDate:any;
  maxDate:any;
  dateValue:any;
  //variables
  responseMessage: any;
  constructor(
    private snackbarService: SnackbarService,
    private formBuilder: FormBuilder) {

    this.parentForm = this.formBuilder.group({
      traitementDetails: this.formBuilder.group({
        dateEnd: ['', Validators.required],
      },{Validators:this.dateComparisonValidator})
    });
  }
  ngOnInit(): void {
    console.log(this.parentForm.value);
   
    //parametrer mon DateTime Piker
    this.dateValue = new Date();
    this._setMaxDate();
    this._setMinDate();
}
private _setMinDate() {
  const now = new Date();
  this.minDate = new Date();
  this.minDate.setDate(now.getDate() - 1);
}


private _setMaxDate() {
  const now = new Date();
  this.maxDate = new Date();
  this.maxDate.setDate(now.getDate() + 360*5);
}
dateComparisonValidator(formGroup : FormGroup){
 const dateStart = formGroup.get('date')?.value;
 const dateEnd = formGroup.get('traitementDetails.dateEnd')?.value;
if(dateEnd && dateStart && new Date('dateEnd')< new Date('dateStart')){
formGroup.get('traitementDetails.dateEnd')?.setErrors({dateFinAvantDateDebut: true});
return {dateFinAvantDateDebut: true}
}else
formGroup.get('traitementDetails.dateEnd')?.setErrors(null);
return null;

}

}
