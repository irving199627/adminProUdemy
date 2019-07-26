import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarHospital( desde: number = 0) {
    const url = URL_SERVICIOS + '/hospital?desde=' + desde;

    return this.http.get(url);
  }

  obtenerHospital( id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url)
    .pipe(map( (res: any) => res.hospital));
  }

  borarHospital( id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
    .pipe(map ( resp => {
      swal('Hospital borrado', 'El hospital fue borrado correctamente', 'success');
    }));
    console.log(url);
  }

  crearHospital(nombre: string) {
    const url = URL_SERVICIOS + '/hospital?token=' + this._usuarioService.token;
    console.log(url);
    return this.http.post(url, {nombre})
    .pipe(map( () => {
      swal('Hospital creado', `Hospital ccon el nombre ${ nombre } creado correctamente`, 'success');
    }));
  }

  buscarHospital( termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url)
    .pipe(map( (resp: any) => resp.hospitales));
  }

  actualizarHospital( hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;
    return this.http.put(url, hospital)
    .pipe(map( res => {
      swal('Actualizado Correctamente', hospital.nombre, 'success');
    }));
  }
}
