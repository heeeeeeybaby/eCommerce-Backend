import { Router } from 'express';
import { ProductManager } from '../../ProductManager';

const productManager = new ProductManager('../ProductManager.js'); 

app.get('/', (req, res) => {
    res.send("Mi primer servidor con express")
})

app.get("/product", async (req, res) => {
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
            res.send("Error")
    }
});
app.get('/products/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
        const product = await productManager.getProductById(productId);
      if (!product) { // Si no se encontró el producto
        res.send('Product not found');
        } else {
        res.send(product);
        }
    } catch (error) {
        console.log(error);
        res.send('Internal server error');
    }
  });


app.post("/product", async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;
    await productManager.addProduct({ title, description, price, thumbnail, code, stock })
    res.send("Producto creado");
})

app.put("/product/:id", async (req, res) => {
    const id = req.params.id
    const { title, description, price, thumbnail, code, stock } = req.body

    const mensaje = await productManager.updateProduct(id, { title, description, price, thumbnail, code, stock })

    res.send(mensaje)
})

app.delete("/product/:id", async (req, res) => {
    const id = req.params.id
    const mensaje = await productManager.deleteProduct(id)
    res.send(mensaje)
})
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})