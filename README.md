# YourBanK 🏦

A modern, secure banking application built with Next.js, TypeScript, and React
that provides comprehensive financial management capabilities including user
authentication, bank account integration, transaction management, and payment
transfers.

## 🚀 Features

- **Bank Account Integration**: Connect multiple bank accounts via Plaid
- **Payment Transfers**: Secure payments through Dwolla integration
- **Transaction Management**: Real-time transaction tracking and analytics
- **User Authentication**: Secure JWT-based authentication with bcrypt
- **Responsive Design**: Mobile-first design with Tailwind CSS and shadcn/ui
- **Real-time Analytics**: Comprehensive financial dashboard and reporting

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Appwrite (migrating to MongoDB)
- **Banking APIs**: Plaid (account linking), Dwolla (payments)
- **Authentication**: JWT tokens, bcrypt password hashing
- **Animations**: Framer Motion
- **Monitoring**: Sentry
- **Code Quality**: ESLint, Prettier, Husky pre-commit hooks

## 📋 Prerequisites

- Node.js (version 18 or higher)
- Appwrite instance for backend services
- MongoDB database (migration in progress)
- Plaid account for bank integrations
- Dwolla account for payment processing

## 🔧 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Dark1nessss/YourBanK.git
   cd YourBanK
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env.local
   nano .env.local
   ```

4. **Configure your API credentials and database connections**

5. **Start the development server:**

   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000) to view the
   application**

## ⚙️ Environment Configuration

Configure the following environment variables in your `.env.local` file:

```env
# Application
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=your_project_id
APPWRITE_DATABASE_ID=your_database_id
APPWRITE_USER_COLLECTION_ID=user_collection_id
APPWRITE_BANK_COLLECTION_ID=bank_collection_id
APPWRITE_TRANSACTION_COLLECTION_ID=transaction_collection_id
NEXT_APPWRITE_KEY=your_appwrite_key

# Plaid Configuration
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_secret
PLAID_ENV=sandbox

# Dwolla Configuration
DWOLLA_KEY=your_dwolla_key
DWOLLA_SECRET=your_dwolla_secret
DWOLLA_BASE_URL=https://api-sandbox.dwolla.com

# Authentication
JWT_SECRET=your_jwt_secret
```

## 🤖 GitHub Copilot Integration

This project includes comprehensive GitHub Copilot instructions to assist with
AI-powered development:

- **`.github/copilot-instructions.md`**: Detailed project context, architecture
  patterns, and development guidelines
- **`.copilotignore`**: Excludes build artifacts, dependencies, and other files
  that don't need AI context
- **Issue Templates**: Structured templates for bug reports and feature requests
- **PR Template**: Comprehensive pull request template with security and banking
  compliance checklists

The Copilot instructions include information about:

- Banking integration patterns (Plaid, Dwolla, Appwrite)
- TypeScript and Next.js development standards
- Security considerations for financial applications
- Testing guidelines and performance considerations

## 📁 Project Structure

```
├── app/                    # Next.js App Router
├── components/             # Reusable UI components
├── lib/                   # Utility functions and actions
├── public/                # Static assets
├── scripts/               # Database migration and setup scripts
├── types/                 # TypeScript type definitions
├── .github/               # GitHub templates and Copilot instructions
└── docs/                  # Project documentation
```

## 🧪 Development Commands

```bash
# Development
npm run dev                # Start development server
npm run build              # Build for production
npm run start              # Start production server

# Code Quality
npm run lint               # Run ESLint with fixes
npm run lint:check         # Check linting without fixes
npm run format             # Format code with Prettier
npm run format:check       # Check formatting
npm run fix                # Run both format and lint

# Database
npm run migrate            # Run MongoDB migration
npm run setup-mongo        # Setup MongoDB sample data
```

## 🔒 Security

This application implements enterprise-grade security practices:

- No hardcoded secrets or API keys
- Environment variable validation
- Secure JWT token handling
- bcrypt password hashing
- PCI compliance considerations
- Banking industry security standards

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the project conventions
4. Run tests and ensure code quality (`npm run fix`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

Please refer to the issue templates and PR template for structured
contributions.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

## 🔗 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Plaid API Documentation](https://plaid.com/docs/)
- [Dwolla API Documentation](https://docs.dwolla.com/)
- [Appwrite Documentation](https://appwrite.io/docs)

---

**Note**: This is a banking application that handles sensitive financial data.
Always follow banking industry security standards and compliance requirements
when contributing to this project.
