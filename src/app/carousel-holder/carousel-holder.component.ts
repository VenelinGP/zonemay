import { Component } from '@angular/core';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import {
  bounceInLeftAnimation,
  bounceInUpAnimation,
  bounceInRightAnimation,
  bounceInLeftOnEnterAnimation,
  bounceInUpOnEnterAnimation,
  flipInXAnimation
} from 'angular-animations';

interface Image {
  src: string;
  title?: string;
  alt?: string;
  content: string;
  menu: string;
}

@Component({
  selector: 'app-carousel-holder',
  templateUrl: './carousel-holder.component.html',
  animations: [
    bounceInLeftAnimation(),
    bounceInUpAnimation(),
    bounceInRightAnimation(),
    bounceInLeftOnEnterAnimation(),
    bounceInUpOnEnterAnimation(),
    flipInXAnimation()
  ]
})
export class CarouselHolderComponent {
  activeSlides: SlidesOutputData;

  slidesStore: any[];
  imagesData: Image[] = [
    {
      src: 'assets/images/slide-1-1.jpg',
      alt: '',
      title: '',
      content: 'Ръчно изработени бутикови продукти',
      menu: 'Всички продукти'
    },
    {
      src: 'assets/images/slider-3.jpg',
      alt: 'image',
      title: 'image',
      content: 'За всеки повод',
      menu: 'Тематични'
    },
    {
      src: 'assets/images/slider-2.jpg',
      alt: 'image',
      title: 'image',
      content: 'За Вас и вашият дом.',
      menu: 'За Дома'
    }
  ];

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    margin: 0,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    autoWidth: true,
    items: 1,
    dots: false,
    autoplayHoverPause: false,
    navSpeed: 700,
    navText: [
      '<span class="ion-ios-arrow-back">',
      '<span class="ion-ios-arrow-forward">'
    ],
    nav: true
  };
  isStartChange = false;
  animationState = false;
  firstImageState = true;
  secondImageState = false;
  thirdImageState = false;

  toggleState() {
    this.firstImageState = !this.firstImageState;
  }

  getData(data: SlidesOutputData) {
    this.activeSlides = data;
    this.animate();

    if (this.activeSlides.startPosition === 0) {
      this.firstImageState = true;
      this.secondImageState = false;
      this.thirdImageState = false;
    } else if (this.activeSlides.startPosition === 1) {
      this.firstImageState = false;
      this.secondImageState = true;
      this.thirdImageState = false;
    } else if (this.activeSlides.startPosition === 2) {
      this.firstImageState = false;
      this.secondImageState = false;
      this.thirdImageState = true;
    }
  }
  clear() {
    this.isStartChange = false;
  }
  animate() {
    this.animationState = false;
    setTimeout(() => {
      this.animationState = !this.animationState;
      this.isStartChange = true;
    }, 1);
  }
}
