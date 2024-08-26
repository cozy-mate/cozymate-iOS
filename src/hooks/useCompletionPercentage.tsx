import { useMemo } from 'react';

interface FieldValues {
  [key: string]: string | number | boolean | undefined;
}

interface UseCompletionPercentageParams {
  fields: FieldValues;
  totalFields: number;
}

const useCompletionPercentage = ({ fields, totalFields }: UseCompletionPercentageParams) => {
  return useMemo(() => {
    const filledFields = Object.values(fields).filter(
      (value) => value !== undefined && value !== null && value !== '',
    ).length;

    return (filledFields / totalFields) * 100;
  }, [fields, totalFields]);
};

export default useCompletionPercentage;
