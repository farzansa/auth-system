'use client';

import { useState, useEffect } from 'react';

type Step = 1 | 2 | 3 | 4;

export default function RegisterPage() {
  const [step, setStep] = useState<Step>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
    role: '',
    phone: '',
    plan: 'free',
  });

  /* =====================
     Password strength
  ===================== */
  const passwordStrength =
    form.password.length >= 8 ? 'قوی' : 'ضعیف';

  /* =====================
     OTP countdown
  ===================== */
  useEffect(() => {
    if (step === 3 && timer > 0) {
      const t = setTimeout(() => setTimer((v) => v - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [step, timer]);

  /* =====================
     Validation per step
  ===================== */
  const validateStep = () => {
    const e: Record<string, string> = {};

    if (step === 1) {
      if (!form.name) e.name = 'نام الزامی است';
      if (!form.email.includes('@')) e.email = 'ایمیل نامعتبر است';
      if (form.password.length < 8)
        e.password = 'رمز عبور ضعیف است';
    }

    if (step === 2) {
      if (!form.company) e.company = 'نام شرکت الزامی است';
      if (!form.phone) e.phone = 'شماره تماس الزامی است';
    }

    if (step === 3) {
      if (otp !== '1234') e.otp = 'کد نادرست است';
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => validateStep() && setStep((s) => (s + 1) as Step);
  const prev = () => setStep((s) => (s - 1) as Step);

  return (
<div className="rtl mx-auto mt-20 max-w-md">
  <div className="card space-y-4">

    {/* Progress */}
    <div className="text-sm text-gray-500 text-center">
      مرحله {step} از ۴
    </div>

    {/* STEP 1 */}
    {step === 1 && (
      <>
        <input
          className="input"
          placeholder="نام"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <input
          className="input"
          placeholder="ایمیل"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="password"
          className="input"
          placeholder="رمز عبور"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <div className="text-xs text-gray-600">
          قدرت رمز:
          <span
            className={
              form.password.length >= 8
                ? 'text-green-600'
                : 'text-red-600'
            }
          >
            {form.password.length >= 8 ? ' قوی' : ' ضعیف'}
          </span>
        </div>

        {errors.password && (
          <p className="error">{errors.password}</p>
        )}
      </>
    )}

    {/* STEP 2 */}
    {step === 2 && (
      <>
        <input
          className="input"
          placeholder="نام شرکت"
          onChange={(e) =>
            setForm({ ...form, company: e.target.value })
          }
        />
        {errors.company && (
          <p className="error">{errors.company}</p>
        )}

        <input
          className="input"
          placeholder="نقش"
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        />

        <input
          className="input"
          placeholder="شماره تماس"
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />
        {errors.phone && (
          <p className="error">{errors.phone}</p>
        )}
      </>
    )}

    {/* STEP 3 */}
    {step === 3 && (
      <>
        <input
          className="input text-center tracking-widest"
          placeholder="کد تأیید (1234)"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        {errors.otp && <p className="error">{errors.otp}</p>}

        <div className="text-xs text-gray-500 text-center">
          {timer > 0 ? (
            <>ارسال مجدد تا {timer} ثانیه</>
          ) : (
            <button
              onClick={() => setTimer(60)}
              className="text-blue-600 hover:underline"
            >
              ارسال مجدد کد
            </button>
          )}
        </div>
      </>
    )}

    {/* STEP 4 */}
    {step === 4 && (
      <div className="space-y-2 text-sm">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={form.plan === 'free'}
            onChange={() =>
              setForm({ ...form, plan: 'free' })
            }
          />
          پلن رایگان
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={form.plan === 'pro'}
            onChange={() =>
              setForm({ ...form, plan: 'pro' })
            }
          />
          پلن حرفه‌ای
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={form.plan === 'enterprise'}
            onChange={() =>
              setForm({ ...form, plan: 'enterprise' })
            }
          />
          پلن سازمانی
        </label>
      </div>
    )}

    {/* Controls */}
    <div className="flex justify-between pt-4">
      {step > 1 && (
        <button
          onClick={prev}
          className="btn btn-secondary"
        >
          قبلی
        </button>
      )}

      {step < 4 ? (
        <button
          onClick={next}
          className="btn btn-primary"
        >
          بعدی
        </button>
      ) : (
        <button
          onClick={() => console.log(form)}
          className="btn btn-primary"
        >
          ثبت‌نام
        </button>
      )}
    </div>
  </div>
</div>

  );
}
