import { Injectable } from '@nestjs/common';

export type UsageBreakdownItem = {
  key: string;
  label?: string;
  creditsUsed: number;
};

export type UsageTimeSeriesPoint = {
  date: string;
  creditsUsed: number;
};

type PeriodParams = {
  workspaceId: string;
  periodStart: Date;
  periodEnd: Date;
  operationTypes?: string[];
};

// ponytail: AI usage analytics (ClickHouse-backed) was an Enterprise feature.
// Without usage metering there are no events to report, so every breakdown is
// empty. Re-implement against ClickHouse to re-enable the admin usage dashboard.
@Injectable()
export class UsageAnalyticsService {
  async getAdminAiUsageByWorkspace(_params: {
    periodStart: Date;
    periodEnd: Date;
    useDollarMode?: boolean;
  }): Promise<UsageBreakdownItem[]> {
    return [];
  }

  async getUsageByUser(_params: PeriodParams): Promise<UsageBreakdownItem[]> {
    return [];
  }

  async getUsageByModel(_params: PeriodParams): Promise<UsageBreakdownItem[]> {
    return [];
  }

  async getUsageByOperationType(
    _params: PeriodParams & { userWorkspaceId?: string },
  ): Promise<UsageBreakdownItem[]> {
    return [];
  }

  async getUsageByUserTimeSeries(
    _params: PeriodParams & { userWorkspaceId: string },
  ): Promise<UsageTimeSeriesPoint[]> {
    return [];
  }

  async getUsageTimeSeries(
    _params: PeriodParams,
  ): Promise<UsageTimeSeriesPoint[]> {
    return [];
  }
}
