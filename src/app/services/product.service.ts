// CRUD Service cho toàn bộ dự án


import { Injectable } from '@angular/core';
import { ICBProduct } from '../models/icb-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private storageKey = 'icb-products';
  private mockProducts: ICBProduct[] = [
    {
      product_id: 125802,
      product_code: 'SP001',
      product_name: 'Cà phê Arabica',
      product_description: 'Hạt cà phê nguyên chất 100%',
      product_type: 'item',
      product_image: 'https://source.unsplash.com/100x100/?coffee',
      price: 120000,
      order_quantity: 100,
      price_apply: 120000,
      sub_total: 12000000,
      agentPromotion: '',
      wholesalePromotion: '',
      retailPromotion: '',
      agentDiscountedPrice: 0,
      wholesaleDiscountedPrice: 0,
      retailDiscountedPrice: 0,
      quantity_per_packaging: 1,
      selectedQuantityType: 'pcs',
      pricing_policy: 'retail',
      agentPrice: 0,
      wholesalePrice: 0,
      retailPrice: 120000,
      is_deleted: 0
    },
    {
      product_id: 225802,
      product_code: 'SP002',
      product_name: 'Trà Ô Long',
      product_description: 'Trà cao cấp vùng Bảo Lộc',
      product_type: 'item',
      product_image: 'https://source.unsplash.com/100x100/?coffee',
      price: 95000,
      order_quantity: 80,
      price_apply: 95000,
      sub_total: 7600000,
      agentPromotion: '',
      wholesalePromotion: '',
      retailPromotion: '',
      agentDiscountedPrice: 0,
      wholesaleDiscountedPrice: 0,
      retailDiscountedPrice: 0,
      quantity_per_packaging: 1,
      selectedQuantityType: 'pcs',
      pricing_policy: 'retail',
      agentPrice: 0,
      wholesalePrice: 0,
      retailPrice: 95000,
      is_deleted: 0
    },
    {
      product_id: 325802,
      product_code: 'SP003',
      product_name: 'Nước ép Cam Sành',
      product_description: 'Nước ép 100% nguyên chất',
      product_type: 'item',
      product_image: 'https://source.unsplash.com/100x100/?coffee',
      price: 45000,
      order_quantity: 200,
      price_apply: 45000,
      sub_total: 9000000,
      agentPromotion: '',
      wholesalePromotion: '',
      retailPromotion: '',
      agentDiscountedPrice: 0,
      wholesaleDiscountedPrice: 0,
      retailDiscountedPrice: 0,
      quantity_per_packaging: 1,
      selectedQuantityType: 'pcs',
      pricing_policy: 'retail',
      agentPrice: 0,
      wholesalePrice: 0,
      retailPrice: 45000,
      is_deleted: 0
    },
    {
      product_id: 425802,
      product_code: 'SP004',
      product_name: 'Hạt điều rang muối',
      product_description: 'Sản phẩm OCOP Bình Phước',
      product_type: 'item',
      product_image: 'https://source.unsplash.com/100x100/?coffee',
      price: 180000,
      order_quantity: 60,
      price_apply: 180000,
      sub_total: 10800000,
      agentPromotion: '',
      wholesalePromotion: '',
      retailPromotion: '',
      agentDiscountedPrice: 0,
      wholesaleDiscountedPrice: 0,
      retailDiscountedPrice: 0,
      quantity_per_packaging: 1,
      selectedQuantityType: 'pcs',
      pricing_policy: 'retail',
      agentPrice: 0,
      wholesalePrice: 0,
      retailPrice: 180000,
      is_deleted: 0
    },
    {
      product_id: 525802,
      product_code: 'SP005',
      product_name: 'Mật ong rừng',
      product_description: 'Nguyên chất 100%, không pha tạp',
      product_type: 'item',
      product_image: 'https://source.unsplash.com/100x100/?coffee',
      price: 220000,
      order_quantity: 50,
      price_apply: 220000,
      sub_total: 11000000,
      agentPromotion: '',
      wholesalePromotion: '',
      retailPromotion: '',
      agentDiscountedPrice: 0,
      wholesaleDiscountedPrice: 0,
      retailDiscountedPrice: 0,
      quantity_per_packaging: 1,
      selectedQuantityType: 'pcs',
      pricing_policy: 'retail',
      agentPrice: 0,
      wholesalePrice: 0,
      retailPrice: 220000,
      is_deleted: 0
    },
    {
      product_id: 258026,
      product_code: 'SP006',
      product_name: 'Socola Đen 70%',
      product_description: 'Socola thủ công từ hạt cacao Việt Nam',
      product_image: 'https://source.unsplash.com/100x100/?coffee',
      product_type: 'item',
      price: 135000,
      order_quantity: 70,
      price_apply: 135000,
      sub_total: 9450000,
      agentPromotion: '',
      wholesalePromotion: '',
      retailPromotion: '',
      agentDiscountedPrice: 0,
      wholesaleDiscountedPrice: 0,
      retailDiscountedPrice: 0,
      quantity_per_packaging: 1,
      selectedQuantityType: 'pcs',
      pricing_policy: 'retail',
      agentPrice: 0,
      wholesalePrice: 0,
      retailPrice: 135000,
      is_deleted: 0
    },
    {
      product_id: 725802,
      product_code: 'SP007',
      product_name: 'Muối Hồng Himalaya',
      product_description: 'Dạng hạt mịn, dùng nấu ăn & spa',
      product_image: 'https://source.unsplash.com/100x100/?coffee',
      product_type: 'item',
      price: 60000,
      order_quantity: 150,
      price_apply: 60000,
      sub_total: 9000000,
      agentPromotion: '',
      wholesalePromotion: '',
      retailPromotion: '',
      agentDiscountedPrice: 0,
      wholesaleDiscountedPrice: 0,
      retailDiscountedPrice: 0,
      quantity_per_packaging: 1,
      selectedQuantityType: 'pcs',
      pricing_policy: 'retail',
      agentPrice: 0,
      wholesalePrice: 0,
      retailPrice: 60000,
      is_deleted: 0
    },
    {
      product_id: 258028,
      product_code: 'SP008',
      product_name: 'Gạo Lứt Đỏ',
      product_description: 'Sản phẩm hữu cơ VietGAP',
      product_image: 'https://source.unsplash.com/100x100/?coffee',
      product_type: 'item',
      price: 32000,
      order_quantity: 400,
      price_apply: 32000,
      sub_total: 12800000,
      agentPromotion: '',
      wholesalePromotion: '',
      retailPromotion: '',
      agentDiscountedPrice: 0,
      wholesaleDiscountedPrice: 0,
      retailDiscountedPrice: 0,
      quantity_per_packaging: 1,
      selectedQuantityType: 'pcs',
      pricing_policy: 'retail',
      agentPrice: 0,
      wholesalePrice: 0,
      retailPrice: 32000,
      is_deleted: 0
    },
    {
      product_id: 258029,
      product_code: 'SP009',
      product_name: 'Bột nghệ nguyên chất',
      product_description: 'Từ củ nghệ vàng Tây Nguyên',
      product_image: 'https://source.unsplash.com/100x100/?coffee',
      product_type: 'item',
      price: 85000,
      order_quantity: 100,
      price_apply: 85000,
      sub_total: 8500000,
      agentPromotion: '',
      wholesalePromotion: '',
      retailPromotion: '',
      agentDiscountedPrice: 0,
      wholesaleDiscountedPrice: 0,
      retailDiscountedPrice: 0,
      quantity_per_packaging: 1,
      selectedQuantityType: 'pcs',
      pricing_policy: 'retail',
      agentPrice: 0,
      wholesalePrice: 0,
      retailPrice: 85000,
      is_deleted: 0
    },
    {
      product_id: 125802,
      product_code: 'SP010',
      product_name: 'Yến mạch nhập khẩu',
      product_description: 'Loại nguyên hạt, tốt cho sức khỏe',
      product_image: 'https://source.unsplash.com/100x100/?coffee',
      product_type: 'item',
      price: 98000,
      order_quantity: 120,
      price_apply: 98000,
      sub_total: 11760000,
      agentPromotion: '',
      wholesalePromotion: '',
      retailPromotion: '',
      agentDiscountedPrice: 0,
      wholesaleDiscountedPrice: 0,
      retailDiscountedPrice: 0,
      quantity_per_packaging: 1,
      selectedQuantityType: 'pcs',
      pricing_policy: 'retail',
      agentPrice: 0,
      wholesalePrice: 0,
      retailPrice: 98000,
      is_deleted: 0
    }
  ];

  constructor() {
    // nạp mock data nếu localStorage trống
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.mockProducts));
    }
  }

    getProducts(): ICBProduct[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : this.mockProducts
    // return this.mockProducts
  }

  getProductById(id: number): ICBProduct | undefined {
    return this.getProducts().find(p => p.product_id === id);
  }

addProduct(product: ICBProduct) {
  const products = this.getProducts();

  // Tìm ID lớn nhất hiện có (nếu mảng trống thì maxId = 0)
  const maxId = products.reduce((max, p) => {
    return p.product_id > max ? p.product_id : max;
  }, 0);

  product.product_id = maxId + 1;
  products.push(product);

  localStorage.setItem(this.storageKey, JSON.stringify(products));
}


  updateProduct(product: ICBProduct) {
    const products = this.getProducts().map(p =>
      p.product_id === product.product_id ? product : p
    );
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  deleteProduct(id: number) {
    const products = this.getProducts().filter(p => p.product_id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }
}
