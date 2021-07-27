import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { rejects } from 'assert';
import { resolve } from 'dns';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }
  registerUser(value){
    return new Promise<any>((resolve,reject)->{
      this.afAuth.createUserWithEmailAndPassword(value.email, value.password).then(
        res=>resolve(res),
        err=>rejects(err))
    })
  }
   
  loginUser(valiue){
    return new Promise<any>(resolve,reject)->{
      this.afAuth.signInWithEmailAndPassword(value.email, value.password).then(
        res=>resolve(res),
        err=>rejects(err))
    })
  }
  logoutUser(){
    return new Promise((resolve, reject)=>{
      if(this.afAuth.currentUser){
        this.afAuth.signOut().then(()=>{
          console.log("Log Out");
          resolve();
        }).catch((error )=>{
          reject();
        })
      }
    })
  }

  userDetails(){
    return this.afAuth.user

  }
}
