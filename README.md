🍳 RecipeHub: Admin-Moderated Recipe Sharing
RecipeHub is a full-stack Next.js application where food enthusiasts can share their culinary creations. To ensure quality, every recipe submitted by a user must be reviewed and approved by an admin before it appears on the public dashboard.

✨ Key Features
For Users
Authentication: Secure Register and Login system (JWT-based).

Personal Profile: Custom bio, social media links (YouTube/Instagram), and profile picture.

Recipe Management: * Create recipes with ingredients, steps, and image uploads.

Edit existing recipes (updates trigger a "Pending" status for re-approval).

Delete personal posts.

Engagement: Like recipes from other chefs on the dashboard.

For Admins
Moderation Queue: View all "Pending" recipes submitted by users.

Approval System: One-click Approve or Reject functionality.

User Management: View a list of all registered users and their profile details.

🛠️ Tech Stack
Framework: Next.js 15 (App Router)

Database: MongoDB with Mongoose

Auth: JWT (JSON Web Tokens) & LocalStorage

Styling: Custom CSS / Inline Styles

Image Handling: Base64 Data Strings (via FileReader API)

🔄 The Approval Workflow
Submission: User creates a recipe; it is saved with status: "pending".

Notification: The recipe remains hidden from the public feed but visible on the User's Profile.

Review: Admin logs into the Admin Dashboard to see the pending queue.

Action: Admin clicks "Approve" (status becomes approved) or "Reject" (status becomes rejected).

Live: Only approved recipes are fetched and displayed on the main Dashboard.

🚀 Getting Started
1. Prerequisites
Node.js 18+

MongoDB Atlas account (or local MongoDB)

2. Environment Variables
Create a .env.local file in the root directory:

Code snippet
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_random_string
3. Installation
Bash
# Clone the repository
git clone https://github.com/yourusername/recipe-app.git

# Install dependencies
npm install

# Run the development server
npm run dev
4. Admin Access
To create an admin user, manually change the role field in your MongoDB collection from "user" to "admin" for your specific account.


<!-- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->
