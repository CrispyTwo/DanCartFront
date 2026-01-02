"use client"

import { Button } from "@/src/components/ui/button"
import { useAddToCart } from "@/src/features/cart/hooks/use-add-to-cart"
import { toast } from "sonner"
import { Product } from "@/src/types/product.types"
import { useProductVariants } from "@/src/features/products/hooks/use-product-variants"

interface ProductInfoProps {
  product: Product;
  quantity: number;
  setQuantity: (quantity: number) => void;
}

export default function ProductInfo({ product, quantity, setQuantity }: ProductInfoProps) {
  const { selectedOptions, selectedVariant, handleOptionSelect } = useProductVariants(product);
  const currentStock = selectedVariant ? selectedVariant.stock : 0;

  const hasVariants = product.variants && product.variants.length > 0;
  const effectiveStock = hasVariants ? currentStock : product.stock;
  const isOutOfStock = effectiveStock === 0;

  const { addToCart, isLoading, error } = useAddToCart()

  const handleAddToCart = async () => {
    if (!selectedVariant) return;

    const success = await addToCart(product.id, selectedVariant, quantity);
    if (success) {
      const variantDetails = selectedVariant ? `(${selectedVariant.color}, ${selectedVariant.size})` : '';
      toast.success("Added to cart", {
        description: `${quantity}x ${product.name} ${variantDetails} added to your cart.`
      })
      setQuantity(1)
    } else if (error) {
      toast.error("Error", {
        description: "Failed to add items to cart."
      })
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
      </div>

      <p className="text-foreground leading-relaxed">{product.description}</p>

      {product.options?.map((option) => (
        <div key={option.name}>
          <label className="text-sm font-medium text-foreground mb-3 block">
            {option.name}: {selectedOptions[option.name]}
          </label>
          <div className="flex gap-2 flex-wrap">
            {option.values.map((value) => (
              <button
                key={value}
                onClick={() => handleOptionSelect(option.name, value)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedOptions[option.name] === value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div>
        <label className="text-sm font-medium text-foreground mb-3 block">Quantity</label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2 rounded-md bg-muted text-foreground hover:bg-muted/80"
            disabled={isOutOfStock}
          >
            −
          </button>
          <span className="w-8 text-center font-medium text-foreground">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(effectiveStock, quantity + 1))}
            className="px-3 py-2 rounded-md bg-muted text-foreground hover:bg-muted/80"
            disabled={isOutOfStock || quantity >= effectiveStock}
          >
            +
          </button>
          <span className="text-sm text-muted-foreground ml-2">
            ({effectiveStock > 0 ? `${effectiveStock} in stock` : "Out of stock"})
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button className="flex-1" disabled={isOutOfStock} onClick={handleAddToCart}>
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
        <Button variant="outline">Wishlist</Button>
      </div>

      {effectiveStock > 0 && effectiveStock <= product.lowStockThreshold && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
          <p className="text-sm text-amber-900">Only {effectiveStock} left in stock - order soon!</p>
        </div>
      )}
    </div>
  )
}
