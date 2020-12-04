package com.n42c.domain;

import com.n42c.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class NinthStratagemGroupTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NinthStratagemGroup.class);
        NinthStratagemGroup ninthStratagemGroup1 = new NinthStratagemGroup();
        ninthStratagemGroup1.setId(1L);
        NinthStratagemGroup ninthStratagemGroup2 = new NinthStratagemGroup();
        ninthStratagemGroup2.setId(ninthStratagemGroup1.getId());
        assertThat(ninthStratagemGroup1).isEqualTo(ninthStratagemGroup2);
        ninthStratagemGroup2.setId(2L);
        assertThat(ninthStratagemGroup1).isNotEqualTo(ninthStratagemGroup2);
        ninthStratagemGroup1.setId(null);
        assertThat(ninthStratagemGroup1).isNotEqualTo(ninthStratagemGroup2);
    }
}
