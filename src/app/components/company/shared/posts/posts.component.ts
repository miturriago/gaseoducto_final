import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service'
import { Operador } from 'src/app/models/operadores/operador'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  operador = {} as Operador
  email: string
  password: string
  constructor(public authService: AuthService,
  ) {
  }

  ngOnInit(): void {

  }
  addOperador(operadorForm: NgForm) {
    this.authService.registerOperador(this.operador.email, this.operador.password, operadorForm.value)
    this.operador = {} as Operador
  }
}
