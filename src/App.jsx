import { MotionConfig } from "framer-motion";
import Home from "./pages/Home/Home";

function App() {
  return (
    // Respeita a preferência do sistema por movimento reduzido
    <MotionConfig reducedMotion="user">
      <Home />
    </MotionConfig>
  );
}

export default App;
