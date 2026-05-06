import React from 'react';
import './UniversalCard.css';

export default function UniversalCard({
  image,
  title,
  subtitle,
  badge,
  badgeColor = 'primary', // 'primary', 'success', 'warning', 'danger'
  price,
  oldPrice,
  rating,
  buttonText,
  onButtonClick,
  isFeatured = false,
  features = [],
}) {
  return (
    <article className={`univ-card ${isFeatured ? 'featured' : ''}`}>
      {image && (
        <div className="univ-card-img-wrap">
          <img src={image} alt={title} className="univ-card-img" />
          {badge && <span className={`univ-card-badge ${badgeColor}`}>{badge}</span>}
        </div>
      )}
      <div className="univ-card-content">
        <h3 className="univ-card-title">{title}</h3>
        {subtitle && <p className="univ-card-subtitle">{subtitle}</p>}
        
        {rating && (
          <div className="univ-card-rating">
            <span className="stars">{'★'.repeat(rating)}</span>
            <span className="stars-empty">{'★'.repeat(5 - rating)}</span>
          </div>
        )}

        {(price || oldPrice) && (
          <div className="univ-card-price-wrap">
            {price && <span className="univ-card-price">{price}</span>}
            {oldPrice && <span className="univ-card-old-price">{oldPrice}</span>}
          </div>
        )}

        {features && features.length > 0 && (
          <ul className="univ-card-features">
            {features.map((feat, idx) => (
              <li key={idx}>
                <span className="check">✓</span> {feat}
              </li>
            ))}
          </ul>
        )}

        {buttonText && (
          <button 
            type="button" 
            className={`univ-card-btn ${isFeatured ? 'featured-btn' : ''}`}
            onClick={onButtonClick}
          >
            {buttonText}
          </button>
        )}
      </div>
    </article>
  );
}
