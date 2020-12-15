package com.n42c.domain.enumerations;

/**
 * The Language enumeration.
 */
public enum Language {
    EN("English"),
    FR("French"),
    AR("Arabic"),
    ZH("Chinese"),
    DA("Danish"),
    NL("Dutch"),
    FI("Finnish"),
    DE("German"),
    EL("Greek"),
    HU("Hungarian"),
    IS("Icelandic"),
    ID("Indonesian"),
    GA("Irish"),
    IT("Italian"),
    JA("Japanese"),
    KO("Korean"),
    FA("Persian"),
    PL("Polish"),
    PT("Portuguese"),
    RO("Romanian"),
    RU("Russian"),
    SR("Serbian"),
    ES("Spanish"),
    SV("Swedish"),
    TR("Turkish");

    private final String value;


    Language(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
