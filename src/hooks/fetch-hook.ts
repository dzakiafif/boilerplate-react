import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

type FetchProps = {
  url?: string;
  paramData?: string;
  method?: 'get' | 'post' | 'put' | 'delete';
};

export function useFetch<ResponseBody>(props: FetchProps) {
  const { url, paramData = null, method = 'get' } = props;

  const [data, setData] = useState<ResponseBody | []>([]);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string | null>(null);

  const fetch = async () => {
    const isGet = method === 'get';
    try {
      const response = await axios({
        method,
        url: `${process.env.REACT_APP_BASE_URL}${url}`,
        data: isGet ? undefined : paramData,
        params: isGet ? paramData : undefined,
      });
      setData(response.data);
      setStatusCode(response.status);
    } catch (err) {
      setError(err as AxiosError);
      if (axios.isAxiosError(err)) {
        setStatusCode(err.response?.status ?? null);
        setMessage(err.message ?? null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [statusCode, loading]);

  return { data, error, loading, statusCode, message };
}
