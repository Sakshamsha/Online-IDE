import React, { useState } from 'react'
import Navbar from '../components/Navbar';


function Header() {
    return (
<Navbar/>
    );
}

function Services() {
    return (
      <section className="p-8 max-w-4xl mx-auto mt-32">
        <h2 className="text-2xl font-bold text-center mb-6">Our Services</h2>
        <div className="space-y-6">
          <ServiceCard 
            title="Web Development" 
            description="We build responsive, high-performance websites using the latest web technologies." 
            details="Our web development services include front-end, back-end, and full-stack development. We work with HTML, CSS, JavaScript, and modern frameworks."
          />
          <ServiceCard 
            title="UI/UX Design" 
            description="Design stunning, user-friendly interfaces that deliver exceptional user experiences." 
            details="We specialize in designing interfaces that are not only visually appealing but also highly intuitive and responsive to user needs."
          />
        </div>
      </section>
    );
}

function ServiceCard({ title, description, details }) {
    const [showDetails, setShowDetails] = useState(false);
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg text-black">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-2">{description}</p>
        <button 
          className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700" 
          onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'Hide Details' : 'Learn More'}
        </button>
        {showDetails && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p>{details}</p>
          </div>
        )}
      </div>
    );

}

const Service = () => {
  return (
    <div>
        <Header />
        <Services />
    </div>
  )
}

  

  


export default Service