package com.n42c.domain.views;

/** View used to only retreive an association between an app user and a blog post. */
public interface AuthorToPostLinkView {
    Long getPostId();

    Long getAppUserId();

    String getAppUserDisplayedName();
}
