package com.n42c.domain.enumerations;

/**
 * The NinthGameSize enumeration.
 */
public enum NinthGameSize {
    CP("CombatPatrol"),
    IN("Incursion"),
    SF("StrikeForce"),
    ON("Onslaught");

    private final String value;


    NinthGameSize(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
