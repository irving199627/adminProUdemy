import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SettingsService,
         SidebarService,
         MedicoService,
         SharedService, UsuarioService, LoginGuardGuard, SubirArchivoService, HospitalService,
         AdminGuard, VerificaTokenGuard } from './service.index';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

@NgModule({
  imports: [
  CommonModule,
  HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    HttpClientModule,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService,
    AdminGuard,
    VerificaTokenGuard
  ],
  declarations: []
})
export class ServiceModule { }
