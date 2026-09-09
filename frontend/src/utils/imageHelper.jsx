import React, { useState, useEffect } from 'react';
import { BACKEND_URL as AXIOS_BACKEND_URL, API_ORIGIN } from '../api/axios';

export const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? 'https://londis-production.up.railway.app/api'
    : 'http://localhost:5000/api');

export const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL ||
  AXIOS_BACKEND_URL ||
  API_ORIGIN ||
  API_URL.replace(/\/api\/?$/, '');

/**
 * Resolves an image/media URL against backend host or fallback.
 * If url is explicitly empty string or 'none' (user removed it), returns ''.
 * If url is undefined or null, returns resolved defaultFallback.
 * If url is an external URL (http/https/data:/blob:), returns as is (normalizing localhost in prod).
 * If url is a relative path starting with /uploads or uploads/, ensures it resolves to BACKEND_URL.
 */
export function resolveImageUrl(url, defaultFallback = '') {
  if (url === '' || url === 'none') {
    return '';
  }

  const rawUrl = (url !== undefined && url !== null) ? String(url).trim() : '';

  if (!rawUrl) {
    if (!defaultFallback || defaultFallback === 'none') return '';
    return resolveImageUrl(defaultFallback, '');
  }

  if (rawUrl === '' || rawUrl === 'none') {
    return '';
  }

  // Preserve inline data URIs and browser object URLs
  if (rawUrl.startsWith('data:') || rawUrl.startsWith('blob:')) {
    return rawUrl;
  }

  // In production, rewrite any accidental localhost URLs in stored data to BACKEND_URL
  if (import.meta.env.PROD && (rawUrl.startsWith('http://localhost') || rawUrl.startsWith('http://127.0.0.1'))) {
    try {
      const parsed = new URL(rawUrl);
      return `${BACKEND_URL}${parsed.pathname}${parsed.search}`;
    } catch {
      // fallback
    }
  }

  // External absolute URLs
  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
    return rawUrl;
  }

  // Relative backend upload path
  if (rawUrl.startsWith('/uploads') || rawUrl.startsWith('uploads/')) {
    const normalized = rawUrl.startsWith('/') ? rawUrl : `/${rawUrl}`;
    return `${BACKEND_URL}${normalized}`;
  }

  // Embedded /uploads/ in relative path
  if (rawUrl.includes('/uploads/')) {
    const idx = rawUrl.indexOf('/uploads/');
    return `${BACKEND_URL}${rawUrl.substring(idx)}`;
  }

  return rawUrl;
}

/**
 * SafeImage Component
 * Automatically catches load errors (e.g. if the image 404s)
 * and falls back to defaultFallback without infinite error loops.
 * If src is explicitly cleared (''), does NOT render (returns null).
 */
export function SafeImage({
  src,
  defaultFallback,
  alt = '',
  className = '',
  width,
  height,
  loading = 'lazy',
  ...rest
}) {
  if (src === '' || src === 'none') {
    return null;
  }

  const resolvedInitial = resolveImageUrl(src, defaultFallback);
  if (!resolvedInitial) {
    return null;
  }

  const [currentSrc, setCurrentSrc] = useState(resolvedInitial);
  const [hasErrored, setHasErrored] = useState(false);

  useEffect(() => {
    if (src === '' || src === 'none') {
      setCurrentSrc('');
      return;
    }
    setCurrentSrc(resolveImageUrl(src, defaultFallback));
    setHasErrored(false);
  }, [src, defaultFallback]);

  const handleError = () => {
    const resolvedFallback = resolveImageUrl(defaultFallback);
    if (!hasErrored && resolvedFallback && currentSrc !== resolvedFallback) {
      setHasErrored(true);
      setCurrentSrc(resolvedFallback);
    }
  };

  if (!currentSrc) {
    return null;
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      onError={handleError}
      {...rest}
    />
  );
}

/**
 * Hook for CSS background images that automatically validates whether
 * customUrl can be loaded. If customUrl is explicitly empty/none, returns empty string.
 * If it fails or is unconfigured, falls back to defaultUrl.
 */
export function useSafeBackgroundImage(customUrl, defaultUrl) {
  const [bgUrl, setBgUrl] = useState(() => {
    if (customUrl === '' || customUrl === 'none') return '';
    return resolveImageUrl(customUrl, defaultUrl);
  });

  useEffect(() => {
    if (customUrl === '' || customUrl === 'none') {
      setBgUrl('');
      return;
    }
    const targetUrl = resolveImageUrl(customUrl, defaultUrl);
    const resolvedDefault = resolveImageUrl(defaultUrl);
    if (!targetUrl || targetUrl === resolvedDefault) {
      setBgUrl(resolvedDefault || '');
      return;
    }

    const img = new Image();
    img.src = targetUrl;
    img.onload = () => {
      setBgUrl(targetUrl);
    };
    img.onerror = () => {
      console.warn(`[SafeImage] Failed to load background image "${targetUrl}". Falling back to default.`);
      setBgUrl(resolvedDefault || '');
    };
  }, [customUrl, defaultUrl]);

  return bgUrl;
}
