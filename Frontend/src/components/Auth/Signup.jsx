import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import Background from "../Background";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    branch: "",
    year: "",
    rollNo: "",
    phone: ""
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const { email, password, name, branch, year, rollNo, phone } = formData;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm`
      }
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        name,
        branch,
        year,
        roll_no: rollNo,
        phone
      });
    }

    setMessage("Signup successful! Check your email to verify the account.");
    setLoading(false);
  };

  return (
    <>
      <Background />
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 md:p-10 w-full max-w-2xl shadow-2xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(250,204,21,0.15)] text-white">
          {/* Header */}
          <div className="text-center space-y-3 mb-8">
            <p className="text-sm uppercase tracking-[0.4em] text-yellow-300">
              Join the movement
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Create <span className="text-yellow-400">Account</span>
            </h1>
            <p className="text-white/70 max-w-md mx-auto">
              Gain access to member-only resources, dashboard, and event registrations.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-5">
            {/* Name & Email Row */}
            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="name"
                onChange={handleChange}
                value={formData.name}
                required
                className="input"
                placeholder="Full name"
              />
              <input
                name="email"
                type="email"
                onChange={handleChange}
                value={formData.email}
                required
                className="input"
                placeholder="Institute email"
              />
            </div>

            {/* Password & Phone Row */}
            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="password"
                type="password"
                onChange={handleChange}
                value={formData.password}
                required
                className="input"
                placeholder="Choose a password"
              />
              <input
                name="phone"
                type="tel"
                onChange={handleChange}
                value={formData.phone}
                className="input"
                placeholder="Phone (optional)"
              />
            </div>

            {/* Branch, Year, Roll Number Row */}
            <div className="grid md:grid-cols-3 gap-4">
              <input
                name="branch"
                onChange={handleChange}
                value={formData.branch}
                className="input"
                placeholder="Branch"
              />
              <select
                name="year"
                onChange={handleChange}
                value={formData.year}
                className={`input ${!formData.year ? 'text-gray-400' : 'text-white'}`}
              >
                <option value="" className="text-gray-400 bg-gray-900">Select year</option>
                <option value="1st Year" className="text-white bg-gray-900">1st Year</option>
                <option value="2nd Year" className="text-white bg-gray-900">2nd Year</option>
                <option value="3rd Year" className="text-white bg-gray-900">3rd Year</option>
                <option value="4th Year" className="text-white bg-gray-900">4th Year</option>
              </select>
              <input
                name="rollNo"
                onChange={handleChange}
                value={formData.rollNo}
                className="input"
                placeholder="Roll number"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 md:py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          {/* Message Display */}
          {message && (
            <div className={`mt-6 text-center text-sm font-medium rounded-xl p-4 animate-in fade-in slide-in-from-top-2 duration-300 ${message.includes('success') || message.includes('Check your email')
              ? 'text-yellow-300 border border-yellow-400/30 bg-yellow-500/10'
              : 'text-red-300 border border-red-400/30 bg-red-500/10'
              }`}>
              {message}
            </div>
          )}

          {/* Login Link */}
          <p className="text-center text-sm text-white/70 mt-6">
            Already registered?{" "}
            <Link
              to="/login"
              className="text-yellow-300 hover:text-yellow-200 underline font-semibold transition-colors"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
