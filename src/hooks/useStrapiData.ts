import { useEffect, useState } from 'react';
import { fetchCollection } from '../api/strapi';

export const useStrapiData = (collections = []) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!collections.length) return;

    setLoading(true);

    Promise.all(
      collections.map(({ name, params }) =>
        fetchCollection(name, params || '').then((res: any) => ({
          [name]: res.data,
        }))
      )
    )
      .then((results) => {
        const mergedData = Object.assign({}, ...results);
        setData(mergedData);
      })
      .catch((err) => {
        console.error('Strapi fetch error:', err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [collections]);

  return { data, loading, error };
};
