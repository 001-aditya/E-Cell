import Signup from "@/components/Auth/Signup";
import { Link } from "react-router-dom";

const JoinUs = () => {
  return (
    <div className="space-y-10">
      <section className="text-center text-white px-4 pt-12 max-w-3xl mx-auto space-y-4">
        <p className="text-sm uppercase tracking-[0.4em] text-yellow-300">
          Become a member
        </p>
        <h1 className="text-4xl font-bold">
          Shape the entrepreneurial culture on campus
        </h1>
        <p className="text-white/70">
          Create your account, track your applications, and join internal events
          curated just for the E-Cell community. Already part of the crew?{" "}
          <Link className="text-yellow-300 underline" to="/login">
            Login here
          </Link>
          .
        </p>
      </section>
      <Signup />
    </div>
  );
};

export default JoinUs;