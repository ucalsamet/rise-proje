import CreateJob from "./components/CreateJob";
import Navbar from "./components/Navbar";
import JobSearch from "./components/JobList/JobSearch";
import { JobContextProvider } from "./contexts/JobContext";
function App() {
  return (
    <div className="App">
      <JobContextProvider>
        <Navbar />
        <CreateJob />
        <JobSearch />
      </JobContextProvider>
    </div>
  );
}

export default App;
