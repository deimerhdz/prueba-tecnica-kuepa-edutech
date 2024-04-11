import { Routes } from '@angular/router';
import { isNotAuthenticatedGuard } from '@core/guards/isNotAuthenticated.guard';
import { HomeComponent } from './pages/home/home.component';
import { isAuthenticatedGuard } from './core/guards/isAuthenticated.guard';

export const routes: Routes = [

    {
        path: 'auth',
        canActivate:[isNotAuthenticatedGuard],
        loadChildren:()=>import(`./auth/auth.routes`).then(m=>m.AUTH_ROUTES)
    },
    {
        path:'home',
        canActivate:[isAuthenticatedGuard],
        component:HomeComponent
    },
    {
        path:'', redirectTo:'/auth',pathMatch:'full'
    }
];
