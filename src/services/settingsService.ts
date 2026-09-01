import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { BUSINESS_INFO } from '../data/business';

export interface BusinessSetting {
  id?: string;
  key: string;
  value: string | null;
  updated_at?: string;
}

export async function fetchBusinessSettings(): Promise<Record<string, string>> {
  const fallbackSettings: Record<string, string> = {
    business_name: BUSINESS_INFO.name,
    tagline: BUSINESS_INFO.tagline,
    experience: BUSINESS_INFO.badgeText,
    general_phone: BUSINESS_INFO.primaryPhone,
    optional_phone: BUSINESS_INFO.secondaryPhone,
    general_whatsapp: BUSINESS_INFO.generalWhatsApp,
    general_email: BUSINESS_INFO.generalEmail,
    general_address: BUSINESS_INFO.headquarterLocation,
    business_hours: 'Daily early morning to late evening',
  };

  if (!isSupabaseConfigured) {
    return fallbackSettings;
  }

  try {
    const { data, error } = await supabase
      .from('business_settings')
      .select('*');

    if (error || !data || data.length === 0) {
      return fallbackSettings;
    }

    const settingsMap: Record<string, string> = { ...fallbackSettings };
    data.forEach((item) => {
      if (item.key && item.value !== null) {
        settingsMap[item.key] = item.value;
      }
    });

    return settingsMap;
  } catch (err) {
    console.error('Error fetching settings:', err);
    return fallbackSettings;
  }
}

export async function adminFetchAllSettings(): Promise<BusinessSetting[]> {
  if (!isSupabaseConfigured) {
    return [
      { key: 'business_name', value: BUSINESS_INFO.name },
      { key: 'tagline', value: BUSINESS_INFO.tagline },
      { key: 'experience', value: BUSINESS_INFO.badgeText },
      { key: 'general_phone', value: BUSINESS_INFO.primaryPhone },
      { key: 'optional_phone', value: BUSINESS_INFO.secondaryPhone },
      { key: 'general_whatsapp', value: BUSINESS_INFO.generalWhatsApp },
      { key: 'general_email', value: BUSINESS_INFO.generalEmail },
      { key: 'general_address', value: BUSINESS_INFO.headquarterLocation },
      { key: 'business_hours', value: 'Daily early morning to late evening' },
    ];
  }

  const { data, error } = await supabase
    .from('business_settings')
    .select('*')
    .order('key', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function adminSaveSetting(key: string, value: string): Promise<void> {
  if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');

  const { error } = await supabase
    .from('business_settings')
    .upsert({
      key,
      value,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'key' });

  if (error) throw error;
}
