package com.n42c.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.n42c.web.rest.TestUtil;

public class NinthArmyMomentTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NinthArmyMoment.class);
        NinthArmyMoment ninthArmyMoment1 = new NinthArmyMoment();
        ninthArmyMoment1.setId(1L);
        NinthArmyMoment ninthArmyMoment2 = new NinthArmyMoment();
        ninthArmyMoment2.setId(ninthArmyMoment1.getId());
        assertThat(ninthArmyMoment1).isEqualTo(ninthArmyMoment2);
        ninthArmyMoment2.setId(2L);
        assertThat(ninthArmyMoment1).isNotEqualTo(ninthArmyMoment2);
        ninthArmyMoment1.setId(null);
        assertThat(ninthArmyMoment1).isNotEqualTo(ninthArmyMoment2);
    }
}
