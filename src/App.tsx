import SortingVisualization from "@/components/SortingVisualization.tsx";
import {Provider} from "react-redux";
import {store} from "@/services/redux/store.ts";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "@/components/Header.tsx";

const App = () => {
  return (
      <>
          <Header />
          <Routes>
              <Route path="/"  element={<SortingVisualization />} />
          </Routes>
      </>
  )
}

const WrappedApp = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    )
}

export default WrappedApp
