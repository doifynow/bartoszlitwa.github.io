import { expect, test } from '@playwright/test';

test('serves the complete portfolio and working discovery links without JavaScript', async ({
  browser,
  baseURL,
  request,
  viewport
}) => {
  const response = await request.get('/');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('text/html');
  expect(await response.text()).toContain('<h1');

  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
    locale: 'pl-PL',
    viewport
  });
  try {
    const page = await context.newPage();
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Bartosz Litwa');
    await expect(page.locator('#ecosystem')).toContainText('DoifyNow');
    await expect(page.locator('#experience h2')).toBeVisible();
    await expect(page.locator('#certifications h2')).toBeVisible();
    await expect(page.locator('footer')).toContainText('bartosz.litwa@proton.me');
    await expect(page.locator('a[href="https://doifynow.com"]').first()).toBeVisible();
    await expect(page.locator('a[href="/Bartosz_Litwa_CV.pdf"]')).toBeVisible();

    const brokenFragments = await page
      .locator('a[href^="#"]')
      .evaluateAll((links) =>
        links
          .map((link) => link.getAttribute('href')!.slice(1))
          .filter((id) => !document.getElementById(id))
      );
    expect(brokenFragments).toEqual([]);

    const assets = await page
      .locator('img[src], link[rel="stylesheet"]')
      .evaluateAll((elements) =>
        [
          ...new Set(
            elements.map((element) => element.getAttribute('src') ?? element.getAttribute('href')!)
          )
        ].filter((url) => url.startsWith('/'))
      );
    for (const url of assets) {
      const asset = await request.get(url);
      expect(asset.status(), url).toBe(200);
      expect(asset.headers()['content-type'], url).not.toContain('text/html');
    }
  } finally {
    await context.close();
  }
});

test('keeps factual identity schema without unsupported software rich-result claims', async ({
  page
}) => {
  await page.goto('/');
  const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
  const graph = schema['@graph'];
  expect(graph.find((item: { '@type': string }) => item['@type'] === 'Organization')).toMatchObject(
    {
      name: 'DoifyNow',
      url: 'https://doifynow.com/',
      sameAs: ['https://github.com/doifynow'],
      founder: { '@id': 'https://litwa.dev/#bartosz-litwa' }
    }
  );
  const family = graph.find((item: { '@type': string }) => item['@type'] === 'ItemList');
  expect(family.numberOfItems).toBe(family.itemListElement.length);
  for (const entry of family.itemListElement) {
    expect(entry.item['@type']).toBe('Thing');
    await expect(page.locator('.product-card h4').filter({ hasText: entry.item.name })).toHaveCount(
      1
    );
  }
  expect(JSON.stringify(schema)).not.toMatch(/aggregateRating|"review"|"offers"/);
});
