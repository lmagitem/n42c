package com.n42c.domain;

import com.n42c.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class LocalizedProductTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LocalizedProduct.class);
        LocalizedProduct localizedProduct1 = new LocalizedProduct();
        localizedProduct1.setId(1L);
        LocalizedProduct localizedProduct2 = new LocalizedProduct();
        localizedProduct2.setId(localizedProduct1.getId());
        assertThat(localizedProduct1).isEqualTo(localizedProduct2);
        localizedProduct2.setId(2L);
        assertThat(localizedProduct1).isNotEqualTo(localizedProduct2);
        localizedProduct1.setId(null);
        assertThat(localizedProduct1).isNotEqualTo(localizedProduct2);
    }
}
