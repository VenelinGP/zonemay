import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { BaseService } from '../../_services/base.service';
import { FormControl } from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MainMenu } from '../../_models';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {
  isPriceNumber = false;
  isDiscountNumber = false;
  isQuantityNumber = false;
  isImageStringLength = false;

  product: {
    name: string,
    price: number,
    discount: number,
    description: string,
    category: string,
    quantity: number ,
    availability: number,
    rating: number,
    sold: number,
    imglink: string
  };
  category: FormControl;
  picture: string;
  currentFileUpload: File;
  menu: MainMenu[] = [];
  imageChangedEvent: any = '';
  croppedImage: any = '';
  progress: { percentage: number; } = { percentage: 0 };
  isChecked: boolean;

  constructor(private baseService: BaseService) {}

  ngOnInit() {
    this.isPriceNumber = false;
    this.isDiscountNumber = false;
    this.isQuantityNumber = false;
    this.isImageStringLength = false;
    this.product = {
      name: '',
      price: 0.00,
      discount: 0.00,
      description: '',
      category: '',
      quantity: 0,
      availability: 0,
      rating: 0,
      sold: 0,
      imglink: ''
    };
    this.isChecked = false;
    this.category = new FormControl();
    // this.baseService.getMenu().subscribe(data => {
    //     this.menu = data.sort((a, b) => {
    //       return a.id - b.id;
    //     });
    //   });
    this.menu = this.baseService.getMenuNotObservable();
    console.log(this.menu);
    }

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      // this.w = event.cropperPosition.x2 - event.cropperPosition.x1;
      // this.h = event.cropperPosition.y2 - event.cropperPosition.y1;
      // console.log(event);
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  next() {
    if (typeof this.product.price === 'number') {
      this.isPriceNumber = false;
    }
    if ( typeof this.product.discount === 'number') {
      this.isDiscountNumber = false;
    }
    if (typeof this.product.quantity === 'number') {
      this.isQuantityNumber = false;
    }
    if (this.product.imglink !== '') {
      // this.isChecked = true;
    }
    if (!this.isPriceNumber && !this.isDiscountNumber && !this.isQuantityNumber && !this.isImageStringLength) {
      this.isChecked = true;
    }
  }
  back() {
    this.isChecked = false;
  }
  saveProduct() {
    const picture = this.croppedImage;
    if (picture !== undefined) {
      this.uploadAttachmentToServer( picture );
    }
  }
  uploadAttachmentToServer(
    picture: string
  ) {
    this.currentFileUpload = new File(
      [this.dataURItoBlob(picture)],
      'picture.jpg'
    );
    console.log(this.currentFileUpload);
    this.baseService
      .pushFileToStorage(this.currentFileUpload)
      .subscribe(event => {
        console.log('Event: ', event);
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(
            (100 * event.loaded) / event.total
          );
        } else if (event instanceof HttpResponse) {
          console.log('Picture is completely uploaded!');
          const jsObj = JSON.parse(event.body.toString());
          console.log('THIS Picture:', jsObj);
          const success: boolean = jsObj.success;
          if (success) {
            const filename = jsObj.filename;
            console.log(filename);

            this.product = {
              name: this.product.name,
              price: this.product.price,
              discount: this.product.discount,
              description: this.product.description,
              category: this.product.category,
              quantity: this.product.quantity,
              availability: this.product.availability,
              rating: this.product.rating,
              sold: this.product.sold,
              imglink: filename
            };

            console.log(this.product);
            this.baseService.addProduct(this.product).subscribe(data => {
              console.log(data);
              this.product = {
                name: '',
                price: 0.00,
                discount: 0.00,
                description: '',
                category: '',
                quantity: 0,
                availability: 0,
                rating: 0,
                sold: 0,
                imglink: ''
              };

              this.imageChangedEvent = '';
              this.croppedImage = '';
              this.isChecked = false;
            });
          }
        }
      });
    }

dataURItoBlob(dataURI): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI
      .split(',')[0]
      .split(':')[1]
      .split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  check(event){
    if(event === 'price') {
      if (isNaN(this.product.price)) {
        this.isPriceNumber = true;
        console.log('true' );
      } else {
        this.isPriceNumber = false;
        console.log('false');
      }
    }
    if (event === 'disc') {
      if (isNaN(this.product.discount)) {
        this.isDiscountNumber = true;
        console.log('true');
      } else {
        this.isDiscountNumber = false;
        console.log('false');
      }
    }
    if (event === 'quantity') {
      if (isNaN(this.product.quantity)) {
        this.isQuantityNumber = true;
        console.log('true');
      } else {
        this.isQuantityNumber = false;
        console.log('false');
      }
    }
  }
}
