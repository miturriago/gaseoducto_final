import { Component, OnInit, ɵConsole } from '@angular/core';
import { NgForm } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service'
import { Operador } from 'src/app/models/operadores/operador'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Operadores } from 'src/app/services/operador.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  operadores: Operadores[] = [];
  operador = {} as Operador
  email: string
  password: string
  cont: number

  items: any
  constructor(public authService: AuthService,
    public afs: AngularFirestore,
  ) {


  }

  ngOnInit(): void {
    this.cont = 0;
    this.getOperadores();

  }


  getOperadores() {
    this.afs.collection("operadores").get().toPromise().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().empresa == localStorage.getItem('user'))
          console.log(`${doc.id} => ${doc.data().nombre}`);
        this.cont = this.cont + 1;
      });
    });
  }
  addOperador(operadorForm: NgForm) {
    this.authService.registerOperador(this.operador.email, this.operador.password, operadorForm.value)
    this.operador = {} as Operador
  }
}
