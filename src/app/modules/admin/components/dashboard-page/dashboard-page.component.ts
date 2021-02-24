import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Post} from '../../../../interfaces/interfaces';
import {PostsService} from '../../../../services/posts.service';
import {Observable, of} from 'rxjs';
import {AlertService} from '../../services/alert.service';
import {map, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent implements OnInit {

  posts$: Observable<Post[]>
  searchStr = ''

  constructor(
    private postsService: PostsService,
    private alert: AlertService
  ) {
  }

  ngOnInit() {
    this.posts$ = this.postsService.getAll();
  }

  remove(id: string) {
    this.postsService.remove(id).pipe(
      switchMap(() => this.posts$),
      map(posts => posts.filter(post => post.id != id)),
      tap(() => this.alert.warning('Пост был удален')),
    ).subscribe(data => {
      this.posts$ = of(data);
    });
  }
}
