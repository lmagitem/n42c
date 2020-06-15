package com.n42c.domain.enumeration;

/**
 * The AppUserRights enumeration.
 */
public enum AppUserRights {
    MOD("Moderator"),
    WRI("Writer"),
    REA("Reader");

    private final String value;


    AppUserRights(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
