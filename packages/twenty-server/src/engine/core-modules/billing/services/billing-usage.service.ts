import { Injectable, Logger } from '@nestjs/common';

import { type BillingResourceCreditUsageDTO } from 'src/engine/core-modules/billing/dtos/billing-resource-credit-usage.dto';
import { BillingSubscriptionEntity } from 'src/engine/core-modules/billing/entities/billing-subscription.entity';
import { type WorkspaceEntity } from 'src/engine/core-modules/workspace/workspace.entity';

// ponytail: usage metering / resource credits were an Enterprise feature. With
// billing disabled there is no metering: features are always usable and credits
// are effectively unlimited. Re-implement against ClickHouse + Stripe metering
// to re-enable usage caps.
@Injectable()
export class BillingUsageService {
  protected readonly logger = new Logger(BillingUsageService.name);

  async canFeatureBeUsed(_workspaceId: string): Promise<boolean> {
    return true;
  }

  async getResourceCreditProductUsage(
    _workspace: WorkspaceEntity,
  ): Promise<BillingResourceCreditUsageDTO[]> {
    return [];
  }

  async flushAvailableCreditsFromCache(_workspaceId: string): Promise<void> {
    return;
  }

  getResourceUsageCap(_subscription: BillingSubscriptionEntity): number {
    return 0;
  }

  async decrementAvailableCreditsInCache(_params: {
    workspaceId: string;
    usedCredits: number;
  }): Promise<number> {
    return 0;
  }

  async invalidateAvailableCreditsInCache(
    _workspaceId: string,
    _periodStart: Date,
  ): Promise<void> {
    return;
  }

  async hasAvailableCredits(_workspaceId: string): Promise<boolean> {
    return true;
  }

  async hasAvailableCreditsOrThrow(_workspaceId: string): Promise<void> {
    return;
  }

  async getCurrentPeriodCreditsUsed(
    _workspaceId: string,
    _periodStart: Date,
  ): Promise<number> {
    return 0;
  }
}
