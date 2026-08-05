# Shopcade E-commerce Platform 🚀

A high-performance, scalable e-commerce ecosystem built with a **Monorepo architecture**. This project features a seamless integration between a customer-facing storefront and a dedicated administrative management dashboard.

## 🛠 Tech Stack

### Core Frameworks
- **Next.js (App Router):** Utilizing modern React Server Components and optimized rendering patterns for high performance.
- **React:** For building dynamic and interactive user interfaces.
- **JavaScript (ES6+):** Writing clean, modular, and maintainable code.

### Architecture & Tooling
- **Monorepo Structure:** Organized to allow efficient code management and potential scaling between `admin` and `store` applications.
- **Tailwind CSS:** For rapid, responsive, and modern UI development.
- **REST API / Next.js Route Handlers:** For robust backend communication and data management.

### Key Features
- **Storefront (`apps/store`):**
  - Optimized product browsing experience.
  - Fully responsive design for mobile, tablet, and desktop.
  - Seamless user flow for exploring the shop.
- **Admin Dashboard (`apps/admin`):**
  - **Product Management:** Full CRUD operations (Create, Read, Update, Delete) for products.
  - **Order Management:** View and monitor customer orders.

## 📂 Project Structure

```text
shopcade-ecommerce-platform/
├── apps/
│   ├── admin/          # Administrative management dashboard (Next.js)
│   └── store/          # Customer-facing storefront (Next.js)
├── package.json        # Root dependencies and workspace configuration
├── .gitignore          # Centralized git ignore rules
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm / yarn / pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/shopcade-ecommerce-platform.git
   cd shopcade-ecommerce-platform
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in **both** `apps/admin` and `apps/store` directories. Each application requires the following variables to connect to the backend services:

   | Variable | Description |
   | :--- | :--- |
   | `API_BASE_URL` | The base URL for your backend API endpoints. |
   | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL (exposed to the client). |
   | `SUPABASE_SERVICE_ROLE_KEY` | The secret service role key for administrative tasks (Server-side only). |

   > **⚠️ Security Note:** Never commit your `.env.local` files to version control. Ensure they are listed in your `.gitignore`.


4. **Run the development server:**
   ```bash
   npm run dev
   ```

## 🛡 Best Practices
- **Environment Isolation:** Sensitive credentials are managed via `.env` files and excluded from version control.
- **Modular Design:** Clean separation of concerns between the admin and store applications.

---
*Developed by Ali Kashi/ali-kashi*