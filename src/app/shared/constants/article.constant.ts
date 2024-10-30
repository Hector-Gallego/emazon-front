export const ArticleFieldLimits = {
    MAX_LENGTH_ARTICLE_NAME_FIELD: 50,
    MAX_LENGTH_ARTICLE_DESCRIPTION_FIELD: 120,
  };
  
  export const ArticleValuesConstants = {
    END_POINT_ARTILCLE: '/api/article',
    END_POINT_ARTILCLE_SAVE: '/api/article/save',
  } as const;

  export const StockValueConstants = {
    END_POINT_SUPPLY_STOCK: '/api/stock'
  } as const;