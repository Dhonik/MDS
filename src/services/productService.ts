import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { VEGETABLE_CATEGORIES, FRUIT_CATEGORIES, ProductCategory } from '../data/products';

export interface ProductModel {
  id: string;
  name: string;
  category: string;
  type: 'vegetable' | 'fruit';
  description: string | null;
  price: number | null;
  unit: string;
  image_url: string | null;
  is_available: boolean;
  store_id: string | null;
  created_at?: string;
  // Local fallback metadata
  examples?: string;
  highlight?: string;
}

function mapLocalCategoryToProduct(cat: ProductCategory): ProductModel {
  return {
    id: cat.id,
    name: cat.name,
    category: cat.name,
    type: cat.type,
    description: cat.shortDesc,
    price: null,
    unit: 'kg',
    image_url: cat.imageUrl || null,
    is_available: true,
    store_id: null,
    examples: cat.examples,
    highlight: cat.highlight,
  };
}

export async function fetchProducts(type?: 'vegetable' | 'fruit', storeId?: string): Promise<ProductModel[]> {
  if (!isSupabaseConfigured) {
    if (type === 'vegetable') return VEGETABLE_CATEGORIES.map(mapLocalCategoryToProduct);
    if (type === 'fruit') return FRUIT_CATEGORIES.map(mapLocalCategoryToProduct);
    return [
      ...VEGETABLE_CATEGORIES.map(mapLocalCategoryToProduct),
      ...FRUIT_CATEGORIES.map(mapLocalCategoryToProduct),
    ];
  }

  try {
    let query = supabase
      .from('products')
      .select('*')
      .eq('is_available', true)
      .order('created_at', { ascending: true });

    if (type) {
      query = query.eq('type', type);
    }
    if (storeId) {
      query = query.or(`store_id.eq.${storeId},store_id.is.null`);
    }

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      if (type === 'vegetable') return VEGETABLE_CATEGORIES.map(mapLocalCategoryToProduct);
      if (type === 'fruit') return FRUIT_CATEGORIES.map(mapLocalCategoryToProduct);
      return [
        ...VEGETABLE_CATEGORIES.map(mapLocalCategoryToProduct),
        ...FRUIT_CATEGORIES.map(mapLocalCategoryToProduct),
      ];
    }

    return data;
  } catch (err) {
    console.error('Error fetching products:', err);
    if (type === 'vegetable') return VEGETABLE_CATEGORIES.map(mapLocalCategoryToProduct);
    if (type === 'fruit') return FRUIT_CATEGORIES.map(mapLocalCategoryToProduct);
    return [];
  }
}

export async function adminFetchAllProducts(): Promise<ProductModel[]> {
  if (!isSupabaseConfigured) {
    return [
      ...VEGETABLE_CATEGORIES.map(mapLocalCategoryToProduct),
      ...FRUIT_CATEGORIES.map(mapLocalCategoryToProduct),
    ];
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function adminSaveProduct(productData: Partial<ProductModel>): Promise<ProductModel> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured.');
  }

  if (productData.id && !productData.id.startsWith('local-')) {
    const { data, error } = await supabase
      .from('products')
      .update({
        name: productData.name,
        category: productData.category,
        type: productData.type,
        description: productData.description,
        price: productData.price,
        unit: productData.unit || 'kg',
        image_url: productData.image_url,
        is_available: productData.is_available ?? true,
        store_id: productData.store_id || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', productData.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from('products')
      .insert([{
        name: productData.name,
        category: productData.category || 'General Produce',
        type: productData.type || 'vegetable',
        description: productData.description,
        price: productData.price,
        unit: productData.unit || 'kg',
        image_url: productData.image_url,
        is_available: productData.is_available ?? true,
        store_id: productData.store_id || null,
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

export async function adminDeleteProduct(id: string): Promise<void> {
  if (!isSupabaseConfigured) return;
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
}
