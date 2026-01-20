
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

interface InstagramPost {
  id: string;
  media_url: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  permalink: string;
  thumbnail_url?: string;
}

interface InstagramFeedProps {
  username?: string;
  posts?: Array<{
    imageUrl: string;
    videoUrl?: string;
    permalink: string;
  }>;
  maxPosts?: number;
}

const InstagramFeed: React.FC<InstagramFeedProps> = ({ 
  username = 'wetech_ar',
  posts,
  maxPosts = 1 
}) => {
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Si se proporcionan posts manualmente, usarlos directamente
    if (posts && posts.length > 0) {
      const formattedPosts: InstagramPost[] = posts.slice(0, maxPosts).map((post, index) => ({
        id: `manual-${index}`,
        media_url: post.videoUrl || post.imageUrl,
        media_type: post.videoUrl ? 'VIDEO' : 'IMAGE',
        permalink: post.permalink,
        thumbnail_url: post.imageUrl,
      }));
      setInstagramPosts(formattedPosts);
      setLoading(false);
      return;
    }

    // Intentar obtener posts desde API de Instagram
    const fetchInstagramPosts = async () => {
      try {
        // Opción 1: Usar oEmbed de Instagram (solo para posts individuales)
        // Opción 2: Usar Instagram Basic Display API (requiere token)
        // Por ahora, usaremos un enfoque híbrido
        
        // Si tienes un token de acceso, puedes usar esto:
        // const response = await fetch(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,thumbnail_url&access_token=YOUR_ACCESS_TOKEN`);
        
        // Por ahora, retornamos un array vacío y el usuario puede proporcionar las URLs manualmente
        setError('Para usar la API de Instagram, necesitas configurar un token de acceso. Por ahora, puedes proporcionar las URLs de las imágenes manualmente.');
        setLoading(false);
      } catch (err) {
        setError('Error al cargar publicaciones de Instagram');
        setLoading(false);
      }
    };

    fetchInstagramPosts();
  }, [username, posts, maxPosts]);

  if (loading) {
    return (
      <div className="relative w-full max-w-md rounded-lg overflow-hidden shadow-2xl bg-slate-800 aspect-square flex items-center justify-center">
        <div className="animate-pulse">
          <Instagram className="w-16 h-16 text-slate-600" />
        </div>
      </div>
    );
  }

  if (error || instagramPosts.length === 0) {
    return null; // No mostrar nada si hay error o no hay posts
  }

  return (
    <div className="relative w-full max-w-md rounded-lg overflow-hidden shadow-2xl group">
      {instagramPosts.map((post, index) => (
        <motion.a
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative block w-full aspect-square overflow-hidden bg-slate-800"
        >
          {post.media_type === 'VIDEO' ? (
            <video
              src={post.media_url}
              poster={post.thumbnail_url}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img
              src={post.media_url}
              alt={`Publicación de Instagram - ${username}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          )}
          
          {/* Overlay sutil al hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Instagram className="w-12 h-12 text-white drop-shadow-lg" />
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
};

export default InstagramFeed;
