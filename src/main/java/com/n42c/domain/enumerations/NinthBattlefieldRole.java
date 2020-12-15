package com.n42c.domain.enumerations;

/**
 * The NinthBattlefieldRole enumeration.
 */
public enum NinthBattlefieldRole {
    HQ("HQs"),
    TR("Troops"),
    EL("Elites"),
    FA("FastAttack"),
    HS("HeavySupport"),
    FL("Flyers"),
    AT("DedicatedTransports"),
    FO("Fortifications"),
    LW("LordOfWar");

    private final String value;


    NinthBattlefieldRole(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
