export interface IDrugCategoryItem {
  id: any;
  name: string;
  icon: string;
  drugName: string;
  createdAt: number;
  updatedAt: number;
  is_active: string;
  subcategory: IDrugSubcategoryItem[];
}

export interface IDrugSubcategoryItem {
  id: any;
  name: string;
  icon: string;
  category_id: number;
  createdAt: number;
  updatedAt: number;
}

export interface IDrugCategoryDetail {
  id: any;
  icon: string;
  name: string;
  createdAt: number;
  deletedAt: number;
  updatedAt: number;
  is_active: boolean;
}
