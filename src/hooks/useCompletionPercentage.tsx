import { useMemo } from 'react';

interface FieldValues {
  [key: string]: string | number | boolean;
}

interface UseCompletionPercentageParams {
  fields: FieldValues;
  totalFields: number;
}

const useCompletionPercentage = ({ fields, totalFields }: UseCompletionPercentageParams) => {
  return useMemo(() => {
    const filledFields = Object.values(fields).filter(
      (value) => value !== undefined && value !== '' && value !== 0 && value !== false,
    ).length;

    // Calculate width percentage
    return (filledFields / totalFields) * 100;
  }, [fields, totalFields]);
};

export default useCompletionPercentage;
