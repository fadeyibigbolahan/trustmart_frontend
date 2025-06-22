import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 w-1/2 px-12 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full blur-xl animate-pulse delay-2000"></div>
        </div>

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
            backgroundSize: "40px 40px",
          }}
        ></div>

        <div className="relative z-10 max-w-lg space-y-8 text-center">
          {/* Main heading with gradient text */}
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent leading-tight">
              Welcome to
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                TrustMart
              </span>
              <span className="block text-4xl lg:text-5xl font-extrabold text-white/90">
                Shop
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-xl text-white/70 font-medium leading-relaxed">
            Discover premium products with confidence and style
          </p>

          {/* Decorative elements */}
          <div className="flex justify-center space-x-2 pt-4">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full animate-bounce delay-150"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-bounce delay-300"></div>
          </div>

          {/* Bottom accent line */}
          <div className="pt-8">
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mx-auto rounded-full"></div>
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyan-500/20 to-transparent rounded-tr-full"></div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
