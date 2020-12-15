package com.n42c.domain;

import com.n42c.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class BlogCategoryTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BlogCategory.class);
        BlogCategory blogCategory1 = new BlogCategory();
        blogCategory1.setId(1L);
        BlogCategory blogCategory2 = new BlogCategory();
        blogCategory2.setId(blogCategory1.getId());
        assertThat(blogCategory1).isEqualTo(blogCategory2);
        blogCategory2.setId(2L);
        assertThat(blogCategory1).isNotEqualTo(blogCategory2);
        blogCategory1.setId(null);
        assertThat(blogCategory1).isNotEqualTo(blogCategory2);
    }
}
