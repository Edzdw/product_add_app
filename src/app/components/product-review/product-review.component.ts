// product-review.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ICBProduct } from '../../models/icb-product';

interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  title: string;
  comment: string;
}

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.css']
})
export class ProductReviewComponent implements OnInit {
  product!: ICBProduct | undefined;
  reviews: Review[] = [];

  // Các nhóm chọn
  priceTypes = ['Retail', 'Agency', 'Wholesale'];
  cupTypes = ['Cơ bản', 'Tiêu chuẩn', 'Cao cấp'];
  cupSizes = ['390ml', '500ml', '750ml', '1000ml'];

  // Trạng thái chọn
  selectedPriceType: string = 'Retail';
  selectedCupType: string = 'Tiêu chuẩn';
  selectedCupSize: string = '500ml';

  // ⭐ Form nhập review
  newRating: number = 0;
  newName: string = '';
  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getProductById(productId);

    // Review mẫu
    this.reviews = [
      {
        id: 1,
        name: 'Mark Edwards',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 5,
        title: 'Sản phẩm tuyệt vời!',
        comment:
          'Chất lượng vượt mong đợi. Giao hàng nhanh, đóng gói chắc chắn.'
      },
      {
        id: 2,
        name: 'Blake Reid',
        avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
        rating: 4,
        title: 'Ổn định, giá hợp lý',
        comment: 'Giá phù hợp, chất lượng tốt. Sẽ mua lại lần sau.'
      }
    ];
  }

  // ✅ Xử lý form gửi review
  submitReview() {
    if (!this.newRating || !this.newName.trim() || !this.newComment.trim()) {
      alert('Vui lòng nhập đầy đủ thông tin và chọn số sao!');
      return;
    }

    const newReview: Review = {
      id: this.reviews.length + 1,
      name: this.newName.trim(),
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        this.newName
      )}`,
      rating: this.newRating,
      title: 'Người dùng đánh giá',
      comment: this.newComment.trim()
    };

    this.reviews.unshift(newReview); // thêm lên đầu danh sách
    this.newRating = 0;
    this.newName = '';
    this.newComment = '';
  }

  // ⭐ chọn số sao
  setRating(stars: number) {
    this.newRating = stars;
  }

  // Các hàm còn lại giữ nguyên
  selectPriceType(type: string) {
    if (!this.isPriceAvailable(type)) return;
    this.selectedPriceType = type;
  }

  isPriceAvailable(type: string): boolean {
    if (!this.product) return false;
    switch (type) {
      case 'Agency': return !!this.product.agentPrice && this.product.agentPrice > 0;
      case 'Wholesale': return !!this.product.wholesalePrice && this.product.wholesalePrice > 0;
      default: return !!this.product.retailPrice && this.product.retailPrice > 0;
    }
  }

  getDisplayedPrice(): number {
    if (!this.product) return 0;
    switch (this.selectedPriceType) {
      case 'Agency': return this.product.agentPrice || 0;
      case 'Wholesale': return this.product.wholesalePrice || 0;
      default: return this.product.retailPrice || 0;
    }
  }

  selectCupType(type: string) { this.selectedCupType = type; }
  selectCupSize(size: string) { this.selectedCupSize = size; }
  getStars(rating: number) { return Array(5).fill(0).map((_, i) => i < rating); }
}
