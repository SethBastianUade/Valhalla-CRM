import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
} from '@nestjs/common';
import { type GqlContextType } from '@nestjs/graphql';

import Stripe from 'stripe';

import { BillingException } from 'src/engine/core-modules/billing/billing.exception';
import { UserInputError } from 'src/engine/core-modules/graphql/utils/graphql-errors.util';

@Catch(BillingException, Stripe.errors.StripeError)
export class BillingGraphqlApiExceptionFilter implements ExceptionFilter {
  catch(
    exception: BillingException | Stripe.errors.StripeError,
    host: ArgumentsHost,
  ) {
    if (host.getType<GqlContextType>() !== 'graphql') {
      throw exception;
    }

    // ponytail: the per-code billing exception->graphql handler was Enterprise
    // and removed. Billing is disabled, so these rarely fire; surface them as a
    // generic user input error preserving the friendly message.
    if (exception instanceof BillingException) {
      throw new UserInputError(exception.message, {
        userFriendlyMessage: exception.userFriendlyMessage,
      });
    }

    throw exception;
  }
}
