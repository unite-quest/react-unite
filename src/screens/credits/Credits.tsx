import { LoaderContext } from '@/shared/loader/LoaderProvider';
import { useContext, useEffect } from 'react';

function Credits() {
  const { setLoading } = useContext(LoaderContext);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, [setLoading]);

  return <>Credits</>;
}

export default Credits;
