import Layout from "./components/Layout";
import Hero from "./components/Hero";
import CoffeeForm from "./components/CoffeeForm";
import Stats from "./components/Stats";
import History from "./components/History";
import { useAuth } from "./context/AuthContext"; // Assuming you have an AuthContext for authentication

function App() {
    const {globalUser, globalData, isLoading} = useAuth();
    const isAuthenticated = globalUser;
    const isData = globalData && Object.keys(globalData || {}).length > 0 // Check if globalData is not empty



    const authenticatedContent = (
        <>
            <Stats />
            <History />
        </>
    );

    return (
        <Layout>
            <Hero />
            <CoffeeForm isAuthenticated={isAuthenticated} />
            {(isAuthenticated && isLoading) && <p>Loading Data...</p>}
            {(isAuthenticated && isData) && authenticatedContent}
        </Layout>
    );
}

export default App;
