## Getting Started

First prepare .env file:
```
MONGODB_URL="your_mongodb_connection_url"

NEXTAUTH_URL="http://localhost:3000/"
SECRET="supersecretkeyforauth"

GOOGLE_CLIENT_ID="your_google_api_id"
GOOGLE_CLIENT_SECRET="your_google_api_key"

AWS_ACCESS_KEY="your_aws_s3_access_key"
AWS_SECRET_KEY="your_aws_s3_secret_key"

STRIPE_SECRET_KEY="your_stripe_secret_key"
STRIPE_PUBLIC_KEY="your_stripe_public_key"
STRIPE_SIGN_SECRET = "your_stripe_cli_key"
```

Then, run the development server:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies used in project:
### Next.js
<img src="https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" >

### Tailwind css
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" >

### MongoDB
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" >

### AWS S3 bucket for storing images
<img src="https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" >

### Stripe as payment provider
<img src="https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white" >

### Google as auth provider for NextAuth
<img src="https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white" >

## Screenshots of working application:

### Home screen:
<img src="https://github.com/JakubWorek/coffee_shop/blob/main/images_for_readme/home.png">

### Products page:
<img src="https://github.com/JakubWorek/coffee_shop/blob/main/images_for_readme/menu.png">

### Single product with options:
<img src="https://github.com/JakubWorek/coffee_shop/blob/main/images_for_readme/product.png">

### Login page:
<img src="https://github.com/JakubWorek/coffee_shop/blob/main/images_for_readme/login.png">

### Profile page:
<img src="https://github.com/JakubWorek/coffee_shop/blob/main/images_for_readme/profile.png">

### Add/edit categories and products pages:
<img src="https://github.com/JakubWorek/coffee_shop/blob/main/images_for_readme/admin_categories.png">
<img src="https://github.com/JakubWorek/coffee_shop/blob/main/images_for_readme/admin_products.png">

### Listing orders based on privilages (admin sees all orders, logged-in user sees only his own orders):
<img src="https://github.com/JakubWorek/coffee_shop/blob/main/images_for_readme/admin_orders.png">
<img src="https://github.com/JakubWorek/coffee_shop/blob/main/images_for_readme/client_orders.png">

### Payment process:
<img src="https://github.com/JakubWorek/coffee_shop/blob/main/images_for_readme/cart.png">
<img src="https://github.com/JakubWorek/coffee_shop/blob/main/images_for_readme/payment.png">
<img src="https://github.com/JakubWorek/coffee_shop/blob/main/images_for_readme/after_order.png">
