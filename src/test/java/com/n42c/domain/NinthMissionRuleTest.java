package com.n42c.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.n42c.web.rest.TestUtil;

public class NinthMissionRuleTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NinthMissionRule.class);
        NinthMissionRule ninthMissionRule1 = new NinthMissionRule();
        ninthMissionRule1.setId(1L);
        NinthMissionRule ninthMissionRule2 = new NinthMissionRule();
        ninthMissionRule2.setId(ninthMissionRule1.getId());
        assertThat(ninthMissionRule1).isEqualTo(ninthMissionRule2);
        ninthMissionRule2.setId(2L);
        assertThat(ninthMissionRule1).isNotEqualTo(ninthMissionRule2);
        ninthMissionRule1.setId(null);
        assertThat(ninthMissionRule1).isNotEqualTo(ninthMissionRule2);
    }
}
