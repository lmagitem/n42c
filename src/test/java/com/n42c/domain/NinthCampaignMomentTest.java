package com.n42c.domain;

import com.n42c.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class NinthCampaignMomentTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NinthCampaignMoment.class);
        NinthCampaignMoment ninthCampaignMoment1 = new NinthCampaignMoment();
        ninthCampaignMoment1.setId(1L);
        NinthCampaignMoment ninthCampaignMoment2 = new NinthCampaignMoment();
        ninthCampaignMoment2.setId(ninthCampaignMoment1.getId());
        assertThat(ninthCampaignMoment1).isEqualTo(ninthCampaignMoment2);
        ninthCampaignMoment2.setId(2L);
        assertThat(ninthCampaignMoment1).isNotEqualTo(ninthCampaignMoment2);
        ninthCampaignMoment1.setId(null);
        assertThat(ninthCampaignMoment1).isNotEqualTo(ninthCampaignMoment2);
    }
}
