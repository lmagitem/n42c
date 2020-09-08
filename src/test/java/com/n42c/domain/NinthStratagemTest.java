package com.n42c.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.n42c.web.rest.TestUtil;

public class NinthStratagemTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NinthStratagem.class);
        NinthStratagem ninthStratagem1 = new NinthStratagem();
        ninthStratagem1.setId(1L);
        NinthStratagem ninthStratagem2 = new NinthStratagem();
        ninthStratagem2.setId(ninthStratagem1.getId());
        assertThat(ninthStratagem1).isEqualTo(ninthStratagem2);
        ninthStratagem2.setId(2L);
        assertThat(ninthStratagem1).isNotEqualTo(ninthStratagem2);
        ninthStratagem1.setId(null);
        assertThat(ninthStratagem1).isNotEqualTo(ninthStratagem2);
    }
}
