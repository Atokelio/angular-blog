import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {PostsService} from '../services/posts.service';

@Injectable({providedIn: 'root'})

export class PostsResolver implements Resolve<any> {
  constructor(
    private readonly postService: PostsService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): null {
    this.postService.fetch();
    return null;
  }
}
