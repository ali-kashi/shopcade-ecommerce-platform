import ProductBox from "./ProductBox";

export default function ProductsList({products = []}){
    return(
        <div className="products-grid">
            {
                products.map(
                    (product)=> <ProductBox key={product.id} product={product}/>
                )
            }
        </div>
    )
}