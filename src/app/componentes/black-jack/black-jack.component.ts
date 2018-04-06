
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { BlackJack } from '../../clases/blackjack/juego-black-jack'

@Component({
  selector: 'black-jack',
  templateUrl: './black-jack.component.html',
  styleUrls: ['./black-jack.component.css']
})

export class BlackJackComponent implements OnInit {
  @Output() enviarJuego: EventEmitter<any>= new EventEmitter<any>();

  nuevoJuego: BlackJack;
  Mensajes: string;
  contador: number;
  ocultarVerificar: boolean;
 
  constructor() { 
    this.nuevoJuego = new BlackJack();
      this.ocultarVerificar=false;
  }
  
  pedir() {
    this.nuevoJuego.Pedir(1);  // TEMPORAL: indice jugador
    this.Mensajes = 'Pedir nueva carta';
  }

  reset() {
    this.nuevoJuego.Reset();
    this.contador=0;
  }

  plantarse() {
    this.nuevoJuego.Plantarse();
  }

  repartir() {
    this.nuevoJuego.Repartir();
  }

  verificar()
  {
    /*this.contador++;
    this.ocultarVerificar=true;
    console.info("numero Secreto:",this.nuevoJuego.gano);  
    if (this.nuevoJuego.verificar()){
      
      this.enviarJuego.emit(this.nuevoJuego);
      this.MostrarMensaje("Sos un Genio!!!",true);
      this.nuevoJuego.numeroSecreto=0;

    }else{

      let mensaje:string;
      switch (this.contador) {
        case 1:
          mensaje="No, intento fallido, animo";
          break;
          case 2:
          mensaje="No,Te estaras Acercando???";
          break;
          case 3:
          mensaje="No es, Yo crei que la tercera era la vencida.";
          break;
          case 4:
          mensaje="No era el  "+this.nuevoJuego.numeroIngresado;
          break;
          case 5:
          mensaje=" intentos y nada.";
          break;
          case 6:
          mensaje="Afortunado en el amor";
          break;
      
        default:
            mensaje="Ya le erraste "+ this.contador+" veces";
          break;
      }
      this.MostrarMensaje("#"+this.contador+" "+mensaje+" ayuda :"+this.nuevoJuego.retornarAyuda());
     

    }
    console.info("numero Secreto:",this.nuevoJuego.gano);*/
  }  

  MostrarMensaje(mensaje:string="este es el mensaje",ganador:boolean=false) {
    this.Mensajes=mensaje;    
    var x = document.getElementById("snackbar");
    if(ganador)
      {
        x.className = "show Ganador";
      }else{
        x.className = "show Perdedor";
      }
    var modelo=this;
    setTimeout(function(){ 
      x.className = x.className.replace("show", "");
      modelo.ocultarVerificar=false;
     }, 3000);
    console.info("objeto",x);
  
  }

  ngOnInit() {
    document.getElementById('info').setAttribute('src', 'assets/imagenes/info-2.png');
    document.body.setAttribute('src', './assets/imagenes/back.jpg');
    document.body.setAttribute('background-color', 'gray');
  }

}
