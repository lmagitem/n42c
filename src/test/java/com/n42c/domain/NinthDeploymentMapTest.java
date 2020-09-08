package com.n42c.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.n42c.web.rest.TestUtil;

public class NinthDeploymentMapTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NinthDeploymentMap.class);
        NinthDeploymentMap ninthDeploymentMap1 = new NinthDeploymentMap();
        ninthDeploymentMap1.setId(1L);
        NinthDeploymentMap ninthDeploymentMap2 = new NinthDeploymentMap();
        ninthDeploymentMap2.setId(ninthDeploymentMap1.getId());
        assertThat(ninthDeploymentMap1).isEqualTo(ninthDeploymentMap2);
        ninthDeploymentMap2.setId(2L);
        assertThat(ninthDeploymentMap1).isNotEqualTo(ninthDeploymentMap2);
        ninthDeploymentMap1.setId(null);
        assertThat(ninthDeploymentMap1).isNotEqualTo(ninthDeploymentMap2);
    }
}
