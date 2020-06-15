package com.n42c.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.n42c.web.rest.TestUtil;

public class ProfilePartLinkedExperienceTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProfilePartLinkedExperience.class);
        ProfilePartLinkedExperience profilePartLinkedExperience1 = new ProfilePartLinkedExperience();
        profilePartLinkedExperience1.setId(1L);
        ProfilePartLinkedExperience profilePartLinkedExperience2 = new ProfilePartLinkedExperience();
        profilePartLinkedExperience2.setId(profilePartLinkedExperience1.getId());
        assertThat(profilePartLinkedExperience1).isEqualTo(profilePartLinkedExperience2);
        profilePartLinkedExperience2.setId(2L);
        assertThat(profilePartLinkedExperience1).isNotEqualTo(profilePartLinkedExperience2);
        profilePartLinkedExperience1.setId(null);
        assertThat(profilePartLinkedExperience1).isNotEqualTo(profilePartLinkedExperience2);
    }
}
