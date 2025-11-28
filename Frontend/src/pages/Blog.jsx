import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const fallbackBlogs = [
  {
    id: "placeholder-1",
    title: "Why Campus Startups Matter",
    slug: "why-campus-startups-matter",
    excerpt:
      "Inside our incubation journey and how we help students convert ideas into sustainable products.",
    tags: ["incubation", "students"],
    cover_image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=800&q=80",
    published_at: new Date().toISOString()
  }
];

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .order("published_at", { ascending: false });

        if (error) throw error;

        setArticles(data ?? []);
      } catch (error) {
        console.warn("Failed to load blogs from Supabase, using fallback:", error);
        setArticles(fallbackBlogs);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  const tagList = useMemo(() => {
    const tags = new Set();
    articles.forEach((article) => {
      (article.tags || []).forEach((tag) => tags.add(tag));
    });
    return ["all", ...Array.from(tags)];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        article.title?.toLowerCase().includes(search.toLowerCase()) ||
        article.excerpt?.toLowerCase().includes(search.toLowerCase());
      const matchesTag =
        tagFilter === "all" || (article.tags || []).includes(tagFilter);
      return matchesSearch && matchesTag;
    });
  }, [articles, search, tagFilter]);

  return (
    <section className="px-4 py-16 text-white max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <p className="uppercase tracking-[0.3em] text-yellow-300 text-sm mb-4">
          Insights & Stories
        </p>
        <h1 className="text-4xl md:text-5xl font-bold">
          E-Cell Blog & Knowledge Hub
        </h1>
        <p className="mt-4 text-gray-200 max-w-2xl mx-auto">
          Learn from founders, mentors, and student leaders building the
          entrepreneurial ecosystem at our campus.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <input
          type="search"
          placeholder="Search articles..."
          className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-yellow-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex flex-wrap gap-2">
          {tagList.map((tag) => (
            <button
              key={tag}
              onClick={() => setTagFilter(tag)}
              className={`px-4 py-2 rounded-full border text-sm transition ${
                tagFilter === tag
                  ? "bg-yellow-400 text-black border-yellow-300"
                  : "border-white/20 text-white/80 hover:border-yellow-400"
              }`}
            >
              {tag === "all" ? "All" : `#${tag}`}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="mt-20 text-center text-lg text-white/70">Loading stories...</div>
      ) : filteredArticles.length === 0 ? (
        <div className="mt-20 text-center text-white/80">
          No articles match your search yet.
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {filteredArticles.map((article) => (
            <Link
              to={`/blog/${article.slug}`}
              key={article.id}
              className="group rounded-3xl bg-white/5 border border-white/10 overflow-hidden transition hover:-translate-y-2 hover:border-yellow-400/60"
            >
              {article.cover_image && (
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${article.cover_image})` }}
                />
              )}
              <div className="p-6 flex flex-col gap-4">
                <div className="flex gap-2 flex-wrap">
                  {(article.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs bg-yellow-400/10 border border-yellow-400/40 text-yellow-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-yellow-400">
                    {article.published_at
                      ? new Date(article.published_at).toLocaleDateString()
                      : "Draft"}
                  </p>
                  <h3 className="text-2xl font-semibold mt-2 group-hover:text-yellow-300 transition">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-white/70 text-sm h-16 overflow-hidden">
                    {article.excerpt}
                  </p>
                </div>
                <span className="text-yellow-300 text-sm font-semibold">
                  Read more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default Blog;