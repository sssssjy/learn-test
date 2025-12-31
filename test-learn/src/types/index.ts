export type User = {
    id: number;
    name: string;
    email: string;
};

export interface Product {
    id: number;
    title: string;
    price: number;
    description?: string;
}

export type Order = {
    orderId: number;
    userId: number;
    productIds: number[];
    totalAmount: number;
};