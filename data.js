module.exports = {
  users: [
    { id: "1", name: "Steven Spielberg" },
    { id: "2", name: "Richard Dreyfuss" },
    { id: "3", name: "Harrison Ford" }
  ],
  products: [
    {
      id: "1",
      title: "bag",
      customers: ["2"],
      seller: "1"
    },
    {
      id: "2",
      title: "phone",
      customers: ["2"],
      seller: "1"
    },
    {
      id: "3",
      title: "book",
      customers: ["3"],
      seller: "1"
    }
  ]
};
