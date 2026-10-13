import './App.css'
import {Navbar} from "./components/layout/Navbar";
import {Hero} from "./pages/hero";
import {About} from "./pages/about";
import {Skills} from "./pages/skills";
import {Experience} from "./pages/experience";
import {Projects} from "./pages/projects";
import {Contact} from "./pages/contact";
import {Footer} from "./components/layout/Footer";
import {APP_INFO} from "./models";
import {useHealth} from "./contexts/HealthContext.tsx";

function App() {
    const {isBackendUp} = useHealth();
    const isContactActive = APP_INFO.config.enableContact && isBackendUp;

    return (
        <div className={`app-container d-flex flex-column`}>
            <header>
                <Navbar/>
            </header>
            <main className={`main-container d-flex flex-column`}>
                {APP_INFO.config.enableHero && <Hero/>}
                {APP_INFO.config.enableAbout && <About/>}
                {APP_INFO.config.enableSkills && <Skills/>}
                {APP_INFO.config.enableExperience && <Experience/>}
                {APP_INFO.config.enableProjects && <Projects/>}
                {isContactActive && <Contact/>}
            </main>
            <Footer/>
        </div>
    )
}

export default App
