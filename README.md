# 👕 Zaheen Knitwear - Full Stack E-commerce Project

Zaheen Knitwear is a modern **Full-Stack Web Application** designed for clothing brands. It features a seamless user experience for browsing products and a robust Admin Dashboard for real-time content management (Products & Hero section).

🔗 **Live Link:** [https://zaheen-knitwear.vercel.app/](https://zaheen-knitwear.vercel.app/)

---

## 🚀 Tech Stack

### **Frontend**
* **React 19** (Vite-based)
* **Tailwind CSS 4** (Modern styling)
* **React Router 7** (Advanced routing)
* **Lucide React & React Icons** (UI Icons)
* **Firebase** (Authentication)
* **Axios** (API handling)

### **Backend**
* **Node.js & Express.js** (Server framework)
* **MongoDB** (NoSQL Database)
* **JSON Web Token (JWT)** (Secure authentication)
* **Cookie Parser** (Secure cookie management)
* **CORS & Dotenv** (Configuration & Security)

---

## ✨ Key Features

* **Admin Dashboard:** Comprehensive tools to Add, Delete, and Manage products.
* **CMS Capabilities:** Update the homepage Hero section (Title, Subtitle, Background) directly from the dashboard.
* **Secure Authentication:** Firebase-powered login/sign-up with protected admin routes.
* **Inventory Tracking:** Real-time product count and dynamic pricing display.
* **Fully Responsive:** Optimized for a perfect viewing experience on Mobile, Tablet, and Desktop.

---

## 🛠️ Local Installation

Follow these steps to set up the project locally:

### 1. Clone the repository
```bash
git clone [https://github.com/your-username/zaheen-knitwear.git](https://github.com/your-username/zaheen-knitwear.git)

📡 API Endpoints
Method Endpoint           Description
GET    /api/products      Fetch all products from the database
POST   /api/products      Add a new product 
DELETE /api/products/:id  Remove a product by ID
GET    /api/hero          Retrieve Hero section content
PUT    /api/hero          Update Hero section content
