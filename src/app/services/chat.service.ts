import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsService : WebsocketService
  ) { }

  sendMessage( mensaje: string ){
    const payload = {
      de: this.wsService.getUsuario().nombre,
      cuerpo : mensaje
    };

    // Llamada al evento
    this.wsService.emit( 'mensaje', payload );
  }

  getMessages(){
    return this.wsService.listen('mensaje-nuevo');
  }

  // Metodo Mensajes privados
  getMessagesprivate() {
    return this.wsService.listen('mensaje-privado');
  }
}
