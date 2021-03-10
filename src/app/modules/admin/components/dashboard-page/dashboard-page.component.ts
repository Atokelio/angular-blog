import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Post} from '../../../shared/interfaces/interfaces';
import {PostsService} from '../../../shared/services/posts.service';
import {Observable} from 'rxjs';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent implements OnInit {

  posts$: Observable<Post[]>
  posts: Post[]
  searchStr = ''

  constructor(
    private postsService: PostsService,
    private alert: AlertService
  ) {
  }

  ngOnInit() {
    this.posts$ = this.postsService.posts$;
  }

  remove(id: string) {
    this.postsService.removeSave(id)
      .subscribe(() => {
        this.alert.warning('Пост был удален')
      });
  }
}
