package com.n42c.web.rest;

import com.n42c.domain.AppUser;
import com.n42c.service.UserService;
import com.n42c.service.dto.UserDTO;
import com.n42c.web.rest.vm.ManagedUserVM;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

/**
 * REST controller for managing the current user's account.
 */
@RestController
@RequestMapping("/api")
public class AccountResource {

    private final Logger log = LoggerFactory.getLogger(AccountResource.class);
    private final UserService userService;

    public AccountResource(UserService userService) {
        this.userService = userService;
    }

    /**
     * {@code GET  /account} : get the current user.
     *
     * @param principal the current user; resolves to {@code null} if not authenticated.
     * @return the current user.
     * @throws AccountResourceException {@code 500 (Internal Server Error)} if the user couldn't be returned.
     */
    @GetMapping("/account")
    @SuppressWarnings("unchecked")
    public ManagedUserVM getAccount(Principal principal) {
        if (principal instanceof AbstractAuthenticationToken) {
            UserDTO user = userService.getUserFromAuthentication((AbstractAuthenticationToken) principal);
            AppUser appUser = userService.getAppUser(user.getId(), (AbstractAuthenticationToken) principal);
            return new ManagedUserVM(user, appUser);
        } else {
            throw new AccountResourceException("User could not be found");
        }
    }

    private static class AccountResourceException extends RuntimeException {

        private static final long serialVersionUID = 1L;

        private AccountResourceException(String message) {
            super(message);
        }
    }
}
