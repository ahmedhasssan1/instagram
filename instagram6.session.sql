SELECT * from posts
src/posts/posts.resolver.ts:27:57 - error TS2345: Argument of type 'PaginationInput | undefined' is not assignable to parameter of type 'PaginationInput'.
  Type 'undefined' is not assignable to type 'PaginationInput'.

27     const result = await this.postsService.findAllPosts(paginationDto);
                                                           ~~~~~~~~~~~~~

[8:31:39 PM] Found 1 error. Watching for file changes.

