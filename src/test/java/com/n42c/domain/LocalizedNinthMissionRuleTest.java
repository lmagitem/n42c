package com.n42c.domain;

import com.n42c.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class LocalizedNinthMissionRuleTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LocalizedNinthMissionRule.class);
        LocalizedNinthMissionRule localizedNinthMissionRule1 = new LocalizedNinthMissionRule();
        localizedNinthMissionRule1.setId(1L);
        LocalizedNinthMissionRule localizedNinthMissionRule2 = new LocalizedNinthMissionRule();
        localizedNinthMissionRule2.setId(localizedNinthMissionRule1.getId());
        assertThat(localizedNinthMissionRule1).isEqualTo(localizedNinthMissionRule2);
        localizedNinthMissionRule2.setId(2L);
        assertThat(localizedNinthMissionRule1).isNotEqualTo(localizedNinthMissionRule2);
        localizedNinthMissionRule1.setId(null);
        assertThat(localizedNinthMissionRule1).isNotEqualTo(localizedNinthMissionRule2);
    }
}
