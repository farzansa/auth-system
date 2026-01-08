'use client';

import { useState } from 'react';
import { schema, FormData } from '../../../lib/validators/login.schema';

export default function Login() {
  const [data, setData] = useState<FormData>({
    email: '',
    password: '',
    remember: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tries, setTries] = useState(0);

const validate = (values: FormData) => {
  const result = schema.safeParse(values);

  if (!result.success) {
    const errs: Record<string, string> = {};

    result.error.issues.forEach((e) => {
      const field = e.path[0] as string;
      errs[field] = e.message;
    });

    setErrors(errs);
    return false;
  }

  setErrors({});
  return true;
};

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (tries >= 5) return;
    if (!validate(data)) return;

    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!res.ok) setTries((t) => t + 1);
  };

  return (
  <form
  onSubmit={submit}
  className="w-full max-w-sm mx-auto mt-24 space-y-4
             rounded-lg border border-gray-200 bg-white p-6
             text-right rtl"
>
  <h1 className="text-center text-lg font-semibold">ورود</h1>

  {/* Email */}
  <div>
    <input
      type="email"
      placeholder="ایمیل"
      value={data.email}
      onChange={(e) =>
        setData({ ...data, email: e.target.value })
      }
      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {errors.email && (
      <p className="mt-1 text-xs text-red-600">
        {errors.email}
      </p>
    )}
  </div>

  {/* Password */}
  <div>
    <input
      type="password"
      placeholder="رمز عبور"
      value={data.password}
      onChange={(e) =>
        setData({ ...data, password: e.target.value })
      }
      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {errors.password && (
      <p className="mt-1 text-xs text-red-600">
        {errors.password}
      </p>
    )}
  </div>

  {/* Remember */}
  <label className="flex items-center gap-2 text-sm">
    <input
      type="checkbox"
      checked={data.remember}
      onChange={(e) =>
        setData({ ...data, remember: e.target.checked })
      }
      className="accent-blue-600"
    />
    مرا به خاطر بسپار
  </label>

  {/* Submit */}
  <button
    disabled={tries >= 5}
    className="w-full rounded-md bg-blue-600 py-2 text-sm text-white
               hover:bg-blue-700 disabled:bg-gray-400"
  >
    {tries >= 5 ? 'موقتاً مسدود شدید' : 'ورود'}
  </button>

  {/* Forgot */}
  <a
    href="/forgot-password"
    className="block text-center text-sm text-blue-600 hover:underline"
  >
    فراموشی رمز عبور
  </a>
</form>

  );
}
