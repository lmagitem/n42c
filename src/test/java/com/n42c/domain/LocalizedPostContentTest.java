package com.n42c.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.n42c.web.rest.TestUtil;

public class LocalizedPostContentTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LocalizedPostContent.class);
        LocalizedPostContent localizedPostContent1 = new LocalizedPostContent();
        localizedPostContent1.setId(1L);
        LocalizedPostContent localizedPostContent2 = new LocalizedPostContent();
        localizedPostContent2.setId(localizedPostContent1.getId());
        assertThat(localizedPostContent1).isEqualTo(localizedPostContent2);
        localizedPostContent2.setId(2L);
        assertThat(localizedPostContent1).isNotEqualTo(localizedPostContent2);
        localizedPostContent1.setId(null);
        assertThat(localizedPostContent1).isNotEqualTo(localizedPostContent2);
    }
}
