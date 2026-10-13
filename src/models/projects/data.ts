import type {ProjectsContent, Project} from "./types.ts";
import smf4jImg from "../../assets/images/projects/smf4j.png";
import notesGenAiImg from "../../assets/images/projects/notegen-ai.png";
import portfolioImg from "../../assets/images/projects/portfolio.png";
import aiCommissionRulesImg from "../../assets/images/projects/ai-commission-rules.png";
import indianEagleImg from "../../assets/images/projects/indianeagle.png";
import iGarudaImg from "../../assets/images/projects/igaruda.png";
import iEagleImg from "../../assets/images/projects/ieagle.png";

/**
 * Featured projects data showcasing open-source libraries, personal applications, and enterprise company systems.
 *
 * @author Yubraj Sahoo
 */
export const PROJECTS_CONTENT: ProjectsContent = {
    eyebrow: "PROJECTS",
    title: "Featured Projects",
    viewAllText: "View All Projects",
    viewAllHref: "https://github.com/yubrajsahoo",
    projects: [
        {
            id: "smf4j",
            title: "SMF4J",
            category: "personal",
            description: "Simple Metrics Facade for Java (smf4j-spring-boot-starter) — a lightweight, modular metrics facade library published on Maven Central for application metrics collection, monitoring, and health tracking.",
            image: smf4jImg,
            tags: ["Java", "Spring Boot", "Maven Central", "Metrics", "Monitoring"],
            badge: "v0.0.1 Released",
            liveUrl: "https://mvnrepository.com/artifact/io.github.yubrajsahoo/smf4j-spring-boot-starter",
            githubUrl: "https://github.com/yubrajsahoo/smf4j",
        },
        {
            id: "notesgenai",
            title: "NotesGenAi",
            category: "personal",
            description: "AI-powered lecture transcription and notes generation platform that converts audio recordings into structured study notes, summaries, and revision guides.",
            image: notesGenAiImg,
            tags: ["React", "Spring Boot", "AI", "REST APIs", "MySQL"],
            badge: "In Progress",
            githubUrl: "https://github.com/yubrajsahoo/notes-gen-ai",
        },
        {
            id: "portfolio-website",
            title: "Portfolio & API",
            category: "personal",
            description: "Modern full-stack developer portfolio built with React and TypeScript on Cloudflare Pages, backed by a Java Spring Boot REST API for live health checking and automated resume downloads.",
            image: portfolioImg,
            tags: ["React", "TypeScript", "Java", "Spring Boot", "Vite", "Cloudflare Pages"],
            badge: "Full Stack",
            githubUrl: "https://github.com/yubrajsahoo/yubraj-portfolio",
            backendGithubUrl: "https://github.com/yubrajsahoo/portfolio-api",
            liveUrl: "https://yubraj-portfolio.pages.dev",
        },
        {
            id: "ai-commission-rules",
            title: "AI Commission Rules",
            category: "company",
            description: "Automated commission sheet processing system that extracts and compares newly uploaded airline commission PDFs against previous versions using Gemini AI and Tabula, updating comparison results in Drools-compatible decision sheets.",
            image: aiCommissionRulesImg,
            tags: ["Java", "Spring Boot", "Gemini AI", "Tabula", "Drools", "PDF Extraction"],
            badge: "AI Automation",
        },
        {
            id: "indian-eagle",
            title: "Indian Eagle",
            category: "company",
            description: "High-traffic Online Travel Agency (OTA) flight booking platform serving millions of travelers with real-time flight search, fare comparisons, and secure bookings between USA and India.",
            image: indianEagleImg,
            tags: ["Java", "Spring Boot", "Microservices", "REST APIs", "Prometheus", "AWS"],
            badge: "Enterprise OTA",
        },
        {
            id: "igaruda-command-center",
            title: "iGaruda Command Center",
            category: "company",
            description: "Comprehensive internal enterprise operations suite and command center powering ticketing lifecycle management, agent workflows, and operational analytics.",
            image: iGarudaImg,
            tags: ["Java", "Spring Boot", "MySQL", "Redis", "REST APIs", "Docker"],
            badge: "Internal ERP",
        },
        {
            id: "ieagle-portal",
            title: "iEagle",
            category: "company",
            description: "Airfare advisory and booking platform providing discounted flight itineraries, passenger travel guides, and streamlined airfare discovery.",
            image: iEagleImg,
            tags: ["Java", "Spring Boot", "REST APIs", "MySQL", "HTML5/CSS3"],
            badge: "Travel Portal",
        },
    ] as Project[],
};
