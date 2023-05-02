import { promises as fs } from 'fs';

export class CartManager {
    constructor(path) {
        this.path = path
    }

    static incrementarID() {
        if (this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }

    async createCarrito() {
        const cartsJSON = await fs.readFile(this.path, 'utf-8')
        const carts = JSON.parse(cartsJSON)
        const carrito = {
            id: CartManager.incrementarID(),
            products: []
        }
        carts.push(carrito)
        await fs.writeFile(this.path, JSON.stringify(carts))
        return "Carrito creado"
    }

    async getCartById(id) {
        const cartsJSON = await fs.readFile(this.path, 'utf-8')
        const carts = JSON.parse(cartsJSON)
        if (carts.some(cart => cart.id === parseInt(id))) {
            return carts.find(cart => cart.id === parseInt(id))
        } else {
            return "Carrito no encontrado en cart manager"
        }
    }

/*     async addProductCart(carritoId, productId, quantity) {
        const cartsJSON = await fs.readFile(this.path, 'utf-8')
        const carts = JSON.parse(cartsJSON)
        const carrito = carts.find(cart => cart.id === parseInt(carritoId))
        if(!carrito){
            console.log(carrito)
            return "No encontramos este carrito"
        }else{
            console.log("paentro!", carrito)
            if (carrito.products.some(product => product.id === parseInt(productId))) {
                //Modifica la cantidad
                carrito.products.quantity += parseInt(quantity);
                return `Cantidad Actualizada para el producto ID: ${productId}`;
            } else {
                //Crear nuevo objeto con id y quantity y guardarlo en el carrito
                carrito.products.push({ id: productId, quantity: quantity });
                return "Producto agregado al carrito"
            }
        }

        //Consultar el indice del carrito y modificarlo para guardarlo en el txt
    } */

    async addProductCart(carritoId, productId, quantity) {
        const cartsJSON = await fs.readFile(this.path, 'utf-8')
        const carts = JSON.parse(cartsJSON)
        console.log(carts)
        console.log(carts.find(cart => cart.id === parseInt(carritoId)));
        if (carts.some(cart => cart.id === parseInt(carritoId))) {
            let index = carts.findIndex(cart => cart.id == parseInt(carritoId))
            console.log(carts[index].products)
/*             await fs.writeFile(this.path, JSON.stringify(prods))
 */            return "Producto actualizado"
        } else {
            return "Producto no encontrado"
        }
    }
}
