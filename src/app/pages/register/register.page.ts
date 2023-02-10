import { Auth } from '@angular/fire/auth';
import { DataServiceService } from './../../services/data-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, ValidatorFn, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { AlertController, IonInput } from '@ionic/angular';
import { CredentialModel } from 'src/app/model/user/credential.model';
import { findCity, findNeighborhood, findNumber, findState, findStreet, findZipCode } from 'src/app/utils/address-utils';

import { UserRegister } from '../../model/user/userRegister';
import { FirebaseFirestoreService } from '../../services/firebase.firestore.service';
import { FirebaseAuthenticationService } from './../../services/firebase.authentication.service';

declare let google: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  @ViewChild('autocomplete') autocomplete!: IonInput;

  userFormGroup!: FormGroup;
  @ViewChild('contactFormGroupDirective')
  contactFormGroupDirective!: FormGroupDirective;

  constructor(
    private fireBaseService: FirebaseFirestoreService,
    private firebaseAuthenticationService: FirebaseAuthenticationService,
    private router: Router,
    private alertController: AlertController,
    private dataServiceService: DataServiceService,
    private auth: Auth
    ) {}

    ngOnInit(): void {
    this.userFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repeatPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      cpf: new FormControl('', Validators.required),
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
  await this.firebaseAuthenticationService.register(this.userFormGroup.value as CredentialModel)
  .then(()=> this.update());
  this.fireBaseService.updateUser(newUser);
  this.userFormGroup.reset();
    if(newUser) {
      this.dataServiceService.setDisplayName(this.auth.currentUser!.displayName!);
      this.router.navigate(['loader'], {replaceUrl: true})
      .then(()=> setTimeout(()=> this.router.navigate(['profile'], {replaceUrl: true}), 2000));
    } else {
      this.showAlert('Register failed', 'Please try again');
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

  goToLogin() {
    this.router.navigate(['login-page'], {replaceUrl: true})
  }
}
