import { type ObjectLiteral } from 'typeorm';

import { type FeatureFlagMap } from 'src/engine/core-modules/feature-flag/interfaces/feature-flag-map.interface';
import { type WorkspaceInternalContext } from 'src/engine/twenty-orm/interfaces/workspace-internal-context.interface';

import { type WorkspaceAuthContext } from 'src/engine/core-modules/auth/types/workspace-auth-context.type';
import { type FlatObjectMetadata } from 'src/engine/metadata-modules/flat-object-metadata/types/flat-object-metadata.type';
import { type WorkspaceSelectQueryBuilder } from 'src/engine/twenty-orm/repository/workspace-select-query-builder';

type ApplyRowLevelPermissionPredicatesArgs<T extends ObjectLiteral> = {
  queryBuilder: WorkspaceSelectQueryBuilder<T>;
  objectMetadata: FlatObjectMetadata;
  internalContext: WorkspaceInternalContext;
  authContext: WorkspaceAuthContext;
  featureFlagMap: FeatureFlagMap;
};

// ponytail: row-level permission predicates were an Enterprise feature. This AGPL
// stub applies no row filter, so queries are scoped only by object/field-level
// permissions (the behavior of a workspace without configured RLS predicates).
// Re-implement predicate-to-WHERE translation to re-enable row-level security.
export const applyRowLevelPermissionPredicates = <T extends ObjectLiteral>(
  _args: ApplyRowLevelPermissionPredicatesArgs<T>,
): void => {
  return;
};
