import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
      this.contarTres().then(
      mensaje => console.log('terminó', mensaje),
      // () => console.log('error')
    ).catch( error => console.error('Error en la promesa ', error));

   }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {
      return new Promise( (resolve, reject ) => {
      let contador = 0;
      console.log(contador);
      const intervalo = setInterval( () => {
        contador += 1;
        if (contador === 3) {
          resolve(true);
          // rejec('un simple error');
          clearInterval(intervalo);
        }
      }, 1000);
    });

  }

}
