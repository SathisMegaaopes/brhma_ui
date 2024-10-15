import { useEffect, useState } from "react";
import axios from 'axios';


const useFetchData = (url, payload = {}, ...dependencies) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(url, { params: payload });
                setData(response.data);
            } catch (err) {
                setError('Something went wrong: ' + err.message);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 300)
            }
        };

        fetchData();
    }, [url, ...dependencies]);

    return { data, loading, error };
};

export { useFetchData };

