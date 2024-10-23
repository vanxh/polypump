# PolyPump

PolyPump is a decentralized platform for creating and managing custom tokens on the Polygon network. It allows users to easily create their own coins, explore trending tokens, and manage their portfolio.

## Features

- Create custom tokens with personalized details
- Explore trending and newly created coins
- Manage your own coin portfolio
- Secure authentication using Web3 and NextAuth
- Responsive design for both desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: tRPC, Drizzle ORM
- **Database**: PostgreSQL (via Neon)
- **Blockchain**: Ethereum (Polygon network)
- **Authentication**: NextAuth.js with SIWE (Sign-In with Ethereum)
- **File Storage**: IPFS (via Pinata)
- **Smart Contracts**: Solidity

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Bun (v1.x.x)
- PostgreSQL database (Neon.tech)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/vanxh/polypump.git
   cd polypump
   ```

2. Install dependencies:
   ```
   bun install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```
   DATABASE_URL=your_postgres_database_url
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXT_PUBLIC_WC_PROJECT_ID=your_walletconnect_project_id
   PINATA_JWT=your_pinata_jwt_token
   NEXT_PUBLIC_GATEWAY_URL=your_pinata_gateway_url
   ```

4. Run database migrations:
   ```
   bun db:push
   ```

5. Start the development server:
   ```
   bun dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `src/app`: Next.js app router and page components
- `src/components`: Reusable React components
- `src/server`: Backend API routes and database schema
- `src/styles`: Global CSS styles
- `contracts`: Solidity smart contracts

## Smart Contracts

The project includes two main smart contracts:

1. `PolyPumpCoin.sol`: ERC20 token contract for created coins
2. `PolyPumpFactory.sol`: Factory contract for deploying new PolyPumpCoin instances

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).
