import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthProvider";
import Background from "../components/Background";

const slugify = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const emptyBlog = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image: "",
  tags: ""
};

const emptyMember = {
  name: "",
  post: "",
  category: "",
  email: "",
  photo_url: "",
  priority: ""
};

const emptyEvent = {
  title: "",
  subtitle: "",
  description: "",
  location: "",
  date: "",
  cover_image: "",
  registration_deadline: ""
};

const uploadImage = async (file, folder) => {
  if (!file) return null;
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("images")
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage.from("images").getPublicUrl(filePath);
  return data.publicUrl;
};

const Admin = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState("blogs");
  const [blogs, setBlogs] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);

  const [blogForm, setBlogForm] = useState(emptyBlog);
  const [blogImageFile, setBlogImageFile] = useState(null);
  const [editingBlogId, setEditingBlogId] = useState(null);

  const [memberForm, setMemberForm] = useState(emptyMember);
  const [memberImageFile, setMemberImageFile] = useState(null);
  const [editingMemberId, setEditingMemberId] = useState(null);

  const [eventForm, setEventForm] = useState(emptyEvent);
  const [eventImageFile, setEventImageFile] = useState(null);
  const [editingEventId, setEditingEventId] = useState(null);

  const [galleryForm, setGalleryForm] = useState({
    title: "",
    category: "One Week International Workshop",
    image_url: ""
  });
  const [galleryImageFile, setGalleryImageFile] = useState(null);

  useEffect(() => {
    loadBlogs();
    loadTeam();
    loadEvents();
    loadGallery();
  }, []);

  const loadBlogs = async () => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("published_at", { ascending: false });
    if (!error) {
      setBlogs(data);
    }
  };

  const loadTeam = async () => {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("priority", { ascending: true });
    if (!error) {
      setTeamMembers(data);
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

  const loadGallery = async () => {
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) {
      setGallery(data);
    }
  };

  // Blog handlers
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = blogForm.cover_image;
      if (blogImageFile) {
        imageUrl = await uploadImage(blogImageFile, "blogs");
      }

      const payload = {
        ...blogForm,
        cover_image: imageUrl,
        slug: blogForm.slug || slugify(blogForm.title),
        published_at: new Date().toISOString(),
        author_id: profile?.id
      };

      console.log("Submitting Blog:", payload);

      if (editingBlogId) {
        const { error } = await supabase
          .from("blogs")
          .update(payload)
          .eq("id", editingBlogId);
        if (error) {
          console.error("Blog Update Error:", error);
          throw error;
        }
      } else {
        const { error } = await supabase.from("blogs").insert([payload]);
        if (error) {
          console.error("Blog Insert Error:", error);
          throw error;
        }
      }

      setBlogForm(emptyBlog);
      setBlogImageFile(null);
      setEditingBlogId(null);
      await loadBlogs();
    } catch (error) {
      alert(`Blog save failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleBlogEdit = (blog) => {
    setEditingBlogId(blog.id);
    setBlogForm({
      title: blog.title ?? "",
      slug: blog.slug ?? "",
      excerpt: blog.excerpt ?? "",
      content: blog.content ?? "",
      cover_image: blog.cover_image ?? "",
      tags: blog.tags ?? ""
    });
    setBlogImageFile(null);
  };

  const handleBlogDelete = async (id) => {
    if (!confirm("Delete this blog?")) return;
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (!error) {
      await loadBlogs();
    }
  };

  // Team member handlers
  const handleMemberSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let photoUrl = memberForm.photo_url;
      if (memberImageFile) {
        photoUrl = await uploadImage(memberImageFile, "team");
      }

      const payload = {
        ...memberForm,
        photo_url: photoUrl,
        priority: memberForm.priority && !isNaN(memberForm.priority) ? parseInt(memberForm.priority) : 999
      };

      console.log("Submitting Member:", { editingMemberId, payload });

      if (editingMemberId) {
        const { error } = await supabase
          .from("team_members")
          .update(payload)
          .eq("id", editingMemberId);
        if (error) {
          console.error("Update Error:", error);
          throw error;
        }
      } else {
        const { error } = await supabase
          .from("team_members")
          .insert([payload]);
        if (error) throw error;
      }

      setMemberForm(emptyMember);
      setMemberImageFile(null);
      setEditingMemberId(null);
      await loadTeam();
    } catch (error) {
      alert(`Team save failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleMemberEdit = (member) => {
    setEditingMemberId(member.id);
    setMemberForm({
      name: member.name ?? "",
      post: member.post ?? "",
      category: member.category ?? "",
      email: member.email ?? "",
      photo_url: member.photo_url ?? "",
      priority: member.priority ?? ""
    });
    setMemberImageFile(null);
  };

  const handleMemberDelete = async (id) => {
    if (!confirm("Delete this team member?")) return;
    const { error } = await supabase
      .from("team_members")
      .delete()
      .eq("id", id);
    if (!error) {
      await loadTeam();
    }
  };

  // Event handlers
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = eventForm.cover_image;
      if (eventImageFile) {
        imageUrl = await uploadImage(eventImageFile, "events");
      }

      const payload = {
        ...eventForm,
        cover_image: imageUrl
      };

      if (editingEventId) {
        const { error } = await supabase
          .from("events")
          .update(payload)
          .eq("id", editingEventId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("events").insert([payload]);
        if (error) throw error;
      }

      setEventForm(emptyEvent);
      setEventImageFile(null);
      setEditingEventId(null);
      await loadEvents();
    } catch (error) {
      alert(`Event save failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEventEdit = (event) => {
    setEditingEventId(event.id);
    setEventForm({
      title: event.title ?? "",
      subtitle: event.subtitle ?? "",
      description: event.description ?? "",
      location: event.location ?? "",
      date: event.date ?? "",
      cover_image: event.cover_image ?? "",
      registration_deadline: event.registration_deadline ?? ""
    });
    setEventImageFile(null);
  };

  const handleEventDelete = async (id) => {
    if (!confirm("Delete this event?")) return;
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (!error) {
      await loadEvents();
    }
  };

  // Gallery handlers
  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = galleryForm.image_url;
      if (galleryImageFile) {
        imageUrl = await uploadImage(galleryImageFile, "gallery");
      }

      const payload = { ...galleryForm, image_url: imageUrl };
      console.log("Submitting Gallery Image:", payload);

      const { error } = await supabase
        .from("gallery_images")
        .insert([payload]);
      if (error) {
        console.error("Gallery Insert Error:", error);
        throw error;
      }

      setGalleryForm({ title: "", category: "One Week International Workshop", image_url: "" });
      setGalleryImageFile(null);
      await loadGallery();
    } catch (error) {
      alert(`Gallery save failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGalleryDelete = async (id) => {
    if (!confirm("Delete this image?")) return;
    const { error } = await supabase
      .from("gallery_images")
      .delete()
      .eq("id", id);
    if (!error) {
      await loadGallery();
    }
  };

  if (!profile || profile.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Access Denied. Admin only.</p>
      </div>
    );
  }

  return (
    <>
      <Background />
      <section className="px-4 py-16 text-white max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-yellow-300">
          Admin Dashboard
        </h1>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-10 flex-wrap justify-center">
          {["blogs", "team", "events", "gallery"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === tab
                ? "bg-yellow-400 text-black"
                : "bg-white/10 hover:bg-white/20"
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* BLOGS TAB */}
        {activeTab === "blogs" && (
          <div className="space-y-10">
            <form
              onSubmit={handleBlogSubmit}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 space-y-4 shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <h2 className="text-2xl font-semibold text-yellow-300">
                {editingBlogId ? "Edit blog" : "Create Blog Post"}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  className="input"
                  placeholder="Title"
                  value={blogForm.title}
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, title: e.target.value })
                  }
                  required
                />
                <input
                  className="input"
                  placeholder="Slug (optional)"
                  value={blogForm.slug}
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, slug: e.target.value })
                  }
                />
              </div>
              <textarea
                className="input min-h-[100px]"
                placeholder="Excerpt"
                value={blogForm.excerpt}
                onChange={(e) =>
                  setBlogForm({ ...blogForm, excerpt: e.target.value })
                }
              />
              <textarea
                className="input min-h-[200px]"
                placeholder="Content (Markdown supported)"
                value={blogForm.content}
                onChange={(e) =>
                  setBlogForm({ ...blogForm, content: e.target.value })
                }
                required
              />
              <div className="space-y-2">
                <label className="text-sm text-white/60 ml-1">Cover Image</label>
                <div className="flex gap-4 items-center">
                  <input
                    type="file"
                    accept="image/*"
                    className="input flex-1"
                    onChange={(e) => setBlogImageFile(e.target.files[0])}
                  />
                  {blogForm.cover_image && !blogImageFile && (
                    <img src={blogForm.cover_image} alt="Current" className="h-10 w-10 rounded object-cover" />
                  )}
                </div>
              </div>
              <button
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
                disabled={loading}
              >
                {loading ? "Saving..." : editingBlogId ? "Update blog" : "Publish blog"}
              </button>
              {editingBlogId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingBlogId(null);
                    setBlogForm(emptyBlog);
                    setBlogImageFile(null);
                  }}
                  className="ml-4 text-white/70 hover:text-white"
                >
                  Cancel Edit
                </button>
              )}
            </form>

            <div className="grid md:grid-cols-2 gap-6">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
                >
                  <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                  <p className="text-sm text-white/60 mb-4 line-clamp-2">
                    {blog.excerpt}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleBlogEdit(blog)}
                      className="text-yellow-300 hover:text-yellow-200 text-sm font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleBlogDelete(blog.id)}
                      className="text-red-400 hover:text-red-300 text-sm font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TEAM TAB */}
        {activeTab === "team" && (
          <div className="space-y-10">
            <form
              onSubmit={handleMemberSubmit}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 space-y-4 shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <h2 className="text-2xl font-semibold text-yellow-300">
                {editingMemberId ? "Edit Member" : "Add Team Member"}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  className="input"
                  placeholder="Name"
                  value={memberForm.name}
                  onChange={(e) =>
                    setMemberForm({ ...memberForm, name: e.target.value })
                  }
                  required
                />
                <input
                  className="input"
                  placeholder="Post / Role"
                  value={memberForm.post}
                  onChange={(e) =>
                    setMemberForm({ ...memberForm, post: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <select
                  className="input"
                  value={memberForm.category}
                  onChange={(e) =>
                    setMemberForm({ ...memberForm, category: e.target.value })
                  }
                  required
                >
                  <option value="" className="text-gray-400 bg-gray-900">Select Category</option>
                  <option value="Faculty & E-Cell Head" className="text-white bg-gray-900">Faculty & E-Cell Head</option>
                  <option value="Event Head" className="text-white bg-gray-900">Event Head</option>
                  <option value="Event Coordinator" className="text-white bg-gray-900">Event Coordinator</option>
                  <option value="Corporate & Marketing Head" className="text-white bg-gray-900">Corporate & Marketing Head</option>
                  <option value="Corporate & Marketing Coordinator" className="text-white bg-gray-900">Corporate & Marketing Coordinator</option>
                  <option value="Media Head" className="text-white bg-gray-900">Media Head</option>
                  <option value="Media Coordinator" className="text-white bg-gray-900">Media Coordinator</option>
                  <option value="Student Body & Startup Monitoring Head" className="text-white bg-gray-900">Student Body & Startup Monitoring Head</option>
                  <option value="Student Body & Startup Monitoring Coordinators" className="text-white bg-gray-900">Student Body & Startup Monitoring Coordinators</option>
                  <option value="Web Development & Designing Head" className="text-white bg-gray-900">Web Development & Designing Head</option>
                  <option value="Web Designing & Development Coordinator" className="text-white bg-gray-900">Web Designing & Development Coordinator</option>
                  <option value="Research Analyst" className="text-white bg-gray-900">Research Analyst</option>
                  <option value="Research Coordinators" className="text-white bg-gray-900">Research Coordinators</option>
                  <option value="Volunteers" className="text-white bg-gray-900">Volunteers</option>
                  <option value="Mentors" className="text-white bg-gray-900">Mentors</option>
                </select>
                <input
                  className="input"
                  placeholder="Email or Social Link"
                  value={memberForm.email}
                  onChange={(e) =>
                    setMemberForm({ ...memberForm, email: e.target.value })
                  }
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-white/60 ml-1">Photo</label>
                  <div className="flex gap-4 items-center">
                    <input
                      type="file"
                      accept="image/*"
                      className="input flex-1"
                      onChange={(e) => setMemberImageFile(e.target.files[0])}
                    />
                    {memberForm.photo_url && !memberImageFile && (
                      <img src={memberForm.photo_url} alt="Current" className="h-10 w-10 rounded-full object-cover" />
                    )}
                  </div>
                </div>
                <input
                  className="input"
                  placeholder="Priority (1-999)"
                  type="number"
                  value={memberForm.priority}
                  onChange={(e) =>
                    setMemberForm({ ...memberForm, priority: e.target.value })
                  }
                />
              </div>
              <button
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
                disabled={loading}
              >
                {loading ? "Saving..." : editingMemberId ? "Update Member" : "Add Member"}
              </button>
              {editingMemberId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingMemberId(null);
                    setMemberForm(emptyMember);
                    setMemberImageFile(null);
                  }}
                  className="ml-4 text-white/70 hover:text-white"
                >
                  Cancel Edit
                </button>
              )}
            </form>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/10 transition-all"
                >
                  <img
                    src={member.photo_url || `https://ui-avatars.com/api/?name=${member.name}`}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold truncate">{member.name}</h4>
                    <p className="text-xs text-white/60 truncate">{member.post}</p>
                    <p className="text-xs text-yellow-300/80 truncate">{member.category}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleMemberEdit(member)}
                      className="text-yellow-300 hover:text-yellow-200 text-xs font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleMemberDelete(member.id)}
                      className="text-red-400 hover:text-red-300 text-xs font-semibold"
                    >
                      Del
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EVENTS TAB */}
        {activeTab === "events" && (
          <div className="space-y-10">
            <form
              onSubmit={handleEventSubmit}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 space-y-4 shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <h2 className="text-2xl font-semibold text-yellow-300">
                {editingEventId ? "Edit Event" : "Create Event"}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  className="input"
                  placeholder="Event Title"
                  value={eventForm.title}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, title: e.target.value })
                  }
                  required
                />
                <input
                  className="input"
                  placeholder="Subtitle"
                  value={eventForm.subtitle}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, subtitle: e.target.value })
                  }
                />
              </div>
              <textarea
                className="input min-h-[100px]"
                placeholder="Description"
                value={eventForm.description}
                onChange={(e) =>
                  setEventForm({ ...eventForm, description: e.target.value })
                }
              />
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  className="input"
                  placeholder="Location"
                  value={eventForm.location}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, location: e.target.value })
                  }
                />
                <div className="space-y-2">
                  <label className="text-sm text-white/60 ml-1">Cover Image</label>
                  <div className="flex gap-4 items-center">
                    <input
                      type="file"
                      accept="image/*"
                      className="input flex-1"
                      onChange={(e) => setEventImageFile(e.target.files[0])}
                    />
                    {eventForm.cover_image && !eventImageFile && (
                      <img src={eventForm.cover_image} alt="Current" className="h-10 w-10 rounded object-cover" />
                    )}
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/60 ml-1 mb-1 block">Event Date</label>
                  <input
                    type="datetime-local"
                    className="input w-full"
                    value={eventForm.date ? new Date(eventForm.date).toISOString().slice(0, 16) : ""}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, date: new Date(e.target.value).toISOString() })
                    }
                  />
                </div>
                <div>
                  <label className="text-xs text-white/60 ml-1 mb-1 block">Registration Deadline</label>
                  <input
                    type="datetime-local"
                    className="input w-full"
                    value={eventForm.registration_deadline ? new Date(eventForm.registration_deadline).toISOString().slice(0, 16) : ""}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, registration_deadline: new Date(e.target.value).toISOString() })
                    }
                  />
                </div>
              </div>
              <button
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
                disabled={loading}
              >
                {loading ? "Saving..." : editingEventId ? "Update Event" : "Publish Event"}
              </button>
              {editingEventId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingEventId(null);
                    setEventForm(emptyEvent);
                    setEventImageFile(null);
                  }}
                  className="ml-4 text-white/70 hover:text-white"
                >
                  Cancel Edit
                </button>
              )}
            </form>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{event.title}</h3>
                    <span className="text-xs bg-yellow-400/20 text-yellow-300 px-2 py-1 rounded">
                      {event.date ? new Date(event.date).toLocaleDateString() : "TBA"}
                    </span>
                  </div>
                  <p className="text-sm text-white/60 mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEventEdit(event)}
                      className="text-yellow-300 hover:text-yellow-200 text-sm font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleEventDelete(event.id)}
                      className="text-red-400 hover:text-red-300 text-sm font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GALLERY TAB */}
        {activeTab === "gallery" && (
          <div className="space-y-10">
            <form
              onSubmit={handleGallerySubmit}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 space-y-4 shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <h2 className="text-2xl font-semibold text-yellow-300">
                Add Gallery Image
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  className="input"
                  placeholder="Image Title"
                  value={galleryForm.title}
                  onChange={(e) =>
                    setGalleryForm({ ...galleryForm, title: e.target.value })
                  }
                  required
                />
                <select
                  className="input"
                  value={galleryForm.category}
                  onChange={(e) =>
                    setGalleryForm({ ...galleryForm, category: e.target.value })
                  }
                >
                  <option value="One Week International Workshop" className="text-white bg-gray-900">One Week International Workshop</option>
                  <option value="Startup Spotlight" className="text-white bg-gray-900">Startup Spotlight</option>
                  <option value="E-Chaupal" className="text-white bg-gray-900">E-Chaupal</option>
                  <option value="Others" className="text-white bg-gray-900">Others</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/60 ml-1">Image</label>
                <div className="flex gap-4 items-center">
                  <input
                    type="file"
                    accept="image/*"
                    className="input flex-1"
                    onChange={(e) => setGalleryImageFile(e.target.files[0])}
                    required={!galleryForm.image_url}
                  />
                </div>
              </div>
              <button
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Image"}
              </button>
            </form>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((img) => (
                <div
                  key={img.id}
                  className="group relative aspect-square rounded-xl overflow-hidden border border-white/10"
                >
                  <img
                    src={img.image_url}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                    <p className="font-bold text-sm mb-1">{img.title}</p>
                    <p className="text-xs text-yellow-300 mb-3">{img.category}</p>
                    <button
                      onClick={() => handleGalleryDelete(img.id)}
                      className="bg-red-500/80 hover:bg-red-500 text-white text-xs px-3 py-1.5 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Admin;
