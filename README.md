
## Getting Started
Clone the Repository
```bash 
git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name

```

Install Dependencies: Run the following command to install the necessary dependencies:
```bash 
npm install

```
Environment Variables: Create a .env.local file in the root directory and add the required environment variables for authentication and API. For Clerk, you'll need to add the following keys:
```bash 
NEWS_API_KEY = ""
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""
ADMIN_ID=""

# Admin id used to make the user as admin you can this by putthing your user id and then that user will be defined as admin
```
Run the Application:

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


# sportsDuniaAssignment
Project Overview
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
