import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { CertificationCardProps } from '../../types';
import './Certifications.css';

const CertificationCard: React.FC<CertificationCardProps> = ({ certification }) => {
  const { language, t } = useLanguage();
  const [badgeFailed, setBadgeFailed] = useState(false);
  const completedDate = certification.completedDate
    ? new Intl.DateTimeFormat(language === 'pl' ? 'pl-PL' : 'en-US', {
        year: 'numeric',
        month: 'short'
      }).format(new Date(certification.completedDate))
    : null;

  return (
    <article className="certification-card">
      {!certification.badgeUrl || badgeFailed ? (
        <div
          className="certification-badge certification-badge-fallback"
          role="img"
          aria-label={`${t('certifications.aria.badgeFallback')}: ${certification.name}`}
        >
          {certification.code}
        </div>
      ) : (
        <img
          className="certification-badge"
          src={certification.badgeUrl}
          alt=""
          width="52"
          height="52"
          loading="lazy"
          onError={() => setBadgeFailed(true)}
        />
      )}
      <div className="certification-copy">
        <span className="certification-code">{certification.code}</span>
        <h3>{certification.name}</h3>
        <p>
          {certification.provider}
          {completedDate && <time dateTime={certification.completedDate}> · {completedDate}</time>}
        </p>
      </div>
    </article>
  );
};

export default CertificationCard;
