package com.kcultureshop.domain;

/**
 * Tipo de envío del pedido. Esta distinción es la que más adelante
 * generará ramas condicionales (if/switch) en la lógica de negocio,
 * lo cual será clave para el ejercicio de cobertura de ramas.
 */
public enum ShippingType {
    NATIONAL,
    INTERNATIONAL
}
