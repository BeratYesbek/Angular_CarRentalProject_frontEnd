import { Component, OnInit } from '@angular/core';
import { CustomerApplication } from 'src/app/models/customerApplicant';
import { CustomerApplicantService } from 'src/app/services/customerApplicantService/customer-applicant.service';

@Component({
  selector: 'app-customer-demand',
  templateUrl: './customer-demand.component.html',
  styleUrls: ['./customer-demand.component.css']
})
export class CustomerDemandComponent implements OnInit {


  customerApplications: CustomerApplication[];

  constructor(
    private customerApplicantService: CustomerApplicantService
  ) { }

  ngOnInit(): void {
    this.getCustomerDemand();
  }

  getCustomerDemand() {
    this.customerApplicantService.getAll().subscribe(response => {
      this.customerApplications = response.data;
      console.log(response);
    });
  }

}
