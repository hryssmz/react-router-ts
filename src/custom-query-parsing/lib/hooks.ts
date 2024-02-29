// custom-query-parsing/lib/hooks.ts
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import * as JSURL from "jsurl";
import type { NavigateOptions } from "react-router-dom";

export function useQueryParam<T>(
  key: string
): [T | undefined, (newQuery: T, options?: NavigateOptions) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramValue = searchParams.get(key);
  const value = useMemo(
    () => (paramValue !== null ? (JSURL.parse(paramValue) as T) : undefined),
    [paramValue]
  );
  const setValue = useCallback(
    (newValue: T, options?: NavigateOptions) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(key, JSURL.stringify(newValue));
      setSearchParams(newSearchParams, options);
    },
    [key, searchParams, setSearchParams]
  );
  return [value, setValue];
}
