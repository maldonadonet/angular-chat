import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WebsocketService } from '../services/websocket.service';

@Injectable({
  providedIn: 'root'
})

// Clase que valida si un usuario no tiene nombre lo redirecciona a la vista de login
export class UsuarioGuardService implements CanActivate{

  constructor( public wsService : WebsocketService, private router: Router) { }

    canActivate(){
        if( this.wsService.getUsuario() ) {
            return true;
        }else{
            this.router.navigateByUrl('/');
            return false;
        }
    }
}
