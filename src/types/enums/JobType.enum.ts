import { registerEnumType } from "type-graphql";

export enum JobType {
    DEVELOPMENT = "Software Development",
    WEB = "Web Development",
    LOGISTICS = "Logistics",
    BIZDEV = "Business Development",
    ANALYSIS = "Data Analysis",
    RESEARCH = "Research",
    ADMIN = "Administrative",
    CUSTOMER = "Customer Service",
    DEVOPS = "DevOps",
    PUBLIC_SPEAKING = "Public Speaking/Presenting",
    QA = "Quality Assurance",
    SERVICE = "Service/Hospitality",
    DESIGN = "Design/Art",
    HR = "Human Resources",
    RECRUITING = "Recruiting",
    GAME_DEVELOPMENT = "Game Development",
    GAME_MANAGEMENT = "Game Management",
    SOCIAL_MEDIA = "Social Media",
    COMMUNITY = "Community Management",
    VIDEO_EDITING = "Video Editing",
    VIDEO_PRODUCTION = "Video Production",
    WRITING = "Writing/Editorials",
    TEACHING = "Teaching/Mentoring",
    FINANCE = "Finance/Accounting",
    PROJECT = "Project Management",
    MARKETING = "Marketing",
    MUSIC = "Music"
}

registerEnumType(JobType, {name: "JobType"});