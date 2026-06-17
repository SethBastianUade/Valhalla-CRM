import { Injectable } from '@nestjs/common';

import { RowLevelPermissionPredicateGroupDTO } from 'src/engine/metadata-modules/row-level-permission-predicate/dtos/row-level-permission-predicate-group.dto';

// ponytail: row-level permission predicate groups were an Enterprise feature.
// AGPL stub: no groups exist without RLS, so reads return empty.
@Injectable()
export class RowLevelPermissionPredicateGroupService {
  async findByRole(
    _workspaceId: string,
    _roleId: string,
  ): Promise<RowLevelPermissionPredicateGroupDTO[]> {
    return [];
  }
}
