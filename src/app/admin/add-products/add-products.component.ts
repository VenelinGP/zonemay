import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { BaseService } from '../../_services/base/base.service';
import { IMenu } from '../../_services/base/menu.interface';
import { FormControl } from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {
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
  menu: IMenu[] = [];
  imageChangedEvent: any = '';
  croppedImage: any = '';
  progress: { percentage: number; } = { percentage: 0 };
  isChecked: boolean;

  constructor(private baseService: BaseService) {}

  ngOnInit() {
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
    this.baseService.getMenu().subscribe(data => {
        this.menu = data.message.sort((a, b) => {
          return a.id - b.id;
        });
      });
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
    this.isChecked = true;
  }
  back(){
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
}
