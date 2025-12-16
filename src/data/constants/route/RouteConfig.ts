export const RouteConfig = {
  home: '/',
  editor: '/editor',
  login: '/login',
  register: '/register',
  my: '/my',
  about: '/about',
};

export type RouteConfigKeys = keyof typeof RouteConfig;
