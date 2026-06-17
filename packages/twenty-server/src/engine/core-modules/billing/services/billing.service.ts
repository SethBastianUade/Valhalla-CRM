import { Injectable, Logger } from '@nestjs/common';

import { type BillingEntitlementKey } from 'src/engine/core-modules/billing/enums/billing-entitlement-key.enum';
import { TwentyConfigService } from 'src/engine/core-modules/twenty-config/twenty-config.service';

// ponytail: paid billing was an Enterprise feature. This AGPL build ships with
// IS_BILLING_ENABLED permanently false, so every entitlement/subscription check
// resolves to the "billing disabled = full access" path. Re-wire to a billing
// provider (Stripe) to re-enable metering and subscriptions.
@Injectable()
export class BillingService {
  protected readonly logger = new Logger(BillingService.name);
  constructor(private readonly twentyConfigService: TwentyConfigService) {}

  isBillingEnabled() {
    return this.twentyConfigService.get('IS_BILLING_ENABLED');
  }

  async hasWorkspaceAnySubscription(_workspaceId: string) {
    return true;
  }

  async hasEntitlement(
    _workspaceId: string,
    _entitlementKey: BillingEntitlementKey,
  ) {
    return true;
  }

  async isSubscriptionIncompleteOnboardingStatus(_workspaceId: string) {
    return false;
  }
}
