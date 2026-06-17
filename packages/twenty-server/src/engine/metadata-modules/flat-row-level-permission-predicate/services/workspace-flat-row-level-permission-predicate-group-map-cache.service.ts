import { Injectable } from '@nestjs/common';

import { createEmptyFlatEntityMaps } from 'src/engine/metadata-modules/flat-entity/constant/create-empty-flat-entity-maps.constant';
import { type FlatRowLevelPermissionPredicateGroupMaps } from 'src/engine/metadata-modules/row-level-permission-predicate/types/flat-row-level-permission-predicate-group-maps.type';
import { WorkspaceCache } from 'src/engine/workspace-cache/decorators/workspace-cache.decorator';
import { WorkspaceCacheProvider } from 'src/engine/workspace-cache/interfaces/workspace-cache-provider.service';

// ponytail: row-level permission predicate groups were an Enterprise feature.
// AGPL stub: cache provider stays registered but always computes an empty map.
@Injectable()
@WorkspaceCache('flatRowLevelPermissionPredicateGroupMaps')
export class WorkspaceFlatRowLevelPermissionPredicateGroupMapCacheService extends WorkspaceCacheProvider<FlatRowLevelPermissionPredicateGroupMaps> {
  async computeForCache(
    _workspaceId: string,
  ): Promise<FlatRowLevelPermissionPredicateGroupMaps> {
    return createEmptyFlatEntityMaps() as FlatRowLevelPermissionPredicateGroupMaps;
  }
}
