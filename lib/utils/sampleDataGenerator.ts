import {
    randBoolean,
    randCompanyName,
    randJobTitle,
    randNumber,
} from '@ngneat/falso';
import type { Position } from 'resume-layout-engine';
import type { EducationItem } from './types';

/**
 * Generates a random month in MM format
 */
function generateMonth(): string {
  return String(randNumber({ min: 1, max: 12 })).padStart(2, '0');
}

/**
 * Generates a random year between a range
 */
function generateYear(minYearsAgo: number, maxYearsAgo: number): string {
  const currentYear = new Date().getFullYear();
  return String(currentYear - randNumber({ min: minYearsAgo, max: maxYearsAgo }));
}

/**
 * Generates realistic job responsibilities/achievements
 */
function generateJobResponsibilities(count: number = 3): string[] {
  const responsibilities = [
    'Developed and maintained scalable web applications using modern frameworks and best practices',
    'Collaborated with cross-functional teams to deliver high-quality software solutions on time',
    'Implemented responsive UI components and optimized application performance',
    'Conducted code reviews and mentored junior developers on best practices',
    'Designed and implemented RESTful APIs and microservices architecture',
    'Improved application performance by 40% through code optimization and caching strategies',
    'Led agile development processes including sprint planning and daily standups',
    'Integrated third-party services and APIs to enhance application functionality',
    'Wrote comprehensive unit and integration tests to ensure code quality',
    'Participated in architectural decisions and technical design discussions',
    'Automated deployment processes using CI/CD pipelines',
    'Troubleshot and resolved production issues in a timely manner',
    'Implemented security best practices and conducted vulnerability assessments',
    'Created technical documentation and user guides for internal teams',
    'Optimized database queries and improved data retrieval efficiency',
  ];

  const selected: string[] = [];
  const shuffled = [...responsibilities].sort(() => Math.random() - 0.5);

  for (let i = 0; i < Math.min(count, shuffled.length); i++) {
    selected.push(shuffled[i]);
  }

  return selected;
}

/**
 * Generates a sample experience entry with realistic data
 * Returns Position type compatible with the resume-layout-engine
 */
export function generateSampleExperience(): Position {
  const startYear = generateYear(1, 8);
  const startMonth = generateMonth();
  const endYear = generateYear(0, Number(new Date().getFullYear()) - Number(startYear));
  const endMonth = generateMonth();
  const isPresent = randBoolean();

  return {
    _id: crypto.randomUUID(),
    title: randJobTitle(),
    company: randCompanyName(),
    startDate: `${startYear}-${startMonth}`,
    endDate: isPresent ? 'Present' : `${endYear}-${endMonth}`,
    intro: '',
    description: generateJobResponsibilities(randNumber({ min: 3, max: 5 })),
  };
}

/**
 * Generates multiple sample experience entries
 */
export function generateSampleExperiences(count: number = 3): Position[] {
  const experiences: Position[] = [];
  for (let i = 0; i < count; i++) {
    experiences.push(generateSampleExperience());
  }
  return experiences;
}

/**
 * Generates a sample education entry with realistic data
 */
export function generateSampleEducation(): EducationItem {
  const startYear = generateYear(4, 12);
  const endYear = generateYear(0, Number(new Date().getFullYear()) - Number(startYear));
  const isPresent = randBoolean();

  const degrees = [
    'Bachelor of Science in Computer Science',
    'Bachelor of Arts in Business Administration',
    'Master of Science in Software Engineering',
    'Bachelor of Engineering in Electrical Engineering',
    'Master of Business Administration (MBA)',
    'Bachelor of Science in Information Technology',
    'Master of Science in Data Science',
    'Bachelor of Arts in Psychology',
    'Bachelor of Science in Mechanical Engineering',
    'Master of Science in Artificial Intelligence',
  ];

  const universities = [
    'Stanford University',
    'Massachusetts Institute of Technology',
    'University of California, Berkeley',
    'Harvard University',
    'Carnegie Mellon University',
    'University of Michigan',
    'Georgia Institute of Technology',
    'University of Texas at Austin',
    'University of Washington',
    'Cornell University',
    'Columbia University',
    'Princeton University',
    'Yale University',
    'University of California, Los Angeles',
    'University of Southern California',
  ];

  const descriptions = [
    'Relevant coursework: Data Structures, Algorithms, Database Systems, Software Engineering',
    'GPA: 3.8/4.0 - Dean\'s List',
    'Capstone project: Developed a full-stack web application for student management',
    'Member of Computer Science Club and participated in hackathons',
    'Completed honors thesis on machine learning applications',
    'Graduated with honors - Summa Cum Laude',
    'President of Student Technology Association',
    'Research assistant in AI and Machine Learning lab',
  ];

  return {
    id: crypto.randomUUID(),
    title: degrees[randNumber({ min: 0, max: degrees.length - 1 })],
    subTitle: universities[randNumber({ min: 0, max: universities.length - 1 })],
    description: descriptions[randNumber({ min: 0, max: descriptions.length - 1 })],
    isVisible: true,
    startMonth: generateMonth(),
    startYear,
    endMonth: isPresent ? '' : generateMonth(),
    endYear: isPresent ? '' : endYear,
    isPresent,
    showDate: true,
  };
}

/**
 * Generates multiple sample education entries
 */
export function generateSampleEducations(count: number = 2): EducationItem[] {
  const educations: EducationItem[] = [];
  for (let i = 0; i < count; i++) {
    educations.push(generateSampleEducation());
  }
  return educations;
}

