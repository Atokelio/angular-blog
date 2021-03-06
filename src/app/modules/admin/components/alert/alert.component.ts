import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {AlertService} from '../../services/alert.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements OnInit {

  @Input() delay = 5000

  text$: BehaviorSubject<string> = new BehaviorSubject<string>('')
  type$: BehaviorSubject<string> = new BehaviorSubject<string>('success')

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.alert$.subscribe(alert => {
      this.text$.next(alert.text)
      this.type$.next(alert.type)

      const timeout = setTimeout(() => {
        clearTimeout(timeout)
        this.text$.next('')
      }, this.delay)
    })
  }
}
