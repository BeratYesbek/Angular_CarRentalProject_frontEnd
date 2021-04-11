export interface Payment {
  paymentId: number;
  fullName: string;
  address: string;
  email: string;
  state: string;
  zip: string;
  cardName: string;
  cardNumber: string;
  expMonth: string;
  expYear: number;
  cvv: number;
  totalPrice: number;
}
