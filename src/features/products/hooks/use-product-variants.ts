import { Product } from "@/src/types/product.types";
import { useMemo, useState } from "react";

export function useProductVariants(product: Product) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initialOptions: Record<string, string> = {};
    product.options?.forEach(option => {
      if (option.values.length > 0) {
        initialOptions[option.name] = option.values[0];
      }
    });
    return initialOptions;
  });

  const handleOptionSelect = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: value
    }));
  };

  const selectedVariant = useMemo(() => {
    return product.variants?.find(variant => {
      const colorOption = selectedOptions["Color"];
      if (colorOption && variant.color !== colorOption) return false;

      const sizeOption = selectedOptions["Size"];
      if (sizeOption && variant.size !== sizeOption) return false;

      return true;
    });
  }, [product.variants, selectedOptions]);

  return { selectedOptions, selectedVariant, handleOptionSelect }
}