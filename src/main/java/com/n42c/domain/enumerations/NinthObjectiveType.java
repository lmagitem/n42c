package com.n42c.domain.enumeration;

/**
 * The NinthObjectiveType enumeration.
 */
public enum NinthObjectiveType {
    PR("Progressive"),
    EN("Endgame"),
    PE("ProgressiveEndgame");

    private final String value;


    NinthObjectiveType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
