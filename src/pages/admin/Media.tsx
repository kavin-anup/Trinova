import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { uploadAPI } from '../../services/api';

interface MediaItem {
  id: string;
  filename: string;
  original_name: string;
  file_url: string;
  file_size: number;
  category: string;
  uploaded_at: string;
}

export default function Media() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await uploadAPI.getAllMedia();
      setMedia(response.data?.media || []);
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const fileArray = Array.from(files);
      await uploadAPI.uploadMultiple(fileArray);
      fetchMedia();
    } catch (error: any) {
      alert(error.message || 'Error uploading files');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await uploadAPI.deleteMedia(id);
      fetchMedia();
    } catch (error: any) {
      alert(error.message || 'Error deleting media');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Media Library</h2>
          <label className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all cursor-pointer">
            {uploading ? (
              <span>
                <i className="ri-loader-4-line animate-spin mr-2"></i>Uploading...
              </span>
            ) : (
              <>
                <i className="ri-upload-line mr-2"></i>Upload Media
              </>
            )}
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <i className="ri-loader-4-line text-cyan-400 text-4xl animate-spin"></i>
          </div>
        ) : media.length === 0 ? (
          <div className="text-center py-12 bg-[#1a1a2e]/50 rounded-xl border border-cyan-500/20">
            <i className="ri-image-line text-cyan-400 text-5xl mb-4"></i>
            <p className="text-white/60">No media files. Upload your first image!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {media.map((item) => (
              <div
                key={item.id}
                className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl overflow-hidden group"
              >
                <div className="relative aspect-square bg-gradient-to-br from-cyan-500/20 to-blue-600/20">
                  {item.mime_type?.startsWith('video/') ? (
                    <video
                      src={item.file_url}
                      className="w-full h-full object-cover"
                      muted
                      loop
                    />
                  ) : (
                    <img
                      src={item.file_url}
                      alt={item.original_name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-2 left-2 bg-cyan-500/80 text-white text-xs px-2 py-1 rounded">
                    {item.mime_type?.startsWith('video/') ? 'Video' : 'Image'}
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <button
                      onClick={() => navigator.clipboard.writeText(item.file_url)}
                      className="px-3 py-2 bg-cyan-500/80 hover:bg-cyan-500 text-white rounded-lg text-sm"
                      title="Copy URL"
                    >
                      <i className="ri-file-copy-line"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg text-sm"
                      title="Delete"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-white text-sm truncate mb-1">{item.original_name}</p>
                  <p className="text-white/40 text-xs">{formatFileSize(item.file_size)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

