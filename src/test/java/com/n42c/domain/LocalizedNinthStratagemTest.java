package com.n42c.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.n42c.web.rest.TestUtil;

public class LocalizedNinthStratagemTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LocalizedNinthStratagem.class);
        LocalizedNinthStratagem localizedNinthStratagem1 = new LocalizedNinthStratagem();
        localizedNinthStratagem1.setId(1L);
        LocalizedNinthStratagem localizedNinthStratagem2 = new LocalizedNinthStratagem();
        localizedNinthStratagem2.setId(localizedNinthStratagem1.getId());
        assertThat(localizedNinthStratagem1).isEqualTo(localizedNinthStratagem2);
        localizedNinthStratagem2.setId(2L);
        assertThat(localizedNinthStratagem1).isNotEqualTo(localizedNinthStratagem2);
        localizedNinthStratagem1.setId(null);
        assertThat(localizedNinthStratagem1).isNotEqualTo(localizedNinthStratagem2);
    }
}
