import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface EnquiryModel {
  id?: string;
  name: string;
  business_name?: string | null;
  phone: string;
  location?: string | null;
  store_id?: string | null;
  enquiry_type: 'retail' | 'wholesale' | 'general';
  product_requirement?: string | null;
  quantity?: string | null;
  message?: string | null;
  status?: 'new' | 'contacted' | 'completed' | 'cancelled';
  created_at?: string;
  // Joined store relation
  store?: {
    name: string;
    location: string;
  } | null;
}

export async function submitEnquiry(enquiry: Omit<EnquiryModel, 'id' | 'created_at' | 'status'>): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    // If not yet connected to live Supabase, log and return success for smooth UI preview
    console.info('Enquiry received locally:', enquiry);
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from('enquiries')
      .insert([{
        name: enquiry.name.trim(),
        business_name: enquiry.business_name?.trim() || null,
        phone: enquiry.phone.trim(),
        location: enquiry.location?.trim() || null,
        store_id: enquiry.store_id || null,
        enquiry_type: enquiry.enquiry_type || 'general',
        product_requirement: enquiry.product_requirement || null,
        quantity: enquiry.quantity?.trim() || null,
        message: enquiry.message?.trim() || null,
        status: 'new',
      }]);

    if (error) {
      console.error('Supabase Enquiry Error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Enquiry Submission Exception:', err);
    return { success: false, error: err?.message || 'Network error' };
  }
}

export async function adminFetchEnquiries(typeFilter?: string, statusFilter?: string): Promise<EnquiryModel[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  let query = supabase
    .from('enquiries')
    .select(`
      *,
      store:stores (name, location)
    `)
    .order('created_at', { ascending: false });

  if (typeFilter && typeFilter !== 'all') {
    query = query.eq('enquiry_type', typeFilter);
  }
  if (statusFilter && statusFilter !== 'all') {
    query = query.eq('status', statusFilter);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function adminUpdateEnquiryStatus(id: string, status: 'new' | 'contacted' | 'completed' | 'cancelled'): Promise<void> {
  if (!isSupabaseConfigured) return;
  const { error } = await supabase
    .from('enquiries')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) throw error;
}
