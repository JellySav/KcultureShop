package com.kcultureshop.domain;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class ProductTest {

    @Test
    void constructor_ShouldExposeAllPropertiesThroughGetters() {
        // Preparar y ejecutar
        Product product = new Product("P-007", "Lightstick", ProductCategory.MERCH, 25000.0, 8);

        // Verificar
        assertEquals("P-007", product.getId());
        assertEquals("Lightstick", product.getName());
        assertEquals(ProductCategory.MERCH, product.getCategory());
        assertEquals(25000.0, product.getPrice());
        assertEquals(8, product.getStockQuantity());
    }

    @Test
    void reduceStock_ShouldDecreaseStock_WhenQuantityIsValid() {
        // Preparar
        Product product = new Product("P-003", "Album", ProductCategory.ALBUM, 15000.0, 10);

        // Ejecutar
        product.reduceStock(3);

        // Verificar
        assertEquals(7, product.getStockQuantity());
    }

    @Test
    void reduceStock_ShouldThrowInvalidQuantityException_WhenQuantityIsZero() {
        // Preparar
        Product product = new Product("P-004", "Photocard", ProductCategory.PHOTOCARD, 5000.0, 5);

        // Ejecutar y verificar
        assertThrows(InvalidQuantityException.class, () -> product.reduceStock(0));
        assertEquals(5, product.getStockQuantity());
    }

    @Test
    void reduceStock_ShouldThrowInvalidQuantityException_WhenQuantityIsNegative() {
        // Preparar
        Product product = new Product("P-005", "Merch", ProductCategory.MERCH, 8000.0, 5);

        // Ejecutar y verificar
        assertThrows(InvalidQuantityException.class, () -> product.reduceStock(-2));
        assertEquals(5, product.getStockQuantity());
    }

    @Test
    void reduceStock_ShouldThrowInvalidQuantityException_WhenQuantityExceedsStock() {
        // Preparar
        Product product = new Product("P-006", "Figure", ProductCategory.FIGURE, 20000.0, 2);

        // Ejecutar y verificar
        assertThrows(InvalidQuantityException.class, () -> product.reduceStock(3));
        assertEquals(2, product.getStockQuantity());
    }
}
