package com.n42c.domain.enumerations;

/**
 * The ProfilePartType enumeration.
 */
public enum ProfilePartType {
    ED("Education"),
    PR("ProfessionalExperiences"),
    SK("Skills"),
    CE("Certifications"),
    CU("Custom");

    private final String value;


    ProfilePartType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
