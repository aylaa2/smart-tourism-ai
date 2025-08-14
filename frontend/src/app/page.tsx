import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative h-[90vh] bg-cover bg-center" style={{ backgroundImage: 'url(/syriamap1.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Rebuilding Syria with Tech & Tourism
          </h1>
          <p className="text-white text-lg max-w-2xl mb-6">
            Explore Syria’s rich heritage, support local communities, and experience the future of smart travel.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <Link href="#cities">
              <button className="bg-white text-black font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-gray-200 transition">
                🌍 Start Exploring
              </button>
            </Link>
            <Link href="#travel">
              <button className="bg-transparent border border-white text-white font-semibold px-6 py-3 rounded-xl hover:bg-white hover:text-black transition">
                ✈️ Plan Your Visit
              </button>
            </Link>
            <Link href="#ai-guide">
              <button className="bg-white text-black font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-gray-200 transition">
                🤖 Ask the AI Guide
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Cities */}
      <section id="cities" className="py-20 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Cities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {['aleppo', 'damascus', 'tartus', 'homs'].map((city) => (
            <Link key={city} href={`/city/${city}`}>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition">
                <Image
                  src={`/${city}.jpg`}
                  alt={city}
                  width={400}
                  height={300}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4 text-center font-semibold text-lg capitalize">
                  {city}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <p className="text-center text-gray-600 mt-6">Powered by AI – Ask anything about Syria’s culture, history, and landmarks.</p>
      </section>

      {/* Travel Planning Section */}
      <section id="travel" className="py-20 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">Plan Your Visit to Syria</h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-700 mb-4">Coming from Romania? Try Dan Air from Bucharest, or compare flights on:</p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <a href="https://www.skyscanner.net/" target="_blank" rel="noopener" className="text-blue-600 underline">Skyscanner</a>
            <a href="https://www.kayak.com/" target="_blank" rel="noopener" className="text-blue-600 underline">Kayak</a>
            <a href="https://www.google.com/flights" target="_blank" rel="noopener" className="text-blue-600 underline">Google Flights</a>
          </div>
          <p className="text-sm text-gray-500">*Real-time booking support coming soon</p>
        </div>
      </section>

      {/* Smart Tools Section */}
      <section className="py-20 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-10">Tech That Helps Syria Rebuild</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">🛠️ Report an Infrastructure Problem</h3>
            <p className="text-gray-600 mb-2">Coming soon – let users flag road, power, or water issues with photos & location.</p>
            <p className="text-sm text-gray-400">Gamified and AI-filtered for urgency</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">🚌 Smart Transport App</h3>
            <p className="text-gray-600 mb-2">Live bus locations, offline route maps, digital tickets, and arrival tracking.</p>
            <p className="text-sm text-gray-400">Helps tourists and locals alike</p>
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section id="ai-guide" className="py-20 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-4">Meet the AI Storyteller</h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-6">
          Curious about Syria's history, culture, or cities? Ask our AI anything — it responds with rich stories, facts, and emotion.
        </p>
        <div className="max-w-xl mx-auto">
          <div className="border border-gray-300 rounded-xl p-6 shadow-md bg-gray-50 text-left">
            <p className="text-sm text-gray-600 mb-2">Example:</p>
            <div className="bg-white p-4 rounded-lg shadow-inner">
              <p className="font-semibold">You:</p>
              <p>Tell me something about Tartus.</p>
              <p className="mt-3 font-semibold">AI:</p>
              <p className="italic text-gray-700">
                Tartus Cathedral, once a religious site, now a museum... preserving Crusader and Islamic influences.
              </p>
            </div>
            <p className="text-xs text-gray-400 mt-4">*Full AI chat experience coming soon</p>
          </div>
        </div>
      </section>

      {/* Promo Section */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-2xl font-bold mb-4">Need a Website or App?</h2>
        <p className="text-gray-700 mb-6">We support Syrian tourism businesses with modern digital tools and design.</p>
        <Link href="/contact">
          <button className="bg-black text-white font-semibold px-6 py-3 rounded-xl hover:bg-gray-800 transition">
            🚀 Get Help With Your Site
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 text-center">
        <div className="mb-4">
          <Image src="/welcomesign.jpg" alt="Welcome Sign" width={300} height={200} className="mx-auto rounded-xl shadow-lg" />
        </div>
        <p className="text-sm">Made with ❤️ for Syria – by Syrians, for the world.</p>
      </footer>
    </main>
  );
}
