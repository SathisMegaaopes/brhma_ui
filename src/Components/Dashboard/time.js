// const Timer = ({ initialSeconds }) => {
//   const [timeRemaining, setTimeRemaining] = useState(initialSeconds);

//   useEffect(() => {
//     if (timeRemaining <= 0) return;

//     const timerId = setInterval(() => {
//       setTimeRemaining((prevTime) => Math.max(prevTime - 1, 0));
//     }, 1000);

//     return () => clearInterval(timerId);
//   }, [timeRemaining]);


//   const percentageRemaining = (timeRemaining / initialSeconds) * 100;


//   let textColor = 'green';
//   if (percentageRemaining < 70) {
//     textColor = 'orange';
//   } else if (percentageRemaining < 90) {
//     textColor = 'red';
//   }

//   return (
//     <div style={{ color: textColor }}>
//       <p>Time Remaining: {formatTimeFromSeconds(timeRemaining)}</p>
//     </div>
//   );
// };