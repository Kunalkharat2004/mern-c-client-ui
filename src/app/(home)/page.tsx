import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import ProductCard, { Product } from "./components/product-card";

export default function Home() {

  const products: Product[] = [
    {
      _id: "1",
      name: "Margherita Pizza",
      description: "Classic pizza with fresh mozzarella, tomatoes, and basil.",
      image: "/homePageIcons/margherita.jpg",
      price: 149,
      category: "pizza",
    },
    {
      _id: "2",
      name: "Pepperoni Pizza",
      description: "Delicious pizza topped with spicy pepperoni slices.",
      image: "/homePageIcons/margherita.jpg",
      price: 169,
      category: "pizza",
    },
    {
      _id: "3",
      name: "Veggie Supreme Pizza",
      description: "Loaded with fresh vegetables and a tangy sauce.",
      image: "/homePageIcons/margherita.jpg",
      price: 159,
      category: "pizza",
    },
    {
      _id: "4",
      name: "BBQ Chicken Pizza",
      description: "Tender chicken pieces with BBQ sauce and onions.",
      image: "/homePageIcons/margherita.jpg",
      price: 179,
      category: "pizza",
    },
    {
      _id: "5",
      name: "Hawaiian Pizza",
      description: "A sweet and savory combination of ham and pineapple.",
      image: "/homePageIcons/margherita.jpg",
      price: 169,
      category: "pizza",
    },
    {
      _id: "6",
      name: "Four Cheese Pizza",
      description:
        "A cheesy delight with mozzarella, cheddar, parmesan, and gorgonzola.",
      image: "/homePageIcons/margherita.jpg",
      price: 189,
      category: "pizza",
    },
    {
      _id: "7",
      name: "Spicy Italian Pizza",
      description: "A spicy kick with Italian sausage and jalapeños.",
      image: "/homePageIcons/margherita.jpg",
      price: 179,
      category: "pizza",
    },
    {
      _id: "8",
      name: "Pesto Chicken Pizza",
      description: "Grilled chicken with pesto sauce and sun-dried tomatoes.",
      image: "/homePageIcons/margherita.jpg",
      price: 189,
      category: "pizza",
    },
    {
      _id: "9",
      name: "Buffalo Chicken Pizza",
      description: "Spicy buffalo chicken with a creamy ranch drizzle.",
      image: "/homePageIcons/margherita.jpg",
      price: 179,
      category: "pizza",
    },
    {
      _id: "10",
      name: "Mediterranean Pizza",
      description: "A blend of olives, feta cheese, and fresh herbs.",
      image: "/homePageIcons/margherita.jpg",
      price: 169,
      category: "pizza",
    },
  ];

  const beverages = [
    {
      _id: "1",
      name: "Coca Cola",
      description: "Refreshing cola drink.",
      image: "/homePageIcons/Red_Bull.png",
      price: 40,
      category: "beverages",
    },
    {
      _id: "2",
      name: "Sprite",
      description: "Lemon-lime flavored soda.",
      image: "/homePageIcons/Red_Bull.png",
      price: 40,
      category: "beverages",
    },
    {
      _id: "3",
      name: "Fanta Orange",
      description: "Fruity orange soda.",
      image: "/homePageIcons/Red_Bull.png",
      price: 40,
      category: "beverages",
    },
    {
      _id: "4",
      name: "Lemonade",
      description: "Freshly squeezed lemonade.",
      image: "/homePageIcons/Red_Bull.png",
      price: 50,
      category: "beverages",
    },
    {
      _id: "5",
      name: "Iced Tea",
      description: "Chilled tea with a hint of lemon.",
      image: "/homePageIcons/Red_Bull.png",
      price: 45,
      category: "beverages",
    },
    {
      _id: "6",
      name: "Red Bull",
      description: "Energy drink to keep you energized.",
      image: "/homePageIcons/Red_Bull.png",
      price: 60,
      category: "beverages",
    },
    {
      _id: "7",
      name: "Water Bottle",
      description: "Pure and refreshing bottled water.",
      image: "/homePageIcons/Red_Bull.png",
      price: 20,
      category: "beverages",
    },
    {
      _id: "8",
      name: "Coffee",
      description: "Freshly brewed coffee.",
      image: "/homePageIcons/Red_Bull.png",
      price: 70,
      category: "beverages",
    },
    {
      _id: "9",
      name: "Hot Chocolate",
      description: "Warm and comforting hot chocolate.",
      image: "/homePageIcons/Red_Bull.png",
      price: 80,
      category: "beverages",
    },
    {
      _id: "10",
      name: "Milkshake",
      description: "Creamy milkshake with your choice of flavor.",
      image: "/homePageIcons/Red_Bull.png",
      price: 90,
      category: "beverages",
    }
  ];

  return (
    <>
      <section className="bg-white">
        <div className="container mx-auto max-w-7xl flex flex-col-reverse lg:flex-row items-center justify-between gap-8 px-4 py-12">
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 lg:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Super Delicious Pizza
              <br />
              <span className="text-primary">in Only 45 minutes!</span>
            </h1>
            <p className="text-sm sm:text-lg md:text-xl lg:text-2xl max-w-lg leading-snug">
              Enjoy a Free Meal If Your Order Takes More Than 45 Minutes!
            </p>

            <Button className="bg-primary text-white hover:bg-primary/90 transition-colors duration-200 rounded-full px-6 py-6 lg:px-6 lg:py-7 text-sm lg:text-base font-semibold cursor-pointer">
              Get Your Pizza Now
            </Button>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center">
            <Image
              src="/homePageIcons/hero-pizza.png"
              alt="Pizza"
              width={500}
              height={500}
              className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
              priority
            />
          </div>
        </div>
      </section>

      <section>
        <div className="container py-12 mx-auto max-w-7xl px-4">
          <Tabs defaultValue="pizza" className="w-full">
            <TabsList>
              <TabsTrigger value="pizza" className="text-md cursor-pointer">
                Pizza
              </TabsTrigger>
              <TabsTrigger value="beverages" className="text-md cursor-pointer">
                Beverages
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pizza">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="beverages">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {beverages.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
