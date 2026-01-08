'use client';

import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.includes('@')) {
      setError('ایمیل معتبر نیست');
      return;
    }

    setError('');
    setSent(true);
  };

  return (
    <div className="rtl mx-auto mt-24 max-w-sm rounded-lg border p-6">
      <h1 className="mb-4 text-center text-lg font-semibold">
        فراموشی رمز عبور
      </h1>

      {!sent ? (
        <form onSubmit={submit} className="space-y-4">
          <input
            className="w-full rounded border px-3 py-2 text-sm"
            placeholder="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && (
            <p className="text-xs text-red-600">{error}</p>
          )}

          <button className="w-full rounded bg-blue-600 py-2 text-sm text-white">
            ارسال لینک بازیابی
          </button>
        </form>
      ) : (
        <p className="text-center text-sm text-gray-600">
          اگر حسابی با این ایمیل وجود داشته باشد،
          لینک بازیابی ارسال شد.
        </p>
      )}
    </div>
  );
}
