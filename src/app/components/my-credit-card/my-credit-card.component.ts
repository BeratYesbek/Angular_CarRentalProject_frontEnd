import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditCard';
import { CreditCardService } from 'src/app/services/creditCardService/credit-card.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';

@Component({
  selector: 'app-my-credit-card',
  templateUrl: './my-credit-card.component.html',
  styleUrls: ['./my-credit-card.component.css']
})
export class MyCreditCardComponent implements OnInit {

  creditCards: CreditCard[];
  constructor(
    private creditCardService: CreditCardService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getCreditCard();
  }

  getCreditCard() {
    const userId = this.localStorageService.getUserIdItem();
    this.creditCardService.getCardByUserId(userId).subscribe(response => {
      this.creditCards = response.data;
    });
  }
  removeCreditCard(creditCard: CreditCard) {
    this.creditCardService.delete(creditCard).subscribe(response => {
      if (response.success) {
        this.toastrService.success('Credit card was deleted', 'Success');
      }
    }, responseError => {
      this.toastrService.error('Credit card could not be  deleted', 'Error');

    });
  }

}
