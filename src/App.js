import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Tours from './Tours';

const url = 'https://course-api.com/react-tours-project';

function App() {
   const [loading, setLoading] = useState(true);
   const [tours, setTours] = useState([]);

   const removeTour = (id) => {
      const newTours = tours.filter((tour) => tour.id !== id);
      setTours(newTours);
   };

   //function to fetch tours
   const fetchTours = async () => {
      //an extra precaution to ensure that loading is truw while fetching data
      setLoading(true);

      try {
         const response = await fetch(url);
         const tours = await response.json();
         //console.log(tours);
         setLoading(false);
         setTours(tours);
      } catch (error) {
         setLoading(false);
         console.log(error);
      }
   };

   //calling fetchTours function when page loads
   useEffect(() => {
      fetchTours();
   }, []);

   if (loading) {
      return (
         <main>
            <Loading />
         </main>
      );
   }

   //if all tours were deleted from the list of tours
   if (tours.length === 0) {
      return (
         <main>
            <div className='title'>
               <h2>no tours left</h2>
               <button className='btn' onClick={fetchTours}>
                  refresh
               </button>
            </div>
         </main>
      );
   }

   return (
      <main>
         <Tours tours={tours} removeTour={removeTour} />
      </main>
   );
}

export default App;
