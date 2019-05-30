import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto = '';
  mensajeSubscription : Subscription;
  elemento : HTMLElement;
  // Array para los mensajes
  mensajes: any [] = [];

  constructor( public chatService: ChatService) { }

  ngOnInit() {
    this.elemento = document.getElementById('chat-mensajes');

    this.mensajeSubscription = this.chatService.getMessages().subscribe( msg =>{

      console.log( msg );
      this.mensajes.push( msg );

      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);

    });
  }

  ngOnDestroy(){
    this.mensajeSubscription.unsubscribe();
  }

  enviar(){
    if( this.texto.trim().length === 0 ){
      return;
    }
    
    this.chatService.sendMessage( this.texto );
    this.texto = '';
  }

}
