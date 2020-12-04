package com.n42c.domain;

import com.n42c.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class NinthUnitMomentTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NinthUnitMoment.class);
        NinthUnitMoment ninthUnitMoment1 = new NinthUnitMoment();
        ninthUnitMoment1.setId(1L);
        NinthUnitMoment ninthUnitMoment2 = new NinthUnitMoment();
        ninthUnitMoment2.setId(ninthUnitMoment1.getId());
        assertThat(ninthUnitMoment1).isEqualTo(ninthUnitMoment2);
        ninthUnitMoment2.setId(2L);
        assertThat(ninthUnitMoment1).isNotEqualTo(ninthUnitMoment2);
        ninthUnitMoment1.setId(null);
        assertThat(ninthUnitMoment1).isNotEqualTo(ninthUnitMoment2);
    }
}
