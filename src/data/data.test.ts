import { describe, expect, it } from 'vitest';
import certifications from './certifications.json';
import experience from './experience.json';
import products from './products.json';
import translations from './translations.json';

const expectedProductStages = {
  doifynow: 'building',
  rentifynow: 'active-build',
  houseifynow: 'building',
  goalifynow: 'building',
  deployifynow: 'building',
  postifynow: 'active-build',
  leadifynow: 'discovery',
  insightifynow: 'discovery',
  supportifynow: 'discovery'
} as const;

const expectedProductUrls = {
  doifynow: 'https://doifynow.com',
  rentifynow: 'https://rentifynow.com',
  houseifynow: 'https://houseifynow.com',
  goalifynow: 'https://goalifynow.com',
  deployifynow: 'https://deployifynow.com',
  postifynow: 'https://postifynow.app',
  leadifynow: 'https://leadify.doifynow.com',
  insightifynow: 'https://insight.doifynow.com',
  supportifynow: 'https://support.doifynow.com'
} as const;

const scalarPaths = (value: unknown, prefix = ''): string[] => {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => scalarPaths(item, `${prefix}.${index}`));
  }

  if (value !== null && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) =>
      scalarPaths(item, prefix ? `${prefix}.${key}` : key)
    );
  }

  return [prefix];
};

describe('portfolio data', () => {
  it('keeps English and Polish translation structures aligned', () => {
    expect(scalarPaths(translations.en).sort()).toEqual(scalarPaths(translations.pl).sort());
  });

  it('keeps the Now portfolio membership and stages explicit', () => {
    expect(products.map((product) => product.id)).toEqual(Object.keys(expectedProductStages));
    expect(Object.fromEntries(products.map((product) => [product.id, product.stage]))).toEqual(
      expectedProductStages
    );
    expect(new Set(products.map((product) => product.name)).size).toBe(products.length);
  });

  it('keeps verified product links unique, secure, and evidence-based', () => {
    const linkedProducts = products.filter(
      (product): product is (typeof products)[number] & { url: string } => 'url' in product
    );

    expect(Object.fromEntries(linkedProducts.map((product) => [product.id, product.url]))).toEqual(
      expectedProductUrls
    );
    expect(new Set(linkedProducts.map((product) => product.url)).size).toBe(linkedProducts.length);
    expect(linkedProducts.every((product) => /^https:\/\//.test(product.url))).toBe(true);
  });

  it('describes hosted builds without implying launch or production readiness', () => {
    expect(products.find((product) => product.id === 'postifynow')?.availability?.en).toContain(
      'live provider publishing remains unverified'
    );
    expect(products.find((product) => product.id === 'insightifynow')?.availability?.en).toContain(
      'operator-controlled'
    );
    expect(products.find((product) => product.id === 'supportifynow')?.availability?.en).toContain(
      'customer-facing support channels remain unverified'
    );
  });

  it('keeps product copy bilingual and presents DoifyNow as the parent company', () => {
    products.forEach((product) => {
      expect(product.icon).toMatch(/^\/product-icons\/.+\.(png|svg|ico)$/);
      expect(product.role.en.trim()).not.toBe('');
      expect(product.role.pl.trim()).not.toBe('');
      expect(product.description.en.trim()).not.toBe('');
      expect(product.description.pl.trim()).not.toBe('');
      expect(product.tags.en.length).toBeGreaterThan(0);
      expect(product.tags.pl.length).toBeGreaterThan(0);
      expect(product.tags.en.every((tag) => tag.trim() !== '')).toBe(true);
      expect(product.tags.pl.every((tag) => tag.trim() !== '')).toBe(true);
    });

    const doifyNow = products.find((product) => product.id === 'doifynow');
    expect(doifyNow?.role.en.toLowerCase()).toContain('parent company');
    expect(doifyNow?.role.pl.toLowerCase()).toContain('firma macierzysta');
  });

  it('keeps IDs and required collections unique and populated', () => {
    const certificationIds = certifications.map((certification) => certification.id);

    expect(new Set(certificationIds).size).toBe(certificationIds.length);
    expect(experience.length).toBeGreaterThan(0);
  });

  it('keeps experience copy bilingual', () => {
    for (const role of experience) {
      for (const field of [role.title, role.city, role.description]) {
        expect(field.en.trim()).not.toBe('');
        expect(field.pl.trim()).not.toBe('');
      }
      expect(role.achievements.en).toHaveLength(role.achievements.pl.length);
      expect(role.achievements.pl.every((item) => item.trim() !== '')).toBe(true);
      if ('promotionPath' in role && role.promotionPath) {
        expect(role.promotionPath.en).toHaveLength(role.promotionPath.pl.length);
      }
    }
  });
});
