import { useEffect, useState } from "react";
import axios from 'axios';

// const useFetchData = (url, payload ,...dependencies) => {

//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(null);
//     const [error, setError] = useState(null);


//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 const response = await axios.get(url,payload);
//                 setData(response.data);
//                 setError(null);
//             } catch (error) {
//                 setError('Something went wrong' + error);
//             } finally {
//                 setLoading(false)
//             }
//         }

//         fetchData();
//     }, [url, ...dependencies]);

//     return { data, loading, error };

// }


// export { useFetchData }


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
                setLoading(false);
            }
        };

        fetchData();
    }, [url, ...dependencies]);

    return { data, loading, error };
};

export { useFetchData };
