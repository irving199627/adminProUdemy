import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
// import swal from 'sweetalert';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _usuariosService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
    .subscribe(resp => this.cargarUsuarios());
  }

  mostrarModal( id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuariosService.cargarUsuarios(this.desde)
    .subscribe((resp: any) => {

      this.totalRegistros = resp.totalConteo;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }
  cambiarDesde( valor: number) {
    const desde = this.desde + valor;
    console.log(desde);
    if (desde >= this.totalRegistros ) {
      return;
    }

    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario( termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuariosService.buscarUsuarios( termino )
    .subscribe( (usuarios: Usuario[]) => {
      console.log(usuarios);
      this.usuarios = usuarios;
      this.cargando = false;
    });
  }

  borrarUsuario( usuario: Usuario) {
    console.log(usuario);
    if (usuario._id === this._usuariosService.usuario._id) {
      swal('No puede usuario', 'No se puede borrar así mismo', 'error');
      return;
    }
    swal({
      title: '¿Está seguro?',
      text: 'Está apunto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {

      if (borrar) {
        this._usuariosService.borrarUsuario(usuario._id)
        .subscribe( borrado => {
            console.log(borrado);
            this.cargarUsuarios();
        });
      }
    });
  }

  guardarUsuario( usuario: Usuario) {
    this._usuariosService.actualizarUsuario(usuario)
    .subscribe();
  }

}
