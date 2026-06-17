import { Injectable } from '@nestjs/common';

import { RowLevelPermissionPredicateGroupDTO } from 'src/engine/metadata-modules/row-level-permission-predicate/dtos/row-level-permission-predicate-group.dto';
import { RowLevelPermissionPredicateDTO } from 'src/engine/metadata-modules/row-level-permission-predicate/dtos/row-level-permission-predicate.dto';
import { UpsertRowLevelPermissionPredicatesInput } from 'src/engine/metadata-modules/row-level-permission-predicate/dtos/inputs/upsert-row-level-permission-predicates.input';
import {
  RowLevelPermissionPredicateException,
  RowLevelPermissionPredicateExceptionCode,
} from 'src/engine/metadata-modules/row-level-permission-predicate/exceptions/row-level-permission-predicate.exception';

// ponytail: row-level permission predicates were an Enterprise feature. This AGPL
// stub disables management: reads return empty, writes report the feature is
// disabled. Re-implement to re-enable row-level security configuration.
@Injectable()
export class RowLevelPermissionPredicateService {
  async findByWorkspaceId(
    _workspaceId: string,
  ): Promise<RowLevelPermissionPredicateDTO[]> {
    return [];
  }

  async upsertRowLevelPermissionPredicates(_args: {
    input: UpsertRowLevelPermissionPredicatesInput;
    workspaceId: string;
  }): Promise<{
    predicates: RowLevelPermissionPredicateDTO[];
    predicateGroups: RowLevelPermissionPredicateGroupDTO[];
  }> {
    throw new RowLevelPermissionPredicateException(
      'Row-level permissions are not available in this edition',
      RowLevelPermissionPredicateExceptionCode.ROW_LEVEL_PERMISSION_FEATURE_DISABLED,
    );
  }
}
