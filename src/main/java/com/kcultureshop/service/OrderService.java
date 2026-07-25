package com.kcultureshop.service;

import com.kcultureshop.domain.Order;
import com.kcultureshop.domain.Product;
import com.kcultureshop.domain.ShippingType;

/**
 * Servicio core que orquesta el proceso de compra.
 *
 * Recibe el ShippingNotifier por constructor (Inyección de Dependencias):
 * - En producción, el framework (o el punto de entrada de la app) le
 *   pasará una implementación real (ej. un cliente SMS o de correo).
 * - En los tests, se le pasará un doble de prueba en memoria,
 *   sin tocar red ni servicios externos.
 */
public class OrderService {

    private static final double NATIONAL_SHIPPING_FEE = 3000.0;
    private static final double INTERNATIONAL_SHIPPING_FEE = 15000.0;

    private final ShippingNotifier shippingNotifier;

    public OrderService(ShippingNotifier shippingNotifier) {
        this.shippingNotifier = shippingNotifier;
    }

    /**
     * Procesa la compra de un producto dentro de un pedido:
     * 1. Descuenta stock y acumula el total (delegado en Order/Product;
     *    si la cantidad es inválida, la excepción de negocio se propaga
     *    tal cual, sin ser capturada aquí).
     * 2. Notifica al cliente de forma obligatoria una vez completada la operación.
     *
     * @param order           el pedido en curso
     * @param product         el producto a comprar
     * @param quantity        la cantidad solicitada
     * @param customerContact el contacto del cliente para la notificación
     */
    public void processPurchase(Order order, Product product, int quantity, String customerContact) {
        order.addProduct(product, quantity);
        shippingNotifier.notifyShipment(customerContact, order.getOrderId(), order.getShippingType());
    }

    /**
     * Calcula el costo de envío según el tipo de pedido.
     * Este método es intencionalmente simple pero contiene la rama
     * condicional (cobertura de ramas) que evaluaremos: nacional vs.
     * internacional, cada una con su propio camino lógico.
     *
     * @param shippingType tipo de envío del pedido
     * @return el costo de envío correspondiente
     */
    public double calculateShippingCost(ShippingType shippingType) {
        if (shippingType == ShippingType.NATIONAL) {
            return NATIONAL_SHIPPING_FEE;
        } else {
            return INTERNATIONAL_SHIPPING_FEE;
        }
    }
}
