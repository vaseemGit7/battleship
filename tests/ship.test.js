test("Ship class is initialized", () => {
  const newShip = new Ship();
  expect(newShip).toBeInstanceOf(Ship);
});
