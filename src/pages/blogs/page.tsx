import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

// Static blog data
export const BLOG_POSTS = [
    {
        id: 'future-of-ai-manufacturing',
        title: 'The Future of AI in Manufacturing',
        excerpt: 'How artificial intelligence is revolutionizing production lines, predicting maintenance needs, and optimizing supply chains for unprecedented efficiency.',
        category: 'Artificial Intelligence',
        date: 'Oct 15, 2023',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070',
        readTime: '5 min read'
    },
    {
        id: 'sustainable-electronics',
        title: 'Sustainable Electronics: A Green Revolution',
        excerpt: 'Exploring the shift towards eco-friendly materials and energy-efficient designs in the electronics industry to combat e-waste and carbon footprints.',
        category: 'Sustainability',
        date: 'Nov 02, 2023',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2013',
        readTime: '4 min read'
    },
    {
        id: 'embedded-systems-iot',
        title: 'Embedded Systems in the IoT Era',
        excerpt: 'Deep dive into how advanced embedded systems are powering the Internet of Things, enabling smarter homes, cities, and industries.',
        category: 'Embedded Systems',
        date: 'Nov 20, 2023',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070',
        readTime: '6 min read'
    },
    {
        id: 'cybersecurity-connected-devices',
        title: 'Cybersecurity for Connected Devices',
        excerpt: 'Why security must be a priority in hardware design and how to protect connected devices from emerging threats in an increasingly digital world.',
        category: 'Security',
        date: 'Dec 05, 2023',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070',
        readTime: '7 min read'
    }
];

export default function Blogs() {
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
                        Exploring the <br />
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                            Frontiers of Tech
                        </span>
                    </h1>

                    <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                        Discover the latest trends, innovations, and expert perspectives in AI, electronics, and manufacturing.
                    </p>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="relative pb-32 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {BLOG_POSTS.map((post) => (
                            <Link
                                to={`/blogs/${post.id}`}
                                key={post.id}
                                className="group relative bg-[#1a1a2e]/40 border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Image Container */}
                                <div className="relative h-64 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] to-transparent opacity-60 z-10"></div>
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 backdrop-blur-md rounded-full text-cyan-300 text-xs font-bold uppercase tracking-wider">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 relative z-20">
                                    <div className="flex items-center space-x-4 text-sm text-white/40 mb-4">
                                        <div className="flex items-center">
                                            <i className="ri-calendar-line mr-2"></i>
                                            {post.date}
                                        </div>
                                        <div className="flex items-center">
                                            <i className="ri-time-line mr-2"></i>
                                            {post.readTime}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>

                                    <p className="text-white/60 mb-6 line-clamp-3 leading-relaxed">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center text-cyan-400 font-semibold group/link">
                                        Read Article
                                        <i className="ri-arrow-right-line ml-2 transform group-hover/link:translate-x-1 transition-transform"></i>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
