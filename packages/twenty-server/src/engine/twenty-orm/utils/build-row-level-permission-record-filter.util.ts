import { type RecordGqlOperationFilter } from 'twenty-shared/types';

import { type UserWorkspaceAuthContext } from 'src/engine/core-modules/auth/types/workspace-auth-context.type';
import { type FlatEntityMaps } from 'src/engine/metadata-modules/flat-entity/types/flat-entity-maps.type';
import { type FlatFieldMetadata } from 'src/engine/metadata-modules/flat-field-metadata/types/flat-field-metadata.type';
import { type FlatObjectMetadata } from 'src/engine/metadata-modules/flat-object-metadata/types/flat-object-metadata.type';
import { type FlatRowLevelPermissionPredicateGroupMaps } from 'src/engine/metadata-modules/row-level-permission-predicate/types/flat-row-level-permission-predicate-group-maps.type';
import { type FlatRowLevelPermissionPredicateMaps } from 'src/engine/metadata-modules/row-level-permission-predicate/types/flat-row-level-permission-predicate-maps.type';

type BuildRowLevelPermissionRecordFilterArgs = {
  flatRowLevelPermissionPredicateMaps: FlatRowLevelPermissionPredicateMaps;
  flatRowLevelPermissionPredicateGroupMaps: FlatRowLevelPermissionPredicateGroupMaps;
  flatFieldMetadataMaps: FlatEntityMaps<FlatFieldMetadata>;
  objectMetadata: FlatObjectMetadata;
  roleId: string | undefined;
  workspaceMember?: UserWorkspaceAuthContext['workspaceMember'];
};

// ponytail: translating row-level predicates into a record filter was an
// Enterprise feature. This AGPL stub returns no filter (null), so no row-level
// restriction is applied. Re-implement to re-enable row-level security.
export const buildRowLevelPermissionRecordFilter = (
  _args: BuildRowLevelPermissionRecordFilterArgs,
): RecordGqlOperationFilter | null => {
  return null;
};
