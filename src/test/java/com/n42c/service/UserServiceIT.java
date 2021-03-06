package com.n42c.service;

import com.n42c.N42CApp;
import com.n42c.config.Constants;
import com.n42c.config.TestSecurityConfiguration;
import com.n42c.domain.AppUser;
import com.n42c.domain.User;
import com.n42c.domain.enumerations.AppUserRights;
import com.n42c.repository.UserRepository;
import com.n42c.security.AuthoritiesConstants;
import com.n42c.service.dto.UserDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Integration tests for {@link UserService}.
 */
@SpringBootTest(classes = {N42CApp.class, TestSecurityConfiguration.class})
@Transactional
public class UserServiceIT {

    private static final String DEFAULT_ID = "u1ed";

    private static final String DEFAULT_LOGIN = "johndoe";

    private static final String DEFAULT_EMAIL = "johndoe@localhost";

    private static final String DEFAULT_IMAGEURL = "http://placehold.it/50x50";

    private static final String DEFAULT_LANGKEY = "dummy";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    private User user;

    private Map<String, Object> userDetails;

    @BeforeEach
    public void init() {
        user = new User();
        user.setId(DEFAULT_ID);
        user.setLogin(DEFAULT_LOGIN);
        user.setActivated(true);
        user.setEmail(DEFAULT_EMAIL);
        user.setLangKey(DEFAULT_LANGKEY);

        userDetails = new HashMap<>();
        userDetails.put("sub", DEFAULT_ID);
        userDetails.put("username", DEFAULT_LOGIN);
        userDetails.put("email", DEFAULT_EMAIL);
        userDetails.put("picture", DEFAULT_IMAGEURL);
    }

    @Test
    @Transactional
    public void assertThatAnonymousUserIsNotGet() {
        user.setId(Constants.ANONYMOUS_USER);
        user.setLogin(Constants.ANONYMOUS_USER);
        if (!userRepository.findOneByLogin(Constants.ANONYMOUS_USER).isPresent()) {
            userRepository.saveAndFlush(user);
        }
        final PageRequest pageable = PageRequest.of(0, (int) userRepository.count());
        final Page<UserDTO> allManagedUsers = userService.getAllManagedUsers(pageable);
        assertThat(allManagedUsers.getContent().stream()
            .noneMatch(user -> Constants.ANONYMOUS_USER.equals(user.getLogin())))
            .isTrue();
    }

    @Test
    @Transactional
    public void testDefaultUserDetails() {
        OAuth2AuthenticationToken authentication = createMockOAuth2AuthenticationToken(userDetails);
        UserDTO userDTO = userService.getUserFromAuthentication(authentication);

        assertThat(userDTO.getLogin()).isEqualTo(DEFAULT_LOGIN);
        assertThat(userDTO.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(userDTO.isActivated()).isTrue();
        assertThat(userDTO.getLangKey()).isEqualTo(Constants.DEFAULT_LANGUAGE);
        assertThat(userDTO.getAuthorities()).contains(AuthoritiesConstants.ANONYMOUS);
    }

    @Test
    @Transactional
    public void testUserDetailsWithUsername() {
        userDetails.put("preferred_username", "TEST");

        OAuth2AuthenticationToken authentication = createMockOAuth2AuthenticationToken(userDetails);
        UserDTO userDTO = userService.getUserFromAuthentication(authentication);

        assertThat(userDTO.getLogin()).isEqualTo(DEFAULT_LOGIN);
    }

    @Test
    @Transactional
    public void testUserDetailsWithLangKey() {
        userDetails.put("langKey", DEFAULT_LANGKEY);
        userDetails.put("locale", "en-US");

        OAuth2AuthenticationToken authentication = createMockOAuth2AuthenticationToken(userDetails);
        UserDTO userDTO = userService.getUserFromAuthentication(authentication);

        assertThat(userDTO.getLangKey()).isEqualTo(DEFAULT_LANGKEY);
    }

    @Test
    @Transactional
    public void testUserDetailsWithLocale() {
        userDetails.put("locale", "it-IT");

        OAuth2AuthenticationToken authentication = createMockOAuth2AuthenticationToken(userDetails);
        UserDTO userDTO = userService.getUserFromAuthentication(authentication);

        assertThat(userDTO.getLangKey()).isEqualTo("it");
    }

    @Test
    @Transactional
    public void testUserDetailsWithUSLocaleUnderscore() {
        userDetails.put("locale", "en_US");

        OAuth2AuthenticationToken authentication = createMockOAuth2AuthenticationToken(userDetails);
        UserDTO userDTO = userService.getUserFromAuthentication(authentication);

        assertThat(userDTO.getLangKey()).isEqualTo("en");
    }

    @Test
    @Transactional
    public void testUserDetailsWithUSLocaleDash() {
        userDetails.put("locale", "en-US");

        OAuth2AuthenticationToken authentication = createMockOAuth2AuthenticationToken(userDetails);
        UserDTO userDTO = userService.getUserFromAuthentication(authentication);

        assertThat(userDTO.getLangKey()).isEqualTo("en");
    }

    @Test
    @Transactional
    public void testAppUser() {
        OAuth2AuthenticationToken authentication = createMockOAuth2AuthenticationToken(userDetails);
        UserDTO userDTO = userService.getUserFromAuthentication(authentication);
        AppUser appUser = userService.getAppUser(userDTO.getId(), authentication);

        assertThat(appUser).isNotNull();
        assertThat(appUser.getUser().getId()).isEqualTo(userDTO.getId());
        assertThat(appUser.isAdmin()).isFalse();
        assertThat(appUser.getShopRights()).isEqualByComparingTo(AppUserRights.REA);
        assertThat(appUser.getBlogRights()).isEqualByComparingTo(AppUserRights.REA);
        assertThat(appUser.getProfileRights()).isEqualByComparingTo(AppUserRights.REA);
        assertThat(appUser.getScriptoriumRights()).isEqualByComparingTo(AppUserRights.REA);
    }

    private OAuth2AuthenticationToken createMockOAuth2AuthenticationToken(Map<String, Object> userDetails) {
        Collection<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(AuthoritiesConstants.ANONYMOUS));
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(Constants.ANONYMOUS_USER, Constants.ANONYMOUS_USER, authorities);
        usernamePasswordAuthenticationToken.setDetails(userDetails);
        OAuth2User user = new DefaultOAuth2User(authorities, userDetails, "sub");

        return new OAuth2AuthenticationToken(user, authorities, "oidc");
    }
}
