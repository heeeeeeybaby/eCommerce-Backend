import { Router } from 'express';
import { CartManager } from '../../CartManager.js';

const cartManager = new CartManager('../CartManager.js'); 
const cartsRouter = Router(); 

export default cartsRouter; 