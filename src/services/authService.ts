import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

export async function signInAdmin(email: string, password: string): Promise<{ user: User | null; session: Session | null; error?: string }> {
  if (!isSupabaseConfigured) {
    return {
      user: null,
      session: null,
      error: 'Supabase credentials are not configured in .env file.',
    };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    });

    if (error) {
      return { user: null, session: null, error: error.message };
    }

    return { user: data.user, session: data.session };
  } catch (err: any) {
    return { user: null, session: null, error: err?.message || 'Authentication error' };
  }
}

export async function signOutAdmin(): Promise<void> {
  if (!isSupabaseConfigured) return;
  await supabase.auth.signOut();
}

export async function getAdminSession(): Promise<Session | null> {
  if (!isSupabaseConfigured) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function getAdminUser(): Promise<User | null> {
  if (!isSupabaseConfigured) return null;
  const { data } = await supabase.auth.getUser();
  return data.user;
}
