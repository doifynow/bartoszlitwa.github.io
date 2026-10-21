import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LanguageProvider } from '../LanguageProvider/LanguageProvider';
import Certifications from './Certifications';
import certifications from '../../data/certifications.json';

describe('certification cards without badge images', () => {
  it.each(['en', 'pl'])(
    'keeps all certificate facts readable in %s without image requests',
    (language) => {
      localStorage.setItem('preferred-language', language);
      const { container } = render(
        <LanguageProvider>
          <Certifications />
        </LanguageProvider>
      );

      expect(container.querySelectorAll('img')).toHaveLength(0);
      const cards = screen.getAllByRole('article');
      expect(cards).toHaveLength(certifications.length);
      for (const [index, certification] of certifications.entries()) {
        const card = cards[index];
        expect(within(card).getByRole('heading', { name: certification.name })).toBeVisible();
        expect(within(card).getByText(certification.provider)).toBeVisible();
        expect(within(card).getByRole('img')).toHaveTextContent(certification.code);
        expect(card.querySelector('time')).toHaveAttribute('dateTime', certification.completedDate);
      }
    }
  );
});
