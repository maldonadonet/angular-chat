import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public usuario : Usuario = null;

  constructor( private socket: Socket ) { 
    this.cargarStorage();
    this.checkStatus();
  }

  checkStatus(){

    this.socket.on('connect', ()=>{
      console.log('Conecatdo al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', ()=>{
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });
  }

  // Método que se va encargar de emitir todos los eventos que pueda disparar la aplicacion de Angular
  emit( evento: string, payload?: any, callback?: Function){
    // emit('EVENTO', payload, callback?)
    console.log('Emitiendo.', evento );
    this.socket.emit( evento, payload, callback );
  }

  listen( evento: string ){
    return this.socket.fromEvent( evento );
  }

  // Metodo para el login
  loginWS( nombre: string ){

    return new Promise( (resolve, reject ) =>{

      this.emit( 'configurar-usuario', { nombre }, resp =>{
        
        this.usuario = new Usuario( nombre );
        this.guardarStorage();

        resolve();

      });

    });

    // this.socket.emit( 'configurar-usuario', { nombre: nombre }, ( resp )=>{

    //   console.log( resp );
      

    // });

  }

  // 
  getUsuario() {
	return this.usuario;
  }

  guardarStorage() {
    // JSON.stringify: Convertir objeto a string
    localStorage.setItem('usuario', JSON.stringify( this.usuario ));
  }

  cargarStorage(){
    if (localStorage.getItem('usuario')) {
      
      // JSON.parse : Convertir string a objetos
      this.usuario = JSON.parse ( localStorage.getItem('usuario') );

      this.loginWS( this.usuario.nombre );
      
      
    }
  }


}
