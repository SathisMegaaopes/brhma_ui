// import { useQuery } from '@tanstack/react-query';
// import * as React from 'react';

// const fetchUsers = async () => {
//   const res = await fetch('https://jsonplaceholder.typicode.com/users');
//   return res.json();
// };

// const Component = () => {
//   // useQuery now requires an object as an argument
//   const { data, status } = useQuery({
//     queryKey: ['users'],  // previously "users"
//     queryFn: fetchUsers,   // previously fetchUsers
//   });

//   // Logging status and data
//   console.log('Status:', status);
//   console.log('Fetched Data:', data);

//   return <></>; // Empty component, no UI rendering required
// };

// export default Component;
