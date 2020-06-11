import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Empresa } from '../models/empresa/empresa';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  userData: any; // Save logged in user data
  async login(email: string, password: string) {
    var result = await this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.router.navigate(['company']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }
  async register(email: string, password: string, empresa: Empresa) {
    var result = await this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.sendEmailVerification();
        this.SetUserData(result.user, empresa);
      }).catch((error) => {
        window.alert(error.message)
      })
  }
  SetUserData(user, empresa) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`empresas/${user.uid}`);
    const userData: Empresa = {
      email: empresa.email,
      id: empresa.id,
      name: empresa.name,
      password: empresa.password,
      image: empresa.image,
      phone: empresa.phone,
      nameRep: empresa.nameRep
    }
    return userRef.set(userData, {
      merge: true
    })
  }
  SetUserLogin(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`empresas/${user.uid}`);
    const userData: Empresa = {
      email: user.email,
      id: user.id,
      name: user.name,
      password: user.password,
      image: user.image,
      phone: user.phone,
      nameRep: user.nameRep
    }
    return userRef.set(userData, {
      merge: true
    })
  }
  async sendEmailVerification() {
    await (await this.afAuth.currentUser).sendEmailVerification()
      ;
    this.router.navigate(['index']);
  }
  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }
  async logout() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['index']);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }
  constructor(public afAuth: AngularFireAuth, public router: Router, public afs: AngularFirestore, ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user.uid));
        console.log('Datos ', localStorage.getItem('user'))
      } else {
        localStorage.setItem('user', null);
      }
    })

  }

}
