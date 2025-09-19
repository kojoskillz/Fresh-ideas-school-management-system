import { useEffect, useMemo } from "react";
import {
  DefaultValues,
  useForm,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";

export function usePersistedForm<T extends Record<string, any>>(
  storageKey: string,
  options: Omit<UseFormProps<T>, "defaultValues"> & {
    defaultValues: DefaultValues<T>;
  }
): UseFormReturn<T> & { resetPersisted: () => void } {
  const defaultValues = useMemo<DefaultValues<T> | undefined>(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw
        ? (JSON.parse(raw) as DefaultValues<T> | undefined)
        : (options.defaultValues as DefaultValues<T> | undefined);
    } catch {
      localStorage.removeItem(storageKey);
      return options.defaultValues;
    }
  }, [storageKey, options.defaultValues]);

  const form = useForm<T>({
    ...options,
    defaultValues,
  });

  useEffect(() => {
    if (!localStorage) return;

    const subscription = form.watch((values) => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(values));
      } catch {
        console.warn(`Failed to save form ${storageKey} to localStorage`);
      }
    });

    return () => subscription.unsubscribe();
  }, [form, storageKey]);

  const resetPersisted = () => {
    localStorage.removeItem(storageKey);
    form.reset(options.defaultValues as T);
  };

  return { ...form, resetPersisted };
}
