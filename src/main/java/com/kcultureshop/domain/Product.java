package com.kcultureshop.domain;

/**
 * Representa un artículo del inventario (álbum, photocard, merch, figura).
 * Es una entidad de dominio pura: no depende de ningún framework,
 * base de datos ni librería externa.
 */
public class Product {

    private final String id;
    private final String name;
    private final ProductCategory category;
    private final double price;
    private int stockQuantity;

    public Product(String id, String name, ProductCategory category, double price, int stockQuantity) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.stockQuantity = stockQuantity;
    }

    /**
     * Descuenta unidades del stock disponible tras una compra.
     * Regla de negocio: la cantidad solicitada debe ser mayor a 0
     * y no puede superar el stock disponible.
     *
     * @param quantity cantidad a descontar
     * @throws InvalidQuantityException si la cantidad es inválida
     */
    public void reduceStock(int quantity) {
        if (quantity <= 0) {
            throw new InvalidQuantityException(
                    "La cantidad solicitada debe ser mayor a 0.");
        }
        if (quantity > this.stockQuantity) {
            throw new InvalidQuantityException(
                    "Stock insuficiente para el producto: " + this.name);
        }
        this.stockQuantity -= quantity;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public ProductCategory getCategory() {
        return category;
    }

    public double getPrice() {
        return price;
    }

    public int getStockQuantity() {
        return stockQuantity;
    }
}
