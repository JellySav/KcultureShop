package com.kcultureshop.service;

import com.kcultureshop.domain.ShippingType;

/**
 * Contrato puro para el servicio de notificación de envíos.
 *
 * Esta interfaz no sabe nada sobre CÓMO se notifica (SMS, email,
 * WhatsApp, un courier internacional, etc.). Esa decisión pertenece
 * a la capa de infraestructura, fuera del alcance de este dominio.
 *
 * Al depender de esta abstracción (Principio de Inversión de
 * Dependencias) en lugar de una implementación concreta, OrderService
 * queda completamente aislado y testeable sin red ni servicios externos.
 */
public interface ShippingNotifier {

    /**
     * Notifica al cliente que su pedido fue procesado y será enviado.
     *
     * @param customerContact dato de contacto del cliente (teléfono o email)
     * @param orderId          identificador del pedido
     * @param shippingType     tipo de envío (nacional o internacional)
     */
    void notifyShipment(String customerContact, String orderId, ShippingType shippingType);
}
