import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainLayoutComponent} from './components/main-layout/main-layout.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: MainLayoutComponent, children: [
          { path: '', loadChildren: () => import('../blog/blog.module').then(m => m.BlogModule) },
        ]
      }
    ])
  ]
})
export class CoreModule {
}
