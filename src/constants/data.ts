export  const alerts = [
    {
      id: 1,
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      title: "Marketing",
      description: "All of you are going to be ..",
      time: "10:02 am",
    },
    {
      id: 2,
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      title: "Marketing",
      description: "All of you are going to be ..",
      time: "10:02 am",
    },
    // Add more alerts here
  ];

export const transactions = [
  {
    id: '1',
    transType: 'Transfer',
    transID: 'CM5836hjG7',
    dateTime: 'Tue-12-11-24',
    amount: 20000,
    receiver: {
      name: 'Nguh fabs demo',
      accountId: 'ACC001',
      avatar: '/images/img1.png'
    },
    status: 'Completed' as TransactionStatus,
    remark: 'Good'
  },
  {
    id: '2',
    transType: 'Withdrawal',
    transID: 'CM5837hjH8',
    dateTime: 'Tue-12-11-24',
    amount: 15000,
    receiver: {
      name: 'Sarah Johnson',
      accountId: 'ACC002',
      avatar: '/images/img1.png'
    },
    status: 'Completed' as TransactionStatus,
    remark: 'ATM Withdrawal'
  },
  {
    id: '3',
    transType: 'Deposit',
    transID: 'CM5838hjI9',
    dateTime: 'Tue-12-11-24',
    amount: 50000,
    receiver: {
      name: 'John Smith',
      accountId: 'ACC003',
      avatar: '/images/img1.png'
    },
    status: 'Failed' as TransactionStatus,
    remark: 'Network Error'
  },
  {
    id: '4',
    transType: 'Transfer',
    transID: 'CM5839hjJ0',
    dateTime: 'Wed-13-11-24',
    amount: 75000,
    receiver: {
      name: 'Maria Garcia',
      accountId: 'ACC004',
      avatar: '/images/img1.png'
    },
    status: 'Flagged' as TransactionStatus,
    remark: 'Danger Alert'
  },
  {
    id: '5',
    transType: 'Payment',
    transID: 'CM5840hjK1',
    dateTime: 'Wed-13-11-24',
    amount: 30000,
    receiver: {
      name: 'David Chen',
      accountId: 'ACC005',
      avatar: '/images/img1.png'
    },
    status: 'Completed' as TransactionStatus,
    remark: 'Bill Payment'
  },
  {
    id: '6',
    transType: 'Transfer',
    transID: 'CM5841hjL2',
    dateTime: 'Wed-13-11-24',
    amount: 100000,
    receiver: {
      name: 'Emma Wilson',
      accountId: 'ACC006',
      avatar: '/images/img1.png'
    },
    status: 'Cancelled' as TransactionStatus,
    remark: 'User Cancelled'
  },
  {
    id: '7',
    transType: 'Deposit',
    transID: 'CM5842hjM3',
    dateTime: 'Thu-14-11-24',
    amount: 250000,
    receiver: {
      name: 'James Brown',
      accountId: 'ACC007',
      avatar: '/images/img1.png'
    },
    status: 'Completed' as TransactionStatus,
    remark: 'Good'
  },
//   {
//     id: '8',
//     transType: 'Withdrawal',
//     transID: 'CM5843hjN4',
//     dateTime: 'Thu-14-11-24',
//     amount: 45000,
//     receiver: {
//       name: 'Linda Martinez',
//       accountId: 'ACC008',
//       avatar: '/images/img1.png'
//     },
//     status: 'Failed' as TransactionStatus,
//     remark: 'Insufficient Funds'
//   },
//   {
//     id: '9',
//     transType: 'Transfer',
//     transID: 'CM5844hjO5',
//     dateTime: 'Thu-14-11-24',
//     amount: 80000,
//     receiver: {
//       name: 'Robert Taylor',
//       accountId: 'ACC009',
//       avatar: '/images/img1.png'
//     },
//     status: 'Completed' as TransactionStatus,
//     remark: 'Good'
//   },
//   {
//     id: '10',
//     transType: 'Payment',
//     transID: 'CM5845hjP6',
//     dateTime: 'Fri-15-11-24',
//     amount: 60000,
//     receiver: {
//       name: 'Patricia Lee',
//       accountId: 'ACC010',
//       avatar: '/images/img1.png'
//     },
//     status: 'Flagged' as TransactionStatus,
//     remark: 'Danger Alert'
//   },
//   {
//     id: '11',
//     transType: 'Transfer',
//     transID: 'CM5846hjQ7',
//     dateTime: 'Fri-15-11-24',
//     amount: 150000,
//     receiver: {
//       name: 'Michael Wong',
//       accountId: 'ACC011',
//       avatar: '/images/img1.png'
//     },
//     status: 'Completed' as TransactionStatus,
//     remark: 'Good'
//   },
//   {
//     id: '12',
//     transType: 'Deposit',
//     transID: 'CM5847hjR8',
//     dateTime: 'Fri-15-11-24',
//     amount: 500000,
//     receiver: {
//       name: 'Sophie Anderson',
//       accountId: 'ACC012',
//       avatar: '/images/img1.png'
//     },
//     status: 'Completed' as TransactionStatus,
//     remark: 'Large Deposit'
//   }
];

export const users = [
    {
      id: 'CM5836h',
      name: 'Nguh Fabrice',
      email: 'fabricenguh@gmail.com',
      status: 'Active' as UserStatus,
      date: '20-05-2024',
      lastLogin: '15 Days ago',
      verified: 'Pending' as VerificationStatus
    },
    // Add more sample users as needed
  ];

export const usersLeaderBoard = [
    {
      id: '1',
      name: 'Nguh fabs demo',
      accountId: 'Account ID',
      avatar: '/images/img1.png',
      points: 43
    },
    {
      id: '2',
      name: 'Meghan Jes...',
      accountId: 'Account ID',
      avatar: '/images/img1.png',
      points: 40
    },
    {
      id: '3',
      name: 'Alex Turner',
      accountId: 'Account ID',
      avatar: '/images/img1.png',
      points: 38
    },
    {
      id: '4',
      name: 'Nguh fabs demo',
      accountId: 'Account ID',
      avatar: '/images/img1.png',
      points: 34
    },
    {
      id: '5',
      name: 'Nguh fabs demo',
      accountId: 'Account ID',
      avatar: '/images/img1.png',
      points: 23
    }
  ];


  export const userKycData = [
    {
      id: 'CM5836h',
      name: 'Nguh Fabrice',
      email: 'fabricenguh@gmail.com',
      dateRequested: '20-05-2024',
      status: 'Pending' as RequestStatus
    },
    // ... more requests
  ];

  export const userData = {
    name: "Nguh Fabrice",
    username: "CM1543X",
    avatar: "/images/img1.png",
    isVerified: true,
    location: "Douala, Cameroon",
    phone: "+91 7048144030",
    email: "yghori@asite.com",
    sex: "M",
    profession: "Etudiante",
    niu: "155xs4x3245xc4",
    cni: "155xs4x3245xc4"
  };


  export const balanceData = [
    {
      title: "Account balance",
      titleColor: "text-blue-500",
      balances: [
        {
          label: "Primary account",
          amount: "4,068",
          currency: "XAF"
        },
        {
          label: "Secondary account",
          amount: "78,000",
          currency: "XAF"
        },
        {
          label: "Canada account",
          amount: "3.5",
          currency: "USD"
        }
      ]
    },
    {
      title: "Savings",
      titleColor: "text-green-500",
      balances: [
        {
          label: "Personal",
          amount: "0,00",
          currency: "XAF"
        },
        {
          label: "Group",
          amount: "75,500",
          currency: "XAF"
        }
      ]
    },
    {
      title: "Card balance",
      titleColor: "text-[#6518C3]",
      balances: [
        {
          label: "Family card",
          amount: "4,068",
          currency: "XAF"
        },
        {
          label: "John's Son",
          amount: "4,068",
          currency: "XAF"
        }
      ]
    }
  ];

  export const userTransactions:Transaction[] = [
    {
      id: '1',
      type: 'Transfer',
      dateTime: 'Tue-12-11-24',
      amount: 20000,
      recipient: {
        name: 'Nguh fabs demo',
        accountId: 'Account ID',
        avatar: '/images/img1.png'
      },
      status: 'Completed' as TransactionStatus,
      remark: 'Good'
    },
    {
      id: '2',
      type: 'Recieved',
      dateTime: 'Tue-12-11-24',
      amount: 20000,
      recipient: {
        name: 'Primary'
      },
      status: 'Failed' as TransactionStatus,
      remark: 'Good'
    },
    // Add more sample transactions
  ];

  export const customerData = {
    name: "Olayemi Ayotunde Namikaze",
    userId: "CUS723WAL64",
    email: "customer@mail.com",
    phone: "+234 812 7195 827",
    bvn: "1234587915",
    avatar: "/images/img2.svg",
    isOnOfacList: true
  };

  export const timelineData = [
    {
      id: "1",
      time: "07:14am",
      date: "09 Nov, 2024",
      title: "Identification documents uploaded",
      actor: "Admin"
    },
    {
      id: "2",
      time: "07:14am",
      date: "09 Nov, 2024",
      title: "Picture (Id2.pdf) uploaded",
      actor: "user"
    },
    {
      id: "3",
      time: "05:14am",
      date: "09 Nov, 2024",
      title: "Picture (Id.pdf) uploaded",
      actor: "user"
    },
    {
      id: "4",
      time: "07:14am",
      date: "09 Nov, 2024",
      title: "Picture (Selfie.pdf) uploaded",
      actor: "user"
    },
    {
      id: "5",
      time: "07:14am",
      date: "09 Nov, 2024",
      title: "Updated financial information"
    },
    {
      id: "6",
      time: "05:14am",
      date: "09 Nov, 2024",
      title: "Updated basic personal information"
    }
  ];