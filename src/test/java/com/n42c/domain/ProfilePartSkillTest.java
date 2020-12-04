package com.n42c.domain;

import com.n42c.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class ProfilePartSkillTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProfilePartSkill.class);
        ProfilePartSkill profilePartSkill1 = new ProfilePartSkill();
        profilePartSkill1.setId(1L);
        ProfilePartSkill profilePartSkill2 = new ProfilePartSkill();
        profilePartSkill2.setId(profilePartSkill1.getId());
        assertThat(profilePartSkill1).isEqualTo(profilePartSkill2);
        profilePartSkill2.setId(2L);
        assertThat(profilePartSkill1).isNotEqualTo(profilePartSkill2);
        profilePartSkill1.setId(null);
        assertThat(profilePartSkill1).isNotEqualTo(profilePartSkill2);
    }
}
