import React from 'react';
import { Link } from 'react-router-dom';
import { resolveImageUrl } from '../utils/imageHelper';

export default function AppBentoSection({ specialtyData }) {
  // If section is explicitly disabled in Admin CMS, do not render
  if (specialtyData?.enabled === false) {
    return null;
  }

  // Purely dynamic CMS values without hardcoded fallback text or images
  const bgImageUrl = typeof specialtyData?.bgImageUrl === 'string' ? specialtyData.bgImageUrl.trim() : '';
  const safeBg = bgImageUrl && bgImageUrl !== 'none' ? resolveImageUrl(bgImageUrl) : '';

  // Permanent middle-column smartphone mockup (locked design element)
  const phoneImg = resolveImageUrl('/uploads/Cropped-phone.jpg');

  const rawAppIcon = typeof specialtyData?.appIconUrl === 'string' ? specialtyData.appIconUrl.trim() : '';
  const appIcon = resolveImageUrl(rawAppIcon);
  const showIcon = Boolean(rawAppIcon && rawAppIcon !== 'none');

  const leftTitle = typeof specialtyData?.leftTitle === 'string' ? specialtyData.leftTitle.trim() : '';
  const leftDesc = typeof specialtyData?.leftDescription === 'string' ? specialtyData.leftDescription.trim() : '';
  const leftCtaText = typeof specialtyData?.leftCtaText === 'string' ? specialtyData.leftCtaText.trim() : '';
  const leftCtaLink = typeof specialtyData?.leftCtaLink === 'string' ? specialtyData.leftCtaLink.trim() : '';
  const termsText = typeof specialtyData?.termsText === 'string' ? specialtyData.termsText.trim() : '';

  const rightTitle = typeof specialtyData?.rightTitle === 'string' ? specialtyData.rightTitle.trim() : '';
  const rightDesc = typeof specialtyData?.rightDescription === 'string' ? specialtyData.rightDescription.trim() : '';
  const appStoreLink = typeof specialtyData?.appStoreLink === 'string' ? specialtyData.appStoreLink.trim() : '';
  const googlePlayLink = typeof specialtyData?.googlePlayLink === 'string' ? specialtyData.googlePlayLink.trim() : '';

  const hasLeftContent = Boolean(showIcon || leftTitle || leftDesc || leftCtaText || termsText);
  const hasRightContent = Boolean(rightTitle || rightDesc || appStoreLink || googlePlayLink);

  return (
    <section id="bento-app-showcase" className="w-full max-w-[1512px] mx-auto px-4 sm:px-8 pt-16 sm:pt-24 pb-12 sm:pb-16 flex justify-center">
      {/* Exact Conoco Specialty Card — fixed minimum height (630px) ensures design never collapses */}
      <div
        className="fuels-specialty-card fuels-specialty-card--ff-specialty-card"
        style={
          safeBg
            ? {
                background: `linear-gradient(180deg, transparent 0, #ffffff 80.29%), url('${safeBg}') 50%/cover no-repeat`,
              }
            : { background: '#ffffff' }
        }
      >
        
        {/* Left Column: Icon, Title, Desc, CTA, Terms (flexible container, zero collapse) */}
        <div className="fuels-specialty-card__col-left">
          {showIcon && (
            <div className="fuels-specialty-card__icon">
              <img
                src={appIcon}
                alt="Fuel Forward® App Icon"
                width="150"
                height="140"
                className="w-[150px] h-[140px] object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}

          {(leftTitle || leftDesc) && (
            <div className="fuels-specialty-card__text">
              {leftTitle && (
                <h2
                  className="fuels-specialty-card__left-title"
                  dangerouslySetInnerHTML={{ __html: leftTitle.replace(/\n/g, '<br />') }}
                />
              )}
              {leftDesc && (
                <div className="fuels-specialty-card__left-description">
                  <p>{leftDesc}</p>
                </div>
              )}
            </div>
          )}

          {leftCtaText && (
            <div className="fuels-specialty-card__cta">
              {leftCtaLink.startsWith('http') ? (
                <a
                  href={leftCtaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wp-block-fuels-redesign-cta-button"
                >
                  <span className="cta-button__text">{leftCtaText}</span>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3.33331 7.99998L12.6666 7.99998M12.6666 7.99998L7.99998 3.33331M12.6666 7.99998L7.99998 12.6666"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              ) : (
                <Link to={leftCtaLink || '/contact'} className="wp-block-fuels-redesign-cta-button">
                  <span className="cta-button__text">{leftCtaText}</span>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3.33331 7.99998L12.6666 7.99998M12.6666 7.99998L7.99998 3.33331M12.6666 7.99998L7.99998 12.6666"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              )}
            </div>
          )}

          {termsText && (
            <div className="fuels-specialty-card__terms">
              <p>{termsText}</p>
            </div>
          )}
        </div>

        {/* Center Column: Fixed Permanent Forecourt Smartphone Mockup */}
        <div className="fuels-specialty-card__col-center">
          <div className="fuels-specialty-card__phone-wrapper">
            <div className="fuels-specialty-card__screen-wrapper">
              <img
                src={phoneImg}
                className="fuels-specialty-card__phone-user-image"
                alt="Fuel Forward Mobile App Screen"
              />
            </div>
            <img
              className="fuels-specialty-card__phone-frame"
              src={resolveImageUrl('/uploads/Phone-frame-bottom.png')}
              alt=""
            />
            <img
              className="fuels-specialty-card__phone-frame-top"
              src={resolveImageUrl('/uploads/Phone-frame-top.png')}
              alt=""
            />
          </div>
        </div>

        {/* Right Column: Title, Desc, Store Badges */}
        <div className="fuels-specialty-card__col-right">
          {(rightTitle || rightDesc) && (
            <div className="fuels-specialty-card__text">
              {rightTitle && (
                <h2 className="fuels-specialty-card__right-title">
                  {rightTitle}
                </h2>
              )}
              {rightDesc && (
                <div className="fuels-specialty-card__right-description">
                  <p>{rightDesc}</p>
                </div>
              )}
            </div>
          )}

          {(appStoreLink || googlePlayLink) && (
            <div className="fuels-specialty-card__store-buttons">
              {appStoreLink && (
                <a
                  href={appStoreLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={resolveImageUrl('/uploads/app-store.png')}
                    alt="Download on the App Store"
                    loading="lazy"
                  />
                </a>
              )}
              {googlePlayLink && (
                <a
                  href={googlePlayLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={resolveImageUrl('/uploads/google-play.png')}
                    alt="Get it on Google Play"
                    loading="lazy"
                  />
                </a>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
