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
}

export const mockUser: User = {
    id: 1,
    username: "johndoe",
    fullName: "John Doe",
    email: "johndoe@gmail.com",
    phone: "0895526352",
    password: "11223344",
    role: "customer",
    isVerified: true,
    address: {
        country: "United States",
        city: "New York",
        zipCode: "10001",
        detail:
            "742 Evergreen Terrace",
    },
    stats: {
        orders: 24,
        wishlist: 12,
        notifications: 3,
    },

    createdAt: "2024-01-15T10:30:00Z",
};