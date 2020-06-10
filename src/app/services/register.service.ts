import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFirestoreCollection } from '@angular/fire/firestore'
import { AngularFirestoreDocument } from '@angular/fire/firestore'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { Empresa } from '../models/empresa/empresa'
@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  empresasCollection: AngularFirestoreCollection
  empresas: Observable<Empresa[]>
  empresaDoc: AngularFirestoreDocument<Empresa>
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public db: AngularFirestore
  ) {
    this.empresasCollection = this.db.collection('empresas')
    this.empresas = this.empresasCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as Empresa
          data.id = a.payload.doc.id
          return data
        })
      })
    )
  }

  register(email: string, password: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((value) => {
        console.log('created')
      })
      .catch((err) => {
        console.log('something went wrong')
      })
  }
  getEmpresas() {
    return this.empresas
  }
  addEmpresa(empresa: Empresa) {
    this.db.collection("empresas").add(empresa)
  }
  
  deleteEmpresa(empresa: Empresa) {
    this.empresaDoc = this.db.doc(`empresas/${empresa.id}`)
    this.empresaDoc.delete()
  }
  updateEmpresa(empresa: Empresa) {
    this.empresaDoc = this.db.doc(`empresas/${empresa.id}`)
    this.empresaDoc.update(empresa)
  }
}
