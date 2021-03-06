package com.n42c.domain.enumerations;

/**
 * The NinthGameTurn enumeration.
 */
public enum NinthGameTurn {
    US("User"),
    OP("Opponent");

    private final String value;


    NinthGameTurn(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
