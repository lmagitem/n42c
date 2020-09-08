package com.n42c.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.n42c.web.rest.TestUtil;

public class LocalizedNinthStratagemGroupTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LocalizedNinthStratagemGroup.class);
        LocalizedNinthStratagemGroup localizedNinthStratagemGroup1 = new LocalizedNinthStratagemGroup();
        localizedNinthStratagemGroup1.setId(1L);
        LocalizedNinthStratagemGroup localizedNinthStratagemGroup2 = new LocalizedNinthStratagemGroup();
        localizedNinthStratagemGroup2.setId(localizedNinthStratagemGroup1.getId());
        assertThat(localizedNinthStratagemGroup1).isEqualTo(localizedNinthStratagemGroup2);
        localizedNinthStratagemGroup2.setId(2L);
        assertThat(localizedNinthStratagemGroup1).isNotEqualTo(localizedNinthStratagemGroup2);
        localizedNinthStratagemGroup1.setId(null);
        assertThat(localizedNinthStratagemGroup1).isNotEqualTo(localizedNinthStratagemGroup2);
    }
}
