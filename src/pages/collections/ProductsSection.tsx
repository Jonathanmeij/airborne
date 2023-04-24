import { Product } from "@prisma/client";
import { useState } from "react";
import { Button, Container, SideMenu } from "~/components/ui";

import { ListboxElement, type Option } from "~/components/ui/Input";

interface ProductOptionsProps {
  products: Product[];
}

export default function ProductsSection({ products }: ProductOptionsProps) {
  return (
    <div>
      <Container maxWidth="7xl" className="m-auto">
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return <div className="w-full bg-zinc-900">{product.title}</div>;
}
