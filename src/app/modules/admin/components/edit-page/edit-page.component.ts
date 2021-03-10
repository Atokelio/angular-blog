import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostsService} from '../../../shared/services/posts.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {switchMap} from 'rxjs/operators';
import {Post} from '../../../shared/interfaces/interfaces';
import {BehaviorSubject, Observable} from 'rxjs';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPageComponent implements OnInit {

  form: FormGroup
  post$: Observable<Post>
  submitted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
    private alert: AlertService
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required)
    })

    this.post$ = this.route.params.pipe(
      switchMap((params: Params) => this.postService.getById(params['id'])),
    )

    this.setPostSubscription()
  }

  setPostSubscription(): void {
    this.post$.subscribe((post: Post) => {
      this.form.patchValue({
        title: post.title,
        text: post.text
      })
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted$.next(true)

    this.post$.pipe(
      switchMap(post => this.postService.update({
        ...post,
        text: this.form.value.text,
        title: this.form.value.title
      }))
    )
      .subscribe(() => {
        this.submitted$.next(false)
        this.alert.success('Пост был обновлен')
      })
  }
}