import { Injectable, Logger } from '@nestjs/common';

import type Stripe from 'stripe';

import {
  BillingException,
  BillingExceptionCode,
} from 'src/engine/core-modules/billing/billing.exception';
import { BillingEntitlementDTO } from 'src/engine/core-modules/billing/dtos/billing-entitlement.dto';
import { BillingSubscriptionItemEntity } from 'src/engine/core-modules/billing/entities/billing-subscription-item.entity';
import { BillingSubscriptionEntity } from 'src/engine/core-modules/billing/entities/billing-subscription.entity';
import { BillingEntitlementKey } from 'src/engine/core-modules/billing/enums/billing-entitlement-key.enum';
import { type WorkspaceEntity } from 'src/engine/core-modules/workspace/workspace.entity';

// ponytail: subscriptions were an Enterprise feature. With billing disabled no
// workspace has a subscription: "current" lookups are empty, "...OrThrow" report
// not-found, and entitlements are all false. Re-implement against Stripe to
// re-enable subscriptions.
@Injectable()
export class BillingSubscriptionService {
  protected readonly logger = new Logger(BillingSubscriptionService.name);

  private notAvailable(): never {
    throw new BillingException(
      'Billing subscriptions are not available in this edition',
      BillingExceptionCode.BILLING_SUBSCRIPTION_NOT_FOUND,
    );
  }

  async getBillingSubscriptions(
    _workspaceId: string,
  ): Promise<BillingSubscriptionEntity[]> {
    return [];
  }

  async getCurrentBillingSubscription(_criteria: {
    workspaceId?: string;
    stripeCustomerId?: string;
  }): Promise<BillingSubscriptionEntity | undefined> {
    return undefined;
  }

  async getCurrentBillingSubscriptionOrThrow(_criteria: {
    workspaceId?: string;
    stripeCustomerId?: string;
  }): Promise<BillingSubscriptionEntity> {
    return this.notAvailable();
  }

  async getBaseProductCurrentBillingSubscriptionItemOrThrow(
    _workspaceId: string,
  ): Promise<BillingSubscriptionItemEntity> {
    return this.notAvailable();
  }

  async cancelSubscription(_workspaceId: string): Promise<void> {
    return;
  }

  async assertSubscriptionCanceledOrNone(_workspaceId: string): Promise<void> {
    return;
  }

  async handleUnpaidInvoices(_data: Stripe.SetupIntentSucceededEvent.Data) {
    return this.notAvailable();
  }

  async getWorkspaceEntitlements(
    _workspaceId: string,
  ): Promise<BillingEntitlementDTO[]> {
    return Object.values(BillingEntitlementKey).map((key) => ({
      key,
      value: false,
    }));
  }

  async getWorkspaceEntitlementByKey(
    _workspaceId: string,
    _key: BillingEntitlementKey,
  ): Promise<boolean> {
    return false;
  }

  async endTrialPeriod(_workspace: WorkspaceEntity) {
    return this.notAvailable();
  }

  async syncSubscriptionToDatabase(
    _workspaceId: string,
    _stripeSubscriptionId: string,
  ): Promise<BillingSubscriptionEntity> {
    return this.notAvailable();
  }

  getTrialPeriodFreeWorkflowCredits(
    _billingSubscription: BillingSubscriptionEntity,
  ): number {
    return 0;
  }
}
