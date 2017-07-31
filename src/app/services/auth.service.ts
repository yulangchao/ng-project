import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class AuthService {


  user: Observable<firebase.User>;
  constructor(public router: Router, public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
       (res) => {
        console.log(res);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['']);
       },

       (error) => {

         console.log(error);
       }

    );
  }

  logout() {
    this.afAuth.auth.signOut().then(
       () => {
            console.log('Signed Out');
            this.router.navigate(['login']);
            localStorage.removeItem('user');
       },

       (error) => {

            console.error('Sign Out Error', error);
       }

    );
  }
  signin(values){

    firebase.auth().signInWithEmailAndPassword(values.email, values.password).then(
       (res) => {
            console.log(res);
            localStorage.setItem('user', JSON.stringify(res));
            this.router.navigate(['']);
       },

       (error) => {

            console.log(error);
       }

    );
  }




  signup(email, password) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
      (user) => {
      // Handle Errors here.
      user.sendEmailVerification().then( () => {
           console.log("Email sent");
      },
      (error) => {
           console.log(error);
      });

    });
  }

}
