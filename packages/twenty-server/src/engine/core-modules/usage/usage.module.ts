import { Module } from '@nestjs/common';

import { UsageAnalyticsService } from 'src/engine/core-modules/usage/services/usage-analytics.service';

// ponytail: usage analytics (ClickHouse) + the usage resolver/listener were an
// Enterprise feature. Only the graceful-disable analytics stub remains so the
// admin panel keeps compiling; it reports empty usage.
@Module({
  providers: [UsageAnalyticsService],
  exports: [UsageAnalyticsService],
})
export class UsageModule {}
