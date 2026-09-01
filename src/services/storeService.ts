import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { STORES_DATA, Store as LocalStore } from '../data/stores';

export interface StoreModel {
  id: string;
  slug: string;
  name: string;
  type: string;
  location: string;
  description: string | null;
  address: string | null;
  phone: string | null;
  alt_phone?: string | null;
  whatsapp: string | null;
  map_url: string | null;
  embed_map_url?: string | null;
  opening_hours: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at?: string;
  // UI helpers
  number?: string;
  badge?: string;
  tagline?: string;
}

export function mapLocalStoreToModel(s: LocalStore): StoreModel {
  return {
    id: s.id,
    slug: s.slug,
    name: s.name,
    type: s.category,
    location: s.subLocation,
    description: s.description,
    address: s.address.startsWith('STORE_') ? null : s.address,
    phone: s.phone,
    alt_phone: s.altPhone || null,
    whatsapp: s.whatsapp,
    map_url: s.mapUrl.startsWith('STORE_') ? null : s.mapUrl,
    embed_map_url: s.embedMapUrl || null,
    opening_hours: s.openingHours.startsWith('ADD_') ? null : s.openingHours,
    image_url: null,
    is_active: true,
    number: s.number,
    badge: s.badge,
    tagline: s.tagline,
  };
}

export async function fetchStores(): Promise<StoreModel[]> {
  if (!isSupabaseConfigured) {
    return STORES_DATA.map(mapLocalStoreToModel);
  }

  try {
    const { data, error } = await supabase
      .from('stores')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: true });

    if (error || !data || data.length === 0) {
      console.warn('Fallback to local stores data:', error?.message);
      return STORES_DATA.map(mapLocalStoreToModel);
    }

    return data.map((item, idx) => ({
      ...item,
      number: `STORE 0${idx + 1}`,
      badge: item.type === 'Fruits' ? 'Dedicated Fruit Specialist' : 'Vegetable Hub',
      tagline: `${item.type} • Retail • Wholesale`,
    }));
  } catch (err) {
    console.error('Error fetching stores:', err);
    return STORES_DATA.map(mapLocalStoreToModel);
  }
}

export async function fetchStoreBySlug(slug: string): Promise<StoreModel | null> {
  if (!isSupabaseConfigured) {
    const local = STORES_DATA.find((s) => s.slug === slug || s.id === slug);
    return local ? mapLocalStoreToModel(local) : null;
  }

  try {
    const { data, error } = await supabase
      .from('stores')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error || !data) {
      const local = STORES_DATA.find((s) => s.slug === slug || s.id === slug);
      return local ? mapLocalStoreToModel(local) : null;
    }

    return {
      ...data,
      number: data.slug === 'thuckalay-market' ? 'STORE 01' : data.slug === 'nagercoil-market' ? 'STORE 02' : 'STORE 03',
      badge: data.type === 'Fruits' ? 'Dedicated Fruit Specialist' : 'Vegetable Hub',
      tagline: `${data.type} • Retail • Wholesale`,
    };
  } catch (err) {
    console.error('Error fetching store by slug:', err);
    const local = STORES_DATA.find((s) => s.slug === slug || s.id === slug);
    return local ? mapLocalStoreToModel(local) : null;
  }
}

export async function adminFetchAllStores(): Promise<StoreModel[]> {
  if (!isSupabaseConfigured) {
    return STORES_DATA.map(mapLocalStoreToModel);
  }

  const { data, error } = await supabase
    .from('stores')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function adminSaveStore(storeData: Partial<StoreModel>): Promise<StoreModel> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Please set credentials in .env');
  }

  if (storeData.id) {
    const { data, error } = await supabase
      .from('stores')
      .update({
        name: storeData.name,
        slug: storeData.slug,
        type: storeData.type,
        location: storeData.location,
        description: storeData.description,
        address: storeData.address,
        phone: storeData.phone,
        alt_phone: storeData.alt_phone,
        whatsapp: storeData.whatsapp,
        map_url: storeData.map_url,
        opening_hours: storeData.opening_hours,
        image_url: storeData.image_url,
        is_active: storeData.is_active,
        updated_at: new Date().toISOString(),
      })
      .eq('id', storeData.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from('stores')
      .insert([{
        name: storeData.name,
        slug: storeData.slug || storeData.name?.toLowerCase().replace(/\s+/g, '-'),
        type: storeData.type || 'Vegetables',
        location: storeData.location,
        description: storeData.description,
        address: storeData.address,
        phone: storeData.phone,
        alt_phone: storeData.alt_phone,
        whatsapp: storeData.whatsapp,
        map_url: storeData.map_url,
        opening_hours: storeData.opening_hours,
        image_url: storeData.image_url,
        is_active: storeData.is_active ?? true,
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
