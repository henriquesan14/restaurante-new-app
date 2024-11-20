import { Routes } from '@angular/router';
import { AuthenticatedComponent } from './features/authenticated/authenticated.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthenticadedGuard } from './core/guards/authenticated.guard';

export const routes: Routes = [
    {
        path: '', loadChildren: () => import('./features/auth/auth.routes')
            .then(mod => mod.AUTH_ROUTES),
        canActivate: [AuthenticadedGuard], 
    },
    {
        path: 'app',
        component: AuthenticatedComponent,
        canActivate: [AuthGuard], 
        children: [
            {
                path: 'usuarios', loadChildren: () => import('./features/usuarios/usuarios.route')
                    .then(mod => mod.USUARIOS_ROUTES)
            },
            {
                path: 'menus', loadChildren: () => import('./features/menus/menus.routes')
                    .then(mod => mod.MENUS_ROUTES)
            },
            {
                path: 'mesas', loadChildren: () => import('./features/mesas/mesas.routes')
                    .then(mod => mod.MESAS_ROUTES)
            },
            {
                path: 'grupos', loadChildren: () => import('./features/grupos/grupos.routes')
                    .then(mod => mod.GRUPOS_ROUTES)
            },
            {
                path: 'profile', loadChildren: () => import('./features/profile/profile.routes')
                    .then(mod => mod.PROFILE_ROUTES)
            },
            {
                path: 'despesas', loadChildren: () => import('./features/despesas/despesas.routes')
                    .then(mod => mod.DESPESAS_ROUTES)
            },
            {
                path: 'ganhos', loadChildren: () => import('./features/ganhos/ganhos.routes')
                    .then(mod => mod.GANHOS_ROUTES)
            },
            {
                path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.routes')
                    .then(mod => mod.DASHBOARD_ROUTES)
            },
        ],
        
    },
    {
        path: '**',
        redirectTo: 'app'
    },
];