import { getProducts } from "@/src/lib/products";
import { ProductGrid } from "./ProductGrid";

export default async function MerchandisePage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-z-black">Merchandise</h1>
      {products.length === 0 ? (
        <p className="text-z-black/70">No products yet. Check back soon.</p>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
