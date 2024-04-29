import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export default function useLocationHash(): string {
  const location = useLocation();

  const hash = useMemo(() => {
    return `${location.pathname}${location.key}`;
  }, [location.key, location.pathname]);

  return hash;
}
