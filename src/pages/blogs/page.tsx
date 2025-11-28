import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { blogsContentAPI, blogsAPI } from '../../services/api';

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    published_date: string;
    card_image: string;
    read_time: string;
}

export default function Blogs() {
    const [loading, setLoading] = useState(true);
    const [heroContent, setHeroContent] = useState({
        title_line1: 'Exploring the',
        title_line2: 'Frontiers of Tech',
        description: 'Discover the latest trends, innovations, and expert perspectives in AI, electronics, and manufacturing.'
    });
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [contentResponse, blogsResponse] = await Promise.all([
                blogsContentAPI.get(),
                blogsAPI.getPublic()
            ]);

            // Load Hero Content
            const content = contentResponse.data?.content || {};
            if (content.hero_title_line1?.value) setHeroContent(prev => ({ ...prev, title_line1: content.hero_title_line1.value }));
            if (content.hero_title_line2?.value) setHeroContent(prev => ({ ...prev, title_line2: content.hero_title_line2.value }));
            if (content.hero_description?.value) setHeroContent(prev => ({ ...prev, description: content.hero_description.value }));

            // Load Blog Posts
            setBlogPosts(blogsResponse.data?.blogs || []);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="text-center">
                    <i className="ri-loader-4-line text-cyan-400 text-4xl animate-spin mb-4"></i>
                    <p className="text-white/60">Loading blogs...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] font-['Manrope',sans-serif]">
            <Header active="blogs" />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-8 backdrop-blur-sm">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                        <span className="text-cyan-400 text-sm font-semibold tracking-wide">Our Latest Insights</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
                        {heroContent.title_line1} <br />
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                            {heroContent.title_line2}
                        </span>
                    </h1>

                    <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                        {heroContent.description}
                    </p>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="relative pb-32 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.length === 0 ? (
                            <div className="col-span-full text-center py-12">
                                <p className="text-white/60">No blog posts available yet.</p>
                            </div>
                        ) : (
                            blogPosts.map((post) => (
                                <Link
                                    to={`/blogs/${post.id}`}
                                    key={post.id}
                                    className="group relative bg-[#1a1a2e]/40 border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1"
                                >
                                    {/* Image Container */}
                                    <div className="relative h-64 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] to-transparent opacity-60 z-10"></div>
                                        {post.card_image ? (
                                            <img
                                                src={post.card_image}
                                                alt={post.title}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center">
                                                <i className="ri-image-line text-6xl text-white/20"></i>
                                            </div>
                                        )}
                                        {post.category && (
                                            <div className="absolute top-4 left-4 z-20">
                                                <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 backdrop-blur-md rounded-full text-cyan-300 text-xs font-bold uppercase tracking-wider">
                                                    {post.category}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 relative z-20">
                                        <div className="flex items-center space-x-4 text-sm text-white/40 mb-4">
                                            {post.published_date && (
                                                <div className="flex items-center">
                                                    <i className="ri-calendar-line mr-2"></i>
                                                    {formatDate(post.published_date)}
                                                </div>
                                            )}
                                            {post.read_time && (
                                                <div className="flex items-center">
                                                    <i className="ri-time-line mr-2"></i>
                                                    {post.read_time}
                                                </div>
                                            )}
                                        </div>

                                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>

                                        {post.excerpt && (
                                            <p className="text-white/60 mb-6 line-clamp-3 leading-relaxed">
                                                {post.excerpt}
                                            </p>
                                        )}

                                        <div className="flex items-center text-cyan-400 font-semibold group/link">
                                            Read Article
                                            <i className="ri-arrow-right-line ml-2 transform group-hover/link:translate-x-1 transition-transform"></i>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
