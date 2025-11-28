import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const placeholderArticle = {
  title: "Article not found",
  excerpt: "We couldn’t find this story. Head back to the blog overview.",
  content:
    "The blog you are looking for is unavailable right now. Please head back to the blog home and pick another story.",
  tags: [],
  published_at: new Date().toISOString()
};

const BlogDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error) throw error;
        setArticle(data);
      } catch (error) {
        console.warn("Unable to load article:", error);
        setArticle(placeholderArticle);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadArticle();
    }
  }, [slug]);

  if (loading) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center text-white">
        Loading story...
      </section>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <article className="text-white max-w-4xl mx-auto px-4 py-16 space-y-8">
      <Link
        to="/blog"
        className="text-sm uppercase tracking-[0.3em] text-yellow-400 hover:text-yellow-200 transition"
      >
        ← Back to blog
      </Link>

      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-yellow-400">
          {article.published_at
            ? new Date(article.published_at).toLocaleDateString(undefined, {
                day: "numeric",
                month: "short",
                year: "numeric"
              })
            : "Draft"}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mt-4">{article.title}</h1>
        {article.excerpt && (
          <p className="mt-4 text-lg text-white/70">{article.excerpt}</p>
        )}
        {(article.tags || []).length > 0 && (
          <div className="flex gap-3 flex-wrap mt-6">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs bg-yellow-400/10 border border-yellow-400/40 text-yellow-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {article.cover_image && (
        <div className="rounded-3xl overflow-hidden border border-white/10">
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full object-cover max-h-[480px]"
          />
        </div>
      )}

      <div className="prose prose-invert max-w-none">
        {article.content ? (
          article.content.split("\n").map((paragraph, index) => (
            <p key={index} className="text-white/80 leading-relaxed">
              {paragraph}
            </p>
          ))
        ) : (
          <p className="text-white/70">
            This article is still being drafted. Check back soon.
          </p>
        )}
      </div>
    </article>
  );
};

export default BlogDetail;

