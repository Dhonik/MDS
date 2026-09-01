import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { GALLERY_ITEMS } from '../data/business';

export interface GalleryModel {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string;
  category: string;
  store_id: string | null;
  is_active: boolean;
  created_at?: string;
  placeholder?: string;
}

export async function fetchGalleryItems(category?: string): Promise<GalleryModel[]> {
  if (!isSupabaseConfigured) {
    const localItems = category && category !== 'All'
      ? GALLERY_ITEMS.filter((item) => item.category === category)
      : GALLERY_ITEMS;

    return localItems.map((g) => ({
      id: String(g.id),
      title: g.title,
      description: null,
      image_url: '',
      category: g.category,
      store_id: null,
      is_active: true,
      placeholder: g.placeholder,
    }));
  }

  try {
    let query = supabase
      .from('gallery')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (category && category !== 'All') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      const localItems = category && category !== 'All'
        ? GALLERY_ITEMS.filter((item) => item.category === category)
        : GALLERY_ITEMS;

      return localItems.map((g) => ({
        id: String(g.id),
        title: g.title,
        description: null,
        image_url: '',
        category: g.category,
        store_id: null,
        is_active: true,
        placeholder: g.placeholder,
      }));
    }

    return data;
  } catch (err) {
    console.error('Error fetching gallery:', err);
    return GALLERY_ITEMS.map((g) => ({
      id: String(g.id),
      title: g.title,
      description: null,
      image_url: '',
      category: g.category,
      store_id: null,
      is_active: true,
      placeholder: g.placeholder,
    }));
  }
}

export async function adminFetchAllGallery(): Promise<GalleryModel[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function adminUploadImage(file: File, folder: 'stores' | 'vegetables' | 'fruits' | 'gallery'): Promise<string> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase storage is not configured.');
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

  const { error } = await supabase.storage
    .from('mds-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from('mds-images')
    .getPublicUrl(fileName);

  return data.publicUrl;
}

export async function adminSaveGalleryItem(item: Partial<GalleryModel>): Promise<GalleryModel> {
  if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');

  if (item.id && !item.id.startsWith('local-')) {
    const { data, error } = await supabase
      .from('gallery')
      .update({
        title: item.title,
        description: item.description,
        image_url: item.image_url,
        category: item.category || 'All',
        store_id: item.store_id || null,
        is_active: item.is_active ?? true,
      })
      .eq('id', item.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from('gallery')
      .insert([{
        title: item.title,
        description: item.description,
        image_url: item.image_url,
        category: item.category || 'All',
        store_id: item.store_id || null,
        is_active: item.is_active ?? true,
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

export async function adminDeleteGalleryItem(id: string): Promise<void> {
  if (!isSupabaseConfigured) return;
  const { error } = await supabase.from('gallery').delete().eq('id', id);
  if (error) throw error;
}
