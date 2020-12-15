package com.n42c.domain;

import com.n42c.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class NinthObjectiveTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NinthObjective.class);
        NinthObjective ninthObjective1 = new NinthObjective();
        ninthObjective1.setId(1L);
        NinthObjective ninthObjective2 = new NinthObjective();
        ninthObjective2.setId(ninthObjective1.getId());
        assertThat(ninthObjective1).isEqualTo(ninthObjective2);
        ninthObjective2.setId(2L);
        assertThat(ninthObjective1).isNotEqualTo(ninthObjective2);
        ninthObjective1.setId(null);
        assertThat(ninthObjective1).isNotEqualTo(ninthObjective2);
    }
}
