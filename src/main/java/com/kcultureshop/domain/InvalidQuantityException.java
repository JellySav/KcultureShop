package com.kcultureshop.domain;

/**
 * Excepción de negocio controlada. Se lanza cuando se intenta
 * procesar una cantidad de producto inválida: menor o igual a cero,
 * o mayor al stock disponible.
 *
 * Extiende de RuntimeException (unchecked) porque representa una
 * violación de una regla de negocio, no un error técnico recuperable
 * que el código llamante deba estar obligado a capturar.
 */
public class InvalidQuantityException extends RuntimeException {

    public InvalidQuantityException(String message) {
        super(message);
    }
}
