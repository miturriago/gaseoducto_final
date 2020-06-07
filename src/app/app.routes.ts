import { Routes, RouterModule } from '@angular/router';

import {IndexComponent} from './components/public/index/index.component';


const APP_ROUTE: Routes = [
    { path: 'index', component: IndexComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'index' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTE);
