import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/categoryService/category.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];
  currentCategory: Category = null;

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.data;
    });
  }

  setCurrentCategory(category: Category) {
    this.currentCategory = category;
    this.getAllCurrentCategoryClass();
  }

  getCurrentCategoryClass(category: Category) {
    if (category === this.currentCategory) {

      return "list-group-item bg-light text-color-dark";
    }
    else {
      return "list-group-item bg-dark text-color-white";
    }
  }

  setAllCategoryClass() {
    this.currentCategory = null;

  }
  getAllCurrentCategoryClass() {
    if (this.currentCategory === null) {
      return "list-group-item bg-light text-color-dark";
    }

    return "list-group-item bg-dark text-color-white";


  }


}
