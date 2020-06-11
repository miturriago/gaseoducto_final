import { Component, OnInit, ɵConsole } from '@angular/core'
import { RegisterService } from 'src/app/services/register.service'
import { Empresa } from 'src/app/models/empresa/empresa'
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms'
import { LoginService } from 'src/app/services/login.service'
import { AuthService } from 'src/app/services/auth.service'
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  empresa = {} as Empresa
  email: string
  password: string
  uploadProgress: Observable<number>;
  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = false;

  uploadURL: Observable<string>;
  constructor(
    public registerService: RegisterService,
    public authService: AuthService,
    public loginService: LoginService,
    public storage: AngularFireStorage
  ) { }
  public empresaForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });
  ngOnInit(): void { }
  addEmpresa(empresaForm: NgForm) {
    this.subirArchivo();
    this.authService.register(this.empresa.email, this.empresa.password, empresaForm.value, this.URLPublica)
    //this.registerService.addEmpresa(empresaForm.value)
    this.empresa = {} as Empresa
  }
  //Evento que se gatilla cuando el input de tipo archivo cambia
  public cambioArchivo(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeArchivo = `Archivo preparado: ${event.target.files[i].name}`;
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append('archivo', event.target.files[i], event.target.files[i].name)
      }
    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
  }
  //Sube el archivo a Cloud Storage
  public subirArchivo() {
    let archivo = this.datosFormulario.get('archivo');
    let referencia = this.referenciaCloudStorage(this.nombreArchivo);

    //Cambia el porcentaje
    

    referencia.getDownloadURL().subscribe((URL) => {
      this.URLPublica = URL;
    });
  }
  public tareaCloudStorage(nombreArchivo: string, datos: any) {
    return this.storage.upload(nombreArchivo, datos);
  }

  //Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
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
