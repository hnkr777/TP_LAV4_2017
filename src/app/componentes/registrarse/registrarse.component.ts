import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MiHttpService } from "../../servicios/mi-http/mi-http.service";
import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";


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
    if(this.clave!=this.clave) return;
    this.xhr.httpPostS('/jugadoresarchivo/apirestjugadores/altausuario/', {
      nombre: this.nombre,
      email: this.email,
      clave: this.clave,
      cuit: this.cuit,
      sexo: this.sexo
    }, this.completado, this.error, ()=>{
      this.xhr.httpPostS('/login', {email: this.email, clave: this.clave}, (res: Response)=>{
        localStorage.setItem('token', JSON.parse(JSON.stringify(res.json())).token);
      }, err=>{ console.error('No se pudo loguear al servidor.');}, ()=>{
        this.router.navigate(['/Principal']);
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

  MoverBarraDeProgreso() {
    this.logeando=false;
    this.clase="progress-bar progress-bar-danger progress-bar-striped active";
    this.progresoMensaje="NSA spy..."; 
    let timer = TimerObservable.create(100, 20);
    this.subscription = timer.subscribe(t => {
      console.log("inicio");
      this.progreso=this.progreso+1;
      this.ProgresoDeAncho=this.progreso+20+"%";
      switch (this.progreso) {
        case 15:
        this.clase="progress-bar progress-bar-warning progress-bar-striped active";
        this.progresoMensaje="Verificando ADN..."; 
          break;
        case 30:
          this.clase="progress-bar progress-bar-Info progress-bar-striped active";
          this.progresoMensaje="Adjustando encriptación.."; 
          break;
          case 60:
          this.clase="progress-bar progress-bar-success progress-bar-striped active";
          this.progresoMensaje="Recompilando Info del dispositivo..";
          break;
          case 75:
          this.clase="progress-bar progress-bar-success progress-bar-striped active";
          this.progresoMensaje="Recompilando claves facebook, gmail, chats..";
          break;
          case 85:
          this.clase="progress-bar progress-bar-success progress-bar-striped active";
          this.progresoMensaje="Instalando KeyLogger..";
          break;
          
        case 100:
          console.log("final");
          this.subscription.unsubscribe();
          //this.Entrar();
          break;
      }
    });
    //this.logeando=true;
  }

}
