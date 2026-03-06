import { contentIsland } from '#core/services/content-island.service';
import type { Page, PageId } from './page.api-model';

export const fetchPage = async (pageId: PageId) =>
  await contentIsland.getContent<Page>({
    contentType: 'Page',
    'fields.pageId': pageId,
  });
