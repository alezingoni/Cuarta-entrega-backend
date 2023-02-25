import { Router } from "express";
import express from "express";
import ProductManager from "../utilities/ProductManager.js"

const router = express.Router();

let renderProduct = ProductManager.getProducts()

router.get("/", (req, res) => {
    res.render("index", {renderProduct})
    })

export default router