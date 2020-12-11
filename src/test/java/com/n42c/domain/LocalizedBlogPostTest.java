package com.n42c.domain;

import com.n42c.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class LocalizedBlogPostTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LocalizedBlogPost.class);
        LocalizedBlogPost localizedBlogPost1 = new LocalizedBlogPost();
        localizedBlogPost1.setId(1L);
        LocalizedBlogPost localizedBlogPost2 = new LocalizedBlogPost();
        localizedBlogPost2.setId(localizedBlogPost1.getId());
        assertThat(localizedBlogPost1).isEqualTo(localizedBlogPost2);
        localizedBlogPost2.setId(2L);
        assertThat(localizedBlogPost1).isNotEqualTo(localizedBlogPost2);
        localizedBlogPost1.setId(null);
        assertThat(localizedBlogPost1).isNotEqualTo(localizedBlogPost2);
    }
}
