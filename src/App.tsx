import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "./components/organisms/Header";
import { PlaygroundContainer } from "./components/organisms/PlaygroundContainer";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen h-screen flex flex-col">
        <Header />
        <PlaygroundContainer />
      </div>
    </ThemeProvider>
  );
}

export default App;
