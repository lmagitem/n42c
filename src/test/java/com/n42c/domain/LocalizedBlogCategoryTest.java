package com.n42c.domain;

import com.n42c.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class LocalizedBlogCategoryTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LocalizedBlogCategory.class);
        LocalizedBlogCategory localizedBlogCategory1 = new LocalizedBlogCategory();
        localizedBlogCategory1.setId(1L);
        LocalizedBlogCategory localizedBlogCategory2 = new LocalizedBlogCategory();
        localizedBlogCategory2.setId(localizedBlogCategory1.getId());
        assertThat(localizedBlogCategory1).isEqualTo(localizedBlogCategory2);
        localizedBlogCategory2.setId(2L);
        assertThat(localizedBlogCategory1).isNotEqualTo(localizedBlogCategory2);
        localizedBlogCategory1.setId(null);
        assertThat(localizedBlogCategory1).isNotEqualTo(localizedBlogCategory2);
    }
}
