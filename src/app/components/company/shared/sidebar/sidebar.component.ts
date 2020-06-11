import { Component, OnInit, ɵConsole } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Empresa } from '../../../../models/empresa/empresa';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  email: string;
  nombre: string;

  constructor(
    private firestore: AngularFirestore,
    public afs: AngularFirestore,
  ) {

  }

  ngOnInit(): void {

    this.getCompany();
    this.nombre=localStorage.getItem('nombre');
    this.email=localStorage.getItem('email');

  }
  getCompany() {
    var docRef = this.afs.collection("empresas").doc(localStorage.getItem('user'));

    docRef.get().toPromise().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        localStorage.setItem('nombre', doc.data().nameRep);
        localStorage.setItem('email', doc.data().email);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }



}
