package com.kcultureshop.domain;

/**
 * Representa las subcategorías del inventario de la tienda.
 * Al ser un enum, Java garantiza en tiempo de compilación que no
 * puedan existir categorías inválidas o mal escritas.
 */
public enum ProductCategory {
    ALBUM,
    PHOTOCARD,
    MERCH,
    FIGURE
}
