import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/Car';
import { HttpClient } from '@angular/common/http';
import { Brand } from 'src/app/models/brand';
import { CartItem } from 'src/app/models/cartItem';

import { CarService } from 'src/app/services/carService/car.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cartService/cart.service';
import { BrandService } from 'src/app/services/brandService/brand.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CarDetailModel } from 'src/app/models/carDetailModel'
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { CustomerService } from 'src/app/services/customerService/customer.service';
import { NgxImgZoomService } from 'ngx-img-zoom';
@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {


  cartItem: CartItem[] = [];
  carDetails: CarDetailModel[] = [];
  brands: Brand[] = [];

  selectedItem: number;
  text: string;
  dataLoaded = false;
  filterText = ""
  control = false;
  index: number;
  closeResult = '';
  userId: number;
  totalCartItem: number;


  imageBasePath: 'https://localhost:44348';
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private cartService: CartService,
    private brandService: BrandService,
    private modalService: NgbModal,
    private localStorageService: LocalStorageService,
    private customerService: CustomerService,

  ) {

  }

  ngOnInit(): void {
    this.getBrand();
    this.getCartItem();
    this.activatedRoute.params.subscribe(params => {

      if (params["categoryId"]) {
        this.getCarByCategory(params["categoryId"]);
      }

      else if (params["colorId"]) {
        this.getCarByColor(params["colorId"]);
      }
      else {
        this.getCarDetails();

      }
    });
  }

  getCartItem() {
    const userId = this.localStorageService.getUserIdItem();
    this.cartService.getToDataBase(userId).subscribe(response => {
      this.totalCartItem = response.data.length;
    });
  }

  getCarDetails() {
    this.carService.getCarDetail().subscribe(response => {
      this.carDetails = response.data;
      this.dataLoaded = true;
      this.isRental();


    });
  }
  isRental() {
    const dateNow = Date.now();
    for (let i = 0; i < this.carDetails.length; i++) {

      for (let j = 0; j < this.carDetails[i].rentals.length; j++) {
        const returnDate = this.carDetails[i].rentals[j].returnDate.toString();

        if (Date.parse(returnDate) > dateNow) {
          this.carDetails[i].isRented = true;
        }

      }
    }
  }


  onSelected(val: any) {
    this.customFunction(val);
  }

  customFunction(val: any) {

    if (val === '0') {
      this.getCarDetails();
    } else {


      this.getCarByBrand(val);

    }
  }

  getCarByBrand(brandId: number) {

    this.dataLoaded = false;

    this.carService.getByBrand(brandId).subscribe(response => {
      this.carDetails = response.data;
      this.isRental();

      this.dataLoaded = true;
    });

  }


  getCarByCategory(categoryId: number) {
    this.dataLoaded = false;
    this.carService.getByCategory(categoryId).subscribe(response => {
      this.carDetails = response.data;
      this.isRental();

      this.dataLoaded = true;
    });
  }



  getCarByColor(colorId: number) {
    this.dataLoaded = false;
    this.carService.getByColor(colorId).subscribe(response => {
      this.carDetails = response.data;
      this.dataLoaded = true;

      this.isRental();


    });
  }

  checkCustomerAndFindeksPoint(car: Car) {
    const userId = this.localStorageService.getUserIdItem();
    this.customerService.getById(userId).subscribe(response => {
      if (response.success) {
        if (response.data.findeksScore >= car.findeksScore) {
          this.addToCart(car);
        } else {
          this.toastrService.info('Unfortunately your findeks score not enough for this car', 'Info');
        }
      } else {
        this.toastrService.info('You are not a customer. please go to the settings menu and make customer application', 'Info');
      }
    }, responseError => {
      this.toastrService.info('You are not a customer. please go to the settings menu and make customer application', 'Info');

    });
  }

  addToCart(car: Car) {
    if (this.totalCartItem != null || this.totalCartItem > 0) {
      this.toastrService.error("Your cart has one item you cannot add more item", "Error")
    } else {
      this.toastrService.success("Added to cart");
      this.cartService.addToCart(car);
      setTimeout(() => {
        window.location.reload();
      }, 100);
      this.userId = this.localStorageService.getUserIdItem();

      this.cartItem = [{ cartItemId: 0, carId: car.carId, userId: this.userId }]
      this.cartService.addToDataBase(this.cartItem[0]).subscribe(respone => {

      });
    }

  }

  getBrand() {
    this.brandService.getBrand().subscribe(response => {
      this.brands = response.data;
      this.brands.push({ brandId: 0, brandName: "All" });

      this.selectedItem = 0;
    });
  }

  setClass() {
    this.control = true;
  }

  getClass() {
    if (this.control) {
      return 'display:block';
    }
  }



  /*Bootstrap modal*/
  open(content, i) {
    this.index = i;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}
