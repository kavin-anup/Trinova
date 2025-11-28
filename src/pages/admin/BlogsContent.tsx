import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { blogsContentAPI, blogsAPI, uploadAPI } from '../../services/api';

interface BlogArticle {
  id?: string;
  title: string;
  excerpt: string;
  category: string;
  card_image: string;
  cover_image: string;
  read_time: string;
  published_date: string;
  full_content?: any; // JSON structure for rich content
  key_points?: string[];
  tags?: string[];
  order_index?: number;
  is_published?: boolean;
}

export default function BlogsContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  // Hero Section State
  const [heroContent, setHeroContent] = useState({
    title_line1: 'Exploring the',
    title_line2: 'Frontiers of Tech',
    description: 'Discover the latest trends, innovations, and expert perspectives in AI, electronics, and manufacturing.'
  });

  // Article Cards State
  const [articles, setArticles] = useState<BlogArticle[]>([]);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const [contentResponse, articlesResponse] = await Promise.all([
        blogsContentAPI.getAll(),
        blogsAPI.getAll()
      ]);

      const contentItems = contentResponse.data?.content || [];
      
      // Load Hero Content
      contentItems.forEach((item: any) => {
        const key = item.content_key;
        const value = item.content_value;
        
        if (key === 'hero_title_line1') setHeroContent(prev => ({ ...prev, title_line1: value }));
        if (key === 'hero_title_line2') setHeroContent(prev => ({ ...prev, title_line2: value }));
        if (key === 'hero_description') setHeroContent(prev => ({ ...prev, description: value }));
      });

      // Load Articles
      setArticles(articlesResponse.data?.blogs || []);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File, type: 'hero' | 'card' | 'cover', articleId?: string) => {
    try {
      setUploadingImage(type);
      const response = await uploadAPI.uploadImage(file, 'blog');
      const imageUrl = response.data.url;
      
      if (type === 'hero') {
        // Hero images would go in website_content if needed
        return imageUrl;
      } else if (articleId) {
        // Update article with new image in state (don't save to DB yet)
        const article = articles.find(a => a.id === articleId);
        if (article) {
          const updatedArticle = { ...article };
          if (type === 'card') {
            updatedArticle.card_image = imageUrl;
          } else if (type === 'cover') {
            updatedArticle.cover_image = imageUrl;
          }
          setArticles(articles.map(a => a.id === articleId ? updatedArticle : a));
        }
        return imageUrl;
      }
      
      return imageUrl;
    } catch (error: any) {
      alert(error.message || 'Error uploading image');
      return null;
    } finally {
      setUploadingImage(null);
    }
  };

  const handleSaveHero = async () => {
    try {
      setSaving(true);
      await blogsContentAPI.bulkUpdate([
        { sectionKey: 'hero_title_line1', contentValue: heroContent.title_line1 },
        { sectionKey: 'hero_title_line2', contentValue: heroContent.title_line2 },
        { sectionKey: 'hero_description', contentValue: heroContent.description }
      ]);
      alert('Hero section saved successfully!');
    } catch (error: any) {
      alert(error.message || 'Error saving hero section');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveArticles = async () => {
    try {
      setSaving(true);
      
      // Save all articles
      for (const article of articles) {
        if (article.id && !article.id.startsWith('temp-')) {
          // Update existing article
          await blogsAPI.update(article.id, article);
        } else {
          // Create new article (remove temp ID if present)
          const { id: _, ...articleData } = article;
          const response = await blogsAPI.create(articleData);
          // Update the article with the real ID
          if (response.data?.blog?.id) {
            article.id = response.data.blog.id;
          }
        }
      }
      
      // Refresh articles to get real IDs
      const response = await blogsAPI.getAll();
      const refreshedArticles = response.data?.blogs || [];
      setArticles(refreshedArticles);
      
      // Update selected article ID if it was a temp one
      if (selectedArticleId && selectedArticleId.startsWith('temp-')) {
        const matchingArticle = refreshedArticles.find((a: BlogArticle) => 
          a.title === articles.find(art => art.id === selectedArticleId)?.title
        );
        if (matchingArticle) {
          setSelectedArticleId(matchingArticle.id);
        }
      }
      
      alert('Articles saved successfully!');
    } catch (error: any) {
      alert(error.message || 'Error saving articles');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteArticle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    
    try {
      await blogsAPI.delete(id);
      setArticles(articles.filter(a => a.id !== id));
      if (selectedArticleId === id) {
        setSelectedArticleId(null);
        setActiveTab(1); // Go back to articles tab
      }
      alert('Article deleted successfully!');
    } catch (error: any) {
      alert(error.message || 'Error deleting article');
    }
  };

  const addNewArticle = () => {
    if (articles.length >= 10) {
      alert('Maximum of 10 articles allowed. Please delete an existing article to add a new one.');
      return;
    }
    const newArticle: BlogArticle = {
      id: `temp-${Date.now()}`, // Temporary ID until saved
      title: '',
      excerpt: '',
      category: '',
      card_image: '',
      cover_image: '',
      read_time: '5 min read',
      published_date: new Date().toISOString().split('T')[0],
      key_points: [],
      tags: [],
      order_index: articles.length,
      is_published: false
    };
    setArticles([...articles, newArticle]);
    setSelectedArticleId(newArticle.id);
    setActiveTab(2); // Switch to article details tab
  };

  const updateArticle = (id: string | undefined, field: string, value: any) => {
    if (!id) return;
    setArticles(articles.map(a => 
      a.id === id ? { ...a, [field]: value } : a
    ));
  };

  const selectedArticle = selectedArticleId 
    ? articles.find(a => a.id === selectedArticleId)
    : null;

  const tabs = ['Hero Section', 'Article Cards', 'Article Details'];

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <i className="ri-loader-4-line text-cyan-400 text-4xl animate-spin"></i>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Blogs Page Content</h2>
          <p className="text-white/60 mt-1">Manage all content for the Blogs page</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 border-b border-cyan-500/20">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === index
                  ? 'text-cyan-400 border-b-2 border-cyan-400'
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {/* Hero Section Tab */}
          {activeTab === 0 && (
            <div className="space-y-6">
              <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">Hero Section Content</h3>

                <div>
                  <label className="block text-white font-semibold mb-2">Title Line 1</label>
                  <input
                    type="text"
                    value={heroContent.title_line1}
                    onChange={(e) => setHeroContent({ ...heroContent, title_line1: e.target.value })}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Title Line 2 (Gradient)</label>
                  <input
                    type="text"
                    value={heroContent.title_line2}
                    onChange={(e) => setHeroContent({ ...heroContent, title_line2: e.target.value })}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Description</label>
                  <textarea
                    value={heroContent.description}
                    onChange={(e) => setHeroContent({ ...heroContent, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveHero}
                  disabled={saving}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <i className="ri-loader-4-line animate-spin mr-2"></i>Saving...
                    </>
                  ) : (
                    <>
                      <i className="ri-save-line mr-2"></i>Save Hero Section
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Article Cards Tab */}
          {activeTab === 1 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Article Cards ({articles.length}/10)</h3>
                <button
                  onClick={addNewArticle}
                  disabled={articles.length >= 10}
                  className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="ri-add-line mr-2"></i>Add Article
                </button>
              </div>
              {articles.length >= 10 && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-yellow-400 text-sm">
                  <i className="ri-error-warning-line mr-2"></i>
                  Maximum of 10 articles reached. Delete an article to add a new one.
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articles.map((article, index) => (
                  <div key={article.id || index} className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-white">Article {index + 1}</h4>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedArticleId(article.id || null);
                            setActiveTab(2);
                          }}
                          className="px-3 py-1 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg transition-all"
                          title="Edit Details"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          onClick={() => article.id && handleDeleteArticle(article.id)}
                          className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg transition-all"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>

                    {/* Card Image */}
                    <div>
                      <label className="block text-white font-semibold mb-2">Card Image</label>
                      {article.card_image && (
                        <div className="mb-4 rounded-lg overflow-hidden border border-cyan-500/20">
                          <img
                            src={article.card_image}
                            alt="Card"
                            className="w-full h-48 object-cover"
                          />
                        </div>
                      )}
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={article.card_image}
                          onChange={(e) => updateArticle(article.id, 'card_image', e.target.value)}
                          placeholder="Image URL"
                          className="flex-1 px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                        />
                        <label className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg cursor-pointer transition-all whitespace-nowrap">
                          <i className="ri-upload-line mr-2"></i>Upload
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file && article.id) {
                                const url = await handleImageUpload(file, 'card', article.id);
                                if (url) updateArticle(article.id, 'card_image', url);
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <label className="block text-white font-semibold mb-2">Title</label>
                      <input
                        type="text"
                        value={article.title}
                        onChange={(e) => updateArticle(article.id, 'title', e.target.value)}
                        className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    {/* Excerpt */}
                    <div>
                      <label className="block text-white font-semibold mb-2">Excerpt (for card)</label>
                      <textarea
                        value={article.excerpt}
                        onChange={(e) => updateArticle(article.id, 'excerpt', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none resize-none"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-white font-semibold mb-2">Category</label>
                      <input
                        type="text"
                        value={article.category}
                        onChange={(e) => updateArticle(article.id, 'category', e.target.value)}
                        className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                        placeholder="e.g., Artificial Intelligence"
                      />
                    </div>

                    {/* Read Time */}
                    <div>
                      <label className="block text-white font-semibold mb-2">Read Time</label>
                      <input
                        type="text"
                        value={article.read_time}
                        onChange={(e) => updateArticle(article.id, 'read_time', e.target.value)}
                        className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                        placeholder="e.g., 5 min read"
                      />
                    </div>

                    {/* Published Date */}
                    <div>
                      <label className="block text-white font-semibold mb-2">Published Date</label>
                      <input
                        type="date"
                        value={article.published_date}
                        onChange={(e) => updateArticle(article.id, 'published_date', e.target.value)}
                        className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveArticles}
                  disabled={saving}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <i className="ri-loader-4-line animate-spin mr-2"></i>Saving...
                    </>
                  ) : (
                    <>
                      <i className="ri-save-line mr-2"></i>Save All Articles
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Article Details Tab */}
          {activeTab === 2 && (
            <ArticleDetailsTab
              article={selectedArticle}
              articles={articles}
              selectedArticleId={selectedArticleId}
              setArticles={setArticles}
              setSelectedArticleId={setSelectedArticleId}
              handleImageUpload={handleImageUpload}
              uploadingImage={uploadingImage}
              handleSaveArticles={handleSaveArticles}
              saving={saving}
              setActiveTab={setActiveTab}
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

// Article Details Tab Component
function ArticleDetailsTab({
  article,
  articles,
  selectedArticleId,
  setArticles,
  setSelectedArticleId,
  handleImageUpload,
  uploadingImage,
  handleSaveArticles,
  saving,
  setActiveTab
}: any) {
  // Auto-select first article if none selected
  useEffect(() => {
    if (!article && articles.length > 0 && !selectedArticleId) {
      const firstArticle = articles[0];
      if (firstArticle && firstArticle.id) {
        setSelectedArticleId(firstArticle.id);
      }
    }
  }, [article, articles, selectedArticleId, setSelectedArticleId]);

  // Article selector dropdown
  if (articles.length === 0) {
    return (
      <div className="text-center py-12 bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl">
        <p className="text-white/60 mb-4">No articles available yet.</p>
        <button
          onClick={() => setActiveTab(1)}
          className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg transition-all"
        >
          <i className="ri-add-line mr-2"></i>Create First Article
        </button>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="space-y-4">
        <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
          <label className="block text-white font-semibold mb-3">Select Article to Edit</label>
          <select
            value={selectedArticleId || ''}
            onChange={(e) => setSelectedArticleId(e.target.value || null)}
            className="w-full px-4 py-3 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
          >
            <option value="">-- Select an article --</option>
            {articles.map((art: BlogArticle) => (
              <option key={art.id} value={art.id}>
                {art.title || `Untitled Article ${articles.indexOf(art) + 1}`}
              </option>
            ))}
          </select>
        </div>
        <div className="text-center py-8 bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl">
          <p className="text-white/60 mb-4">Or select an article from the dropdown above to edit its details.</p>
          <button
            onClick={() => setActiveTab(1)}
            className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg transition-all"
          >
            <i className="ri-arrow-left-line mr-2"></i>Go to Article Cards
          </button>
        </div>
      </div>
    );
  }

  const updateArticle = (field: string, value: any) => {
    setArticles(articles.map((a: BlogArticle) => 
      a.id === article.id ? { ...a, [field]: value } : a
    ));
  };

  const updateFullContent = (content: any) => {
    updateArticle('full_content', content);
  };

  const addKeyPoint = () => {
    const currentPoints = article.key_points || [];
    updateArticle('key_points', [...currentPoints, '']);
  };

  const updateKeyPoint = (index: number, value: string) => {
    const currentPoints = article.key_points || [];
    currentPoints[index] = value;
    updateArticle('key_points', [...currentPoints]);
  };

  const deleteKeyPoint = (index: number) => {
    const currentPoints = article.key_points || [];
    updateArticle('key_points', currentPoints.filter((_: any, i: number) => i !== index));
  };

  const addTag = () => {
    const currentTags = article.tags || [];
    updateArticle('tags', [...currentTags, '']);
  };

  const updateTag = (index: number, value: string) => {
    const currentTags = article.tags || [];
    currentTags[index] = value;
    updateArticle('tags', [...currentTags]);
  };

  const deleteTag = (index: number) => {
    const currentTags = article.tags || [];
    updateArticle('tags', currentTags.filter((_: any, i: number) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Article Details</h3>
          <div className="flex space-x-2">
            <select
              value={article.id || ''}
              onChange={(e) => setSelectedArticleId(e.target.value || null)}
              className="px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
            >
              {articles.map((art: BlogArticle) => (
                <option key={art.id} value={art.id}>
                  {art.title || `Untitled Article ${articles.indexOf(art) + 1}`}
                </option>
              ))}
            </select>
            <button
              onClick={() => setActiveTab(1)}
              className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg transition-all"
              title="View all article cards"
            >
              <i className="ri-arrow-left-line mr-2"></i>Article Cards
            </button>
          </div>
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-white font-semibold mb-2">Cover Image</label>
          {article.cover_image && (
            <div className="mb-4 rounded-lg overflow-hidden border border-cyan-500/20">
              <img
                src={article.cover_image}
                alt="Cover"
                className="w-full h-64 object-cover"
              />
            </div>
          )}
          <div className="flex space-x-2">
            <input
              type="text"
              value={article.cover_image || ''}
              onChange={(e) => updateArticle('cover_image', e.target.value)}
              placeholder="Image URL"
              className="flex-1 px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
            />
            <label className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg cursor-pointer transition-all whitespace-nowrap">
              <i className="ri-upload-line mr-2"></i>Upload
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file && article.id) {
                    const url = await handleImageUpload(file, 'cover', article.id);
                    if (url) updateArticle('cover_image', url);
                  }
                }}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Title (from card) */}
        <div>
          <label className="block text-white font-semibold mb-2">Title</label>
          <input
            type="text"
            value={article.title || ''}
            onChange={(e) => updateArticle('title', e.target.value)}
            className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
          />
        </div>

        {/* Read Time (from card) */}
        <div>
          <label className="block text-white font-semibold mb-2">Read Time</label>
          <input
            type="text"
            value={article.read_time || ''}
            onChange={(e) => updateArticle('read_time', e.target.value)}
            className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
          />
        </div>

        {/* Published Date (from card) */}
        <div>
          <label className="block text-white font-semibold mb-2">Published Date</label>
          <input
            type="date"
            value={article.published_date || ''}
            onChange={(e) => updateArticle('published_date', e.target.value)}
            className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
          />
        </div>

        {/* Full Content Editor - Rich Text with Sections */}
        <div className="mt-8">
          <label className="block text-white font-semibold mb-4">Full Content</label>
          <RichContentEditor
            content={article.full_content || { sections: [] }}
            onChange={updateFullContent}
          />
        </div>

        {/* Key Points */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <label className="block text-white font-semibold">Key Points</label>
            <button
              onClick={addKeyPoint}
              className="px-3 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg transition-all text-sm"
            >
              <i className="ri-add-line mr-1"></i>Add Point
            </button>
          </div>
          <div className="space-y-3">
            {(article.key_points || []).map((point: string, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="flex-1 flex items-center space-x-2">
                  <span className="text-cyan-400">•</span>
                  <input
                    type="text"
                    value={point}
                    onChange={(e) => updateKeyPoint(index, e.target.value)}
                    className="flex-1 px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    placeholder="Enter key point..."
                  />
                </div>
                <button
                  onClick={() => deleteKeyPoint(index)}
                  className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg transition-all"
                >
                  <i className="ri-delete-bin-line"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <label className="block text-white font-semibold">Tags</label>
            <button
              onClick={addTag}
              className="px-3 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg transition-all text-sm"
            >
              <i className="ri-add-line mr-1"></i>Add Tag
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(article.tags || []).map((tag: string, index: number) => (
              <div key={index} className="flex items-center space-x-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg px-3 py-2">
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => updateTag(index, e.target.value)}
                  className="bg-transparent text-white focus:outline-none min-w-[100px]"
                  placeholder="Tag name..."
                />
                <button
                  onClick={() => deleteTag(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSaveArticles}
          disabled={saving}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
        >
          {saving ? (
            <>
              <i className="ri-loader-4-line animate-spin mr-2"></i>Saving...
            </>
          ) : (
            <>
              <i className="ri-save-line mr-2"></i>Save Article Details
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// Rich Content Editor Component
function RichContentEditor({ content, onChange }: any) {
  const sections = content?.sections || [];

  const addSection = (type: 'paragraph' | 'heading' | 'blockquote' | 'list') => {
    let newSection: any = { type, id: Date.now().toString() };
    
    if (type === 'heading') {
      newSection.level = 2;
      newSection.text = '';
    } else if (type === 'paragraph') {
      newSection.text = '';
    } else if (type === 'blockquote') {
      newSection.text = '';
    } else if (type === 'list') {
      newSection.items = [''];
      newSection.ordered = false;
    }
    
    onChange({ sections: [...sections, newSection] });
  };

  const updateSection = (index: number, field: string, value: any) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ sections: updated });
  };

  const deleteSection = (index: number) => {
    onChange({ sections: sections.filter((_: any, i: number) => i !== index) });
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === sections.length - 1)
    ) return;
    
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[index + (direction === 'up' ? -1 : 1)];
    updated[index + (direction === 'up' ? -1 : 1)] = temp;
    onChange({ sections: updated });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => addSection('heading')}
          className="px-3 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg transition-all text-sm"
        >
          <i className="ri-h-1 mr-1"></i>Heading
        </button>
        <button
          onClick={() => addSection('paragraph')}
          className="px-3 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg transition-all text-sm"
        >
          <i className="ri-file-text-line mr-1"></i>Paragraph
        </button>
        <button
          onClick={() => addSection('blockquote')}
          className="px-3 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg transition-all text-sm"
        >
          <i className="ri-double-quotes-l mr-1"></i>Quote
        </button>
        <button
          onClick={() => addSection('list')}
          className="px-3 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg transition-all text-sm"
        >
          <i className="ri-list-check mr-1"></i>List
        </button>
      </div>

      {sections.map((section: any, index: number) => (
        <div key={section.id || index} className="bg-[#252525]/50 border border-cyan-500/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-cyan-400 uppercase font-semibold">
              {section.type}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => moveSection(index, 'up')}
                disabled={index === 0}
                className="px-2 py-1 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded transition-all disabled:opacity-50"
                title="Move Up"
              >
                <i className="ri-arrow-up-line"></i>
              </button>
              <button
                onClick={() => moveSection(index, 'down')}
                disabled={index === sections.length - 1}
                className="px-2 py-1 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded transition-all disabled:opacity-50"
                title="Move Down"
              >
                <i className="ri-arrow-down-line"></i>
              </button>
              <button
                onClick={() => deleteSection(index)}
                className="px-2 py-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded transition-all"
                title="Delete"
              >
                <i className="ri-delete-bin-line"></i>
              </button>
            </div>
          </div>

          {section.type === 'heading' && (
            <div className="space-y-2">
              <select
                value={section.level || 2}
                onChange={(e) => updateSection(index, 'level', parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-[#1a1a2e]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none text-sm"
              >
                <option value={1}>H1</option>
                <option value={2}>H2</option>
                <option value={3}>H3</option>
                <option value={4}>H4</option>
              </select>
              <input
                type="text"
                value={section.text || ''}
                onChange={(e) => updateSection(index, 'text', e.target.value)}
                className="w-full px-4 py-2 bg-[#1a1a2e]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                placeholder="Heading text..."
              />
            </div>
          )}

          {section.type === 'paragraph' && (
            <textarea
              value={section.text || ''}
              onChange={(e) => updateSection(index, 'text', e.target.value)}
              rows={4}
              className="w-full px-4 py-2 bg-[#1a1a2e]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none resize-none"
              placeholder="Paragraph text..."
            />
          )}

          {section.type === 'blockquote' && (
            <textarea
              value={section.text || ''}
              onChange={(e) => updateSection(index, 'text', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 bg-[#1a1a2e]/50 border-l-4 border-cyan-500 rounded-lg text-white focus:border-cyan-400 focus:outline-none resize-none italic"
              placeholder="Quote text..."
            />
          )}

          {section.type === 'list' && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 mb-2">
                <label className="text-white/60 text-sm">Ordered:</label>
                <input
                  type="checkbox"
                  checked={section.ordered || false}
                  onChange={(e) => updateSection(index, 'ordered', e.target.checked)}
                  className="w-4 h-4 text-cyan-400 rounded focus:ring-cyan-400"
                />
              </div>
              {(section.items || ['']).map((item: string, itemIndex: number) => (
                <div key={itemIndex} className="flex items-center space-x-2">
                  <span className="text-cyan-400">{section.ordered ? `${itemIndex + 1}.` : '•'}</span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const items = [...(section.items || [])];
                      items[itemIndex] = e.target.value;
                      updateSection(index, 'items', items);
                    }}
                    className="flex-1 px-4 py-2 bg-[#1a1a2e]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    placeholder="List item..."
                  />
                  <button
                    onClick={() => {
                      const items = (section.items || []).filter((_: any, i: number) => i !== itemIndex);
                      updateSection(index, 'items', items.length > 0 ? items : ['']);
                    }}
                    className="px-2 py-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded transition-all"
                  >
                    <i className="ri-delete-bin-line text-sm"></i>
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const items = [...(section.items || []), ''];
                  updateSection(index, 'items', items);
                }}
                className="mt-2 px-3 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg transition-all text-sm"
              >
                <i className="ri-add-line mr-1"></i>Add Item
              </button>
            </div>
          )}
        </div>
      ))}

      {sections.length === 0 && (
        <div className="text-center py-8 text-white/40 border-2 border-dashed border-cyan-500/20 rounded-lg">
          <p>No content sections yet. Click buttons above to add sections.</p>
        </div>
      )}
    </div>
  );
}

