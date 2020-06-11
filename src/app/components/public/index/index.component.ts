import { Component, OnInit } from '@angular/core'
import { RegisterService } from 'src/app/services/register.service'
import { Empresa } from 'src/app/models/empresa/empresa'
import { NgForm } from '@angular/forms'
import { LoginService } from 'src/app/services/login.service'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  empresa = {} as Empresa
  email: string
  password: string
  constructor(
    public registerService: RegisterService,
    public authService: AuthService,
    public loginService: LoginService
  ) { }

  ngOnInit(): void { }
  addEmpresa(empresaForm: NgForm) {
    this.authService.register(this.empresa.email, this.empresa.password, empresaForm.value)
    //this.registerService.addEmpresa(empresaForm.value)
    this.empresa = {} as Empresa
  }

  onLogin() {
    this.authService.login(this.email, this.password)
    this.email = ''
    this.password = ''
  }
  forgotPassword() {
    this.authService.sendPasswordResetEmail(this.email)
    this.email = ''
  }
}
