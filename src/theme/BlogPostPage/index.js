import React, { useEffect, useState } from 'react';
import BlogPostPage from '@theme-original/BlogPostPage';
import { generateBlogPreviewImage } from '@site/src/utils/generatePreview';

export default function BlogPostPageWrapper(props) {
  const metadata = props.content.metadata;
  const [isClient, setIsClient] = useState(false);

  const { title, description, tags, permalink, date } = metadata;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDownloadImage = async () => {
    const img = await generateBlogPreviewImage({
      title,
      description,
      tags,
      permalink,
      date,
    });

    const a = document.createElement('a');
    a.href = img;
    a.download = 'blog-share.png';
    a.click();
  };

  return (
    <>
      {/* Buton: Navbar altında sabit */}
      {isClient && (
        <div
          style={{
            position: 'fixed',
            top: '80px',
            right: '20px',
            zIndex: 1000,
            background: '#111',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          }}
        >
          <button onClick={handleDownloadImage}>🖼️ Görseli Oluştur</button>
        </div>
      )}

      {/* Blog içeriği */}
      <BlogPostPage {...props} />
    </>
  );
}