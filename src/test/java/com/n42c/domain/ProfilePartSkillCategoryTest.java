package com.n42c.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.n42c.web.rest.TestUtil;

public class ProfilePartSkillCategoryTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProfilePartSkillCategory.class);
        ProfilePartSkillCategory profilePartSkillCategory1 = new ProfilePartSkillCategory();
        profilePartSkillCategory1.setId(1L);
        ProfilePartSkillCategory profilePartSkillCategory2 = new ProfilePartSkillCategory();
        profilePartSkillCategory2.setId(profilePartSkillCategory1.getId());
        assertThat(profilePartSkillCategory1).isEqualTo(profilePartSkillCategory2);
        profilePartSkillCategory2.setId(2L);
        assertThat(profilePartSkillCategory1).isNotEqualTo(profilePartSkillCategory2);
        profilePartSkillCategory1.setId(null);
        assertThat(profilePartSkillCategory1).isNotEqualTo(profilePartSkillCategory2);
    }
}
