export const AdminRoutes = {
    CREATE_CATEGORY: 'crear-categoria',
    CREATE_BRAND: 'crear-marca',
    CREATE_ARTICLE: 'crear-articulo',
    BRANDS: 'marcas',
    CATEGORIES: 'categorias',
    CREATE_WAREHOUSE_ASSISTANT: 'crear-auxiliar',
  } as const;
  
  export const ClientRoutes = {
    ARTICLES: 'articulos',
    ARTICLE_DETAIL: 'detalle-articulo/:id',
  } as const;
  
  export const MainRoutes = {
    ADMIN: 'admin',
    AUTH: 'auth',
    STORE: 'tienda',
    LOGIN: 'login',
    LOGOUT: 'salir',
    REGISTER: 'registro',
    DEFAULT_REDIRECT: '/tienda/articulos',
  } as const;