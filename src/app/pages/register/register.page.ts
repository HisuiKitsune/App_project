import { getAuth } from '@angular/fire/auth';
import { CredentialModel } from 'src/app/model/user/credential.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInput, AlertController } from '@ionic/angular';
import { findCity, findNeighborhood, findNumber, findState, findStreet, findZipCode } from 'src/app/utils/address-utils';

import { UserRegister } from '../../model/user/userRegister';
import { FirebaseAuthenticationService } from '../../services/firebase.authentication.service';
import { FirebaseFirestoreService } from '../../services/firebase.firestore.service';

declare let google: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  @ViewChild('autocomplete') autocomplete!: IonInput;

  avatar:string = "../../assets/avatar.png";

  userFormGroup!: FormGroup;
  @ViewChild('contactFormGroupDirective')
  contactFormGroupDirective!: FormGroupDirective;

  constructor(
    private fireBaseService: FirebaseFirestoreService,
    private firebaseAuthenticationService: FirebaseAuthenticationService,
    private router: Router,
    private alertController: AlertController) {

    }

    ngOnInit(): void {
    this.userFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repeatPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      cpf: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
        address: new FormGroup({
          postalcode: new FormControl ('', Validators.required),
          city:  new FormControl ('', Validators.required),
          state: new FormControl ('', Validators.required),
          dist:  new FormControl ('', Validators.required),
          street:new FormControl ('', Validators.required),
          number:new FormControl ('', Validators.required),
        })
    });

    /*this.userFormGroup.valueChanges.subscribe(() => this.defineAvatar());*/
  }

  setAddress(place: any){
    const addressForm = this.userFormGroup.get('address');

    addressForm?.get('street')?.setValue(findStreet(place.address_components));
    addressForm?.get('number')?.setValue(findNumber(place.address_components));
    addressForm?.get('postalcode')?.setValue(findZipCode(place.address_components));
    addressForm?.get('state')?.setValue(findState(place.address_components));
    addressForm?.get('city')?.setValue(findCity(place.address_components));
    addressForm?.get('dist')?.setValue(findNeighborhood(place.address_components));
  }

  ionViewDidEnter() {
    this.autocomplete.getInputElement().then((ref: any) => {
      const autocomplete = new google.maps.places.Autocomplete(ref);
      autocomplete.addListener('place_changed', () => {
        this.setAddress(autocomplete.getPlace())
      })
    })
  }

  getForm() : FormGroup {
    this.userFormGroup.get('repeatPassword')?.setValidators(this.matchPasswordAndRepeatPassword(this.userFormGroup));
    return this.userFormGroup;
  }

  matchPasswordAndRepeatPassword(form: FormGroup) : ValidatorFn {
    const password = form.get('password');
    const repeatPassword = form.get('repeatPassword');

    const validator = () => {
      return password?.value === repeatPassword?.value ? null : {isntMatching: true}
    }
    return validator;
  }

  async createUser(values: any) {
    let newUser: UserRegister = { ...values };
    await this.firebaseAuthenticationService.register(this.userFormGroup.value as CredentialModel);
    await this.fireBaseService.updateUser(newUser);
    this.update();
    this.userFormGroup.reset();
    if(newUser) {
      this.router.navigateByUrl('/store-front', { replaceUrl: true });
    } else {
      this.showAlert('Register failed', 'Please try again');
    }

  }

  defineAvatar() {
    const email = this.userFormGroup.get('email');
    if(email?.valid) {
      this.avatar = `https://robohash.org/${email.value}?set=set3&gravatar=yes`;
    }
  }

  async update(): Promise<void> {
    const name:string = this.userFormGroup.get('name')?.value;
    this.firebaseAuthenticationService.updateProfile(name);
  }

  async signOut() {
    await this.firebaseAuthenticationService.signOut();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  async perfil() {
    this.router.navigateByUrl('/perfil', { replaceUrl: true });
  }

  async showAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Ok']
    });

    await alert.present();
  }
}
