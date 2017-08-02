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

       },

       (error) => {

            console.error('Sign Out Error', error);
       }

    );
        localStorage.removeItem('user');
        this.router.navigate(['login']);
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




  signup(values) {
    this.afAuth.auth.createUserWithEmailAndPassword(values.email, values.passwords.password).then(
      (user) => {
      // Handle Errors here.
      user.updateProfile({
          displayName: values.name,
      }).then(function() {
          // Update successful.
      }, function(error) {
          // An error happened.
      });
      user.displayName = values.name;
      localStorage.setItem('user', JSON.stringify(user));
      user.sendEmailVerification().then( () => {
           console.log("Email sent");
           this.router.navigate(['']);
      },
      (error) => {
           console.log(error);
      });

    });
  }

}
