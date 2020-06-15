package com.n42c.domain.enumeration;

/**
 * The Language enumeration.
 */
public enum Language {
    EN("English"),
    FR("French"),
    ES("Spanish");

    private final String value;


    Language(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
