import React from 'react'
import './Card.css'

export default function Card({ 
  image, 
  title, 
  subtitle, 
  price, 
  oldPrice,
  badges = [], 
  description, 
  features = [], 
  buttonText, 
  onButtonClick, 
  buttonDisabled,
  isPremium,
  children 
}) {
  return (
    <article className={`modern-card ${isPremium ? 'premium-card' : ''}`}>
      {image && (
        <div className="card-image-wrapper">
          <img src={image} alt={title} className="card-image" />
          {badges.length > 0 && (
            <div className="card-badges">
              {badges.map((badge, idx) => (
                <span key={idx} className={`card-badge ${badge.type || 'default'}`}>
                  {badge.text}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
      
      {!image && badges.length > 0 && (
        <div className="card-badges-inline">
          {badges.map((badge, idx) => (
            <span key={idx} className={`card-badge ${badge.type || 'default'}`}>
              {badge.text}
            </span>
          ))}
        </div>
      )}

      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
        
        {price && (
          <div className="card-price-wrapper">
            <span className="card-price">{price}</span>
            {oldPrice && <span className="card-old-price">{oldPrice}</span>}
          </div>
        )}

        {description && <p className="card-description">{description}</p>}
        
        {features.length > 0 && (
          <ul className="card-features">
            {features.map((feat, idx) => (
              <li key={idx}>
                <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                {feat}
              </li>
            ))}
          </ul>
        )}
        
        {children}

        {buttonText && (
          <div className="card-action">
            <button 
              className={`card-btn ${isPremium ? 'premium-btn' : ''}`}
              onClick={onButtonClick}
              disabled={buttonDisabled}
            >
              {buttonText}
            </button>
          </div>
        )}
      </div>
    </article>
  )
}
