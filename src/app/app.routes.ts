import { Routes, RouterModule } from '@angular/router';




const APP_ROUTE: Routes = [
    
    { path: '**', pathMatch: 'full', redirectTo: 'index' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTE);
