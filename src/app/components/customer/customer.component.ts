import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customerService/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  closeResult = '';

  selectedCustomer: Customer;
  customerAddForm: FormGroup;
  customerUpdateForm: FormGroup;


  customers: Customer[] = [];
  selectedIndex: number;
  selectedBrand = '';

  constructor(
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.getCustomers();
    this.createCustomerAddForm();
    this.createCustomerUpdateForm();
  }

  createCustomerUpdateForm() {

    this.customerAddForm = this.formBuilder.group({
      userId: ["", Validators.required],
      companyName: ["", Validators.required]
    });
  }

  createCustomerAddForm() {

    this.customerUpdateForm = this.formBuilder.group({
      userId: ["", Validators.required],
      companyName: ["", Validators.required]
    });
  }

  getCustomers() {
    this.customerService.getAll().subscribe(response => {
      this.customers = response.data;
    });
  }
  updateCustomer() {
    let customerModule = Object.assign({}, this.customerUpdateForm.value);
    customerModule.customerId = this.selectedCustomer.customerId;
    console.log(customerModule);
    if (this.customerUpdateForm.valid) {
      this.customerService.update(customerModule).subscribe(response => {
        if (response.success) {
          this.toastrService.success("Customer was updated successfully", "Success");
          this.getCustomers();
        } else {
          this.toastrService.error(response.message, "Error");
        }
      });
    } else {
      this.toastrService.error('Invalid Argument', 'Error');
    }
  }
  delete(customer: Customer) {
    this.customerService.delete(customer).subscribe(response => {
      if (response.success) {
        this.toastrService.success("Customer was deleted successfully", "Success");
        this.getCustomers();
      } else {
        this.toastrService.error(response.message, "Error");
      }
    });
  }


  addCustomer() {
    let customerModule = Object.assign({}, this.customerAddForm.value);
    console.log(customerModule);
    if (this.customerAddForm.valid) {
      this.customerService.add(customerModule).subscribe(response => {
        if (response.success) {
          this.toastrService.success("Customer was added successfully", "Success");
        } else {
          this.toastrService.error(response.message, "Error");
        }
      })
    }
  }



  openAddModule(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openUpdateModule(content, index: number) {
    this.selectedCustomer = this.customers[index];

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
