import CheckOutPage from "./checkout-page";

export type paymentMethodType = {
  key: string;
  label: string;
};
const CheckOut = () => {
  return (
    <section className="container mx-auto max-w-7xl px-4 py-10 flex flex-col lg:flex-row gap-8">
        <CheckOutPage/>
    </section>
  );
};

export default CheckOut;
