import { Injectable } from '@nestjs/common';

import { type VerificationRecord } from 'src/engine/core-modules/emailing-domain/drivers/types/verifications-record';
import { EmailingDomainEntity } from 'src/engine/core-modules/emailing-domain/emailing-domain.entity';

// ponytail: unsubscribe-hostname DNS provisioning (Cloudflare) was an Enterprise
// feature. AGPL stub: no managed unsubscribe hostname is provisioned; emailing
// domains work without it. Re-implement against a DNS provider to re-enable.
@Injectable()
export class UnsubscribeHostnameService {
  async provision(_emailingDomain: EmailingDomainEntity): Promise<void> {
    return;
  }

  async refreshStatus(_emailingDomain: EmailingDomainEntity): Promise<void> {
    return;
  }

  async deprovision(_emailingDomain: EmailingDomainEntity): Promise<void> {
    return;
  }

  async sync(
    _workspaceId: string,
    _emailingDomainId: string,
    _options: { provision: boolean },
  ): Promise<void> {
    return;
  }

  async withDnsRecords(
    emailingDomain: EmailingDomainEntity,
  ): Promise<EmailingDomainEntity> {
    return emailingDomain;
  }

  async getDnsRecords(
    _emailingDomain: EmailingDomainEntity,
  ): Promise<VerificationRecord[]> {
    return [];
  }
}
