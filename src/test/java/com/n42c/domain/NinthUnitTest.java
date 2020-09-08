package com.n42c.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.n42c.web.rest.TestUtil;

public class NinthUnitTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NinthUnit.class);
        NinthUnit ninthUnit1 = new NinthUnit();
        ninthUnit1.setId(1L);
        NinthUnit ninthUnit2 = new NinthUnit();
        ninthUnit2.setId(ninthUnit1.getId());
        assertThat(ninthUnit1).isEqualTo(ninthUnit2);
        ninthUnit2.setId(2L);
        assertThat(ninthUnit1).isNotEqualTo(ninthUnit2);
        ninthUnit1.setId(null);
        assertThat(ninthUnit1).isNotEqualTo(ninthUnit2);
    }
}
