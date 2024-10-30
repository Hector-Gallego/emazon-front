import { ArticleDataTable, ArticleResponse } from "../../interfaces/article.interface";

export  class ArticleDataTableMapper{

    static toDataTable(article: ArticleResponse): ArticleDataTable {
        return {
            id: article.id,
            name: article.name,
            description: article.description,
            quantity: article.quantity,
            price: article.price,
            categoryNames: article.categories.map(category => category.name).join(", "),
            brandName: article.brand.name
        };
    }


}