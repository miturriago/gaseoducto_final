import { Component, OnInit } from '@angular/core'
import { RegisterService } from 'src/app/services/register.service'
import { Empresa } from 'src/app/models/empresa/empresa'
import { NgForm } from '@angular/forms'
import { LoginService } from 'src/app/services/login.service'

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
    public loginService: LoginService
  ) {}

  ngOnInit(): void {}
  addEmpresa(empresaForm: NgForm) {
    this.registerService.addEmpresa(empresaForm.value)
    this.registerService.register(this.empresa.email, this.empresa.password)
    this.empresa = {} as Empresa
  }

  onLogin() {
    console.log(JSON.stringify('hi'))
    this.loginService.login(this.email, this.password)
    this.email = ''
    this.password = ''
  }
}
