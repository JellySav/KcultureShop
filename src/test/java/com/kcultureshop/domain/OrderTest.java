package com.kcultureshop.domain;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertTrue;

class OrderTest {

    @Test
    void constructor_ShouldInitializeOrderWithZeroTotalAndEmptyItems() {
        // Preparar y ejecutar
        Order order = new Order("ORD-001", ShippingType.NATIONAL);

        // Verificar
        assertEquals(0.0, order.getTotal());
        assertNotNull(order.getItems());
        assertTrue(order.getItems().isEmpty());
    }

    @Test
    void addProduct_ShouldAddProductToOrderAndUpdateTotal_WhenQuantityIsValid() {
        // Preparar
        Order order = new Order("ORD-002", ShippingType.INTERNATIONAL);
        Product product = new Product("P-002", "Kpop Figure", ProductCategory.FIGURE, 12000.0, 5);

        // Ejecutar
        order.addProduct(product, 2);

        // Verificar
        assertEquals(1, order.getItems().size());
        assertSame(product, order.getItems().get(0));
        assertEquals(24000.0, order.getTotal());
        assertEquals(3, product.getStockQuantity());
    }
}
