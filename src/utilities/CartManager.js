import fs from "fs"

class CartManager {
    constructor(filename) {
    this.path = filename
    fs.existsSync(this.path) ? this.cart = JSON.parse(fs.readFileSync(this.path, 'utf-8')) : this.cart = [];
    }

    async createCart() {
    let cart = {
        "products": [] 
    }

    this.cart.length === 0 ? cart["id"] = 1 : cart["id"] = this.cart[this.cart.length - 1]["id"] + 1 
    this.cart.push(cart)
    await fs.promises.writeFile(this.path, JSON.stringify(this.cart, null, '\t'))
    }

    async addToCart(CartId, ProductId, quantity) {
    let index = this.cart.findIndex(cart => cart.id === CartId)
    if (index === -1 || this.cart[index]["products"] === undefined) return false;
    let productIndex = this.cart[index]["products"].findIndex(pid => pid.productId === ProductId)
    let productAlreadyInCart = this.cart[index]["products"].some(pid => pid.productId === ProductId)

    if (productAlreadyInCart) {
        this.cart[index]["products"][productIndex]["quantity"] += quantity;  //aumenta la cantidad si ya existe
    } else {
        this.cart[index]["products"].push({ "productId": ProductId, "quantity": quantity }) //agrega el id y cantidad si no
    }
    
    await fs.promises.writeFile(this.path, JSON.stringify(this.cart, null, '\t'))
    return true;
    }

    getCart = (id) => {
    let cart = this.cart.find(carts => carts.id === id)
    return cart || false
    }
}

export default new CartManager('./cart.json')