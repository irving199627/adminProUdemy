import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos: Medico [] = [];
  constructor(
    public _medicoServices: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicoServices.cargarMedicos()
    .subscribe( medicos => this.medicos = medicos);
  }

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this._medicoServices.buscarMedicos(termino)
    .subscribe(medicos => {
      this.medicos = medicos;
    });
  }

  borrarMedico( medico: Medico) {
    this._medicoServices.borrarMedico( medico._id)
    .subscribe(() => this.cargarMedicos());
  }
}
