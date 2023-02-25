const socket = io("http://localhost:8080")

let productsArray = []
document.getElementById("send").addEventListener("click", postProduct)

function postProduct()  {
let product = {
"title" : document.getElementById("title").value,
"description" : document.getElementById("description").value,
"code" : document.getElementById("code").value,
"price" : document.getElementById("price").value,
"stock" : document.getElementById("stock").value,
"thumbnail" : document.getElementById("thumbnail").value,
}

socket.emit("newProduct", product)

}

function deleteProduct(id) {
console.log(id)
socket.emit("deleteProduct", id)
}

socket.on("productsArray", data => {
let history = document.getElementById("history")
history.innerHTML = ""

data.forEach(element => {
    history.innerHTML += `
                    <tr>
                    <td> ${element.title} </td>
                    <td>${element.description}</td>                    
                    <td>$ ${element.price}</td>
                    <td>${element.stock} Unidades</td>
                    </tr>
                    <button onclick="deleteProduct(${element.id})">Delete</button>
    `
})
})