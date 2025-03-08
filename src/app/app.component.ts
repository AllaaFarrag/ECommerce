import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./core/layout/navbar/navbar.component";
import { isPlatformBrowser } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { FooterComponent } from "./core/layout/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'e-commerce';

  _NgxSpinnerService = inject(NgxSpinnerService)
  _Router = inject(Router);
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {  // Check if running in the browser
      const lastVisitedPage = localStorage.getItem('lastVisitedPage');
      if (lastVisitedPage) {
        this._Router.navigateByUrl(lastVisitedPage);
      }

      this._Router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          localStorage.setItem('lastVisitedPage', event.urlAfterRedirects);
        }
      });
    }
  }
}
