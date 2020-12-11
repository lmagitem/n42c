package com.n42c.domain.enumerations;

/**
 * The SubFaction enumeration.
 */
public enum SubFaction {
    SM("SpaceMarines"),
    BA("BloodAngels"),
    DA("DarkAngels"),
    DW("Deathwatch"),
    GK("GreyKnights"),
    SW("SpaceWolves"),
    GU("ImperialGuard"),
    IN("Inquisition"),
    OA("OfficioAssassinorum"),
    CU("Custodes"),
    SO("Sororitas"),
    ME("Mechanicus"),
    KN("ImperialKnights"),
    SS("SistersOfSilence"),
    SQ("Squats"),
    DZ("Daemons"),
    CK("ChaosKnights"),
    CM("ChaosMarines"),
    DG("DeathGuard"),
    TS("ThousandSons"),
    RH("RenegadesAndHeretics"),
    DM("DarkMechanicum"),
    GC("GenestealerCults"),
    TY("Tyranids"),
    TA("Tau"),
    KR("Kroots"),
    NE("Necrons"),
    OR("Orks"),
    CE("CraftworldEldars"),
    DE("DarkEldars"),
    HA("Harlequins"),
    YN("Ynnari"),
    OT("Others"),
    MX("Mixed");

    private final String value;


    SubFaction(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
