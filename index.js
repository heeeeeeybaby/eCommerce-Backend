import express from 'express';
import productRouter from './routes/product.routes.js'
import cartRouter from './routes/cart.routes.js'
import multer from 'multer'
import { __dirname, __filename } from './path.js'

//Configuracion de express
const app = express();
const PORT = 4444;
const storage = multer.diskStorage({
    destination: (req, file, cb) => { //Destino de mis imagenes cargadas
        cb(null, 'src/public/img')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
});

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended:true}))
const upload = (multer({ storage: storage })); 

// Configuración de las rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

//Routes
/* app.use('/product', productRouter)
app.use('/static', express.static(__dirname + '/public'))
    app.post('/upload', upload.single('product'), (req, res) => {
        //Imagenes
        console.log(req.body)
        console.log(req.file)
        res.send("Imagen subida")
    }) */


app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})
