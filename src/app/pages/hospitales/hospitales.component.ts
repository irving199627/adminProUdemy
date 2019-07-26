import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
declare var swal: any;
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion
        .subscribe(() => this.cargarHospitales());
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospital( this.desde )
    .subscribe( (resp: any) => {
      this.totalRegistros = resp.totalConteo;
      this.hospitales = resp.hospitales;
      console.log(this.hospitales);
      this.cargando = false;
    });
  }

  buscarHospital( termino: string) {
    console.log(termino);
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    this.cargando = true;
    this._hospitalService.buscarHospital( termino )
    .subscribe( (hospitales: Hospital []) => {
      console.log(hospitales);
      this.hospitales = hospitales;
      this.cargando = false;
    });
  }

  guardarHospital( hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital)
    .subscribe();
  }

  crearHospital() {
    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    })
    .then( ( value: string ) => {
      if (!value || value.length === 0) {
        return;
      }
      console.log(value);
      this._hospitalService.crearHospital(value)
      .subscribe( creado => {
        this.cargarHospitales();
      });
    });
  }

  borrarHospital( hospital: Hospital) {
    swal({
      title: '¿Está seguro?',
      text: 'Está apunto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {

      if (borrar) {
        this._hospitalService.borarHospital(hospital._id)
        .subscribe( borrado => {
            console.log(borrado);
            this.cargarHospitales();
        });
      }
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
    this.cargarHospitales();
  }

  mostrarModal( id: string) {
    console.log(id);
    this._modalUploadService.mostrarModal('hospitales', id);
  }

}
