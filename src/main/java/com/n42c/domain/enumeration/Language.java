package com.n42c.domain.enumeration;

/**
 * The Language enumeration.
 */
public enum Language {
    EN("English"),
    FR("French"),
    ES("Spanish"),
    GE("German"),
    RU("Russian"),
    AR("Arabic"),
    CH("Mandarin"),
    PR("Portuguese"),
    IT("Italian"),
    PO("Polish"),
    DU("Dutch"),
    GR("Greek"),
    SW("Swedish"),
    TU("Turkish"),
    RO("Romanian"),
    JP("Japanese"),
    KO("Korean"),
    HU("Hungarian"),
    DA("Danish");

    private final String value;


    Language(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
