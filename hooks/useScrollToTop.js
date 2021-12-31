import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';

export default function useScrollToTop() {
  const router = useRouter();

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [router.pathname]);
}
