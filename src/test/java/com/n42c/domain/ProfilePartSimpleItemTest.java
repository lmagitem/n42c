package com.n42c.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.n42c.web.rest.TestUtil;

public class ProfilePartSimpleItemTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProfilePartSimpleItem.class);
        ProfilePartSimpleItem profilePartSimpleItem1 = new ProfilePartSimpleItem();
        profilePartSimpleItem1.setId(1L);
        ProfilePartSimpleItem profilePartSimpleItem2 = new ProfilePartSimpleItem();
        profilePartSimpleItem2.setId(profilePartSimpleItem1.getId());
        assertThat(profilePartSimpleItem1).isEqualTo(profilePartSimpleItem2);
        profilePartSimpleItem2.setId(2L);
        assertThat(profilePartSimpleItem1).isNotEqualTo(profilePartSimpleItem2);
        profilePartSimpleItem1.setId(null);
        assertThat(profilePartSimpleItem1).isNotEqualTo(profilePartSimpleItem2);
    }
}
