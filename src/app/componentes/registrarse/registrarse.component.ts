import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MiHttpService } from "../../servicios/mi-http/mi-http.service";
import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {

  private subscription: Subscription;
  nombre: string = '';
  email: string = '';
  cuit: number;
  sexo: string = 'm';
  clave: string = '';
  clave2: string = '';
  terminos: boolean = false;

  progreso: number;
  progresoMensaje = "esperando...";
  logeando = true;
  ProgresoDeAncho:string;
  vali: FormControl;
  formRegistro: FormGroup;

  clase = "progress-bar progress-bar-info progress-bar-striped ";

  constructor( /*private miConstructor: FormBuilder,*/ private xhr: MiHttpService, private route: ActivatedRoute, private router: Router) { 
    this.progreso = 0;
    this.ProgresoDeAncho = "0%";
    this.vali = new FormControl('', [Validators.email]);
  
    /*this.formRegistro = this.miConstructor.group({
      usuario: this.vali
    });*/
  }

  ngOnInit() {
  }


  completado(res: Response) {
    console.info('Usuario creado.');
    
    return res.json() || {};
  }

  error( error: Response | any ) {
    console.error('¡Error al crear el usuario!');
    var msg: string = JSON.stringify(error.json());
    var obj = JSON.parse(msg);
    if((obj.error!==undefined)) console.log(obj.error);
    else console.log(msg);
    return error;
  }

  registrarse() {
    if(this.clave!=this.clave2) return;
    this.xhr.httpPostS(environment.backendRoute+'apirestjugadores/altausuario', {
      nombre: this.nombre,
      email: this.email,
      clave: this.clave,
      cuit: this.cuit,
      sexo: this.sexo
    }, this.completado, this.error, ()=>{
      this.xhr.httpPostS(environment.backendRoute+'login', {email: this.email, clave: this.clave}, (res: Response)=>{
        localStorage.setItem('token', JSON.parse(JSON.stringify(res.json())).token);
      }, err=>{ console.error('No se pudo loguear al servidor.');}, ()=>{
        this.router.navigate([environment.frontendRoute+'Principal']);
      });
    });
  
    
    /*alert(
      'Nombre: ' + this.nombre
      +'\nEmail: ' + this.email
      +'\nCuit: ' + this.cuit
      +'\nSexo: ' + this.sexo
      +'\nClave: ' + this.clave
      +'\nTerminos: ' + this.terminos
    );*/
  }

  toggleTerminos() {
    this.terminos = !this.terminos;
  }

}
