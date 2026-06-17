import { Module } from '@nestjs/common';

import { RowLevelPermissionPredicateGroupService } from 'src/engine/metadata-modules/row-level-permission-predicate/services/row-level-permission-predicate-group.service';
import { RowLevelPermissionPredicateService } from 'src/engine/metadata-modules/row-level-permission-predicate/services/row-level-permission-predicate.service';

// ponytail: row-level permissions were an Enterprise feature. The services are
// now graceful-disable stubs with no dependencies; this module just provides
// them so role.resolver keeps compiling. The GraphQL surface stays inert.
@Module({
  providers: [
    RowLevelPermissionPredicateService,
    RowLevelPermissionPredicateGroupService,
  ],
  exports: [
    RowLevelPermissionPredicateService,
    RowLevelPermissionPredicateGroupService,
  ],
})
export class RowLevelPermissionModule {}
