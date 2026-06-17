import { type SelectOption } from 'twenty-ui/input';

// ponytail: filtering select options by row-level predicates was an Enterprise
// feature. AGPL stub: no RLS, so all options are selectable as-is.
export const useFilteredSelectOptionsFromRLSPredicates = ({
  options,
}: {
  fieldMetadataId: string;
  objectMetadataNameSingular: string | undefined;
  options: SelectOption[];
}): { filteredOptions: SelectOption[]; canSelectEmpty: boolean } => {
  return { filteredOptions: options, canSelectEmpty: true };
};
