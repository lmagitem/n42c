package com.n42c.domain;

import com.n42c.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class LocalizedBlogTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LocalizedBlog.class);
        LocalizedBlog localizedBlog1 = new LocalizedBlog();
        localizedBlog1.setId(1L);
        LocalizedBlog localizedBlog2 = new LocalizedBlog();
        localizedBlog2.setId(localizedBlog1.getId());
        assertThat(localizedBlog1).isEqualTo(localizedBlog2);
        localizedBlog2.setId(2L);
        assertThat(localizedBlog1).isNotEqualTo(localizedBlog2);
        localizedBlog1.setId(null);
        assertThat(localizedBlog1).isNotEqualTo(localizedBlog2);
    }
}
