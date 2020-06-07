import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(public afAuth: AngularFireAuth, public router: Router) {}

  login(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((value) => {
        console.log('logged')
        //expects a route
      })
      .catch((err) => {
        console.log('something wrong:', err.message)
      })
  }
}
