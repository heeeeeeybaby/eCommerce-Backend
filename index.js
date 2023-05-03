import express from 'express';
import multer from 'multer';
import productRouter from './src/routes/product.routes.js';
import cartRouter from  './src/routes/cart.routes.js';
import { __dirname, __filename } from './path.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import * as path from 'path';


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
app.engine('handlebars', engine())
app.set('view engine', 'handlebars') 
app.set('views', path.resolve(__dirname, './src/views')) 


//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended:true}))
const upload = (multer({ storage: storage })); 
const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

//ServerIO
const io = new Server(server, {cors: {origin: "*"}});
const mensajes = []

io.on('connection', (socket) => {
    console.log("Cliente conectado")
    socket.on("mensaje", info => {
        console.log(info)
/*        mensajes.push(info)
    io.emit("mensajes", mensajes)  */
    })
})

//Acceso de io
app.use((req, res, next) => {
    req.io = io; 
    next();
})

//Rutas
app.use('/static', express.static(path.join(__dirname, 'src/public')));
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.get('/', (req, res) => {
    res.render('home', {
        mensaje: "Hola Mundo"
    })
})

//Multer
app.post('/upload', upload.single('product'), (req, res) => {
    //Imagenes
    console.log(req.body)
    console.log(req.file)
    res.send("Imagen subida")
}) 

app.get("/product/realtimeproduct", (req, res) => {
    res.render('realtimeproducts')
})