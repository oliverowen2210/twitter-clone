import Footer from "./components/Footer";
import Banner from "./components/Banner";
import Tweets from "./components/Tweets";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="flex min-h-[1000px] w-screen">
      <Banner className="hidden sm:block" />
      <div className="grow">
        <div className="flex w-[990px]">
          <Tweets />
          <Sidebar className="hidden lg:block" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
