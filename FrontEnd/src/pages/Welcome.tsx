import React from 'react';
import { Link } from 'react-router-dom';
const Welcome: React.FC = () => {
    
  return (
      <div>
      <div className="mx-auto max-w-2xl py-10 sm:py-10 lg:py-10 mt-16"> {/* Updated mt-0 to mt-16 */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Level Up Your Interview Game with AI!
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Unlock your tech potential with our AI interview platform! Seamlessly practice coding challenges, master problem-solving, and receive personalized feedback. Elevate your confidence and skills to ace any tech interview. Land your dream job with ease and efficiency!
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
           
                      <Link to={`/interview/java`}>
                      
                      <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <div
        className="relative overflow-hidden bg-cover bg-no-repeat"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <img
          className="rounded-t-lg"
          src="https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg"
          alt=""
        />
      
        <h3 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          Java
        </h3>
      </div>
                      </div>
                      
                      </Link>               

                      

                      <Link to={`/interview/mern`}>
                 
                      <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <div
        className="relative overflow-hidden bg-cover bg-no-repeat"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <img
          className="rounded-t-lg"
          src="https://deerwalkcompware.com/training/uploads/courses/MernStack1.png"
          alt=""
        />
   
        <h3 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
        MERN
        </h3>
      </div>
    </div>         
</Link>

                     <Link to={`/interview/nodejs`}>
                        <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <div
        className="relative overflow-hidden bg-cover bg-no-repeat"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <img
          className="rounded-t-lg"
          src="https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg"
          alt=""
        />
     
        <h3 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
         NodeJs
        </h3>
      </div>
    </div></Link>              
  

          </div>
        </div>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  );
};

export default Welcome;
