export function ProductsHeader({ loading, count }: { loading: boolean, count: number }) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-serif text-foreground mb-2">Our Collection</h1>
      <p className="text-muted-foreground">
        {loading ? "Loading products..." : `Discover ${count} products`}
      </p>
    </div>
  )
}