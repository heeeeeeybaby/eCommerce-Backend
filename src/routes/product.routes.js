import { Router } from 'express';
import { ProductManager } from '../../ProductManager.js';

const productManager = new ProductManager('./productos.txt'); 
console.log(productManager.getProducts()); 
const productRouter = Router(); 

productRouter.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        const limit = req.query.limit; 
        if (limit !== undefined) {
            //se utiliza el método slice() para devolver solo los primeros X productos especificados por el parámetro limit.
            const slicedProducts = products.slice(0, limit);
            res.send({ products: slicedProducts });
        } else {
            res.send({ products });
        }
        } catch (error) {
            console.log(error);
            res.send("Error al traer los productos")
    }
});

productRouter.get("/realtimeproducts", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('realtimeproducts', { products }) 

        } catch (error) {
            console.log(error);
            res.send("Error")
    }
});
productRouter.get('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
        const product = await productManager.getProductById(productId);
      if (!product) { // Si no se encontró el producto
        res.send('Producto no encontrado');
        } else {
            res.render('product', {
                title: product.title,
                description: product.description,
                price: product.price,
                code: product.code,
                stock: product.stock
        
            })
/*res.send(product); */
        }
    } catch (error) {
        console.log(error);
        res.send('Error en la consulta');
    }
    });

productRouter.post("/", async (req, res) => {
    const { title, description, category, price, thumbnail, code, stock, status } = req.body;
    const productoCreado = await productManager.addProduct({ title, description, category, price, thumbnail, code, stock, status })
    res.io.emit("mensaje", "Hola")

})

productRouter.put("/:id", async (req, res) => {
    const id = req.params.id
    const { title, description, category, price, thumbnail, code, stock, status } = req.body

    const mensaje = await productManager.updateProduct(id, { title, description, category, price, thumbnail, code, stock, status })

    res.send(mensaje)
})

productRouter.delete("/:id", async (req, res) => {
    const id = req.params.id
    const mensaje = await productManager.deleteProduct(id)
    res.send(mensaje)
})

export default productRouter; 