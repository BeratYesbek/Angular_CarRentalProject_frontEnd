import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { RentalModel } from 'src/app/models/rentalModel';
import { PaymentService } from 'src/app/services/paymentService/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment-rental-list-operation',
  templateUrl: './payment-rental-list-operation.component.html',
  styleUrls: ['./payment-rental-list-operation.component.css']
})
export class PaymentRentalListOperationComponent implements OnInit {

  payments: Payment[];
  rentals: RentalModel[];
  constructor(
    private paymentService: PaymentService,
    private rentalService: RentalService,
  ) { }

  ngOnInit(): void {
    this.getRentals();
    this.getPayments();
  }

  getRentals() {
    this.rentalService.getAllDetails().subscribe(response => {
      this.rentals = response.data;
    });
  }

  getPayments() {
    this.paymentService.getAll().subscribe(response => {
      this.payments = response.data;
    });
  }

}
