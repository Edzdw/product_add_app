import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ICBProduct } from '../../models/icb-product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: ICBProduct[] = [];
  /**
   * Tracks the current view mode for the product list. "table" shows a
   * traditional tabular layout while "card" renders each product as a card.
   */
  viewMode: 'table' | 'card' = 'card';

  /**
   * Two‑way bound search string used to filter the list of products. Both the
   * product code and name are matched case‑insensitively. When empty, all
   * products are displayed.
   */
  searchQuery: string = '';

  /**
   * Current field used for sorting the results. Defaults to sorting by
   * product_name. Other supported values are 'price' to sort by the
   * effective retailPrice and 'order' to sort by order_quantity. Sorting is
   * applied after filtering.
   */
  sortField: 'name' | 'price' | 'order' = 'name';

  /**
   * Current sort order. 'asc' for ascending or 'desc' for descending.
   */
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.products = this.productService.getProducts();
  }

  /**
   * Returns the array of products filtered by the current search query. If
   * no search term is provided the full list is returned. This getter is
   * leveraged in the template to keep filtering logic in the component class
   * and avoid duplicating pipe code in the template.
   */
  get filteredProducts(): ICBProduct[] {
    if (!this.searchQuery) {
      return this.sortProducts(this.products);
    }
    const term = this.searchQuery.toLowerCase();
    const filtered = this.products.filter((p) => {
      return (
        p.product_name?.toLowerCase().includes(term) ||
        p.product_code?.toLowerCase().includes(term)
      );
    });
    return this.sortProducts(filtered);
  }

  /**
   * Sorts the provided array of products based on the current sortField and
   * sortOrder settings. A new array is returned to avoid mutating the
   * original input.
   */
  private sortProducts(list: ICBProduct[]): ICBProduct[] {
    return [...list].sort((a, b) => {
      let aVal: number | string | undefined;
      let bVal: number | string | undefined;
      switch (this.sortField) {
        case 'price':
          // fall back to price if retailPrice is not available
          aVal = a.retailPrice ?? a.price;
          bVal = b.retailPrice ?? b.price;
          break;
        case 'order':
          aVal = a.order_quantity;
          bVal = b.order_quantity;
          break;
        default:
          // sort by name
          aVal = a.product_name?.toLowerCase() || '';
          bVal = b.product_name?.toLowerCase() || '';
      }
      if (aVal === undefined || bVal === undefined) return 0;
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        if (this.sortOrder === 'asc') {
          return aVal.localeCompare(bVal);
        } else {
          return bVal.localeCompare(aVal);
        }
      }
      // numeric comparison
      const numA = Number(aVal);
      const numB = Number(bVal);
      if (isNaN(numA) || isNaN(numB)) return 0;
      return this.sortOrder === 'asc' ? numA - numB : numB - numA;
    });
  }

  setViewMode(mode: 'table' | 'card') {
    this.viewMode = mode;
  }

  onEdit(product: ICBProduct) {
    this.router.navigate(['/products', product.product_id, 'edit']);
  }

  onDelete(id: number) {
    this.productService.deleteProduct(id);
    this.products = this.productService.getProducts();
  }

  onReview(product: ICBProduct) {
    // Route to the product review page. Note the path is 'reviews' to match
    // the definition in the AppRoutingModule.
    this.router.navigate(['/products', product.product_id, 'reviews']);
  }
}
