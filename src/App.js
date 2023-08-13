import './App.css';
import OrganizationalChart from "./org-chart-1/components/orgChart";
import employees from "./org-chart-1/data";

const styles = {
    title: {
        backgroundColor: "#404e7c",
        color: "#fef9ef",
        textAlign: "center",
        padding: "1rem",
        fontSize: "1.5em",
        zIndex: "1",
    },
};

function App() {
  return (
    <div className="App">
        <h1 style={styles.title}>Organization Chart</h1>
        <OrganizationalChart data={employees} />
    </div>
  );
}

export default App;
