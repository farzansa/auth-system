'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'blocked';
  lastLogin: string | null;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
   const router = useRouter();

  useEffect(() => {
    fetch('/api/users')
      .then((r) => r.json())
      .then(setUsers);
  }, []);

  const action = async (
    id: string,
    action: 'block' | 'toggle' | 'role',
    value?: string
  ) => {
    await fetch(`/api/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, value }),
    });

    const updated = await fetch('/api/users').then((r) => r.json());
    setUsers(updated);
  };

  return (
    <div className="rtl min-h-screen bg-gray-600 p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">
          مدیریت کاربران
        </h1>

        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        onClick={()=>router.push('/dashboard/users/create')}
        >
          + افزودن کاربر
        </button>
      </div>

      {/* Card */}
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm bg-blend-darken">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-right font-medium">
                نام
              </th>
              <th className="px-4 py-3 text-right font-medium">
                ایمیل
              </th>
              <th className="px-4 py-3 text-right font-medium">
                نقش
              </th>
              <th className="px-4 py-3 text-right font-medium">
                وضعیت
              </th>
              <th className="px-4 py-3 text-right font-medium">
                آخرین ورود
              </th>
              <th className="px-4 py-3 text-center font-medium">
                عملیات
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className="border-t transition hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-medium text-gray-800">
                  {u.name}
                </td>

                <td className="px-4 py-3 text-gray-600">
                  {u.email}
                </td>

                <td className="px-4 py-3">
                  <span className="rounded-md bg-indigo-50 px-2 py-1 text-xs text-indigo-700">
                    {u.role}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <span
                    className={
                      u.status === 'active'
                        ? 'inline-flex rounded-full bg-green-100 px-3 py-1 text-xs text-green-700'
                        : u.status === 'inactive'
                        ? 'inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-700'
                        : 'inline-flex rounded-full bg-red-100 px-3 py-1 text-xs text-red-700'
                    }
                  >
                    {u.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-gray-500">
                  {u.lastLogin ?? '—'}
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      className="rounded-md bg-red-50 px-3 py-1 text-xs text-red-600 hover:bg-red-100"
                      onClick={() => action(u.id, 'block')}
                    >
                      بلاک
                    </button>

                    <button
                      className="rounded-md bg-blue-50 px-3 py-1 text-xs text-blue-600 hover:bg-blue-100"
                      onClick={() => action(u.id, 'toggle')}
                    >
                      فعال / غیرفعال
                    </button>

                    <button
                      className="rounded-md bg-emerald-50 px-3 py-1 text-xs text-emerald-600 hover:bg-emerald-100"
                      onClick={() =>
                        action(u.id, 'role', 'manager')
                      }
                    >
                      تغییر نقش
                    </button>

                    <button
                      className="rounded-md bg-gray-100 px-3 py-1 text-xs text-gray-600 hover:bg-gray-200"
                      onClick={() =>
                        alert(`دعوت‌نامه برای ${u.email} ارسال شد`)
                      }
                    >
                      دعوت
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
