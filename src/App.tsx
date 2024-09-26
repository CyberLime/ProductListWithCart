import Header from "./components/Header";
import Desserts from "./components/Desserts";

import CartContextProvider from "./store";

function App() {
  return (
    <CartContextProvider>
      <Header />
      <main className="w-100vw h-fit mt-1 pb-7">
        <Desserts />
      </main>
    </CartContextProvider>
  );
}

export default App;
