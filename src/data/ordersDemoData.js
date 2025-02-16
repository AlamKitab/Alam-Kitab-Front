export const demoOrders = [
  {
    _id: '1',
    orderNumber: 'ORD001',
    createdAt: '2024-03-15T10:30:00Z',
    orderStatus: 'Delivered',
    loyaltyPoints: 50,
    orderedProducts: [
      {
        _id: 'p1',
        productName: 'The Great Gatsby',
        quantity: 2,
        price: { cost: 599 }
      },
      {
        _id: 'p2',
        productName: 'To Kill a Mockingbird',
        quantity: 1,
        price: { cost: 499 }
      }
    ]
  },
  {
    _id: '2',
    orderNumber: 'ORD002',
    createdAt: '2024-03-10T15:45:00Z',
    orderStatus: 'Processing',
    loyaltyPoints: 30,
    orderedProducts: [
      {
        _id: 'p3',
        productName: '1984',
        quantity: 1,
        price: { cost: 450 }
      }
    ]
  },
  {
    _id: '3',
    orderNumber: 'ORD003',
    createdAt: '2024-03-05T09:15:00Z',
    orderStatus: 'Shipped',
    loyaltyPoints: 45,
    orderedProducts: [
      {
        _id: 'p4',
        productName: 'Pride and Prejudice',
        quantity: 1,
        price: { cost: 399 }
      },
      {
        _id: 'p5',
        productName: 'The Catcher in the Rye',
        quantity: 2,
        price: { cost: 549 }
      }
    ]
  }
];

export const demoUser = {
  _id: 'user1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  shippingData: {
    phoneNo: '+1 234 567 8900',
    address: '123 Book Street',
    city: 'Bookville',
    state: 'Reading State'
  }
}; 