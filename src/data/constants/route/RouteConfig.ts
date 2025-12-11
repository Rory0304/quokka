export const RouteConfig = {
  home: '/',
  editor: '/editor',
  login: '/login',
  register: '/register',
  my: '/my',
};

export type RouteConfigKeys = keyof typeof RouteConfig;
