import express from "express";
import handlebars from "express-handlebars";
import viewRouter from "./src/routes/views.routes.js"
import {Server} from "socket.io";
import __dirname from "./dirname.js";
import ProductManager from "./src/utilities/ProductManager.js";

//iniciar y setear express
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//iniciar socket
const httpServer = app.listen(8080, () => console.log("Listening on port 8080"))
const io = new Server(httpServer)

//handlebars

app.engine("hbs", handlebars.engine({
extname: "hbs",
defaultLayout: "main"
}))

app.set("view engine", "hbs");
app.set("views", `${__dirname}/src/views`);
app.set(express.static(`${__dirname}/public`))
app.use("/", viewRouter)

app.get('/realtimeproducts', (req, res) => {
res.render('realTimeProducts')
})

let history = ProductManager.getProducts()

// Configuracion servidor Socket

io.on('connection', (socket) => {
console.log("Se ha conectado el socket con id :", socket.id)

  // Para carga de productos al inicio de pagina realtimeproducts
socket.emit("productsArray", history)

  // Para agregar productos nuevos
socket.on("newProduct", (data) => {
    ProductManager.addProduct(data)
    io.emit("productsArray", history)
    console.log(data)
})

  //Para eliminar productos 
socket.on("deleteProduct", id => {
    ProductManager.deleteProduct(id)
    io.emit("productsArray", history)
    console.log("Se ha eliminado un producto")
})

})

io.on("conncetion", (socket) => {
console.log("new client connected");
})