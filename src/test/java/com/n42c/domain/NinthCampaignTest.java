package com.n42c.domain;

import com.n42c.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class NinthCampaignTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NinthCampaign.class);
        NinthCampaign ninthCampaign1 = new NinthCampaign();
        ninthCampaign1.setId(1L);
        NinthCampaign ninthCampaign2 = new NinthCampaign();
        ninthCampaign2.setId(ninthCampaign1.getId());
        assertThat(ninthCampaign1).isEqualTo(ninthCampaign2);
        ninthCampaign2.setId(2L);
        assertThat(ninthCampaign1).isNotEqualTo(ninthCampaign2);
        ninthCampaign1.setId(null);
        assertThat(ninthCampaign1).isNotEqualTo(ninthCampaign2);
    }
}
