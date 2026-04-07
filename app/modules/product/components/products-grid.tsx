import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { formatPrice } from "~/lib/format";
import type { Products } from "../type";

export function ProductsGrid({ products }: { products: Products }) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-4xl">
      {products.map((product) => {
        return (
          <li key={product.id} className="h-full">
            <Link to={`/products/${product.slug}`} className="block h-full">
              <Card className="overflow-hidden flex flex-col h-full">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <CardHeader className="flex-1">
                  <CardTitle
                    className="text-lg line-clamp-2"
                    title={product.name}
                  >
                    {product.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col items-end">
                  <p className="text-2xl font-bold">
                    {formatPrice(product.price)}
                  </p>
                  <p className="text-md text-muted-foreground">
                    Stock: {product.stock}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
