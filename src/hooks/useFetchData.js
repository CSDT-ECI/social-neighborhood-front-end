import { useState, useEffect } from 'react';
import { fetchData } from '../services/apiService';

export const useFetchData = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint) return;
    let cancelled = false;
    setLoading(true);
    fetchData(endpoint)
      .then((result) => { if (!cancelled) { setData(result); setLoading(false); } })
      .catch((err) => { if (!cancelled) { setError(err); setLoading(false); } });
    return () => { cancelled = true; };
  }, [endpoint]);

  return { data, loading, error };
};
