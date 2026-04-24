import React, {useCallback, useEffect, useState} from 'react';
import BlogPostPage from '@theme-original/BlogPostPage';
import {generateBlogPreviewImage} from '@site/src/utils/generatePreview';
import styles from './styles.module.css';

function DownloadIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className={styles.spinner}
      aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeDasharray="40 20"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function BlogPostPageWrapper(props) {
  const {title, description, tags, date, permalink} =
    props.content.metadata;
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDownload = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const img = await generateBlogPreviewImage({
        title,
        description,
        tags,
        date,
        permalink,
      });
      const slug =
        (permalink || '').split('/').filter(Boolean).pop() || 'blog-share';
      const a = document.createElement('a');
      a.href = img;
      a.download = `${slug}-paylasim.png`;
      a.click();
    } catch (err) {
      console.error('Paylaşım görseli oluşturulamadı:', err);
    } finally {
      setLoading(false);
    }
  }, [title, description, tags, date, permalink, loading]);

  return (
    <>
      <BlogPostPage {...props} />
      {isClient && (
        <button
          type="button"
          className={styles.shareButton}
          onClick={handleDownload}
          aria-label="Bu yazı için paylaşım görseli oluştur ve indir"
          disabled={loading}>
          {loading ? <SpinnerIcon /> : <DownloadIcon />}
          <span className={styles.shareLabel}>
            {loading ? 'Hazırlanıyor…' : 'Paylaşım görseli'}
          </span>
        </button>
      )}
    </>
  );
}
