package com.n42c.domain.enumeration;

/**
 * The Faction enumeration.
 */
public enum Faction {
    IM("Imperium"),
    CH("Chaos"),
    EL("Eldar"),
    TY("Tyranid"),
    OR("Ork"),
    NE("Necron"),
    TA("Tau"),
    OT("Other"),
    NA("None");

    private final String value;


    Faction(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
