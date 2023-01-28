import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { findCity, findNeighborhood, findNumber, findState, findStreet, findZipCode } from 'src/app/utils/address-utils';


export class RegisterPageForm {

private formBuilder: FormBuilder;
private form: FormGroup;


constructor(formBuilder: FormBuilder){
  this.formBuilder = formBuilder;
  this.form = this.createForm();


}


private createForm() : FormGroup {
  return this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    repeatPassword: ['', [Validators.required, Validators.minLength(6)]],
    cpf: ['', Validators.required],
    name: ['', Validators.required],
    phone: ['', Validators.required],
      address: this.formBuilder.group({
        postalcode: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        dist: ['', Validators.required],
        street: ['', Validators.required],
        number: ['', Validators.required],
    })
  });
}

setAddress(place: any){
  const addressForm = this.form.get('address');

  addressForm?.get('street')?.setValue(findStreet(place.address_components));
  addressForm?.get('number')?.setValue(findNumber(place.address_components));
  addressForm?.get('postalcode')?.setValue(findZipCode(place.address_components));
  addressForm?.get('state')?.setValue(findState(place.address_components));
  addressForm?.get('city')?.setValue(findCity(place.address_components));
  addressForm?.get('dist')?.setValue(findNeighborhood(place.address_components));
}

getForm() : FormGroup {
  this.form.get('repeatPassword')?.setValidators(this.matchPasswordAndRepeatPassword(this.form));
  return this.form;
}

matchPasswordAndRepeatPassword(form: FormGroup) : ValidatorFn {
  const password = form.get('password');
  const repeatPassword = form.get('repeatPassword');

  const validator = () => {
    return password?.value === repeatPassword?.value ? null : {isntMatching: true}
  }
  return validator;
}

}
