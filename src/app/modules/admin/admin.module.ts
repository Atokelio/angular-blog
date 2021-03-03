import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AdminLayoutComponent} from './components/admin-layout/admin-layout.component';
import {DashboardPageComponent} from './components/dashboard-page/dashboard-page.component';
import {CreatePageComponent} from './components/create-page/create-page.component';
import {EditPageComponent} from './components/edit-page/edit-page.component';
import {SharedModule} from '../shared/shared.module';
import {AuthGuard} from './modules/auth/guards/auth.guard';
import {SearchPipe} from './pipes/search.pipe';
import {AlertComponent} from './components/alert/alert.component';
import {AlertService} from './services/alert.service';
import {AuthModule} from './modules/auth/auth.module';
import {PostsResolver} from '../shared/resolvers/posts.resolver';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    SearchPipe,
    AlertComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)},
          {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard], resolve: {posts: PostsResolver}},
          {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
          {path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]}
        ]
      }
    ])
  ],
  exports: [RouterModule],
  providers: [AuthGuard, AlertService]
})
export class AdminModule {

}
