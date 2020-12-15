package com.n42c.domain;

import com.n42c.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class NinthBattleTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NinthBattle.class);
        NinthBattle ninthBattle1 = new NinthBattle();
        ninthBattle1.setId(1L);
        NinthBattle ninthBattle2 = new NinthBattle();
        ninthBattle2.setId(ninthBattle1.getId());
        assertThat(ninthBattle1).isEqualTo(ninthBattle2);
        ninthBattle2.setId(2L);
        assertThat(ninthBattle1).isNotEqualTo(ninthBattle2);
        ninthBattle1.setId(null);
        assertThat(ninthBattle1).isNotEqualTo(ninthBattle2);
    }
}
