import { getProducts } from "@/src/lib/products";
import { ProductGrid } from "./ProductGrid";

export default async function MerchandisePage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="panel panel-glow mx-auto max-w-6xl p-8 text-white">
        <h1 className="mb-8 text-3xl font-bold text-shadow">Merchandise</h1>
        {products.length === 0 ? (
          <p className="text-white/70">No products yet. Check back soon.</p>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  );
}
