import { notFound } from "next/navigation";
import { getProductBySlug } from "@/src/lib/products";
import { AddToCartButton } from "./AddToCartButton";
import Image from "next/image";
import Link from "next/link";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="panel panel-glow mx-auto max-w-2xl p-8 text-white">
        <Link href="/shopping" className="mb-6 inline-block text-z-green transition-colors hover:text-z-green/80">
          ← Merchandise
        </Link>
        <div className="flex flex-col gap-8 sm:flex-row">
          <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-lg bg-z-gray/30 sm:w-64">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-contain p-4"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-white/30">
                No image
              </div>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-shadow">{product.name}</h1>
            {product.description && (
              <p className="mt-2 text-white/80">{product.description}</p>
            )}
            <p className="mt-4 text-xl font-semibold text-z-green">
              ${(product.priceCents / 100).toFixed(2)}
            </p>
            <div className="mt-6">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
