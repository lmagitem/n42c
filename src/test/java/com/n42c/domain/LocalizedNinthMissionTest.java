package com.n42c.domain;

import com.n42c.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class LocalizedNinthMissionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LocalizedNinthMission.class);
        LocalizedNinthMission localizedNinthMission1 = new LocalizedNinthMission();
        localizedNinthMission1.setId(1L);
        LocalizedNinthMission localizedNinthMission2 = new LocalizedNinthMission();
        localizedNinthMission2.setId(localizedNinthMission1.getId());
        assertThat(localizedNinthMission1).isEqualTo(localizedNinthMission2);
        localizedNinthMission2.setId(2L);
        assertThat(localizedNinthMission1).isNotEqualTo(localizedNinthMission2);
        localizedNinthMission1.setId(null);
        assertThat(localizedNinthMission1).isNotEqualTo(localizedNinthMission2);
    }
}
