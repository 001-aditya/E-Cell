import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../context/AuthProvider";
import Background from "../Background";

const Dashboard = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [profileForm, setProfileForm] = useState({
    name: "",
    branch: "",
    year: "",
    roll_no: "",
    phone: ""
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);
  const [newRegistration, setNewRegistration] = useState({
    event_id: "",
    phone: ""
  });
  const [registerLoading, setRegisterLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setProfileForm({
        name: profile.name ?? "",
        branch: profile.branch ?? "",
        year: profile.year ?? "",
        roll_no: profile.roll_no ?? "",
        phone: profile.phone ?? ""
      });
      setNewRegistration((prev) => ({
        ...prev,
        phone: profile.phone ?? ""
      }));
    }
  }, [profile]);

  useEffect(() => {
    if (!user) return;
    loadRegistrations();
    loadEvents();
  }, [user]);

  useEffect(() => {
    const eventParam = searchParams.get("event");
    if (eventParam) {
      setNewRegistration((prev) => ({ ...prev, event_id: eventParam }));
    }
  }, [searchParams]);

  const loadRegistrations = async () => {
    const { data, error } = await supabase
      .from("event_registrations")
      .select("*, events(*)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error) {
      setRegistrations(data);
    }
  };

  const loadEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });
    if (!error) {
      setEvents(data);
    }
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      ...profileForm
    });
    if (error) {
      alert(error.message);
    } else {
      await loadRegistrations();
    }
    setSavingProfile(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!newRegistration.event_id) {
      alert("Pick an event first.");
      return;
    }
    setRegisterLoading(true);
    const { error } = await supabase.from("event_registrations").insert({
      event_id: newRegistration.event_id,
      user_id: user.id,
      full_name: profileForm.name,
      email: user.email,
      phone: newRegistration.phone || profileForm.phone,
      branch: profileForm.branch,
      year: profileForm.year
    });
    if (error) {
      alert(error.message);
    } else {
      setNewRegistration({ event_id: "", phone: profileForm.phone });
      setSearchParams({});
      await loadRegistrations();
    }
    setRegisterLoading(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-white">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8">
          Syncing your dashboard...
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Background />
      <section className="max-w-6xl mx-auto px-4 py-12 text-white space-y-12">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8">
          <p className="text-sm uppercase tracking-[0.4em] text-yellow-300">
            Member dashboard
          </p>
          <h1 className="text-4xl font-bold mt-3">
            Welcome back, {profileForm.name || "member"}
          </h1>
          <p className="text-white/70 mt-4">
            Manage your profile, register for upcoming events, and keep track of
            every activity in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <form
            onSubmit={handleProfileSave}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 space-y-4 shadow-xl hover:shadow-2xl transition-all duration-500"
          >
            <h2 className="text-2xl font-semibold text-yellow-300">Profile</h2>
            <p className="text-sm text-white/60">
              Keep your information updated for faster event approvals.
            </p>

            {["name", "branch", "year", "roll_no", "phone"].map((field) => (
              <input
                key={field}
                className="input"
                placeholder={field.replace("_", " ").toUpperCase()}
                value={profileForm[field]}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, [field]: e.target.value })
                }
              />
            ))}

            <button
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              disabled={savingProfile}
            >
              {savingProfile ? "Saving..." : "Save profile"}
            </button>
          </form>

          <form
            onSubmit={handleRegister}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 space-y-4 shadow-xl hover:shadow-2xl transition-all duration-500"
          >
            <h2 className="text-2xl font-semibold text-yellow-300">Register for an event</h2>
            <p className="text-sm text-white/60">
              Choose an upcoming event and lock your seat instantly.
            </p>
            <select
              className="input"
              value={newRegistration.event_id}
              onChange={(e) =>
                setNewRegistration({ ...newRegistration, event_id: e.target.value })
              }
            >
              <option value="">Select event</option>
              {events.map((event) => (
                <option value={event.id} key={event.id}>
                  {event.title}
                  {event.date
                    ? ` • ${new Date(event.date).toLocaleDateString()}`
                    : ""}
                </option>
              ))}
            </select>
            <input
              className="input"
              placeholder="Phone number"
              value={newRegistration.phone}
              onChange={(e) =>
                setNewRegistration({ ...newRegistration, phone: e.target.value })
              }
            />
            <button
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              disabled={registerLoading}
            >
              {registerLoading ? "Submitting..." : "Submit registration"}
            </button>
          </form>
        </div>

        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-yellow-300">My registrations</h2>
          {registrations.length === 0 ? (
            <p className="text-white/60">No registrations yet.</p>
          ) : (
            <div className="space-y-4">
              {registrations.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row md:items-center justify-between backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-4 gap-3 hover:bg-white/10 transition-all"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-yellow-400">
                      {item.events?.date
                        ? new Date(item.events.date).toLocaleDateString()
                        : "TBA"}
                    </p>
                    <h3 className="text-xl font-semibold">
                      {item.events?.title || "Event"}
                    </h3>
                    <p className="text-white/60 text-sm">
                      Status:{" "}
                      <span className="text-yellow-300 font-semibold">
                        {item.status?.toUpperCase()}
                      </span>
                    </p>
                  </div>
                  <div className="text-white/70 text-sm">
                    Registered on{" "}
                    {new Date(item.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
