import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map, retry, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
    this.subscription = this.regresaObservable()
    // .pipe(
    //   retry(2)
    // )
    .subscribe(
      numero => console.log('Subs', numero),
      error => console.error('error ', error),
      () => console.log('el observador terminó')
    );
   }

  ngOnInit() {
  }
  ngOnDestroy() {
    console.log('la pagina se va a cerrar');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    let contador = 0;
    return new Observable( (observer: Subscriber<any>) => {

      const intervalo = setInterval( () => {

        contador += 1;

        const salida = {
          valor: contador
        };
        observer.next( salida );
        // if (contador === 3) {
        //   clearInterval(intervalo);
        // }
        // if ( contador === 2 ) {
        //   clearInterval(intervalo);
        //   observer.error('Auxilio');
        // }

      }, 1000);
    }).pipe(
      map( resp => resp.valor ),
      filter( (valor, index) => {
        // console.log('filter', valor, index);
        if ( ( valor % 2 ) === 1) {
          // impar
          return true;
        } else {
          // par
          return false;
        }
      })
    );
  }

}
