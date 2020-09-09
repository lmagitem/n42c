package com.n42c.domain.enumeration;

/**
 * The NinthGamePhase enumeration.
 */
public enum NinthGamePhase {
    PG("PreGame"),
    CP("CommandPhase"),
    MP("MovementPhase"),
    PP("PsychicPhase"),
    SP("ShootingPhase"),
    CH("ChargePhase"),
    FP("FightPhase"),
    MO("MoralePhase"),
    NA("None");

    private final String value;


    NinthGamePhase(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
