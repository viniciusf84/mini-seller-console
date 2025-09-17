# 📊 Mini Seller Console

Application developed as part of a technical assessment.  
The **Mini Seller Console** is a dashboard for managing leads and opportunities, focused on usability, visual feedback, and front-end best practices.

---

## ✨ Features

- 🔎 **Lead List**

  - Search by name/company
  - Filter by status
  - Sort by score
  - Accessible color badges (WCAG AA compliant)

- 📝 **Lead Detail Side Panel**

  - Email editing with validation
  - Status update with styled Select (shadcn/ui)
  - Smooth slide-in/out animation
  - Background scroll lock when open

- 🔄 **Optimistic Updates**

  - Immediate UI feedback on save
  - Automatic rollback in case of error

- 🚀 **Lead to Opportunity Conversion**

  - Auto-added to opportunities table
  - Smooth scroll to the newly added row
  - Temporary visual highlight

- 🔔 **Toasts (Sonner)**

  - Success/error notifications centered at the bottom
  - Friendly and consistent messages

- 🖥️ **Other UX Details**
  - “Go to Top” button
  - Responsive layout (mobile/desktop)
  - Consistent design with Tailwind + shadcn/ui

---

## 🛠️ Tech Stack

- **React 18 + TypeScript**
- **Vite** (dev server + build)
- **Tailwind CSS** (styling)
- **shadcn/ui** (Select, accessible components)
- **Sonner** (modern toasts)
- **lucide-react** (icons)

---

## 📂 Project Structure

```
src/
 ├─ components/
 │   ├─ LeadList.tsx
 │   ├─ LeadDetailPanel.tsx
 │   ├─ OpportunitiesTable.tsx
 │   └─ ui/
 │       ├─ select.tsx
 │       ├─ GoToTop.tsx
 │       └─ Toast.tsx (if using custom)
 ├─ data/
 │   └─ leads.json
 ├─ hooks/
 │   └─ useLocalStorage.ts
 ├─ utils/
 │   ├─ email.ts
 │   └─ fakeApi.ts
 ├─ App.tsx
 ├─ main.tsx
 └─ index.css
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run in dev mode
npm run dev

# Build for production
npm run build
npm run preview
```

---

## 🌍 Demo

The project is live here:  
👉 [Vercel Demo](https://mini-seller-console-zeta-nine.vercel.app)

---

## 👨‍💻 Author

**Vinicius Fernandes Souza**  
💼 [LinkedIn](https://www.linkedin.com/in/viniciusfernandessouza)  
📧 viniciusf84@hotmail.com
