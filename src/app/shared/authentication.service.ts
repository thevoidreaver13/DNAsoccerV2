import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { first,tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userData: Observable<firebase.User>;
  userInfo: Observable<any[]>;
  userEmail: string;
  constructor(private angularFireAuth: AngularFireAuth,private db: AngularFireDatabase) {
    this.userData = angularFireAuth.authState;

    this.angularFireAuth.authState.subscribe(user =>{
      if (user){
        this.userEmail = user.email;
        this.userInfo = db.list('users', ref => ref.orderByChild('email').equalTo(user.email)).valueChanges();
        console.log(this.userInfo)
      }
    })

  }
  Save(){
    console.log(this.userEmail)
    this.db.list('users', ref => ref.orderByChild('email').equalTo(this.userEmail)).update('name','test')
  }
  /* Sign up */
  SignUp(email: string, password: string) {
    this.angularFireAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed up!', res);
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
      });    
  }

  /* Sign in */
  SignIn(email: string, password: string) {
    this.angularFireAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed in!');
      })
      .catch(err => {
        console.log('Something is wrong:',err.message);
      });
  }

  /* Sign out */
  SignOut() {
    this.angularFireAuth
      .auth
      .signOut();
  }  
  isLoggedIn(){
    console.log('isloggin')
    return this.angularFireAuth.authState.pipe(first())
  }
  Check(){
    
    console.log(
    this.isLoggedIn().pipe(
      tap(user =>{
        return user
      }
      )
    ).subscribe()
    )
  }

}