const mockData = {
  page: null,
  totalPages: 5,
  totalBalance: 250,
  transactions: [
    {
      id: "00001",
      date: "1 apr 1960",
      owner: null,
      income: true,
      category: "001",
      comment: "yay, got money!",
      sum: 1000,
      balance: 1000,
    },
    {
      id: "00002",
      date: "1 apr 1960",
      owner: null,
      income: false,
      category: "002",
      comment: "rent(",
      sum: 500,
      balance: 500,
    },
    {
      id: "00003",
      date: "1 apr 1960",
      owner: null,
      income: false,
      category: "003",
      comment: "Yummy food so yummy mommy",
      sum: 310,
      balance: 190,
    },
    {
      id: "00004",
      date: "1 apr 1960",
      owner: null,
      income: true,
      category: "001",
      comment: "got a gift, super!",
      sum: 175,
      balance: 365,
    },
    {
      id: "00005",
      date: "1 apr 1960",
      owner: null,
      income: false,
      category: "003",
      comment: "Two croissans and a coffee",
      sum: 115,
      balance: 250,
    },
  ],
};

export const mockGetFunction = (req, res) => {
  const { pageNumber = null } = req.params;
  const resData = { ...data };
  if (pageNumber) resData.page = pageNumber;
  res.status(200).json(resData);
};
