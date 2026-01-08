'use client';

import { useState } from 'react';

export default function CreateUserPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'user',
    permissions: '',
    expiresAt: '',
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        role: form.role,
        permissions: form.permissions
          ? form.permissions.split(',')
          : [],
        expiresAt: form.expiresAt || undefined,
      }),
    });

    alert('کاربر ساخته شد');
  };

  return (
    <form
      onSubmit={submit}
      className="rtl mx-auto mt-10 max-w-md space-y-4 rounded border p-6"
    >
      <h1 className="text-center font-semibold">
        ساخت کاربر جدید
      </h1>

      <input
        placeholder="نام"
        className="w-full border px-3 py-2"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="ایمیل"
        className="w-full border px-3 py-2"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <select
        className="w-full border px-3 py-2"
        onChange={(e) =>
          setForm({ ...form, role: e.target.value })
        }
      >
        <option value="user">User</option>
        <option value="manager">Manager</option>
        <option value="admin">Admin</option>
      </select>

      <input
        placeholder="permissions (مثال: users.read,users.update)"
        className="w-full border px-3 py-2"
        onChange={(e) =>
          setForm({ ...form, permissions: e.target.value })
        }
      />

      <input
        type="date"
        className="w-full border px-3 py-2"
        onChange={(e) =>
          setForm({ ...form, expiresAt: e.target.value })
        }
      />

      <button className="w-full bg-blue-600 py-2 text-white">
        ساخت کاربر
      </button>
    </form>
  );
}
