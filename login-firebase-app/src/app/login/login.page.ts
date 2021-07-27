import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { AuthenticationService } from  '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  validations_form:FormGroup;
  errorMessage: string='';
  
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {
    
   }

  ngOnInit() {
    this.validations_form=this.formBuilder.group({
      email:new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('{^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),      
    });
  }

  validation_message={
    'email':[
      {type:'required', message:'email is required'},
      {type:'pattern', message:'please entera a valid email'},
    ],
    'password':[
      {type:'required', message:'password is required'},
      {type:'pattern', message:'At least 5 characters long'},
    ]
  };
  
  loginUser(valiue){
    this.authService.loginUser(valiue)
    .then(res=>{
      console.log(res);
      this.errorMessage="";
      this.navCtrl.navigateForward('/dashboard');
    }, err=>{
      this.errorMessage=err.message;
    })
  }

  goToRegisterPage(){
    this.navCtrl.navigateForward('/register');
  }

}
