import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BillingCustomerEntity } from 'src/engine/core-modules/billing/entities/billing-customer.entity';
import { BillingEntitlementEntity } from 'src/engine/core-modules/billing/entities/billing-entitlement.entity';
import { BillingMeterEntity } from 'src/engine/core-modules/billing/entities/billing-meter.entity';
import { BillingPriceEntity } from 'src/engine/core-modules/billing/entities/billing-price.entity';
import { BillingProductEntity } from 'src/engine/core-modules/billing/entities/billing-product.entity';
import { BillingSubscriptionItemEntity } from 'src/engine/core-modules/billing/entities/billing-subscription-item.entity';
import { BillingSubscriptionEntity } from 'src/engine/core-modules/billing/entities/billing-subscription.entity';
import { BillingSubscriptionItemService } from 'src/engine/core-modules/billing/services/billing-subscription-item.service';
import { BillingSubscriptionService } from 'src/engine/core-modules/billing/services/billing-subscription.service';
import { BillingUsageService } from 'src/engine/core-modules/billing/services/billing-usage.service';
import { BillingService } from 'src/engine/core-modules/billing/services/billing.service';

// ponytail: paid billing was an Enterprise feature. The Stripe integration,
// resolvers, webhooks, commands and metering have been removed; only the AGPL
// data model (entities/dtos/enums) and graceful-disable service stubs remain.
@Module({
  imports: [
    TypeOrmModule.forFeature([
      BillingSubscriptionEntity,
      BillingSubscriptionItemEntity,
      BillingCustomerEntity,
      BillingProductEntity,
      BillingPriceEntity,
      BillingMeterEntity,
      BillingEntitlementEntity,
    ]),
  ],
  providers: [
    BillingService,
    BillingSubscriptionService,
    BillingSubscriptionItemService,
    BillingUsageService,
  ],
  exports: [
    BillingService,
    BillingSubscriptionService,
    BillingSubscriptionItemService,
    BillingUsageService,
  ],
})
export class BillingModule {}
