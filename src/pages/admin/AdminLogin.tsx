import React, { useState } from 'react';
import { signInAdmin } from '../../services/authService';
import { Icons } from '../../components/common/Icons';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToHome: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToHome }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please provide both email and password.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    const res = await signInAdmin(email, password);
    setIsLoading(false);

    if (res.user) {
      onLoginSuccess();
    } else {
      setErrorMsg(res.error || 'Invalid admin credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-mds-cream flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-mds-primary text-white shadow-md mb-4">
          <Icons.Store className="w-7 h-7" />
        </div>
        <h2 className="text-3xl font-extrabold text-mds-charcoal font-heading">
          MDS Admin Portal
        </h2>
        <p className="mt-2 text-xs text-mds-muted">
          Authenticated access for store managers and operations.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-mds-border/80 shadow-card">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-mds-charcoal uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mdsfresh.com"
                className="w-full px-4 py-3 rounded-xl bg-mds-cream/50 border border-mds-border text-sm text-mds-charcoal focus:outline-none focus:ring-2 focus:ring-mds-primary/20 focus:border-mds-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-mds-charcoal uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-mds-cream/50 border border-mds-border text-sm text-mds-charcoal focus:outline-none focus:ring-2 focus:ring-mds-primary/20 focus:border-mds-primary transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-mds-primary text-white font-bold text-sm hover:bg-mds-accent active:scale-[0.99] transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer disabled:opacity-70"
            >
              {isLoading ? (
                <span>Authenticating with Supabase...</span>
              ) : (
                <span>Sign In to Admin Dashboard</span>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <button
              onClick={onBackToHome}
              className="text-xs font-semibold text-mds-muted hover:text-mds-charcoal transition-colors cursor-pointer"
            >
              ← Back to MDS Public Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
