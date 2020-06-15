package com.n42c.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.n42c.web.rest.TestUtil;

public class AppUserProfileTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AppUserProfile.class);
        AppUserProfile appUserProfile1 = new AppUserProfile();
        appUserProfile1.setId(1L);
        AppUserProfile appUserProfile2 = new AppUserProfile();
        appUserProfile2.setId(appUserProfile1.getId());
        assertThat(appUserProfile1).isEqualTo(appUserProfile2);
        appUserProfile2.setId(2L);
        assertThat(appUserProfile1).isNotEqualTo(appUserProfile2);
        appUserProfile1.setId(null);
        assertThat(appUserProfile1).isNotEqualTo(appUserProfile2);
    }
}
