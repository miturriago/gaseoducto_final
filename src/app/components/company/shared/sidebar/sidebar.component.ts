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
  email: string
  constructor(
    private firestore: AngularFirestore
  ) {

  }

  ngOnInit(): void {

    this.getCompany();
    this.email = localStorage.getItem('user');

  }
  getCompany() {
    console.log("paso aca")
    console.log(this.firestore.collection('empresas').snapshotChanges());
  }
  


}
