import { Module } from '@nestjs/common';

import { FeatureFlagModule } from 'src/engine/core-modules/feature-flag/feature-flag.module';

// ponytail: the only command here (migrate-to-billing-v2) was Enterprise and was
// removed. Module kept as an empty shell because workspace-command-provider still
// imports it; re-add commands here if any 2.4 workspace upgrades are needed.
@Module({
  imports: [FeatureFlagModule],
  providers: [],
})
export class V2_4_UpgradeVersionCommandModule {}
