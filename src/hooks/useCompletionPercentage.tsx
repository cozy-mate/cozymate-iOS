import { useMemo } from 'react';

interface FieldValues {
  [key: string]: string | number | undefined | string[];
}

interface UseCompletionPercentageParams {
  fields: FieldValues;
  totalFields: number;
}

const useCompletionPercentage = ({ fields, totalFields }: UseCompletionPercentageParams) => {
  return useMemo(() => {
    const filledFields = Object.entries(fields).filter(([_, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== undefined && value !== null && value !== '';
    }).length;

    return (filledFields / totalFields) * 100;
  }, [fields, totalFields]);
};

export default useCompletionPercentage;
