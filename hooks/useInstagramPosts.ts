
import { useState, useEffect } from 'react';

export interface InstagramPost {
  id: string;
  media_url: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  permalink: string;
  thumbnail_url?: string;
  timestamp?: string;
  caption?: string;
}

interface UseInstagramPostsOptions {
  accessToken?: string;
  userId?: string;
  maxPosts?: number;
  fallbackPosts?: Array<{
    imageUrl: string;
    permalink: string;
    videoUrl?: string;
  }>;
}

interface UseInstagramPostsReturn {
  posts: InstagramPost[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

/**
 * Hook personalizado para obtener publicaciones de Instagram
 * Soporta Instagram Graph API y fallback a posts manuales
 */
export const useInstagramPosts = ({
  accessToken,
  userId,
  maxPosts = 1,
  fallbackPosts = [],
}: UseInstagramPostsOptions = {}): UseInstagramPostsReturn => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInstagramPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      // Si no hay token, usar posts de fallback
      if (!accessToken || !userId) {
        if (fallbackPosts.length > 0) {
          const formattedPosts: InstagramPost[] = fallbackPosts
            .slice(0, maxPosts)
            .map((post, index) => ({
              id: `fallback-${index}`,
              media_url: post.videoUrl || post.imageUrl,
              media_type: post.videoUrl ? 'VIDEO' : 'IMAGE',
              permalink: post.permalink,
              thumbnail_url: post.imageUrl,
            }));
          setPosts(formattedPosts);
          setLoading(false);
          return;
        }
        throw new Error('No se proporcionó token de acceso ni posts de fallback');
      }

      // Usar Instagram Graph API
      const fields = 'id,media_type,media_url,permalink,thumbnail_url,timestamp,caption';
      const response = await fetch(
        `https://graph.instagram.com/${userId}/media?fields=${fields}&access_token=${accessToken}&limit=${maxPosts}`
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error?.message || `Error ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || 'Error al obtener publicaciones');
      }

      // Formatear los posts
      const formattedPosts: InstagramPost[] = (data.data || []).map((post: any) => ({
        id: post.id,
        media_url: post.media_url,
        media_type: post.media_type,
        permalink: post.permalink,
        thumbnail_url: post.thumbnail_url,
        timestamp: post.timestamp,
        caption: post.caption,
      }));

      setPosts(formattedPosts);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      
      // Si hay error pero tenemos fallback, usarlo
      if (fallbackPosts.length > 0) {
        const formattedPosts: InstagramPost[] = fallbackPosts
          .slice(0, maxPosts)
          .map((post, index) => ({
            id: `fallback-${index}`,
            media_url: post.videoUrl || post.imageUrl,
            media_type: post.videoUrl ? 'VIDEO' : 'IMAGE',
            permalink: post.permalink,
            thumbnail_url: post.imageUrl,
          }));
        setPosts(formattedPosts);
        console.warn('Usando posts de fallback debido a error:', errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstagramPosts();
  }, [accessToken, userId, maxPosts]);

  return {
    posts,
    loading,
    error,
    refresh: fetchInstagramPosts,
  };
};
