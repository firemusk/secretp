import { handleAuth } from '@workos-inc/authkit-nextjs';
import { redirect } from 'next/navigation';
import { isProfileComplete } from '@/app/actions/userActions';

export const GET = handleAuth({
  async onSuccess(user) {
    const profileComplete = await isProfileComplete();
    if (profileComplete) {
      redirect('/');
    } else {
      redirect('/user');
    }
  },
});
