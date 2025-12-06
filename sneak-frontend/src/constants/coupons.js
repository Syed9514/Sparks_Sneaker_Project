export const COUPONS = [
    {
        code: "SAVE10",
        discountType: "percent",
        value: 0.10, // 10%
        label: "Welcome Discount",
        description: "Get 10% off your first order",
        isGlobal: true
    },
    {
        code: "FREESHIP",
        discountType: "shipping",
        value: 0,
        label: "Free Shipping",
        description: "Free shipping on orders over $100",
        isGlobal: false,
        expiry: "Expired"
    },
    {
        code: "SNEAK20",
        discountType: "percent",
        value: 0.20,
        label: "Holiday Special",
        description: "Limited time 20% off",
        isGlobal: false,
        expiry: "Coming Soon"
    }
];
