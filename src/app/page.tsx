'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
export default function Home() {
  const [searchLocation, setSearchLocation] = useState('');
  const [eventType, setEventType] = useState('');

  const features = [
    {
      icon: '🏛️',
      title: 'Premium Venues',
      description: 'Luxurious banquet halls with modern amenities and elegant decor'
    },
    {
      icon: '📅',
      title: 'Easy Booking',
      description: 'Simple online booking system with instant confirmation'
    },
    {
      icon: '🍽️',
      title: 'Catering Services',
      description: 'Professional catering with diverse menu options'
    },
    {
      icon: '💰',
      title: 'Best Prices',
      description: 'Competitive pricing with flexible payment options'
    }
  ];

  const venues = [
    {
      id: 1,
      name: 'Royal Grand Hall',
      image: '/api/placeholder/400/250',
      capacity: '500 guests',
      price: '$2,500',
      rating: 4.8,
      location: 'Downtown'
    },
    {
      id: 2,
      name: 'Crystal Palace',
      image: '/api/placeholder/400/250',
      capacity: '300 guests',
      price: '$1,800',
      rating: 4.9,
      location: 'Midtown'
    },
    {
      id: 3,
      name: 'Golden Ballroom',
      image: '/api/placeholder/400/250',
      capacity: '800 guests',
      price: '$3,200',
      rating: 4.7,
      location: 'Uptown'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-y-scroll h-[100vh] scrollbar-none">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-purple-600">BanquetBook</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#venues" className="text-gray-700 hover:text-purple-600">Venues</a>
              <a href="#services" className="text-gray-700 hover:text-purple-600">Services</a>
              <a href="#about" className="text-gray-700 hover:text-purple-600">About</a>
              <a href="#contact" className="text-gray-700 hover:text-purple-600">Contact</a>
            </nav>
            <div className="flex space-x-4">
              <Link href="/pages/login"><button className="text-purple-600 hover:text-purple-800">Login</button></Link>
              <Link href="/pages/signup"><button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                Sign Up
              </button></Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[url('/images/home-bg-baner.jpg')] bg-cover bg-no-repeat h-screen relative text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-6">
              Find the Perfect Banquet Hall for Your Special Event
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Discover stunning venues for weddings, corporate events, parties, and celebrations. 
              Book premium banquet halls with ease and create unforgettable memories.
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-lg p-6 max-w-4xl mx-auto shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="Enter city or area"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Event Type</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select event type</option>
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="birthday">Birthday Party</option>
                    <option value="anniversary">Anniversary</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="flex items-end">
                  <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 font-medium">
                    Search Venues
                  </button>
                </div>
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <Image
              src={'/images/couples.png'} alt="Description of my image" width={200} height={200}
              />
              <Image
              src={'/images/couples.png'} alt="Description of my image" width={200} height={200}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Venues */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Featured Venues</h3>
            <p className="text-gray-600">Discover our most popular banquet halls</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venues.map((venue) => (
              <div key={venue.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">Venue Image</span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-semibold text-gray-900">{venue.name}</h4>
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="text-gray-600 ml-1">{venue.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">📍 {venue.location}</p>
                  <p className="text-gray-600 mb-4">👥 Up to {venue.capacity}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-purple-600">{venue.price}</span>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="bg-white text-purple-600 border border-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50">
              View All Venues
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose BanquetBook?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We make finding and booking the perfect venue simple, reliable, and stress-free
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Book Your Dream Venue?</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their perfect banquet hall with us
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100">
              Browse Venues
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-purple-600">
              List Your Venue
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">BanquetBook</h4>
              <p className="text-gray-400">
                Your trusted partner for finding and booking premium banquet halls for all occasions.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Browse Venues</a></li>
                <li><a href="#" className="hover:text-white">How It Works</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Services</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Wedding Venues</a></li>
                <li><a href="#" className="hover:text-white">Corporate Events</a></li>
                <li><a href="#" className="hover:text-white">Private Parties</a></li>
                <li><a href="#" className="hover:text-white">Catering</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Contact</h5>
              <ul className="space-y-2 text-gray-400">
                <li>📧 info@banquetbook.com</li>
                <li>📞 +1 (555) 123-4567</li>
                <li>📍 123 Main St, City, State</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 BanquetBook. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .min-h-screen {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }
      `}</style>
    </div>
  );
}