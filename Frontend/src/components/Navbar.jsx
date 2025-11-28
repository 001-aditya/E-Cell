import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, LogOut } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthProvider";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Team", to: "/team" },
  { label: "Gallery", to: "/gallery" },
  { label: "Blog", to: "/blog" },
  { label: "Events", to: "/events" }
];

const Navbar = () => {
  const navigate = useNavigate();
  const { user, profile, signOut, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const ActionButtons = () => {
    if (loading) {
      return <span className="text-white/60 text-sm">Syncing...</span>;
    }

    if (!user) {
      return (
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-white/30 text-white bg-transparent hover:bg-white/10"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button
            className="bg-yellow-400 text-black hover:bg-yellow-300"
            onClick={() => navigate("/signup")}
          >
            Create account
          </Button>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-3">
        {profile?.role === "admin" && (
          <Button
            variant="outline"
            className="border-yellow-400/60 text-yellow-300"
            onClick={() => navigate("/admin")}
          >
            Admin
          </Button>
        )}
        <Button
          variant="outline"
          className="border-white/30 text-white bg-transparent hover:bg-white/10"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </Button>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-1 text-xs uppercase tracking-[0.3em] text-white/60 hover:text-yellow-300 transition"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    );
  };

  return (
    <header className="w-full border-b border-white/10 bg-gray-900/40 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-white text-3xl font-semibold tracking-wide">
          E-Cell
        </Link>

        <nav className="hidden md:flex gap-6 text-sm">
          {navLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-white/80 hover:text-yellow-300 transition tracking-wide uppercase"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex">
          <ActionButtons />
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="md:hidden text-white">
            <Menu className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent side="right" className="bg-gray-950 text-white">
            <div className="flex flex-col gap-4 mt-8">
              {navLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-6 border-t border-white/10 space-y-4">
                <ActionButtons />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
