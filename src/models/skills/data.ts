import type {SkillContent} from "./types";
import {FaCloud, FaCode, FaDatabase, FaServer} from "react-icons/fa";

/**
 * Skills and technical expertise content.
 */
export const TECHNICAL_EXPERTISE: SkillContent = {
    eyebrow: "MY SKILLS",
    title: "Technical Expertise",
    skillDetails: [
        {
            type: "Backend",
            icon: FaServer,
            skills: [
                {
                    name: "Java",
                    level: 90,
                },
                {
                    name: "Spring Boot",
                    level: 88,
                },
                {
                    name: "Spring Security",
                    level: 80,
                },
                {
                    name: "Spring AI",
                    level: 70,
                },
                {
                    name: "Microservices",
                    level: 82,
                },
                {
                    name: "Soap APIs",
                    level: 80,
                },
                {
                    name: "REST APIs",
                    level: 80,
                },
            ],
        },
        {
            type: "Frontend",
            icon: FaCode,
            skills: [
                {
                    name: "React",
                    level: 80,
                },
                {
                    name: "JavaScript",
                    level: 82,
                },
                {
                    name: "HTML5",
                    level: 80,
                },
                {
                    name: "CSS3",
                    level: 80,
                },
                {
                    name: "Bootstrap",
                    level: 85,
                },
            ],
        },
        {
            type: "Database",
            icon: FaDatabase,
            skills: [
                {
                    name: "MySQL",
                    level: 90,
                },
                {
                    name: "PostgreSQL",
                    level: 70,
                },
                {
                    name: "MongoDB",
                    level: 60,
                },
                {
                    name: "Redis",
                    level: 70,
                },
                {
                    name: "Hibernate",
                    level: 85,
                },
            ],
        },
        {
            type: "DevOps",
            icon: FaCloud,
            skills: [
                {
                    name: "Docker",
                    level: 80,
                },
                {
                    name: "AWS",
                    level: 70,
                },
                {
                    name: "Git",
                    level: 90,
                },
                {
                    name: "GitHub Actions",
                    level: 75,
                },
            ],
        },
    ],
};
