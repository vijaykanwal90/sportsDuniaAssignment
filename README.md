This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# sportsDuniaAssignment
 ##Project Overview
Project Name: InfoBreeze
Description:A responsive web application that allows users to search articles, toggle themes, and access personalized content with authentication. It uses Next.js for server-side rendering, Clerk for authentication, and Tailwind CSS for styling.

Protected Routes: The application includes role-based access control (RBAC) with protected routes for admin and normal users. Admin users have access to admin-specific content and functionality, while normal users have restricted access based on their role. This ensures secure and personalized user experiences.
Payout Management:

Admin users have the ability to set payout prices for users.
Normal users can calculate their payout based on the prices set by the admin.
Users can export their payout data in PDF, and CSV formats for ease of record-keeping and reporting.

Features:

    User authentication using Clerk.
    Dark/light theme toggle.
    Search functionality to filter articles.
    Dynamic display of search results.
    Responsive design.
    Protected routes for admin and normal users.
    Admin users can set payout prices, manage content, and oversee user activity.
    Normal users have restricted access and can calculate their payouts.
    Payout calculation for normal users, with options to export data in  PDF, and CSV formats.
