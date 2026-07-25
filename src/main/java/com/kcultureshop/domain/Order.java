package com.kcultureshop.domain;

import java.util.ArrayList;
import java.util.List;

/**
 * Representa un pedido (carrito de compras) dentro de la tienda.
 * Al crearse, su estado inicial debe ser matemáticamente predecible:
 * total acumulado en 0.0 y lista de artículos vacía.
 */
public class Order {

    private final String orderId;
    private final ShippingType shippingType;
    private final List<Product> items;
    private double total;

    public Order(String orderId, ShippingType shippingType) {
        this.orderId = orderId;
        this.shippingType = shippingType;
        this.items = new ArrayList<>();
        this.total = 0.0;
    }

    /**
     * Agrega un producto al pedido, descontando stock y acumulando el total.
     * Delega la validación de cantidad en Product.reduceStock(), que es
     * quien conoce la regla de negocio real (cantidad > 0 y <= stock).
     */
    public void addProduct(Product product, int quantity) {
        product.reduceStock(quantity);
        this.items.add(product);
        this.total += product.getPrice() * quantity;
    }

    public String getOrderId() {
        return orderId;
    }

    public ShippingType getShippingType() {
        return shippingType;
    }

    public List<Product> getItems() {
        return items;
    }

    public double getTotal() {
        return total;
    }
}
