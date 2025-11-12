import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ICBProduct } from '../../models/icb-product';

/**
 * ProductFormComponent provides a reactive form for creating and updating
 * products. The form includes fields defined by the ICBProduct interface
 * including basic details, pricing, packaging and classification metadata.
 * When editing an existing product the component pre-populates the form with
 * saved values. On submission the service is used to persist the changes.
 */
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  isEdit = false;
  productId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // Initialize the form with a control for every field. Validators are applied
    // to required fields and numeric values. Many fields are optional and thus
    // have no validators attached.
    this.productForm = this.fb.group({
      product_id: [0],
      product_code: ['', Validators.required],
      product_name: ['', Validators.required],
      product_description: [''],
      product_type: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      order_quantity: [0, [Validators.min(0)]],
      price_apply: [0],
      sub_total: [0],
      agentPromotion: [''],
      wholesalePromotion: [''],
      retailPromotion: [''],
      agentDiscountedPrice: [0],
      wholesaleDiscountedPrice: [0],
      retailDiscountedPrice: [0],
      quantity_per_packaging: [0],
      selectedQuantityType: [''],
      pricing_policy: [''],
      agentPrice: [0],
      wholesalePrice: [0],
      retailPrice: [0],
      is_deleted: [0],
      // Optional fields for dimensions
      length: [null],
      width: [null],
      height: [null],
      weight: [null],
      product_volume: [null],
      box_length: [null],
      box_width: [null],
      box_height: [null],
      box_weight: [null],
      // Classification
      category_id: [null],
      category_name: [''],
      material_type: [''],
      tag: [''],
      // UOM
      uom_id: [null],
      standard_uom: [''],
      uom_name: [''],
      max_coefficient: [null],
      packaging_instruction: [''],
      // Pricing & Financials
      cost: [null],
      tax_rate: [null],
      discount_rate: [null],
      buying_price: [null],
      // Inventory
      stock_quantity: [null],
      // Media
      product_image: [''],
      // Performance / Metrics
      total_sales: [null],
      // System Metadata
      is_active: [true],
    });

    // Determine if this form is being used to edit an existing product. When
    // editing, the route will contain an id parameter. Use it to prepopulate
    // the form with the stored product values.
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEdit = true;
        this.productId = Number(idParam);
        const existing = this.productService.getProductById(this.productId);
        if (existing) {
          // Patch only the fields present on the form. Spread operator used
          // ensures we don't mutate the stored object inadvertently.
          this.productForm.patchValue({ ...existing });
        }
      }
    });

    // Automatically update price_apply and sub_total when price or order quantity
    // changes. price_apply is synchronised with price and sub_total is the
    // product of price and order_quantity. emitEvent:false prevents an update
    // loop when patching values.
    this.productForm.get('price')?.valueChanges.subscribe((price) => {
      const parsedPrice = Number(price) || 0;
      // Mirror price into price_apply
      this.productForm.patchValue({ price_apply: parsedPrice }, { emitEvent: false });
      // Compute sub_total based on order quantity
      const qty = Number(this.productForm.get('order_quantity')?.value) || 0;
      this.productForm.patchValue({ sub_total: parsedPrice * qty }, { emitEvent: false });
    });
    this.productForm.get('order_quantity')?.valueChanges.subscribe((qty) => {
      const quantity = Number(qty) || 0;
      const price = Number(this.productForm.get('price')?.value) || 0;
      this.productForm.patchValue({ sub_total: price * quantity }, { emitEvent: false });
    });
  }

  /**
   * Handle form submission. If the form is invalid the submission is aborted.
   * For a new product the service assigns an id automatically. For edits the
   * id is preserved. After saving the user is redirected to the list view.
   */
onSubmit() {
  if (this.productForm.invalid) return;

  const product: ICBProduct = this.productForm.value;

  if (this.isEdit && this.productId) {
    // ✅ chỉ truyền 1 tham số
    product.product_id = this.productId;
    this.productService.updateProduct(product);
  } else {
    // ✅ chỉ truyền 1 tham số
    this.productService.addProduct(product);
  }

  // sau khi lưu, quay lại danh sách
  this.router.navigate(['/products']);
}

  /**
   * Navigate back to the list without saving.
   */
  cancel(): void {
    this.router.navigate(['/products']);
  }
}