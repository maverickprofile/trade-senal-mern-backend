const fs = require("fs");
const path = require("path");

// Path to store user data
const filePath = path.join(__dirname, "../data/users.json");

// Function to read data from file
function readData() {
  try {
    if (!fs.existsSync(filePath)) {
      return []; // Return empty array if file doesn't exist
    }
    const rawData = fs.readFileSync(filePath, "utf-8");
    return rawData ? JSON.parse(rawData) : [];
  } catch (error) {
    console.error("Error reading data file:", error);
    return [];
  }
}

// Function to write data to file
function writeData(data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing data file:", error);
  }
}

// Function to add a new user
async function newUser(userData) {
  const users = readData();
  
  // Ensure no duplicate phone numbers
  if (users.some(user => user.phone === userData.phone)) {
    throw new Error("User with this phone number already exists.");
  }

  users.push(userData);
  writeData(users);
  return userData;
}

module.exports = { newUser };
