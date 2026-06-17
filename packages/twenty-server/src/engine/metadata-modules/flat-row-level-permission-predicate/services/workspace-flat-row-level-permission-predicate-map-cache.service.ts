import { Injectable } from '@nestjs/common';

import { createEmptyFlatEntityMaps } from 'src/engine/metadata-modules/flat-entity/constant/create-empty-flat-entity-maps.constant';
import { type FlatRowLevelPermissionPredicateMaps } from 'src/engine/metadata-modules/row-level-permission-predicate/types/flat-row-level-permission-predicate-maps.type';
import { WorkspaceCache } from 'src/engine/workspace-cache/decorators/workspace-cache.decorator';
import { WorkspaceCacheProvider } from 'src/engine/workspace-cache/interfaces/workspace-cache-provider.service';

// ponytail: row-level permission predicates were an Enterprise feature. This AGPL
// stub keeps the cache provider registered (so the flat-entity maps stay
// consistent) but always computes an empty map — no predicates exist without RLS.
@Injectable()
@WorkspaceCache('flatRowLevelPermissionPredicateMaps')
export class WorkspaceFlatRowLevelPermissionPredicateMapCacheService extends WorkspaceCacheProvider<FlatRowLevelPermissionPredicateMaps> {
  async computeForCache(
    _workspaceId: string,
  ): Promise<FlatRowLevelPermissionPredicateMaps> {
    return createEmptyFlatEntityMaps() as FlatRowLevelPermissionPredicateMaps;
  }
}
