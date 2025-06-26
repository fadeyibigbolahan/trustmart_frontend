import React, { useState, useEffect } from "react";
import { Home, Search, ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x / 10,
            top: mousePosition.y / 10,
            transform: "translate(-50%, -50%)",
          }}
        ></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Large 404 */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent leading-none animate-pulse">
            404
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Main message */}
        <div className="space-y-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Oops! Page Not Found
          </h2>
          <p className="text-xl text-white/70 leading-relaxed max-w-lg mx-auto">
            The page you're looking for seems to have wandered off into the
            digital void. Don't worry, even the best explorers sometimes take a
            wrong turn!
          </p>
        </div>

        {/* Search suggestion */}
        <div className="mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Search className="w-6 h-6 text-purple-300" />
              <span className="text-white/80 font-medium">
                Maybe try searching for what you need?
              </span>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products, pages, or anything..."
                className="w-full px-6 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                onFocus={() => setIsHovering(true)}
                onBlur={() => setIsHovering(false)}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            className="group flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Go Back</span>
          </button>

          <button
            className="group flex items-center space-x-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-xl font-semibold border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105"
            onClick={() => (window.location.href = "/")}
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span>Home Page</span>
          </button>

          <button
            className="group flex items-center space-x-3 bg-transparent hover:bg-white/10 text-white/80 hover:text-white px-8 py-4 rounded-xl font-semibold border border-white/10 hover:border-white/30 transition-all duration-300"
            onClick={() => (window.location.href = "/explore")}
          >
            <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
            <span>Explore</span>
          </button>
        </div>

        {/* Fun fact or tip */}
        <div className="mt-16 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl border border-white/10">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
            <span className="text-white/60 text-sm font-medium">Fun Fact</span>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-ping delay-500"></div>
          </div>
          <p className="text-white/70 text-sm">
            The HTTP 404 error was named after room 404 at CERN, where the World
            Wide Web was born. Even the internet's birthplace had missing pages!
          </p>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-transparent rounded-br-full"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-cyan-500/20 to-transparent rounded-tl-full"></div>
    </div>
  );
}
