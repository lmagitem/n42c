package com.n42c.domain.enumeration;

/**
 * The LevelOfMastery enumeration.
 */
public enum LevelOfMastery {
    DA("Dabbling"),
    NO("Novice"),
    AD("Adequate"),
    CO("Competent"),
    PR("Proficient"),
    EX("Expert"),
    MA("Master");

    private final String value;


    LevelOfMastery(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
