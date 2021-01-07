import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isLoggedIn$: Observable<boolean>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.userService.isLoggedIn();
  }

}
