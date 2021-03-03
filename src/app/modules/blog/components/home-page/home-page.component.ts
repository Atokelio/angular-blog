import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PostsService} from '../../../shared/services/posts.service';
import {Observable} from 'rxjs';
import {Post} from '../../../../interfaces/interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {

  posts$: Observable<Post[]>

  constructor(private postsService: PostsService) {
  }

  ngOnInit() {
    this.posts$ = this.postsService.getAll()
  }

}
