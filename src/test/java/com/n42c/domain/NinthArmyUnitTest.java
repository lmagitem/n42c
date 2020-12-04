package com.n42c.domain;

import com.n42c.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class NinthArmyUnitTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NinthArmyUnit.class);
        NinthArmyUnit ninthArmyUnit1 = new NinthArmyUnit();
        ninthArmyUnit1.setId(1L);
        NinthArmyUnit ninthArmyUnit2 = new NinthArmyUnit();
        ninthArmyUnit2.setId(ninthArmyUnit1.getId());
        assertThat(ninthArmyUnit1).isEqualTo(ninthArmyUnit2);
        ninthArmyUnit2.setId(2L);
        assertThat(ninthArmyUnit1).isNotEqualTo(ninthArmyUnit2);
        ninthArmyUnit1.setId(null);
        assertThat(ninthArmyUnit1).isNotEqualTo(ninthArmyUnit2);
    }
}
