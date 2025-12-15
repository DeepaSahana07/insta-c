import React, { useState, useEffect } from 'react';

const Explore = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExploreImages = async () => {
      try {
        // Fetch from multiple sources for variety
        const [unsplashImages, picsumImages, dummyImages] = await Promise.all([
          // Unsplash-like API
          fetch('https://picsum.photos/v2/list?page=1&limit=15').then(res => res.json()),
          // Additional Picsum images
          Array.from({ length: 15 }, (_, i) => ({
            id: `picsum-${i}`,
            download_url: `https://picsum.photos/400/400?random=${i + 100}`
          })),
          // DummyJSON posts with images
          fetch('https://dummyjson.com/posts?limit=10').then(res => res.json())
            .then(data => data.posts.map((post, i) => ({
              id: `dummy-${post.id}`,
              download_url: `https://picsum.photos/400/400?random=${post.id + 200}`
            })))
        ]);

        const allImages = [
          ...unsplashImages.map(img => ({
            id: img.id,
            url: `${img.download_url}?w=400&h=400&fit=crop`,
            author: img.author
          })),
          ...picsumImages.map(img => ({
            id: img.id,
            url: img.download_url,
            author: 'Picsum'
          })),
          ...dummyImages.map(img => ({
            id: img.id,
            url: img.download_url,
            author: 'Random'
          }))
        ];

        setImages(allImages.slice(0, 40));
      } catch (error) {
        // Fallback images
        const fallbackImages = Array.from({ length: 40 }, (_, i) => ({
          id: `fallback-${i}`,
          url: `https://picsum.photos/400/400?random=${i}`,
          author: 'Picsum'
        }));
        setImages(fallbackImages);
      } finally {
        setLoading(false);
      }
    };

    fetchExploreImages();
  }, []);

  if (loading) {
    return (
      <div className="main-content">
        <div className="explore-loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="explore-container">
        <div className="explore-grid">
          {images.map((image) => (
            <div key={image.id} className="explore-item">
              <img
                src={image.url}
                alt={`Photo by ${image.author}`}
                className="explore-image"
                onError={(e) => {
                  e.target.src = `https://picsum.photos/400/400?random=${Math.floor(Math.random() * 1000)}`;
                }}
              />
              <div className="explore-overlay">
                <div className="explore-stats">
                  <span><i className="bi bi-heart-fill"></i> {Math.floor(Math.random() * 1000)}</span>
                  <span><i className="bi bi-chat-fill"></i> {Math.floor(Math.random() * 100)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;