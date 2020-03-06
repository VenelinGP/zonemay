import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
url: string;
isShipping = false;
isReturns = false;
isTerms = false;
isPrivacypolicy = false;
isFAQ = false;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.getRoute();
  }
  getRoute() {
    this.route.url.subscribe(currentUrl => {
      this.url = currentUrl[0].path;
      if (this.url === 'shipping') {
        this.isShipping = true;
        this.isReturns = false;
        this.isTerms = false;
        this.isPrivacypolicy = false;
        this.isFAQ = false;
      } else if (this.url === 'returns') {
        this.isShipping = false;
        this.isReturns = true;
        this.isTerms = false;
        this.isPrivacypolicy = false;
        this.isFAQ = false;
      } else if (this.url === 'terms') {
        this.isShipping = false;
        this.isReturns = false;
        this.isTerms = true;
        this.isPrivacypolicy = false;
        this.isFAQ = false;
      } else if (this.url === 'privacypolicy') {
        this.isShipping = false;
        this.isReturns = false;
        this.isTerms = false;
        this.isPrivacypolicy = true;
        this.isFAQ = false;
      } else if (this.url === 'faq') {
        this.isShipping = false;
        this.isReturns = false;
        this.isTerms = false;
        this.isPrivacypolicy = false;
        this.isFAQ = true;
      }
    });
  }
}
