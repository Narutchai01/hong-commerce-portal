export interface UserAddress {
    country: string;
    city: string;
    zipCode: string;
    detail: string;
}

export interface UserStats {
    orders: number;
    wishlist: number;
    notifications: number;
}

export interface User {
    id: number;
    username: string;
    fullName: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    isVerified: boolean;
    address: UserAddress;
    stats: UserStats;
    createdAt: string;
    gender: string;
}

export type OrderStatus =
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";

export interface OrderItem {
    productId: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    brand: string;
}

export interface Order {
    id: number;
    userId: number;
    items: OrderItem[];
    totalAmount: number;
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
}


export interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    category: string;
    image: string;
    brand: string;
}

export interface Cart {
    userId: number;
    items: CartItem[];
}


const calculateUserStats = (orders: Order[]): UserStats => ({
    orders: orders.length,
    wishlist: 3,
    notifications: 3,
});


export const mockOrders: Order[] = [
    {
        id: 1,
        userId: 1,
        items: [
            {
                productId: 1,
                name: "Wireless Mouse",
                price: 25,
                quantity: 2,
                image: "/images/product1.png",
                brand: "ProAim",
            },
            {
                productId: 2,
                name: "Mechanical Keyboard",
                price: 80,
                quantity: 1,
                image: "/images/product1.png",
                brand: "ProAim",
            },
        ],
        totalAmount: 130,
        status: "pending",
        createdAt: "2026-05-01T10:00:00Z",
        updatedAt: "2026-05-01T10:00:00Z",
    },
    {
        id: 2,
        userId: 1,
        items: [
            {
                productId: 3,
                name: "USB-C Cable",
                price: 10,
                quantity: 3,
                image: "/images/product1.png",
                brand: "ProAim",
            },
        ],
        totalAmount: 30,
        status: "shipped",
        createdAt: "2026-04-28T09:20:00Z",
        updatedAt: "2026-04-29T14:10:00Z",
    },
    {
        id: 3,
        userId: 1,
        items: [
            {
                productId: 4,
                name: "Gaming Chair",
                price: 200,
                quantity: 1,
                image: "/images/product1.png",
                brand: "ProAim",
            },
        ],
        totalAmount: 200,
        status: "delivered",
        createdAt: "2026-04-20T12:00:00Z",
        updatedAt: "2026-04-22T16:30:00Z",
    },
];
export const mockUser: User = {
    id: 1,
    username: "johndoe",
    fullName: "John Doe",
    gender: "Male",
    email: "johndoe@gmail.com",
    phone: "0895526352",
    password: "11223344",
    role: "customer",
    isVerified: true,
    address: {
        country: "United States",
        city: "New York",
        zipCode: "10001",
        detail: "742 Evergreen Terrace",
    },
    stats: calculateUserStats(mockOrders),
    createdAt: "2024-01-15T10:30:00Z",
};

export const mockCart: Cart = {
    userId: mockUser.id,
    items: mockOrders.flatMap((order) =>
        order.items.map((item) => ({
            id: item.productId,
            title: item.name,
            price: item.price,
            quantity: item.quantity,
            category: "Accessories",
            image: item.image,
            brand: item.brand,
        }))
    ),
};