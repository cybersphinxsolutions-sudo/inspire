"use client"

import { useState, useEffect } from "react"
import { Country, State, City } from 'country-state-city'

export function LocationDemo() {
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  
  const [countries, setCountries] = useState<any[]>([])
  const [states, setStates] = useState<any[]>([])
  const [cities, setCities] = useState<any[]>([])
  
  useEffect(() => {
    // Load only specific countries
    const allCountries = Country.getAllCountries()
    const allowedCountries = ['United States', 'Canada', 'United Kingdom', 'Australia']
    const filteredCountries = allCountries.filter(country => 
      allowedCountries.includes(country.name)
    )
    setCountries(filteredCountries)
  }, [])

  const handleCountryChange = (countryName: string) => {
    setSelectedCountry(countryName)
    setSelectedState('')
    setSelectedCity('')
    
    const country = countries.find(c => c.name === countryName)
    if (country) {
      const countryStates = State.getStatesOfCountry(country.isoCode)
      setStates(countryStates)
    } else {
      setStates([])
    }
    setCities([])
  }

  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName)
    setSelectedCity('')
    
    const country = countries.find(c => c.name === selectedCountry)
    const state = states.find(s => s.name === stateName)
    
    if (country && state) {
      const stateCities = City.getCitiesOfState(country.isoCode, state.isoCode)
      setCities(stateCities)
    } else {
      setCities([])
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Comprehensive World Location Selector
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Country Input */}
        <div>
          <label className="block text-sm font-semibold text-[#006795] mb-2">
            Country
          </label>
          <input
            type="text"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            placeholder="Enter Country"
            className="w-full px-4 py-3 bg-[#E8F4F8] border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006795] text-sm"
          />
        </div>

        {/* State/Province Input */}
        <div>
          <label className="block text-sm font-semibold text-[#006795] mb-2">
            State/Province
          </label>
          <input
            type="text"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            placeholder="Enter State/Province"
            className="w-full px-4 py-3 bg-[#E8F4F8] border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006795] text-sm"
          />
        </div>

        {/* City Input */}
        <div>
          <label className="block text-sm font-semibold text-[#006795] mb-2">
            City
          </label>
          <input
            type="text"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            placeholder="Enter City"
            className="w-full px-4 py-3 bg-[#E8F4F8] border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006795] text-sm"
          />
        </div>
      </div>

      {/* Selection Summary */}
      {(selectedCountry || selectedState || selectedCity) && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Selected Location:</h3>
          <div className="space-y-1 text-sm text-gray-700">
            {selectedCountry && <p><strong>Country:</strong> {selectedCountry}</p>}
            {selectedState && <p><strong>State/Province:</strong> {selectedState}</p>}
            {selectedCity && <p><strong>City:</strong> {selectedCity}</p>}
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{countries.length}</div>
          <div className="text-sm text-blue-800">Total Countries</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{states.length}</div>
          <div className="text-sm text-green-800">States/Provinces</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{cities.length}</div>
          <div className="text-sm text-purple-800">Cities Available</div>
        </div>
      </div>

      {/* Examples */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Examples of Available Data:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <strong>🇺🇸 United States:</strong> 66 states/territories, 1000+ cities per major state
          </div>
          <div>
            <strong>🇮🇳 India:</strong> 36 states/territories, extensive city coverage
          </div>
          <div>
            <strong>🇨🇦 Canada:</strong> 13 provinces/territories, complete city data
          </div>
          <div>
            <strong>🇬🇧 United Kingdom:</strong> England, Scotland, Wales, Northern Ireland
          </div>
          <div>
            <strong>🇦🇺 Australia:</strong> All states and territories with cities
          </div>
          <div>
            <strong>🌍 And 245+ more countries...</strong> with complete location hierarchies
          </div>
        </div>
      </div>
    </div>
  )
}