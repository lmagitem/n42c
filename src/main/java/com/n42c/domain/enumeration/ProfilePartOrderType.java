package com.n42c.domain.enumeration;

/**
 * The ProfilePartOrderType enumeration.
 */
public enum ProfilePartOrderType {
    AZA("AlphabeticalAscending"),
    AZD("AlphabeticalDescending"),
    YEA("YearlyAscending"),
    YED("YearlyDescending"),
    MOA("MonthlyAscending"),
    MOD("MonthlyDescending"),
    CAA("CalendaredAscending"),
    CAD("CalendaredDescending");

    private final String value;


    ProfilePartOrderType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
