
import { Juego } from '../juego'
import { Mazo } from './mazo'

enum Tipo {Treboles = 1, Corazones = 2, Diamantes = 3, Picas = 4}

export class Carta {
    rutaImagen: string;     // ruta de la imagen de la carta
    tipo: Tipo;             // palo de la carta: 1 = trebol, 2 = corazon, 3 = diamante, 4 = pica
    numero: number;         // numero; as = 1, ... 11 = jack, 12 = queen, 13 = king
    enElMazo: boolean;      // si la carta todavia esta en el mazo, es verdadero
    nombreLargo: string;    // nombre completo de la carta
    indexJugador: number;   // indice del jugador que tiene la carta

    constructor(numero: number, tipo: Tipo, rutaImg: string) {
        this.numero = numero;
        this.tipo = tipo;
        this.rutaImagen = rutaImg;
        this.enElMazo = false;
        let tmp: string;
        switch (numero) {
            case 1:
                tmp = 'As';
                break;
            
            case 11:
                tmp = 'Sota';
                break;
        
            case 12:
                tmp = 'Reina';
                break;
        
            case 13:
                tmp = 'Rey';
                break;
        
            default:
                tmp = numero.toString();
                break;
        }
        tmp += ' de ' + Tipo[tipo];
        this.nombreLargo = tmp;
    }
    
    public Flip() {
        this.rutaImagen = './assets/imagenes/cards/lg/'+this.numero+'_'+this.tipo+'.png';
    }
}