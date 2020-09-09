package com.n42c.domain.enumeration;

/**
 * The NinthCrusadeRank enumeration.
 */
public enum NinthCrusadeRank {
    RE("Ready"),
    BL("Bloodied"),
    BH("BattleHardened"),
    HE("Heroic"),
    LE("Legendary");

    private final String value;


    NinthCrusadeRank(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
