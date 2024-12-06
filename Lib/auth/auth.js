// 'use server';
// import { getServerSession } from "next-auth"
// import { authOptions } from "@/Lib/auth/nextAuth"
// import { prisma } from "@/server/db/client";
// // const { getServerSession } = require("next-auth");
// import bcrypt from "bcryptjs";

// // authUtils.js
// // const bcrypt = require("bcryptjs");

// // This function returns a hashedPassword that you can store in the database since storing plain-text passwords is a terrible idea.
// export async function hashPassword(password) {
//   const hashedPassword = await bcrypt.hash(password, 12);
//   return hashedPassword;
// }

// // This function verifies a password by comparing it to a hashed password.
// export async function verifyPassword(password, hashedPassword) {
//   const isValid = await bcrypt.compare(password, hashedPassword);
//   return isValid;
// }

// export async function getUserSession() {
//   const authUserSession = await getServerSession(
//   authOptions
// );
//   return authUserSession?.user;
// }


// import { getServerSession } from 'next-auth'
const { getServerSession } = require("next-auth");
// const { authOptions } = require("./nextAuth");

// authUtils.js
const bcrypt = require("bcryptjs");

// This function returns a hashedPassword that you can store in the database since storing plain-text passwords is a terrible idea.
async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
}

// This function verifies a password by comparing it to a hashed password.
async function verifyPassword(password, hashedPassword) {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
}

async function getUserSession() {
  const authUserSession = await getServerSession({
    callbacks: {
      session,
    },
  });
  return authUserSession?.user;
}

module.exports = {
  hashPassword,
  verifyPassword,
  getUserSession,
};
