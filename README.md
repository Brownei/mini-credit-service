Mini Credit Insights Service
============================

A lightweight backend service that ingests **bank statements (CSV)**, computes **income & spending insights**, and integrates with a **mock credit bureau API**.\
All features are exposed via **secure REST APIs** with JWT authentication.

* * * * *

🚀 Tech Stack
-------------

-   **Node.js + TypeScript**

-   **Framework:** NestJS (Express/Fastify also possible)

-   **Database:** MySQL (Prisma)

-   **Auth:** JWT-based authentication

-   **Docker Compose:** for local development with MySQL

-   **Testing & CI:** Jest + GitHub Actions

* * * * *

📂 Core Endpoints
-----------------

### 🔐 Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/auth/register` | User registration (only **admin** can create users). |
| `POST` | `/auth/login` | JWT-based login. |

-   **Design choice:**\
    Authentication ensures sensitive data (bank transactions, credit reports) is only accessed by verified users. Admins manage user creation.

* * * * *

### 🧾 Statements

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/statements/upload` | Upload a **CSV bank statement** containing: `date`, `description`, `amount`, `balance`. |

-   **Design choice:**

    -   Each CSV is parsed into structured **transactions** linked to a **statement record**.

    -   The bank statement creates a transaction automatically to indicate the transaction was done.

    -  There are terms used for the statement table like `closingBalance`, `openingBalance`, `inflow`, and `outflow` to simulate the statement for most banks which can help understand bank statements. With each transactions made through the route, it updates the statememt for the given date/period, e.g "2025-08"

* * * * *

### 📈 Insights

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/insights/run` | Compute insights: <br/> - 3-month average income <br/> - Inflow / Outflow / Net <br/> - Spend category buckets <br/> - Risk flags <br/> - Parsing success rate |
| `GET` | `/insights/:id` | Retrieve previously computed insights. |

-   **Design choice:**

    -   Not enough time to be implemented properly.

* * * * *

### 🏦 Credit Bureau Integration

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/bureau/check` | Calls the **mock bureau API** and persists normalized results. Retries/backoff on errors. |

-   **Mock Bureau API Specs:**

    -   Endpoint: `POST /v1/credit/check`

    -   Headers: `X-API-KEY` required

    -   Returns:

        `{
          "score": 680,
          "risk_band": "medium",
          "enquiries_6m": 2,
          "defaults": 0,
          "open_loans": 3,
          "trade_lines": 5
        }`

    -   Error Handling: Retry with exponential backoff on `400`, `429`, and `5xx` errors.

-   **Design choice:**

    -   Bureau reports are **normalized** into a `bureau_reports` table.

    -   Ensures consistency across different bureau providers.

    -   Used for downstream risk modeling.

* * * * *

🗄️ Suggested Data Model
------------------------

| Table | Purpose |
| --- | --- |
| **Users** | Authentication & authorization. |
| **Statements** | Uploaded CSV files. |
| **Transactions** | Parsed transactions from statements. |
| **Insights** | Computed insights per statement/user. |
| **BureauReports** | Credit bureau results (normalized). |

* * * * *

🔍 Observability
----------------

-   **Structured logs** with request/response tracking.

-   **Health check:** `/health` (includes DB checks).

-   **Metrics:** `/metrics` endpoint (Prometheus-compatible).

* * * * *

🐳 Dockerized Development
-------------------------

`docker compose up --build`

-   Spins up:

    -   `mini-credit-api` (NestJS backend)

    -   `mysql` (database)

-   `.env` variables are automatically copied inside the container.

* * * * *

✅ Testing & CI
--------------

-   **Unit tests:** Jest

-   GitHub Actions workflow runs:

    1.  Build backend

    2.  Run tests

    3.  Verify Docker Compose startup

* * * * *

⚡ **Summary of Design Choices**

-   JWT + role-based auth for security.

-   Normalized DB schema to support extensibility.

-   Insights designed for **financial decision-making** (income stability, spending patterns, risk factors).

-   Fully containerized for one-command startup.
