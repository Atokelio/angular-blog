import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomePageComponent} from './components/home-page/home-page.component';
import {PostPageComponent} from './components/post-page/post-page.component';
import {PostComponent} from './components/post/post.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    HomePageComponent,
    PostPageComponent,
    PostComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: HomePageComponent},
      {path: 'post/:id', component: PostPageComponent}
    ])
  ]
})
export class BlogModule {
}

