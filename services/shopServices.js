import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from '../database/database';

export const shopApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => "categories.json",
            transformResponse: (response) => {
                return response ? Object.values(response) : [];
            },
        }),

        getProductsByCategory: builder.query({
            query: (category) =>
                `juegos.json?orderBy="category"&equalTo="${encodeURIComponent(category)}"`,
            transformResponse: (response) => {
                return response
                    ? Object.entries(response).map(([key, value]) => ({ ...value, id: key }))
                    : [];
            },
        }),
        getAllProducts: builder.query({
            query: () => "juegos.json",
            transformResponse: (response) => {
                return response
                    ? Object.entries(response).map(([key, value]) => ({ ...value, id: key }))
                    : [];
            },
        }),
    }),
});

export const { useGetCategoriesQuery, useGetProductsByCategoryQuery, useGetAllProductsQuery } = shopApi;