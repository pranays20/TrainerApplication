import TrainerComponent from "./components/TrainerComponent";
import SubjectComponent from "./components/SubjectComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // return (
  //   <div>
  //     <ToastContainer position="top-right" autoClose={3000} />
  //     <TrainerComponent />
  //     <hr />
  //     <SubjectComponent />
  //     <hr />
  //     {/* <TrainerSubjectComponent /> */}
  //   </div>
  // );
   return (
    <div className="app-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <TrainerComponent />
      <div style={{ marginTop: "30px" }}>
        <SubjectComponent />
      </div>

    </div>
  );
}

export default App;
