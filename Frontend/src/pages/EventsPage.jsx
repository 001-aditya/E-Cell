import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthProvider";
import Background from "../components/Background";

const EventsPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        try {
            const { data, error } = await supabase
                .from("events")
                .select("*")
                .order("date", { ascending: true });

            if (error) throw error;
            setEvents(data || []);
        } catch (error) {
            console.error("Error loading events:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterClick = (eventId) => {
        if (!user) {
            navigate(`/login?redirect=/dashboard&event=${eventId}`);
            return;
        }
        navigate(`/dashboard?event=${eventId}`);
    };

    if (loading) {
        return (
            <>
                <Background />
                <div className="min-h-screen flex items-center justify-center text-white">
                    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8">
                        Loading events...
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Background />
            <section className="min-h-screen px-4 py-16 text-white max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-sm uppercase tracking-[0.4em] text-yellow-300 mb-4">
                        Upcoming Programs
                    </p>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Build, Pitch, and Learn With Us
                    </h1>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">
                        Hands-on programs to sharpen your entrepreneurial mindset and connect with industry leaders.
                    </p>
                </div>

                {/* Events Grid */}
                {events.length === 0 ? (
                    <div className="text-center backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-12">
                        <p className="text-white/60 text-lg">
                            No events scheduled at the moment. Check back soon!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event) => (
                            <div
                                key={event.id}
                                className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 flex flex-col hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                            >
                                {/* Cover Image */}
                                {event.cover_image && (
                                    <div
                                        className="h-48 rounded-2xl mb-4 bg-cover bg-center"
                                        style={{ backgroundImage: `url(${event.cover_image})` }}
                                    />
                                )}

                                {/* Date */}
                                <p className="text-xs uppercase tracking-[0.4em] text-yellow-400">
                                    {event.date
                                        ? new Date(event.date).toLocaleDateString(undefined, {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric"
                                        })
                                        : "TBA"}
                                </p>

                                {/* Title & Subtitle */}
                                <h3 className="text-2xl font-semibold mt-2">{event.title}</h3>
                                <p className="text-white/70 text-sm mt-1">{event.subtitle}</p>

                                {/* Description */}
                                <p className="text-sm opacity-90 mt-4 flex-1">
                                    {event.description}
                                </p>

                                {/* Location */}
                                <p className="text-sm text-white/60 mt-4">
                                    📍 {event.location || "Campus"}
                                </p>

                                {/* Registration Deadline */}
                                {event.registration_deadline && (
                                    <p className="text-xs text-yellow-300 mt-2">
                                        Register by:{" "}
                                        {new Date(event.registration_deadline).toLocaleDateString()}
                                    </p>
                                )}

                                {/* Register Button */}
                                <button
                                    onClick={() => handleRegisterClick(event.id)}
                                    className="mt-5 w-full py-3 rounded-xl font-semibold bg-yellow-400 hover:bg-yellow-300 text-gray-900 transition-all duration-300 transform hover:scale-105"
                                >
                                    Register Now
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </>
    );
};

export default EventsPage;
