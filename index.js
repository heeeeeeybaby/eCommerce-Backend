import express from 'express';
import multer from 'multer';
import productRouter from './src/routes/product.routes.js';
import cartRouter from  './src/routes/cart.routes.js';
import { __dirname } from './path.js';

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

//Rutas
app.use('/static', express.static(__dirname + '/public'));
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.get('/', (req, res) => {
    res.send("Mi primer servidor con express")
})

//Multer
app.post('/upload', upload.single('product'), (req, res) => {
    //Imagenes
    console.log(req.body)
    console.log(req.file)
    res.send("Imagen subida")
}) 

//Server
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})
