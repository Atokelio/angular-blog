import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostsService} from '../../../shared/services/posts.service';
import {Observable} from 'rxjs';
import {Post} from '../../../shared/interfaces/interfaces';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostPageComponent implements OnInit {

  post$: Observable<Post>

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {
  }

  ngOnInit() {
    this.post$ = this.route.params.pipe(
      switchMap((params: Params) => this.postsService.getById(params['id']))
    )
  }
}
