
export abstract class Juego {
  public nombre = 'Sin Nombre';
  //public jugador: string;
  //public gano = false;
  public id: number;
  public juego: string;
  public datos: string;

  constructor(juego: string, datos?: string) {
    //if (id)
    //  this.id = id;

    if (juego)
      this.juego = juego;

    if(datos)
      this.datos = datos;
  }

  //'/partidas/guardarjugada'
  public abstract guardarJugada(): boolean;

  public abstract verificar():boolean;
  
  public retornarAyuda() {
    return "NO hay Ayuda definida";
  }
}
