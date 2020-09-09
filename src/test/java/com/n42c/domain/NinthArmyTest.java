package com.n42c.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.n42c.web.rest.TestUtil;

public class NinthArmyTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NinthArmy.class);
        NinthArmy ninthArmy1 = new NinthArmy();
        ninthArmy1.setId(1L);
        NinthArmy ninthArmy2 = new NinthArmy();
        ninthArmy2.setId(ninthArmy1.getId());
        assertThat(ninthArmy1).isEqualTo(ninthArmy2);
        ninthArmy2.setId(2L);
        assertThat(ninthArmy1).isNotEqualTo(ninthArmy2);
        ninthArmy1.setId(null);
        assertThat(ninthArmy1).isNotEqualTo(ninthArmy2);
    }
}
