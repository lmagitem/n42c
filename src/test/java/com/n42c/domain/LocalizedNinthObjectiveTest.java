package com.n42c.domain;

import com.n42c.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class LocalizedNinthObjectiveTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LocalizedNinthObjective.class);
        LocalizedNinthObjective localizedNinthObjective1 = new LocalizedNinthObjective();
        localizedNinthObjective1.setId(1L);
        LocalizedNinthObjective localizedNinthObjective2 = new LocalizedNinthObjective();
        localizedNinthObjective2.setId(localizedNinthObjective1.getId());
        assertThat(localizedNinthObjective1).isEqualTo(localizedNinthObjective2);
        localizedNinthObjective2.setId(2L);
        assertThat(localizedNinthObjective1).isNotEqualTo(localizedNinthObjective2);
        localizedNinthObjective1.setId(null);
        assertThat(localizedNinthObjective1).isNotEqualTo(localizedNinthObjective2);
    }
}
