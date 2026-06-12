import { describe, expect, it } from 'vitest';
import { siteConfig } from './site';

describe('siteConfig', () => {
  it('should export the configured GitHub owner and Pages host', () => {
    expect(siteConfig.githubOwner).toBe('SamWang32191');
    expect(siteConfig.pagesHost).toBe('samwang32191.github.io');
  });

  it('should export repoUrl with correct GitHub repository URL', () => {
    expect(siteConfig.repoUrl).toBe('https://github.com/SamWang32191/samwang32191.github.io');
  });

  it('should have repoUrl as a valid URL string', () => {
    expect(typeof siteConfig.repoUrl).toBe('string');
    expect(siteConfig.repoUrl).toMatch(/^https?:\/\//);
  });
});
