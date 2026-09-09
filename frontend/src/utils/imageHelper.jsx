import React, { useState, useEffect } from 'react';

/**
 * Resolves an image URL against backend host or fallback.
 * If url is explicitly empty string or 'none' (user removed it), returns ''.
 * If url is undefined or null, returns defaultFallback.
 * If url is an external URL (http/https/data:), returns as is.
 * If url is a relative path starting with /uploads, ensures it can be loaded.
 */
export function resolveImageUrl(url, defaultFallback = '') {
  if (url === '' || url === 'none') {
    return '';
  }
  if (url === undefined || url === null) {
    return defaultFallback;
  }
  if (typeof url !== 'string' || url.trim() === '') {
    return defaultFallback;
  }
  const cleanUrl = url.trim();
  if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://') || cleanUrl.startsWith('data:')) {
    return cleanUrl;
  }
  return cleanUrl;
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
    if (!hasErrored && defaultFallback && currentSrc !== defaultFallback) {
      setHasErrored(true);
      setCurrentSrc(defaultFallback);
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
    if (!targetUrl || targetUrl === defaultUrl) {
      setBgUrl(defaultUrl || '');
      return;
    }

    const img = new Image();
    img.src = targetUrl;
    img.onload = () => {
      setBgUrl(targetUrl);
    };
    img.onerror = () => {
      console.warn(`[SafeImage] Failed to load background image "${targetUrl}". Falling back to default.`);
      setBgUrl(defaultUrl || '');
    };
  }, [customUrl, defaultUrl]);

  return bgUrl;
}
