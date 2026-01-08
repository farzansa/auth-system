'use client';

import { useState } from 'react';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const isStrong =
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isStrong) {
      setError('رمز عبور قوی نیست');
      return;
    }

    if (password !== confirm) {
      setError('رمز عبور و تکرار آن یکسان نیست');
      return;
    }

    setError('');
    setSuccess(true);
  };

  return (
    <div className="rtl mx-auto mt-24 max-w-sm rounded-lg border p-6">
      <h1 className="mb-4 text-center text-lg font-semibold">
        بازیابی رمز عبور
      </h1>

      {!success ? (
        <form onSubmit={submit} className="space-y-4">
          <input
            type="password"
            placeholder="رمز عبور جدید"
            className="w-full rounded border px-3 py-2 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="text-xs">
            قدرت رمز:
            <span
              className={
                isStrong
                  ? 'text-green-600'
                  : 'text-red-600'
              }
            >
              {isStrong ? ' قوی' : ' ضعیف'}
            </span>
          </div>

          <input
            type="password"
            placeholder="تأیید رمز عبور"
            className="w-full rounded border px-3 py-2 text-sm"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          {error && (
            <p className="text-xs text-red-600">{error}</p>
          )}

          <button className="w-full rounded bg-blue-600 py-2 text-sm text-white">
            ثبت رمز جدید
          </button>
        </form>
      ) : (
        <p className="text-center text-sm text-green-600">
          رمز عبور با موفقیت تغییر کرد
        </p>
      )}
    </div>
  );
}
