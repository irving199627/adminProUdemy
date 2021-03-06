
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { AdminGuard } from '../services/guards/admin.guard';

import { ProfileComponent } from './profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';

const PagesRoutes: Routes = [
        {
          path: 'dashboard', component: DashboardComponent,
          canActivate: [VerificaTokenGuard],
          data: { titulo: 'Dashboard' }
        },
        { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
        { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas' } },
        { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
        { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
        { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de Tema' } },
        { path: 'perfil', component: ProfileComponent, data: { titulo: 'perfil de usuario' } },
        { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },

      //   Mantenimientos
        {
          path: 'usuarios',
          component: UsuariosComponent,
          canActivate: [ AdminGuard ],
          data: { titulo: 'Mantenimieto de usaurios' }
        },
        { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimieto de hospitales' } },
        { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimieto de Médicos' } },
        { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Médico' } },
        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

export const PAGES_ROUTES = RouterModule.forChild( PagesRoutes );
