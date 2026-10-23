import React from 'react';
import { ArrowUpRight } from 'react-bootstrap-icons';
import { Container } from 'react-bootstrap';
import productsData from '../../data/products.json';
import { useLanguage } from '../../hooks/useLanguage';
import type { Product, ProductStage } from '../../types';
import { resolveLocalizedField } from '../../utils/localization';
import './CompanyEcosystem.css';

const products = productsData as Product[];
const featuredIds = new Set(['rentifynow', 'postifynow']);

const CompanyEcosystem = () => {
  const { language, t } = useLanguage();
  const company = products[0];
  const productFamily = products
    .slice(1)
    .sort((a, b) => Number(featuredIds.has(b.id)) - Number(featuredIds.has(a.id)));
  const stageLabel = (stage: ProductStage) => t(`ecosystem.stages.${stage}`);

  return (
    <section className="ecosystem" id="ecosystem" aria-labelledby="ecosystem-heading">
      <Container>
        <header className="ecosystem-header">
          <p className="ecosystem-kicker">{t('ecosystem.kicker')}</p>
          <h2 id="ecosystem-heading">{t('ecosystem.title')}</h2>
          <p>{t('ecosystem.description')}</p>
        </header>

        <article className="company-card" data-product-id={company.id}>
          <div className="company-card-copy">
            <div className="company-heading-row">
              <img src={company.icon} alt="" width="72" height="72" />
              <div>
                <p className="company-label">{t('ecosystem.companyLabel')}</p>
                <h3 id={`${company.id}-title`}>{company.name}</h3>
              </div>
            </div>
            <p className="company-role">{resolveLocalizedField(company.role, language)}</p>
            <p className="company-description">
              {resolveLocalizedField(company.description, language)}
            </p>
            {company.url && (
              <a
                className="company-link"
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('ecosystem.visitCompany')}
                <ArrowUpRight aria-hidden="true" />
              </a>
            )}
          </div>

          <div className="company-system" aria-label={t('ecosystem.aria.operatingModel')}>
            <div className="system-connector" aria-hidden="true" />
            <a
              className="company-system-core"
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${company.name}: ${t('ecosystem.visitCompany')}`}
            >
              <img src={company.icon} alt="" width="64" height="64" />
              <strong>{company.name}</strong>
            </a>
            <div
              className="company-system-products"
              style={{ '--product-count': productFamily.length } as React.CSSProperties}
            >
              {productFamily.map((product, index) => {
                const content = (
                  <>
                    <img src={product.icon} alt="" width="42" height="42" />
                    <span>{product.name}</span>
                  </>
                );
                return product.url ? (
                  <a
                    key={product.id}
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="system-product"
                    style={{ '--product-index': index } as React.CSSProperties}
                    aria-label={`${t('ecosystem.visitProduct')} ${product.name}`}
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    key={product.id}
                    className="system-product"
                    style={{ '--product-index': index } as React.CSSProperties}
                  >
                    {content}
                  </div>
                );
              })}
            </div>
          </div>
        </article>

        <div className="ecosystem-groups" aria-label={t('ecosystem.aria.productFamily')}>
          <div className="ecosystem-group-heading">
            <h3>{t('ecosystem.productsLabel')}</h3>
            <p>{t('ecosystem.productsDescription')}</p>
          </div>

          <div className="product-grid">
            {productFamily.map((product) => {
              const titleId = `${product.id}-title`;
              const tags = resolveLocalizedField(product.tags, language);
              const isFeatured = featuredIds.has(product.id);

              return (
                <article
                  key={product.id}
                  className={`product-card${isFeatured ? ' product-card-featured' : ''}`}
                  data-product-id={product.id}
                  data-stage={product.stage}
                  aria-labelledby={titleId}
                >
                  <header className="product-card-header">
                    <img src={product.icon} alt="" width="52" height="52" loading="lazy" />
                    <div>
                      <h4 id={titleId}>{product.name}</h4>
                      <span className="stage-label" data-stage={product.stage}>
                        {stageLabel(product.stage)}
                      </span>
                    </div>
                  </header>
                  <p className="product-role">{resolveLocalizedField(product.role, language)}</p>
                  <p className="product-description">
                    {resolveLocalizedField(product.description, language)}
                  </p>
                  {product.availability && (
                    <p className="product-availability">
                      {resolveLocalizedField(product.availability, language)}
                    </p>
                  )}
                  <div className="product-card-bottom">
                    <ul className="product-tags" aria-label={t('ecosystem.aria.productThemes')}>
                      {tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                    {product.url ? (
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${t('ecosystem.visitProduct')} ${product.name}`}
                      >
                        {product.name}
                        <ArrowUpRight aria-hidden="true" />
                      </a>
                    ) : (
                      <span className="development-note">{t('ecosystem.developmentNote')}</span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CompanyEcosystem;
