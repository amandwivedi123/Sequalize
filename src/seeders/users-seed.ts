import User from"../routes/users/user.model";

export const seedUsers = async () => {
  const count = await User.count();
  if (count > 0) {
    console.log("Users already seeded ✅");
    return;
  }

  await User.bulkCreate([
    {
      name: "Admin",
      email: "admin@yopmail.com",
      password: "$2b$10$rxUJdmP/3ha1QV1e2/WYzOA2SIhOIVm27uB8IK6uMR9W2PhZATJR.", //123456
    },
    {
      name: "User",
      email: "user@yopmail.com",
      password: "$2b$10$rxUJdmP/3ha1QV1e2/WYzOA2SIhOIVm27uB8IK6uMR9W2PhZATJR.", //123456
    },
  ]);
  console.log("Users seeded successfully ✅");
};
