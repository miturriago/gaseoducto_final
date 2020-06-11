import { Component, OnInit, ɵConsole } from '@angular/core';
import { NgForm } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service'
import { Operador } from 'src/app/models/operadores/operador'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Operadores } from 'src/app/services/operador.service';
import { Observable } from "rxjs";
import { AngularFireStorage } from "@angular/fire/storage";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  selectedFile: File = null;
  downloadURL: Observable<string>;
  operadores: Operadores[] = [];
  operador = {} as Operador
  email: string
  password: string
  cont: number
  public cats = [];
  items: any
  constructor(public authService: AuthService,
    public afs: AngularFirestore,
    public storage: AngularFireStorage
  ) {


  }

  ngOnInit(): void {
    this.cont = 0;
    this.getCats().subscribe((catsSnapshot) => {
      this.cats = [];
      catsSnapshot.forEach((catData: any) => {
        if (catData.payload.doc.data().empresa == localStorage.getItem('user')) {
          this.cats.push({
            id: catData.payload.doc.id,
            data: catData.payload.doc.data()
          });
        }
      })
    });
    this.getOperadores();

  }
  public getCats() {
    return this.afs.collection('operadores').snapshotChanges();
  }
  

  public getOperadores() {
    this.afs.collection("operadores").get().toPromise().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().empresa == localStorage.getItem('user')) {
          console.log(`${doc.id} => ${doc.data().nombre}`);
          return doc.data();
        }
      });
    });
  }
  addOperador(operadorForm: NgForm) {
    this.authService.registerOperador(this.operador.email, this.operador.password, operadorForm.value)
    this.operador = {} as Operador
  }
}
