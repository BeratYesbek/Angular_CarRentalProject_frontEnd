import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brandService/brand.service';
import { ColorService } from 'src/app/services/colorService/color.service';

@Component({
  selector: 'app-brand-color-manager',
  templateUrl: './brand-color-manager.component.html',
  styleUrls: ['./brand-color-manager.component.css']
})
export class BrandColorManagerComponent implements OnInit {




  constructor(

  ) { }

  ngOnInit(): void {
  }





}
