package com.n42c.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.n42c.web.rest.TestUtil;

public class NinthArmyUnitMomentTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NinthArmyUnitMoment.class);
        NinthArmyUnitMoment ninthArmyUnitMoment1 = new NinthArmyUnitMoment();
        ninthArmyUnitMoment1.setId(1L);
        NinthArmyUnitMoment ninthArmyUnitMoment2 = new NinthArmyUnitMoment();
        ninthArmyUnitMoment2.setId(ninthArmyUnitMoment1.getId());
        assertThat(ninthArmyUnitMoment1).isEqualTo(ninthArmyUnitMoment2);
        ninthArmyUnitMoment2.setId(2L);
        assertThat(ninthArmyUnitMoment1).isNotEqualTo(ninthArmyUnitMoment2);
        ninthArmyUnitMoment1.setId(null);
        assertThat(ninthArmyUnitMoment1).isNotEqualTo(ninthArmyUnitMoment2);
    }
}
