import { RouteConfig } from 'vue-router';

const testRoutes: RouteConfig[] = [
    {
        name: 'test-products',
        path: '/test_products',
        component: () => import('@/features/test/Products.vue'),
    },
    {
        name: 'edit-product',
        path: '/test_products/edit/:productId',
        component: () => import('@/features/test/EditProduct.vue'),
    },
    {
        name: 'test-magazines',
        path: '/test_magazines',
        component: () => import('@/features/test/Magazines.vue'),
    },
    {
        name: 'edit-magazine',
        path: '/test_magazines/edit/:magazineId',
        component: () => import('@/features/test/EditMagazine.vue'),
    },
    {
        name: 'test-calculator',
        path: '/test_calculator',
        component: () => import('@/features/test/TestCalculator.vue'),
    },
];

export default testRoutes;
