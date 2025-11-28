import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { blogsAPI } from '../../services/api';

interface BlogContentSection {
  type: 'heading' | 'paragraph' | 'blockquote' | 'list';
  level?: number;
  text?: string;
  items?: string[];
  ordered?: boolean;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  published_date: string;
  cover_image: string;
  read_time: string;
  full_content?: {
    sections?: BlogContentSection[];
  };
  key_points?: string[];
  tags?: string[];
}

export default function BlogDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
    window.scrollTo(0, 0);
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await blogsAPI.getById(id!);
      setPost(response.data?.blog || null);
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const renderContent = (sections?: BlogContentSection[]) => {
    if (!sections || sections.length === 0) return null;

    return sections.map((section, index) => {
      if (section.type === 'heading') {
        const HeadingTag = `h${section.level || 2}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag key={index} className="text-2xl font-bold text-white mt-12 mb-6">
            {section.text}
          </HeadingTag>
        );
      } else if (section.type === 'paragraph') {
        return (
          <p key={index} className="mb-6">
            {section.text}
          </p>
        );
      } else if (section.type === 'blockquote') {
        return (
          <blockquote key={index} className="border-l-4 border-cyan-500 pl-6 py-2 my-8 italic text-white/90 bg-white/5 rounded-r-lg">
            "{section.text}"
          </blockquote>
        );
      } else if (section.type === 'list') {
        const ListTag = section.ordered ? 'ol' : 'ul';
        return (
          <ListTag
            key={index}
            className={`${section.ordered ? 'list-decimal' : 'list-disc'} pl-6 space-y-3 marker:text-cyan-400 my-6`}
          >
            {section.items?.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ListTag>
        );
      }
      return null;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <i className="ri-loader-4-line text-cyan-400 text-4xl animate-spin mb-4"></i>
          <p className="text-white/60">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-white font-bold mb-4">Post not found</h2>
          <Link to="/blogs" className="text-cyan-400 hover:underline">Back to Blogs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-['Manrope',sans-serif]">
      <Header active="blogs" />

      {/* Hero Section with Image */}
      <div className="relative h-[60vh] min-h-[500px]">
        <div className="absolute inset-0">
          {post.cover_image ? (
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/40 to-[#0a0a0a]"></div>
        </div>

        <div className="absolute inset-0 flex items-end pb-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 w-full">
            <Link
              to="/blogs"
              className="inline-flex items-center text-white/60 hover:text-cyan-400 transition-colors mb-8 group"
            >
              <i className="ri-arrow-left-line mr-2 transform group-hover:-translate-x-1 transition-transform"></i>
              Back to Blogs
            </Link>

            <div className="space-y-6">
              {post.category && (
                <span className="inline-block px-4 py-1.5 bg-cyan-500/20 border border-cyan-500/30 backdrop-blur-md rounded-full text-cyan-300 text-sm font-bold uppercase tracking-wider">
                  {post.category}
                </span>
              )}

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                {post.title}
              </h1>

              <div className="flex items-center space-x-6 text-white/60">
                {post.published_date && (
                  <div className="flex items-center">
                    <i className="ri-calendar-line mr-2 text-cyan-400"></i>
                    {formatDate(post.published_date)}
                  </div>
                )}
                {post.read_time && (
                  <div className="flex items-center">
                    <i className="ri-time-line mr-2 text-cyan-400"></i>
                    {post.read_time}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="relative py-20 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg prose-invert max-w-none">
            {post.excerpt && (
              <p className="lead text-xl text-white/80 leading-relaxed mb-8 font-medium">
                {post.excerpt}
              </p>
            )}

            <div className="space-y-6 text-white/70 leading-relaxed">
              {renderContent(post.full_content?.sections)}
            </div>
          </div>

          {/* Key Points */}
          {post.key_points && post.key_points.length > 0 && (
            <div className="mt-12 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Key Takeaways</h2>
              <ul className="list-none pl-0 space-y-3">
                {post.key_points.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-cyan-400 mr-3 mt-1">•</span>
                    <span className="text-white/80 text-base leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-4">
              <span className="text-white/40 mr-2">Tags:</span>
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/5 rounded-full text-sm text-white/60 hover:bg-white/10 cursor-pointer transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
