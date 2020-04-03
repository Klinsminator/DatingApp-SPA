import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: any;
  // Implementing Reactive forms instead of normal forms
  registerForm: FormGroup;
  // Implementing configuration for styling the bsdatepicker (constant experience in all browsers)
  // With a partial class efectively make all properties on the type optional
  bsConfig: Partial<BsDatepickerConfig>;

  // // To receive values from a parent component, use inputs
  // @Input() valuesFromHome: any;

  // To send values to a parent component, use outputs with eventemmitter from core
  @Output() cancelRegister = new EventEmitter();

  constructor(private authService: AuthService, private alertify: AlertifyService,
              private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    /*
      // This is the first way of doing it without formbuilder
      this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', Validators.required)
    }, this.passwordMatchvalidator);
    */
   // Way creating formbuilder
   this.createRegisterForm();
   this.bsConfig = {
     containerClass: 'theme-red'
   };
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchvalidator
    });
  }

  passwordMatchvalidator(g: FormGroup) {
    // This kind of validators are missing on formgroup so we had to create one,
    // since this would apply to any formcontrol instance, should integrate it to a formgroup directly
    return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch: true};
  }

  register() {
    if (this.registerForm.valid) {
      // Te Object class with assign allows to clone the registerForm into an empty object, then to the user
      // This method not only would create a user but send it to the members section as a loggedin user
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.alertify.success('Registration successful');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        });
      });
    }
    /* this.authService.register(this.model).subscribe(() => {
    // console.log('Registration successful');
    this.alertify.success('Registration successful');
    }, error => {
      // console.log(error);
      this.alertify.error(error);
    }); */

    console.log(this.registerForm.value);
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('Cancelled');
  }

}
