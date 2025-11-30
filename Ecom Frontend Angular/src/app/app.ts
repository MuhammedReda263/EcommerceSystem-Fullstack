import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { IProducts } from './shared/Models/Product';
import { IPagination } from './shared/Models/Pagination';
import { IdentityService } from './identity/identity-service';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { LoadingService } from './core/services/loading';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit {
  constructor(private _identitySerivce: IdentityService, private router: Router, public loading: LoadingService) { }

  ngOnInit(): void {
    this._identitySerivce.loadRole();
    this._identitySerivce.isAuth().subscribe({
      next: (value) => {
        this._identitySerivce.authState.next(true);
      },
      error: (value) => {
        this._identitySerivce.authState.next(false)
      }
    })


    this.router.events.subscribe((event) => {

      if (event instanceof NavigationStart) {
        this.loading.show();
      }

      if (event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError) {
        this.loading.hide();
      }

    });
  }

}
