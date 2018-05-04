import { Juego } from '../clases/juego'

export class JuegoAdivina extends Juego {
    numeroSecreto: number = 0;
    numeroIngresado = 0;
    constructor(nombre?: string, gano?: boolean, jugador?:string) {
      super("Adivina", 'Adivina el número');
    }

    public guardarJugada() {return true;}

    public verificar() {
        if (this.numeroIngresado == this.numeroSecreto) {
          //this.gano = true;
        }
        // if (this.gano) {
        //   return true;
        // } else {
        //   return false;
        // }
        return 1;
     }

     public generarnumero() {
        this.numeroSecreto = Math.floor((Math.random() * 100) + 1);
        console.info('numero Secreto:' + this.numeroSecreto);
        //this.gano = false;
      }
      
      public retornarAyuda() {
        if (this.numeroIngresado < this.numeroSecreto) {
          return "Falta";
        }
        return "Te pasate";
      }
}
