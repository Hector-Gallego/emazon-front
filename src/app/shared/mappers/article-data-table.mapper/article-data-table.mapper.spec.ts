import { ArticleDataTable, ArticleResponse } from "../../interfaces/article.interface";
import { ArticleDataTableMapper } from "./article-data-table.mapper";

describe('ArticleDataTableMapper', () => {
  it('debería mapear correctamente un ArticleResponse a ArticleDataTable', () => {
    // Definimos un objeto ArticleResponse de ejemplo
    const mockArticleResponse: ArticleResponse = {
      id: 1,
      name: 'Artículo de prueba',
      description: 'Descripción de prueba',
      quantity: 10,
      price: 100.0,
      categories: [
        {
            id: 1, name: 'Categoría 1',
            description: "Descripción de prueba"
        },
        {
            id: 2, name: 'Categoría 2',
            description: "Descripción de prueba"
        }
      ],
      brand: {
          id: 1, name: 'Marca de prueba',
          description: "Descripción de prueba"
      }
    };

 
    const expectedDataTable: ArticleDataTable = {
      id: 1,
      name: 'Artículo de prueba',
      description: 'Descripción de prueba',
      quantity: 10,
      price: 100.0,
      categoryNames: 'Categoría 1, Categoría 2',
      brandName: 'Marca de prueba'
    };
    const result = ArticleDataTableMapper.toDataTable(mockArticleResponse);
    expect(result).toEqual(expectedDataTable);
  });
});
