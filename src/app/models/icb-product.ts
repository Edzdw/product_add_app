// This interface defines the shape of a product record in the system. It is
// directly based on the ICBProduct structure provided by the user. Many fields
// are optional to reflect that they may not always be present.

export interface ICBProduct {
  order_quantity: number;
  price_apply: number;
  sub_total: number;
  agentPromotion: string;
  wholesalePromotion: string;
  retailPromotion: string;
  agentDiscountedPrice: number;
  wholesaleDiscountedPrice: number;
  retailDiscountedPrice: number;
  quantity_per_packaging: number;
  selectedQuantityType: string;
  pricing_policy: string;
  agentPrice: number;
  wholesalePrice: number;
  retailPrice: number;
  is_deleted: number;
  // Basic Product Info
  product_id: number;
  product_code: string;
  product_name: string;
  product_description?: string;
  product_type: string;
  is_active?: boolean;
  // Dimensions
  length?: number;
  width?: number;
  height?: number;
  weight?: number;
  product_volume?: number;
  // Box / Packaging
  box_length?: number;
  box_width?: number;
  box_height?: number;
  box_weight?: number;
  // Classification
  category_id?: number;
  category_name?: string;
  material_type?: string;
  tag?: string;
  // UOM
  uom_id?: number;
  standard_uom?: string;
  uom_name?: string;
  max_coefficient?: number;
  packaging_instruction?: string;
  // Pricing & Financials
  price: number;
  cost?: number;
  tax_rate?: number;
  discount_rate?: number;
  buying_price?: number;
  // Inventory
  stock_quantity?: number;
  // Media
  product_image?: string;
  // Performance / Metrics
  total_sales?: number;
  // System Metadata
  created_at?: Date;
  updated_at?: Date;
  // Extension point for variants, attributes, etc.
  attributes?: any;
}