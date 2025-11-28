import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../context/AuthProvider";
import Background from "../Background";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      navigate("/dashboard");
    }
    setLoading(false);
  };

  return (
    <>
      <Background />
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 md:p-10 text-white max-w-md w-full shadow-2xl hover:shadow-3xl transition-all duration-500">
          <div className="text-center space-y-3 mb-8">
            <p className="text-sm uppercase tracking-[0.4em] text-yellow-300">
              Welcome back
            </p>
            <h1 className="text-3xl md:text-4xl font-bold">Login to E-Cell</h1>
            <p className="text-white/70 text-sm">
              Access your dashboard and manage events
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              className="input"
              placeholder="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input"
              placeholder="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 md:py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Signing you in..." : "Login"}
            </button>
          </form>

          {errorMsg && (
            <p className="mt-4 text-red-300 text-sm text-center border border-red-400/30 bg-red-500/10 rounded-xl p-3">
              {errorMsg}
            </p>
          )}

          <p className="text-center text-sm text-white/70 mt-6">
            New to E-Cell?{" "}
            <Link to="/signup" className="text-yellow-300 hover:text-yellow-200 underline font-semibold">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
