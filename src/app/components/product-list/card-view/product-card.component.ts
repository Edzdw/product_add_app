import { Component, Input } from '@angular/core';
import { ICBProduct } from '../../../models/icb-product';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
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

  // 👇 Khi bấm Review → chuyển trang
  onReview(p: ICBProduct) {
    this.router.navigate(['/products', p.product_id, 'reviews']);
  }
}
