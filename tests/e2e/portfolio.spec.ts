import { expect, test, type Page } from '@playwright/test';

const PRODUCT_NAMES = [
  'DoifyNow',
  'RentifyNow',
  'HouseifyNow',
  'GoalifyNow',
  'DeployifyNow',
  'PostifyNow',
  'LeadifyNow',
  'InsightifyNow',
  'SupportifyNow'
] as const;

const VERIFIED_HOSTED_PRODUCT_URLS = {
  PostifyNow: 'https://postifynow.app',
  LeadifyNow: 'https://leadify.doifynow.com',
  InsightifyNow: 'https://insight.doifynow.com',
  SupportifyNow: 'https://support.doifynow.com'
} as const;

const openPortfolio = async (page: Page) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('main')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1, name: /Bartosz Litwa/i })).toBeVisible();
};

const revealNavbarControl = async (page: Page, control: ReturnType<Page['getByRole']>) => {
  if (await control.isVisible()) return;

  const toggle = page.getByRole('button', { name: /navigation menu/i });
  await toggle.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(control).toBeVisible();
};

const scrollThroughPage = async (page: Page) => {
  await page.evaluate(async () => {
    const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    let position = 0;

    for (let index = 0; index < 200 && position < document.documentElement.scrollHeight; index++) {
      window.scrollTo(0, position);
      await nextFrame();
      await nextFrame();
      position += Math.max(window.innerHeight * 0.75, 300);
    }

    window.scrollTo(0, document.documentElement.scrollHeight);
    await nextFrame();
    await nextFrame();
  });
};

test.describe('portfolio journeys', () => {
  test('presents the AI-native company narrative and primary sections', async ({ page }) => {
    await openPortfolio(page);

    const navigation = page.getByRole('navigation', { name: /main navigation/i });
    const homeLink = navigation.locator('a.navbar-link[href="#home"]');
    const companyLink = navigation.locator('a.navbar-link[href="#ecosystem"]');
    await expect(homeLink).toHaveAttribute('aria-current', 'page');

    const ecosystem = page.locator('#ecosystem');
    await ecosystem.scrollIntoViewIfNeeded();
    await expect(
      ecosystem.getByRole('heading', {
        name: 'An AI-native company, built as a product system',
        exact: true
      })
    ).toBeVisible();
    await expect(page.locator('main')).toContainText(/AI-native company/i);

    await expect(companyLink).toHaveCount(1);
    await expect(companyLink).toHaveAttribute('aria-current', 'page');
    await expect(navigation.locator('a.navbar-link[href="#experience"]')).toHaveCount(1);
    await expect(navigation.locator('a.navbar-link[href="#certifications"]')).toHaveCount(1);
    await expect(navigation.locator('a.navbar-link[href="#work"]')).toHaveCount(0);
    await expect(navigation.locator('a.navbar-link[href="#skills"]')).toHaveCount(0);
  });

  test('renders the nine-product ecosystem with honest link and stage states', async ({ page }) => {
    await openPortfolio(page);

    const ecosystem = page.locator('#ecosystem');
    await ecosystem.scrollIntoViewIfNeeded();
    const cards = ecosystem.locator('.product-grid > article[data-product-id]');
    await expect(cards).toHaveCount(PRODUCT_NAMES.length - 1);
    await expect(ecosystem.locator('.company-card[data-product-id="doifynow"]')).toContainText(
      'DoifyNow'
    );

    for (const productName of PRODUCT_NAMES.filter((name) => name !== 'DoifyNow')) {
      const card = cards.filter({ hasText: productName });
      await expect(card, `${productName} should have one ecosystem card`).toHaveCount(1);
      await expect(card.locator('[data-stage]')).toHaveCount(1);
      await expect(card.locator('[data-stage]')).toContainText(/\S/);
    }

    for (const [productName, productUrl] of Object.entries(VERIFIED_HOSTED_PRODUCT_URLS)) {
      const card = cards.filter({ hasText: productName });
      const productLink = card.locator(`a[href="${productUrl}"]`);
      await expect(
        productLink,
        `${productName} should expose its verified hosted origin`
      ).toHaveCount(1);
      await expect(card).not.toContainText('Product page coming later');
    }

    const deployifyCard = cards.filter({ hasText: 'DeployifyNow' });
    const deployifyLink = deployifyCard.locator('a[href]').first();
    await expect(deployifyLink).toHaveCount(1);
    const deployifyHref = await deployifyLink.getAttribute('href');
    expect(deployifyHref).not.toBeNull();
    expect(new URL(deployifyHref!, page.url()).origin).toBe('https://deployifynow.com');
  });

  test('supports the keyboard skip link', async ({ page }) => {
    await openPortfolio(page);

    const skipLink = page.getByRole('link', { name: /skip to main content/i });
    await page.keyboard.press('Tab');
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();

    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#main-content$/);
    await expect(page.locator('#main-content')).toBeFocused();
  });

  test('opens, navigates, and closes the mobile menu with the keyboard', async ({
    page
  }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile navigation journey');
    await openPortfolio(page);

    const toggle = page.getByRole('button', { name: /navigation menu/i });
    await toggle.focus();
    await page.keyboard.press('Enter');
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');

    const companyLink = page.getByRole('link', { name: 'Company', exact: true });
    await expect(companyLink).toBeVisible();
    await companyLink.press('Enter');
    await expect(page).toHaveURL(/#ecosystem$/);
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await toggle.press('Enter');
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toBeFocused();

    await toggle.press('Enter');
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    const experienceLink = page.getByRole('link', { name: 'Experience', exact: true });
    await experienceLink.press('Enter');
    await expect(page).toHaveURL(/#experience$/);
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('switches the complete experience from English to Polish', async ({ page }) => {
    await openPortfolio(page);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    const languageToggle = page.getByRole('button', { name: /select language/i });
    await revealNavbarControl(page, languageToggle);
    await languageToggle.press('Enter');
    const englishOption = page.getByRole('option', { name: /English/i });
    const polishOption = page.getByRole('option', { name: /Polski/i });
    await expect(englishOption).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(polishOption).toBeFocused();
    await polishOption.press('Enter');

    await expect(page.locator('html')).toHaveAttribute('lang', 'pl');
    await expect(page.locator('.language-toggle-btn')).toContainText('PL');
    await expect(page.getByRole('link', { name: 'Company', exact: true })).toHaveCount(0);
    await expect(page).toHaveTitle('Bartosz Litwa — Twórca firmy AI-native');
    await page.locator('#experience').scrollIntoViewIfNeeded();
    await expect(
      page.getByRole('heading', {
        name: 'Starszy inżynier automatyzacji testów / inżynier Full Stack .NET'
      })
    ).toBeVisible();
    await expect(page.locator('#experience')).toContainText('Obecnie');
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem('preferred-language')))
      .toBe('pl');
  });

  test('removes animation delays and smooth scrolling for reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await openPortfolio(page);
    await scrollThroughPage(page);

    const motionState = await page.evaluate(() => {
      const maximumDurationInMilliseconds = (value: string) =>
        value.split(',').reduce((maximum, duration) => {
          const normalized = duration.trim();
          const numericValue = Number.parseFloat(normalized) || 0;
          const milliseconds = normalized.endsWith('ms') ? numericValue : numericValue * 1000;
          return Math.max(maximum, milliseconds);
        }, 0);

      const offenders = Array.from(document.querySelectorAll<HTMLElement>('body *'))
        .map((element) => {
          const style = window.getComputedStyle(element);
          return {
            element: `${element.tagName.toLowerCase()}.${element.className}`,
            animationDuration: maximumDurationInMilliseconds(style.animationDuration),
            animationDelay: maximumDurationInMilliseconds(style.animationDelay),
            transitionDuration: maximumDurationInMilliseconds(style.transitionDuration),
            transitionDelay: maximumDurationInMilliseconds(style.transitionDelay)
          };
        })
        .filter(
          ({ animationDuration, animationDelay, transitionDuration, transitionDelay }) =>
            animationDuration > 0.1 ||
            animationDelay > 0.1 ||
            transitionDuration > 0.1 ||
            transitionDelay > 0.1
        )
        .slice(0, 10);

      return {
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        scrollBehavior: window.getComputedStyle(document.documentElement).scrollBehavior,
        offenders
      };
    });

    expect(motionState.reducedMotion).toBe(true);
    expect(motionState.scrollBehavior).toBe('auto');
    expect(motionState.offenders).toEqual([]);
  });

  test('has no page-level horizontal overflow', async ({ page }) => {
    await openPortfolio(page);
    await scrollThroughPage(page);

    const dimensions = await page.evaluate(() => ({
      documentClientWidth: document.documentElement.clientWidth,
      documentScrollWidth: document.documentElement.scrollWidth,
      bodyClientWidth: document.body.clientWidth,
      bodyScrollWidth: document.body.scrollWidth
    }));

    expect(dimensions.documentScrollWidth).toBeLessThanOrEqual(dimensions.documentClientWidth + 1);
    expect(dimensions.bodyScrollWidth).toBeLessThanOrEqual(dimensions.bodyClientWidth + 1);
  });

  test('keeps core text and focus tokens at accessible contrast in both themes', async ({
    page
  }) => {
    await page.addInitScript(() => localStorage.setItem('portfolio-theme', 'dark'));
    await openPortfolio(page);

    const readContrast = () =>
      page.evaluate(() => {
        const rootStyles = window.getComputedStyle(document.documentElement);
        const parseHex = (value: string) => {
          const normalized = value.trim().replace('#', '');
          const expanded =
            normalized.length === 3
              ? normalized
                  .split('')
                  .map((character) => `${character}${character}`)
                  .join('')
              : normalized;
          return [0, 2, 4].map((offset) => Number.parseInt(expanded.slice(offset, offset + 2), 16));
        };
        const luminance = (color: number[]) => {
          const channels = color.map((channel) => {
            const normalized = channel / 255;
            return normalized <= 0.03928
              ? normalized / 12.92
              : ((normalized + 0.055) / 1.055) ** 2.4;
          });
          return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
        };
        const ratio = (foreground: string, background: string) => {
          const foregroundLuminance = luminance(parseHex(foreground));
          const backgroundLuminance = luminance(parseHex(background));
          return (
            (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) /
            (Math.min(foregroundLuminance, backgroundLuminance) + 0.05)
          );
        };
        const readToken = (token: string) => rootStyles.getPropertyValue(token);
        const background = readToken('--bg-primary');
        const textTokens = [
          '--text-primary',
          '--text-secondary',
          '--text-muted',
          '--accent-glow',
          '--accent-secondary'
        ];

        return {
          text: Object.fromEntries(
            textTokens.map((token) => [token, ratio(readToken(token), background)])
          ),
          focus: ratio(readToken('--focus-ring'), background)
        };
      });

    for (const theme of ['dark', 'light'] as const) {
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      const contrast = await readContrast();
      for (const [token, ratio] of Object.entries(contrast.text)) {
        expect(ratio, `${theme} ${token} contrast`).toBeGreaterThanOrEqual(4.5);
      }
      expect(contrast.focus, `${theme} focus-ring contrast`).toBeGreaterThanOrEqual(3);

      if (theme === 'dark') {
        const themeToggle = page.getByRole('button', { name: /switch to light theme/i });
        await revealNavbarControl(page, themeToggle);
        await themeToggle.click();
      }
    }
  });

  test('keeps fragment links and external-link safety attributes valid', async ({ page }) => {
    await openPortfolio(page);
    await scrollThroughPage(page);

    const fragmentState = await page.evaluate(() => {
      const hrefs = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')).map(
        (link) => link.getAttribute('href') ?? ''
      );
      const placeholders = hrefs.filter((href) => href === '#');
      const missingTargets = hrefs.filter((href) => {
        if (!href.startsWith('#') || href.length === 1) return false;
        return document.getElementById(decodeURIComponent(href.slice(1))) === null;
      });
      const ids = Array.from(document.querySelectorAll<HTMLElement>('[id]')).map(
        (element) => element.id
      );
      const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);

      return { placeholders, missingTargets, duplicateIds };
    });

    expect(fragmentState.placeholders).toEqual([]);
    expect(fragmentState.missingTargets).toEqual([]);
    expect(fragmentState.duplicateIds).toEqual([]);

    const unsafeExternalLinks = await page.locator('a[href]').evaluateAll((links) =>
      links.flatMap((element) => {
        const link = element as HTMLAnchorElement;
        const url = new URL(link.href);
        if (!['http:', 'https:'].includes(url.protocol) || url.origin === window.location.origin) {
          return [];
        }

        const relTokens = link.rel.toLowerCase().split(/\s+/);
        return link.target === '_blank' &&
          relTokens.includes('noopener') &&
          relTokens.includes('noreferrer')
          ? []
          : [link.href];
      })
    );

    expect(unsafeExternalLinks).toEqual([]);
  });

  test('survives unavailable external images', async ({ page }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    await page.route('**/*', async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const isExternalImage =
        request.resourceType() === 'image' &&
        ['http:', 'https:'].includes(url.protocol) &&
        url.hostname !== '127.0.0.1';

      if (isExternalImage) {
        await route.abort('failed');
        return;
      }

      await route.continue();
    });

    await openPortfolio(page);
    await scrollThroughPage(page);

    await expect(page.getByRole('heading', { level: 1, name: /Bartosz Litwa/i })).toBeVisible();
    await expect(page.locator('#ecosystem')).toContainText('DoifyNow');
    await expect(page.locator('#experience')).toBeAttached();
    await expect(page.locator('#certifications')).toBeAttached();
    await expect
      .poll(() => page.locator('.certification-badge-fallback').count())
      .toBeGreaterThan(0);
    expect(pageErrors).toEqual([]);
  });

  test('puts RentifyNow and PostifyNow first and uses product icons', async ({ page }) => {
    await openPortfolio(page);

    const ecosystem = page.locator('#ecosystem');
    await ecosystem.scrollIntoViewIfNeeded();
    const cards = ecosystem.locator('.product-grid > article[data-product-id]');
    await expect(cards.nth(0)).toContainText('RentifyNow');
    await expect(cards.nth(1)).toContainText('PostifyNow');
    const systemIcons = ecosystem.locator('.company-system img');
    const cardIcons = cards.locator('.product-card-header img');
    await expect(systemIcons).toHaveCount(PRODUCT_NAMES.length);
    await expect(cardIcons).toHaveCount(PRODUCT_NAMES.length - 1);

    const iconSources = await systemIcons.evaluateAll((images) =>
      images.map((image) => (image as HTMLImageElement).getAttribute('src'))
    );
    expect(iconSources.every((source) => source?.startsWith('/product-icons/'))).toBe(true);
  });
});

test.describe('responsive review regressions', () => {
  test('shows company context at every size and downloads the CV', async ({ page }) => {
    await openPortfolio(page);
    await expect(page.locator('.delivery-summary')).toBeVisible();
    await expect(page.locator('.delivery-outcomes li')).toHaveCount(3);
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('link', { name: 'Download CV', exact: true }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('Bartosz_Litwa_CV.pdf');
    expect(await download.failure()).toBeNull();
    await page.getByRole('link', { name: 'Explore the company', exact: true }).click();
    await expect(page).toHaveURL(/#ecosystem$/);
    await expect(page.locator('#ecosystem-heading')).toBeInViewport();
  });

  test('closes only the innermost menu with Escape and dismisses it on Tab', async ({ page }) => {
    await openPortfolio(page);
    const languageToggle = page.getByRole('button', { name: /select language/i });
    const menuToggle = page.getByRole('button', { name: /navigation menu/i });
    await revealNavbarControl(page, languageToggle);
    await languageToggle.click();
    await expect(page.getByRole('option', { name: /English/i })).toBeFocused();
    await page.keyboard.press('End');
    await expect(page.getByRole('option', { name: /Polski/i })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(languageToggle).toBeFocused();
    await expect(languageToggle).toHaveAttribute('aria-expanded', 'false');
    if (await menuToggle.isVisible()) {
      await expect(menuToggle).toHaveAttribute('aria-expanded', 'true');
    }
    await languageToggle.press('Enter');
    await page.keyboard.press('End');
    await page.keyboard.press('Tab');
    await expect(languageToggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('keeps short landscape navigation reachable with touch-sized controls', async ({ page }) => {
    await page.setViewportSize({ width: 667, height: 375 });
    await openPortfolio(page);
    const menuToggle = page.getByRole('button', { name: /navigation menu/i });
    await menuToggle.click();
    const languageToggle = page.getByRole('button', { name: /select language/i });
    await languageToggle.click();
    const polishOption = page.getByRole('option', { name: /Polski/i });
    await polishOption.scrollIntoViewIfNeeded();
    await expect(polishOption).toBeInViewport();
    await page.keyboard.press('Escape');
    const contact = page.locator('nav.navbar .cta-link');
    await contact.scrollIntoViewIfNeeded();
    await expect(contact).toBeInViewport();
    const sizes = await page.locator('nav.navbar button, nav.navbar a').evaluateAll((elements) =>
      elements
        .filter((element) => element.getClientRects().length > 0)
        .map((element) => ({
          name: element.getAttribute('aria-label') || element.textContent,
          height: element.getBoundingClientRect().height
        }))
    );
    for (const size of sizes) expect(size.height, size.name ?? '').toBeGreaterThanOrEqual(44);
  });

  test('preserves preferences after reload and reflows long Polish content at 320px', async ({
    page
  }) => {
    await page.setViewportSize({ width: 320, height: 740 });
    await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'light' });
    await openPortfolio(page);
    const themeToggle = page.getByRole('button', { name: /switch to dark theme/i });
    await revealNavbarControl(page, themeToggle);
    await themeToggle.click();
    await page.getByRole('button', { name: /select language/i }).click();
    await page.getByRole('option', { name: /Polski/i }).click();
    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(page.locator('html')).toHaveAttribute('lang', 'pl');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    for (const id of ['ecosystem', 'experience', 'certifications', 'footer']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await expect(page.locator(`#${id} ${id === 'footer' ? 'footer' : 'h2'}`)).toBeVisible();
    }
    await page
      .locator('.product-card h4')
      .first()
      .evaluate((element) => {
        element.textContent = 'VeryLongProductNameWithoutSpaces'.repeat(4);
      });
    const overflow = await page.evaluate(() =>
      Array.from(document.querySelectorAll('main *'))
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.width > 0 && (rect.right > innerWidth + 1 || rect.left < -1);
        })
        .map((element) => element.className)
    );
    expect(overflow).toEqual([]);
  });

  test('announces delayed loading and recovers a failed code download by reloading', async ({
    page
  }) => {
    let releaseChunk!: () => void;
    const chunkGate = new Promise<void>((resolve) => {
      releaseChunk = resolve;
    });
    await page.route('**/SimpleBanner-*.js', async (route) => {
      await chunkGate;
      await route.abort('failed');
    });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('status').first()).toContainText('Loading…');
    releaseChunk();
    await expect(page.getByRole('heading', { name: 'This page could not load' })).toBeVisible();
    await expect(page.getByRole('alert')).toContainText('Check your connection');
    await page.unroute('**/SimpleBanner-*.js');
    await page.getByRole('button', { name: 'Reload page' }).click();
    await expect(page.getByRole('heading', { level: 1, name: /Bartosz Litwa/i })).toBeVisible();
  });
});

test('retains readable company and certification fallbacks when images fail', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'dark' });
  await page.route('**/*', async (route) => {
    if (route.request().resourceType() === 'image') await route.abort('failed');
    else await route.continue();
  });
  await openPortfolio(page);
  await page.locator('#experience').scrollIntoViewIfNeeded();
  const companyFallback = page.locator('.experienceCard-logo-fallback').first();
  await expect(companyFallback).toBeVisible();
  await expect(companyFallback).not.toHaveText('');
  await expect(companyFallback).toHaveCSS('color', 'rgb(22, 24, 29)');
  await page.locator('#certifications').scrollIntoViewIfNeeded();
  await expect(page.locator('.certification-badge-fallback')).toHaveCount(4);
  await expect(page.locator('.certification-card h3')).toHaveCount(4);
});

test('restores section destinations on a normal-motion reload', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  for (const section of ['experience', 'certifications']) {
    await page.goto(`/#${section}`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator(`#${section} h2`)).toBeInViewport();
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator(`#${section} h2`)).toBeInViewport();
    const bounds = await page.locator(`#${section} h2`).boundingBox();
    const navbar = await page.locator('nav.navbar').boundingBox();
    expect(bounds!.y).toBeGreaterThanOrEqual(navbar!.height);
  }
});
