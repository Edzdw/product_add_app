import { Component, Input } from '@angular/core';
import { ICBProduct } from '../../../models/icb-product';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent {
  @Input() products: ICBProduct[] = [];

  constructor(
    private router: Router,
    private productService: ProductService
  ) {}

  onEdit(p: ICBProduct) {
    this.router.navigate(['/products', p.product_id, 'edit']);
  }

  onDelete(id: number) {
    if (confirm('Bạn có chắc muốn xoá sản phẩm này không?')) {
      this.productService.deleteProduct(id);
      this.products = this.productService.getProducts();
    }
  }
}
