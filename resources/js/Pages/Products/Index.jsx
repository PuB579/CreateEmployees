import { Link } from '@inertiajs/react'; export default function Index({ products }) {
    return (
        <>
        <h1>Product Index</h1>
            <div>
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            <Link href={`/products/${product.id}`}>
                                {product.name} - ${product.price}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
