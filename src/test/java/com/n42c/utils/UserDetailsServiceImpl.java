package com.n42c.utils;

import com.n42c.domain.User;
import com.n42c.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Collection;
import java.util.stream.Collectors;

public class UserDetailsServiceImpl implements UserDetailsService {

    public static final String DEFAULT_LOGIN = "johndoe-1234";
    public static final String DEFAULT_EMAIL = "johndoe@localhost";
    public static final String DEFAULT_FIRSTNAME = "john";
    public static final String DEFAULT_LASTNAME = "doe";
    public static final String DEFAULT_IMAGEURL = "http://placehold.it/50x50";
    public static final String DEFAULT_LANGKEY = "en";

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userRepository.findOneByLogin(username).orElse(null);

        if (user == null) { throw new UsernameNotFoundException(String.format("No user found with username '%s'.", username)); }

        return new UserDetails() {
            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                return user.getAuthorities()
                           .stream()
                           .map(a -> (GrantedAuthority) a::getName)
                           .collect(Collectors.toList());
            }

            @Override
            public String getPassword() { return "1234@Test"; }

            @Override
            public String getUsername() { return user.getLogin(); }

            @Override
            public boolean isAccountNonExpired() { return true; }

            @Override
            public boolean isAccountNonLocked() { return true; }

            @Override
            public boolean isCredentialsNonExpired() { return true; }

            @Override
            public boolean isEnabled() { return true; }
        };
    }
}
