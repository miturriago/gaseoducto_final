import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './components/public/index/index.component';
import { DefaultComponent } from './components/company/layouts/default/default.component';
import { DashboardComponent } from './components/company/modules/dashboard/dashboard.component';
import { PostsComponent } from './components/company/shared/posts/posts.component';

const APP_ROUTE: Routes = [
    { path: 'index', component: IndexComponent },
    {
        path: 'company', component: DefaultComponent,
        children: [{
            path: 'dashboard',
            component: DashboardComponent
        },
        
        {
            path:'posts',
            component: PostsComponent
        }]
    },
    { path: '**', pathMatch: 'full', redirectTo: 'index' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTE);
