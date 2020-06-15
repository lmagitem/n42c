package com.n42c.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.n42c.web.rest.TestUtil;

public class ProfilePartPreciseItemTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProfilePartPreciseItem.class);
        ProfilePartPreciseItem profilePartPreciseItem1 = new ProfilePartPreciseItem();
        profilePartPreciseItem1.setId(1L);
        ProfilePartPreciseItem profilePartPreciseItem2 = new ProfilePartPreciseItem();
        profilePartPreciseItem2.setId(profilePartPreciseItem1.getId());
        assertThat(profilePartPreciseItem1).isEqualTo(profilePartPreciseItem2);
        profilePartPreciseItem2.setId(2L);
        assertThat(profilePartPreciseItem1).isNotEqualTo(profilePartPreciseItem2);
        profilePartPreciseItem1.setId(null);
        assertThat(profilePartPreciseItem1).isNotEqualTo(profilePartPreciseItem2);
    }
}
