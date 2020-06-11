import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Empresa } from '../models/empresa/empresa';
import { Operador } from '../models/operadores/operador';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  userData: any; // Save logged in user data
  async login(email: string, password: string) {
    var result = await this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserLogin(result.user);
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
        this.router.navigate(['index']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }
  async registerOperador(email: string, password: string, operador: Operador) {
    var result = await this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.sendEmailVerification();
        this.setOperadorData(result.user, operador);
        this.router.navigate(['company/posts']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }
  setOperadorData(user, operador) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`operadores/${user.uid}`);
    const userData: Operador = {
      nombre: operador.nombre,
      direccion: operador.direccion,
      email: operador.email,
      password: operador.password,
      imagen: operador.imagen,
      empresa: localStorage.getItem('user')
    }
    return userRef.set(userData, {
      merge: true
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
    localStorage.setItem('user', user.uid);
  }
  async sendEmailVerification() {
    await (await this.afAuth.currentUser).sendEmailVerification()
      ;

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


  }

}
