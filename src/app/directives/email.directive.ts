import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appEmail]'
})
export class EmailDirective {

  constructor(private element: ElementRef, private control: NgControl) { }
  @HostListener('focus') onFocus() {
    this.element.nativeElement.classList.add('bg-light');
  }
  @HostListener('blur') onBlur() {
    this.element.nativeElement.classList.add('bg-light');
    let value: string = this.element.nativeElement.value;

    if (!value.includes('@')) {
      this.element.nativeElement.value = value + "@gmail.com"
      this.element.nativeElement.formControl = value + "@gmail.com";
      this.control.control.setValue(value + "@gmail.com");

    }
  }


}
