package com.n42c.domain;

import com.n42c.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class NinthMissionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NinthMission.class);
        NinthMission ninthMission1 = new NinthMission();
        ninthMission1.setId(1L);
        NinthMission ninthMission2 = new NinthMission();
        ninthMission2.setId(ninthMission1.getId());
        assertThat(ninthMission1).isEqualTo(ninthMission2);
        ninthMission2.setId(2L);
        assertThat(ninthMission1).isNotEqualTo(ninthMission2);
        ninthMission1.setId(null);
        assertThat(ninthMission1).isNotEqualTo(ninthMission2);
    }
}
