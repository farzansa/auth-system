import { z } from 'zod';

export const schema = z.object({
  email: z.string().email('ایمیل نادرست است'),
  password: z.string().min(8, 'رمز عبور حداقل ۸ کاراکتر است'),
  remember: z.boolean(),
});

export type FormData = z.infer<typeof schema>;