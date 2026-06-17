import { type EnrichedObjectMetadataItem } from '@/object-metadata/types/EnrichedObjectMetadataItem';
import { type ObjectRecord } from '@/object-record/types/ObjectRecord';

// ponytail: prefilling a new record from row-level predicates was an Enterprise
// feature. AGPL stub: no RLS predicates, so nothing is prefilled.
export const useBuildRecordInputFromRLSPredicates = ({
  objectMetadataItem: _objectMetadataItem,
}: {
  objectMetadataItem: EnrichedObjectMetadataItem;
}) => {
  const buildRecordInputFromRLSPredicates = (): Partial<ObjectRecord> => ({});

  return { buildRecordInputFromRLSPredicates };
};
