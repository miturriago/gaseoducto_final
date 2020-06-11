import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Empresa } from '../models/empresa/empresa';
import { Operador } from '../models/operadores/operador';
import { Pregunta } from '../models/preguntas/pregunta';

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
  setQuestion(pregunta) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`preguntas/${localStorage.getItem('user')}`);
    if (pregunta.correcto11 == undefined) {
      pregunta.correcto11 = false;
    }
    if (pregunta.correcto12 == undefined) {
      pregunta.correcto12 = false;
    }
    if (pregunta.correcto13 == undefined) {
      pregunta.correcto13 = false;
    }
    if (pregunta.correcto14 == undefined) {
      pregunta.correcto14 = false;
    }
    if (pregunta.correcto15 == undefined) {
      pregunta.correcto15 = false;
    }
    if (pregunta.correcto21 == undefined) {
      pregunta.correcto21 = false;
    }
    if (pregunta.correcto22 == undefined) {
      pregunta.correcto22 = false;
    }
    if (pregunta.correcto23 == undefined) {
      pregunta.correcto23 = false;
    }
    if (pregunta.correcto24 == undefined) {
      pregunta.correcto24 = false;
    }
    if (pregunta.correcto25 == undefined) {
      pregunta.correcto25 = false;
    }

    if (pregunta.correcto31 == undefined) {
      pregunta.correcto31 = false;
    }
    if (pregunta.correcto32 == undefined) {
      pregunta.correcto32 = false;
    }
    if (pregunta.correcto33 == undefined) {
      pregunta.correcto33 = false;
    }
    if (pregunta.correcto34 == undefined) {
      pregunta.correcto34 = false;
    }
    if (pregunta.correcto35 == undefined) {
      pregunta.correcto35 = false;
    }

    const userData: Pregunta = {

      correcto11: pregunta.correcto11,
      correcto12: pregunta.correcto12,
      correcto13: pregunta.correcto13,
      correcto14: pregunta.correcto14,
      correcto15: pregunta.correcto15,
      correcto21: pregunta.correcto21,
      correcto22: pregunta.correcto22,
      correcto23: pregunta.correcto23,
      correcto24: pregunta.correcto24,
      correcto25: pregunta.correcto25,
      correcto31: pregunta.correcto31,
      correcto32: pregunta.correcto32,
      correcto33: pregunta.correcto33,
      correcto34: pregunta.correcto34,
      correcto35: pregunta.correcto35,
      pregunta1: pregunta.pregunta1,
      pregunta2: pregunta.pregunta2,
      pregunta3: pregunta.pregunta3,
      pregunta4: pregunta.pregunta4,
      pregunta5: pregunta.pregunta5,
      respuesta11: pregunta.respuesta11,
      respuesta12: pregunta.respuesta12,
      respuesta13: pregunta.respuesta13,
      respuesta14: pregunta.respuesta14,
      respuesta15: pregunta.respuesta15,
      respuesta21: pregunta.respuesta21,
      respuesta22: pregunta.respuesta22,
      respuesta23: pregunta.respuesta23,
      respuesta24: pregunta.respuesta24,
      respuesta25: pregunta.respuesta25,
      respuesta31: pregunta.respuesta31,
      respuesta32: pregunta.respuesta32,
      respuesta33: pregunta.respuesta33,
      respuesta34: pregunta.respuesta34,
      respuesta35: pregunta.respuesta35,
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
