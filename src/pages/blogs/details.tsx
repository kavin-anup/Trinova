import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { BLOG_POSTS } from './page';

export default function BlogDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const post = BLOG_POSTS.find(p => p.id === id);

    useEffect(() => {
        if (!post) {
            // Ideally redirect to 404 or blogs list if not found
            // navigate('/blogs'); 
        }
        window.scrollTo(0, 0);
    }, [post, navigate]);

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
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
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
                            <span className="inline-block px-4 py-1.5 bg-cyan-500/20 border border-cyan-500/30 backdrop-blur-md rounded-full text-cyan-300 text-sm font-bold uppercase tracking-wider">
                                {post.category}
                            </span>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex items-center space-x-6 text-white/60">
                                <div className="flex items-center">
                                    <i className="ri-calendar-line mr-2 text-cyan-400"></i>
                                    {post.date}
                                </div>
                                <div className="flex items-center">
                                    <i className="ri-time-line mr-2 text-cyan-400"></i>
                                    {post.readTime}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <section className="relative py-20 px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="prose prose-lg prose-invert max-w-none">
                        <p className="lead text-xl text-white/80 leading-relaxed mb-8 font-medium">
                            {post.excerpt}
                        </p>

                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>

                            <h2 className="text-2xl font-bold text-white mt-12 mb-6">The Evolution of Technology</h2>
                            <p>
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>

                            <blockquote className="border-l-4 border-cyan-500 pl-6 py-2 my-8 italic text-white/90 bg-white/5 rounded-r-lg">
                                "Innovation distinguishes between a leader and a follower. The future belongs to those who prepare for it today."
                            </blockquote>

                            <p>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                            </p>

                            <h2 className="text-2xl font-bold text-white mt-12 mb-6">Key Takeaways</h2>
                            <ul className="list-disc pl-6 space-y-3 marker:text-cyan-400">
                                <li>Understanding the core principles of modern engineering.</li>
                                <li>Leveraging AI for predictive maintenance and optimization.</li>
                                <li>Building sustainable ecosystems for long-term growth.</li>
                            </ul>

                            <p className="mt-8">
                                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                            </p>
                        </div>
                    </div>

                    {/* Share / Tags */}
                    <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-4">
                        <span className="text-white/40 mr-2">Tags:</span>
                        {['Technology', 'Innovation', 'Future', 'Engineering'].map(tag => (
                            <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-sm text-white/60 hover:bg-white/10 cursor-pointer transition-colors">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
