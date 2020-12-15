package com.n42c.domain;

import com.n42c.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class ProfilePartTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProfilePart.class);
        ProfilePart profilePart1 = new ProfilePart();
        profilePart1.setId(1L);
        ProfilePart profilePart2 = new ProfilePart();
        profilePart2.setId(profilePart1.getId());
        assertThat(profilePart1).isEqualTo(profilePart2);
        profilePart2.setId(2L);
        assertThat(profilePart1).isNotEqualTo(profilePart2);
        profilePart1.setId(null);
        assertThat(profilePart1).isNotEqualTo(profilePart2);
    }
}
