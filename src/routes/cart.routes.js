import { Router } from 'express';
import { CartManager } from '../../CartManager.js';

const cartManager = new CartManager('./carrito.txt'); 
const cartsRouter = Router(); 

// Encuentra carrito
cartsRouter.get('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartManager.getCartById(cartId);
        res.send(cart);
    } catch (error) {
        console.log(error);
        res.send('Error en la consulta');
    }
});

//Crea carrito vacío
cartsRouter.post("/", async (req, res) => {
    const carritoCreado = await cartManager.createCarrito()
    res.send(carritoCreado);
})

//Modifica cantidad de productos en carrito
cartsRouter.post('/:cid/products/:pid', async (req, res) =>{
    try{
        const carritoId = req.params.cid;
        const productId = req.params.pid;
        const quantity  = req.body.quantity;
        console.log(carritoId, productId, quantity)
        const carritoActualizado = await cartManager.addProductCart({ carritoId, productId, quantity })
        res.send(carritoActualizado);

    }
    catch(error){
        console.log(error);
        res.send('Error en la consulta');
    }
})




export default cartsRouter; 