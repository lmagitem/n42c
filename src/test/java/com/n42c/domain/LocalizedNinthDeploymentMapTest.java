package com.n42c.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.n42c.web.rest.TestUtil;

public class LocalizedNinthDeploymentMapTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LocalizedNinthDeploymentMap.class);
        LocalizedNinthDeploymentMap localizedNinthDeploymentMap1 = new LocalizedNinthDeploymentMap();
        localizedNinthDeploymentMap1.setId(1L);
        LocalizedNinthDeploymentMap localizedNinthDeploymentMap2 = new LocalizedNinthDeploymentMap();
        localizedNinthDeploymentMap2.setId(localizedNinthDeploymentMap1.getId());
        assertThat(localizedNinthDeploymentMap1).isEqualTo(localizedNinthDeploymentMap2);
        localizedNinthDeploymentMap2.setId(2L);
        assertThat(localizedNinthDeploymentMap1).isNotEqualTo(localizedNinthDeploymentMap2);
        localizedNinthDeploymentMap1.setId(null);
        assertThat(localizedNinthDeploymentMap1).isNotEqualTo(localizedNinthDeploymentMap2);
    }
}
