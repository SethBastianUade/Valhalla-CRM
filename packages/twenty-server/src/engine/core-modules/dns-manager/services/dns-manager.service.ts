import { Injectable } from '@nestjs/common';

import { msg } from '@lingui/core/macro';

import { type DomainValidRecords } from 'src/engine/core-modules/dns-manager/dtos/domain-valid-records';
import {
  DnsManagerException,
  DnsManagerExceptionCode,
} from 'src/engine/core-modules/dns-manager/exceptions/dns-manager.exception';

type DnsManagerOptions = {
  isPublicDomain?: boolean;
};

// ponytail: custom-domain / Cloudflare DNS management was an Enterprise feature.
// This AGPL stub disables it gracefully — reads report "no custom hostname",
// writes throw. Re-implement against a DNS provider to re-enable custom domains.
@Injectable()
export class DnsManagerService {
  private notAvailable(): never {
    throw new DnsManagerException(
      'Custom domain management is not available in this edition',
      DnsManagerExceptionCode.CLOUDFLARE_CLIENT_NOT_INITIALIZED,
      {
        userFriendlyMessage: msg`Custom domains are not available in this edition.`,
      },
    );
  }

  async registerHostname(_customDomain: string, _options?: DnsManagerOptions) {
    return this.notAvailable();
  }

  async getHostnameWithRecords(
    _domain: string,
    _options?: DnsManagerOptions,
  ): Promise<DomainValidRecords | undefined> {
    return undefined;
  }

  async updateHostname(
    _fromHostname: string,
    _toHostname: string,
    _options?: DnsManagerOptions,
  ) {
    return this.notAvailable();
  }

  async refreshHostname(_hostname: string, _options?: DnsManagerOptions) {
    return this.notAvailable();
  }

  async deleteHostnameSilently(
    _hostname: string,
    _options?: DnsManagerOptions,
  ) {
    return;
  }

  async isHostnameWorking(_hostname: string, _options?: DnsManagerOptions) {
    return false;
  }

  async getHostnameId(
    _hostname: string,
    _options?: DnsManagerOptions,
  ): Promise<string | undefined> {
    return undefined;
  }

  async deleteHostname(
    _customHostnameId: string,
    _options?: DnsManagerOptions,
  ) {
    return;
  }
}
