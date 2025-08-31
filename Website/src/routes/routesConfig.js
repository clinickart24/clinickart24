import { lazy } from "react";

export const routes = {
  public: [
    {
      path: "/",
      component: lazy(() => import("../pages/HomePage/HomePage.jsx")),
    },
    {
      path:"/terms-and-conditions",
      component: lazy(() => import("../pages/StaticPage/TermsPage.jsx")),
    },
    {
      path: "/privacy-policy",
      component: lazy(() => import("../pages/StaticPage/PrivacyPolicyPage.jsx")),
    },
    {
      path: "/refund",
      component: lazy(() => import("../pages/StaticPage/RefundPolicyPage.jsx")),
    },
    {
      path: "/about-us",
      component: lazy(() => import("../pages/StaticPage/AboutUsPage.jsx")),
    },
    {
      path: "/blogs",
      component: lazy(() => import("../pages/BlogsPage/BlogsPage.jsx")),
    },
    {
      path: "/blog/:id",
      component: lazy(() => import("../pages/BlogsPage/SingleBlogPage.jsx")),
    },
    {
      path: "/vendor/:id",
      component: lazy(() => import("../pages/Vendors/Vendors.jsx")),
    },
    {
      path: "/brand/:id",
      component: lazy(() => import("../pages/Brands/Brands.jsx")),
    },
    {
      path: "/categories",
      component: lazy(() => import("../pages/Categories/Categories.jsx")),
    },
    {
      path: "/products/:id",
      component: lazy(() => import("../pages/Products/Products.jsx")),
    },
    {
      path: "/products/:id/:subId",
      component: lazy(() => import("../pages/Products/SingleProductPage.jsx")),
    },
    {
      path: "/cart",
      component: lazy(() => import("../pages/Cart/CartPage.jsx")),
    },
    {
      path:"/my-profile",
      component: lazy(() => import("../pages/LoginPages/MyProfile/MyProfile.jsx")),
    },
    {
      path:"/profile",
      component: lazy(() => import("../pages/LoginPages/MyProfile/MyProfile.jsx")),
    },
    {
      path:"/manage-addresses",
      component: lazy(() => import("../pages/LoginPages/ManageAddresses/ManageAddresses.jsx")),
    },
    {
      path:"/pan-card-information",
      component: lazy(() => import("../pages/LoginPages/PanCardInformation/PanCardInformation.jsx")),
    },
    {
      path:"/download-app",
      component: lazy(() => import("../pages/HomePage/DownLoadApp.jsx")),
    },
    {
      path:"/customer-care",
      component: lazy(() => import("../pages/HomePage/CustomerCare.jsx")),
    },
    {
      path:"/customer-care/:id",
      component: lazy(() => import("../pages/HomePage/CustomerCareById.jsx")),
    },
    {
      path:"/gift-card",
      component: lazy(() => import("../pages/LoginPages/GiftCard/GiftCard.jsx")),
    },
    {
      path:"/manage-upi",
      component: lazy(() => import("../pages/LoginPages/ManageUPI/ManageUPI.jsx")),
    },
    {
      path:"/coupons",
      component: lazy(() => import("../pages/LoginPages/CouponsPage/CouponsPage.jsx")),
    },
    {
      path:"/review-dashboard",
      component: lazy(() => import("../pages/LoginPages/ReviewDashboard/ReviewDashboard.jsx")),
    },
    {
      path:"/wishlist",
      component: lazy(() => import("../pages/LoginPages/Wishlist/Wishlist.jsx")),
    },
    {
      path:"/my-orders",
      component: lazy(() => import("../pages/LoginPages/MyOrders/MyOrders.jsx")),
    },
    {
      path:"/manage-cards",
      component: lazy(() => import("../pages/LoginPages/ManageCards/ManageCards.jsx")),
    }

  ],
  protected: [],
  notFound: {
    path: "*",
    component: lazy(() => import("../components/common/Loading/NotFound.jsx")),
  },
};
