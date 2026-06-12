export const LOGIN: {
    logoText: string;
    errorMessages: {
        lockedOut: string;
        invalidCredentials: string;
        requiredUsername: string;
        requiredPassword: string;
    };
} = {
    logoText: "Swag Labs",
    errorMessages: {
        lockedOut: "Epic sadface: Sorry, this user has been locked out.",
        invalidCredentials: "Epic sadface: Username and password do not match any user in this service",
        requiredUsername: "Epic sadface: Username is required",
        requiredPassword: "Epic sadface: Password is required"
    }
};

export const INVENTORY: {
    pageTitle: string;
} = {
    pageTitle: "Products"
};

export const CART: {
    pageTitle: string;
    checkoutButton: string;
} = {
    pageTitle: "Your Cart",
    checkoutButton: "Checkout"
};

export const CHECKOUT: {
    stepOneTitle: string;
    stepTwoTitle: string;
    completeTitle: string;
    continueButton: string;
    finishButton: string;
    backHomeButton: string;
    successMessage: string;
} = {
    stepOneTitle: "Checkout: Your Information",
    stepTwoTitle: "Checkout: Overview",
    completeTitle: "Checkout: Complete!",
    continueButton: "Continue",
    finishButton: "Finish",
    backHomeButton: "Back Home",
    successMessage: "Thank you for your order!"
};

export const COMMON: {
    aboutLink: string;
    logoutLink: string;
    resetAppLink: string;
} = {
    aboutLink: "About",
    logoutLink: "Logout",
    resetAppLink: "Reset App State"
};