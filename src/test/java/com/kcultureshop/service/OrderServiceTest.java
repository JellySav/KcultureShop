package com.kcultureshop.service;

import com.kcultureshop.domain.InvalidQuantityException;
import com.kcultureshop.domain.Order;
import com.kcultureshop.domain.Product;
import com.kcultureshop.domain.ProductCategory;
import com.kcultureshop.domain.ShippingType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private ShippingNotifier shippingNotifier;

    private OrderService orderService;
    private Product product;
    private Order order;

    @BeforeEach
    void setUp() {
        // Preparación común a todos los tests: el doble de prueba se inyecta
        // por constructor, tal como se haría con la dependencia real en producción.
        orderService = new OrderService(shippingNotifier);
        product = new Product("P-001", "Photocard Set", ProductCategory.PHOTOCARD, 5000.0, 10);
        order = new Order("ORD-001", ShippingType.NATIONAL);
    }

    @Test
    void processPurchase_ShouldReduceStockAndAccumulateTotal_WhenQuantityIsValid() {
        // Preparar
        int quantityToBuy = 2;

        // Ejecutar
        orderService.processPurchase(order, product, quantityToBuy, "+56912345678");

        // Verificar
        assertEquals(8, product.getStockQuantity());
        assertEquals(10000.0, order.getTotal());
        verify(shippingNotifier, times(1))
                .notifyShipment("+56912345678", "ORD-001", ShippingType.NATIONAL);
    }

    @ParameterizedTest
    @ValueSource(ints = {0, -1, -5})
    void processPurchase_ShouldThrowInvalidQuantityException_WhenQuantityIsZeroOrNegative(int invalidQuantity) {
        // Ejecutar y verificar
        assertThrows(InvalidQuantityException.class, () ->
                orderService.processPurchase(order, product, invalidQuantity, "+56912345678"));

        // El notificador NUNCA debe invocarse si la validación de negocio falla antes.
        verify(shippingNotifier, never()).notifyShipment(anyString(), anyString(), any(ShippingType.class));
    }

    @Test
    void processPurchase_ShouldThrowInvalidQuantityException_WhenQuantityExceedsStock() {
        // Preparar
        int quantityGreaterThanStock = 999;

        // Ejecutar y verificar
        InvalidQuantityException exception = assertThrows(InvalidQuantityException.class, () ->
                orderService.processPurchase(order, product, quantityGreaterThanStock, "+56912345678"));

        assertEquals("Stock insuficiente para el producto: Photocard Set", exception.getMessage());
        verify(shippingNotifier, never()).notifyShipment(anyString(), anyString(), any(ShippingType.class));
    }

    @Test
    void calculateShippingCost_ShouldReturnNationalFee_WhenShippingTypeIsNational() {
        // Ejecutar
        double cost = orderService.calculateShippingCost(ShippingType.NATIONAL);

        // Verificar
        assertEquals(3000.0, cost);
    }

    @Test
    void calculateShippingCost_ShouldReturnInternationalFee_WhenShippingTypeIsInternational() {
        // Ejecutar
        double cost = orderService.calculateShippingCost(ShippingType.INTERNATIONAL);

        // Verificar
        assertEquals(15000.0, cost);
    }
}
