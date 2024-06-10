import Algorithms from "@/components/Algorithms.tsx";
import {Provider} from "react-redux";
import {store} from "@/services/redux/store.ts";

function App() {

  return (
      <Provider store={store}>
        <Algorithms />
      </Provider>
  )
}

export default App
