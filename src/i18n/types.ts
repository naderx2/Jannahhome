export type Dictionary = {
  siteName: string;
  siteTagline: string;
  nav: {
    products: string;
    order: string;
  };
  footer: {
    rights: string;
    ownerSpace: string;
  };
  home: {
    title: string;
    subtitle: string;
    promotions: string;
    discount: string;
    ourProducts: string;
    noProducts: string;
  };
  product: {
    back: string;
    video: string;
    promo: string;
    orderThis: string;
  };
  categories: {
    COUETTE: string;
    DRAP: string;
    PARURE: string;
  };
  order: {
    title: string;
    subtitle: string;
    contactInfo: string;
    fullName: string;
    fullNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    address: string;
    addressPlaceholder: string;
    sizes: string;
    couetteSize: string;
    drapSize: string;
    notes: string;
    notesPlaceholder: string;
    products: string;
    loadingProducts: string;
    choose: string;
    other: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    backHome: string;
    selectProduct: string;
    orderError: string;
    genericError: string;
  };
  sizes: string[];
};
