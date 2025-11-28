import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const TeamPage = () => {
  const [teamGroups, setTeamGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("priority", { ascending: true });

      if (error) throw error;

      // Group by category
      const groups = {};
      data.forEach((member) => {
        if (!groups[member.category]) {
          groups[member.category] = [];
        }
        groups[member.category].push(member);
      });

      // Convert to array format expected by UI
      // Define specific order for all 15 categories
      const categoryOrder = [
        "Faculty & E-Cell Head",
        "Event Head",
        "Event Coordinator",
        "Corporate & Marketing Head",
        "Corporate & Marketing Coordinator",
        "Media Head",
        "Media Coordinator",
        "Student Body & Startup Monitoring Head",
        "Student Body & Startup Monitoring Coordinators",
        "Web Development & Designing Head",
        "Web Designing & Development Coordinator",
        "Research Analyst",
        "Research Coordinators",
        "Volunteers",
        "Mentors"
      ];

      const sortedGroups = Object.keys(groups)
        .sort((a, b) => {
          const indexA = categoryOrder.indexOf(a);
          const indexB = categoryOrder.indexOf(b);
          // If both are in the list, sort by index
          if (indexA !== -1 && indexB !== -1) return indexA - indexB;
          // If only A is in the list, A comes first
          if (indexA !== -1) return -1;
          // If only B is in the list, B comes first
          if (indexB !== -1) return 1;
          // If neither, sort alphabetically
          return a.localeCompare(b);
        })
        .map((category) => ({
          title: category,
          members: groups[category]
        }));

      setTeamGroups(sortedGroups);
    } catch (error) {
      console.error("Error fetching team:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full text-white p-4 sm:p-6">

      {/* Header */}
      <div className="max-w-5xl mx-auto text-center space-y-3 mb-12">
        <p className="text-sm uppercase tracking-[0.4em] text-yellow-300">
          People behind the initiatives
        </p>
        <h1 className="text-4xl font-bold">Meet the E-Cell Team</h1>
        <p className="text-white/70 max-w-lg mx-auto">
          Faculty mentors, student leads, and coordinators who run every event.
        </p>
      </div>

      {loading ? (
        <div className="text-center text-white/60">Loading team...</div>
      ) : (
        <>
          {/* Loop through groups */}
          {teamGroups.map((group) => (
            <div key={group.title} className="mb-16 max-w-7xl mx-auto ">

              {/* Group Title */}
              <h2 className="text-2xl font-semibold mb-8 text-center">
                {group.title}
              </h2>

              {/* Responsive Grid - Boxes Center aligned */}
              <div
                className="
                  grid
                  gap-8
                  grid-cols-1
                  sm:grid-cols-2
                  md:grid-cols-3
                  lg:grid-cols-4
                  items-center  
                  justify-items-center
                "
              >
                {group.members.map((m, index) => (
                  <div
                    key={m.id || index}
                    className="
                      w-full 
                      max-w-xs
                      bg-gradient-to-br from-white/10 to-white/5
                      backdrop-blur-lg
                      rounded-2xl 
                      p-6 
                      flex 
                      flex-col 
                      items-center 
                      text-center 
                      transition-all
                      duration-300
                      hover:scale-105
                      hover:from-white/15 hover:to-white/10
                      hover:shadow-[0_8px_32px_0_rgba(255,215,0,0.2)]
                      border 
                      border-white/20
                      hover:border-yellow-400/50
                    "
                  >
                    {/* Profile Image */}
                    <img
                      src={m.photo_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + m.name}
                      alt={m.name}
                      className="
                        w-32 h-32 
                        sm:w-36 sm:h-36
                        rounded-full 
                        object-cover 
                        mb-4 
                        border-4 
                        border-yellow-400/80
                        shadow-lg
                        transition-transform
                        duration-300
                        hover:scale-110
                      "
                    />

                    {/* Name & Post */}
                    <h3 className="font-bold text-lg mb-1">{m.name}</h3>
                    <p className="text-yellow-400 text-sm mb-4">{m.post}</p>

                    {/* Connect Button */}
                    {m.email && (
                      <a
                        href={m.email.includes('@') ? `mailto:${m.email}` : m.email}
                        target={m.email.includes('@') ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        className="
                          px-6 py-2.5
                          bg-gradient-to-r from-yellow-400 to-yellow-500
                          text-black 
                          rounded-lg 
                          hover:from-yellow-500 hover:to-yellow-600
                          transition-all
                          duration-300
                          font-semibold
                          text-sm
                          shadow-md
                          hover:shadow-lg
                          hover:scale-105
                        "
                      >
                        Connect
                      </a>
                    )}
                  </div>
                ))}
              </div>

              {/* Decorative Divider */}
              <div className="w-40 h-[2px] bg-yellow-400/50 mx-auto mt-10 rounded-full"></div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default TeamPage;
