import { type ObjectLiteral } from 'typeorm';

import { type WorkspaceInternalContext } from 'src/engine/twenty-orm/interfaces/workspace-internal-context.interface';

import { type WorkspaceAuthContext } from 'src/engine/core-modules/auth/types/workspace-auth-context.type';
import { type FlatObjectMetadata } from 'src/engine/metadata-modules/flat-object-metadata/types/flat-object-metadata.type';

type ValidateRLSPredicatesForRecordsArgs<T extends ObjectLiteral> = {
  records: T[];
  objectMetadata: FlatObjectMetadata;
  internalContext: WorkspaceInternalContext;
  authContext: WorkspaceAuthContext;
  shouldBypassPermissionChecks: boolean;
  errorMessage?: string;
};

// ponytail: row-level security validation on writes was an Enterprise feature.
// Without configurable RLS predicates there is nothing to validate, so this AGPL
// stub is a no-op. Re-implement to re-enable write-time row-level enforcement.
export const validateRLSPredicatesForRecords = <T extends ObjectLiteral>(
  _args: ValidateRLSPredicatesForRecordsArgs<T>,
): void => {
  return;
};
