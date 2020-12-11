package com.n42c.domain.enumerations;

/**
 * The NinthGameType enumeration.
 */
public enum NinthGameType {
    OP("OpenPlay"),
    MP("MatchedPlay"),
    CR("Crusade"),
    NG("Narrative");

    private final String value;


    NinthGameType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
