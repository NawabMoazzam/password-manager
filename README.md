# Secure Password Manager

A modern, secure password manager built with Next.js and Clerk authentication. This application helps users safely store and manage their passwords and credit card information with robust encryption.

## 🚀 Features

- **Secure Authentication**: Powered by Clerk for robust user authentication and management
- **Password Management**: Store and organize your passwords securely
- **Credit Card Storage**: Safely store your credit card information
- **Password Generation**: Generate strong, random passwords
- **Dark/Light Mode**: Support for both dark and light themes
- **Responsive Design**: Works seamlessly across all devices
- **Data Encryption**: Uses CryptoJS for secure data encryption
- **Copy to Clipboard**: Quick copy functionality for stored information
- **User-Friendly Interface**: Clean and intuitive UI built with modern components

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5
- **Authentication**: Clerk
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Form Handling**: React Hook Form
- **Encryption**: CryptoJS
- **State Management**: React Hooks
- **Theme Management**: next-themes
- **Icons**: Lucide React

## 🚀 Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/NawabMoazzam/password-manager.git
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up your environment variables:
   Create a `.env.local` file with your Clerk credentials:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
   CLERK_SECRET_KEY=your_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
   NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
   NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
   NEXT_PUBLIC_ENCRYPTION_KEY=your_encryption_key
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔒 Security Features

- End-to-end encryption for stored passwords and card information
- Secure authentication with Clerk
- No plain text password storage
- Automatic session management
- Protected API routes

## 🎯 Key Functionality

- Create and store encrypted passwords
- Save and manage credit card information securely
- Generate strong passwords
- Copy credentials with a single click
- Dark/Light mode toggle
- Responsive design for all devices

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

<!-- ## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. -->

## 👨‍💻 Developer

Nawab Moazzam - https://nawabwebfolio.vercel.app

---

⭐ If you found this project helpful, please consider giving it a star!

# or

pnpm dev

# or

bun dev



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

