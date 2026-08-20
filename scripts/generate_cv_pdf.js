import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateCV() {
  const pdfDoc = await PDFDocument.create();
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const pageWidth = 595.28; // A4
  const pageHeight = 841.89; // A4
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  const colorPrimary = rgb(0.07, 0.09, 0.15); // #111827
  const colorAccent = rgb(0.31, 0.27, 0.90); // #4F46E5
  const colorMuted = rgb(0.35, 0.40, 0.47); // #5A6678
  const colorLine = rgb(0.85, 0.88, 0.92);

  function checkPageBreak(neededHeight) {
    if (y - neededHeight < margin) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
  }

  function wrapText(text, font, size, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const width = font.widthOfTextAtSize(testLine, size);
      if (width > maxWidth) {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  // --- HEADER ---
  page.drawText('MEREKE DADABAYEVA', {
    x: margin,
    y: y - 20,
    size: 20,
    font: fontBold,
    color: colorPrimary,
  });
  y -= 26;

  page.drawText('TECHNICAL PRODUCT MANAGER / TECHNICAL PRODUCT OWNER', {
    x: margin,
    y: y - 10,
    size: 10,
    font: fontBold,
    color: colorAccent,
  });
  y -= 16;

  const contactLine = 'Berlin, Germany  |  +49 179 108 2712  |  merekedadabayeva@gmail.com  |  linkedin.com/in/mereke';
  page.drawText(contactLine, {
    x: margin,
    y: y - 10,
    size: 8.5,
    font: fontRegular,
    color: colorMuted,
  });
  y -= 22;

  function drawSectionTitle(title) {
    checkPageBreak(30);
    y -= 8;
    page.drawLine({
      start: { x: margin, y: y },
      end: { x: pageWidth - margin, y: y },
      thickness: 1,
      color: colorLine,
    });
    y -= 14;
    page.drawText(title.toUpperCase(), {
      x: margin,
      y: y,
      size: 9.5,
      font: fontBold,
      color: colorPrimary,
    });
    y -= 14;
  }

  // --- PROFESSIONAL SUMMARY ---
  drawSectionTitle('Professional Summary');
  const summary = 'Technical Product Manager with a Computer Science background and a decade of experience delivering high-impact software solutions for enterprise clients like Samsung and Goldn. Expert at driving growth through data-backed UX and SEO strategies, evidenced by a 65% increase in conversion traffic. Skilled in bridging the gap between complex technical engineering and business strategy to launch scalable B2B SaaS features, manage complex backlogs, and define winning product roadmaps in Agile environments.';
  const summaryLines = wrapText(summary, fontRegular, 8.5, contentWidth);
  for (const line of summaryLines) {
    checkPageBreak(12);
    page.drawText(line, { x: margin, y: y, size: 8.5, font: fontRegular, color: colorPrimary });
    y -= 12;
  }

  // --- CORE COMPETENCIES & STACK ---
  drawSectionTitle('Core Competencies & Stack');
  const competencies = [
    { label: 'Product & Delivery:', text: 'Product Management, Project Management, MVP Scoping, User Stories & Journeys, Product Flowcharts, Backlog Grooming, Feature Launches' },
    { label: 'UX & Optimisation:', text: 'User Experience (UX) Design, User Flow Optimisation, SEO Optimisation, Keyword Analysis, Competitor & Market Research' },
    { label: 'Technical & Methods:', text: 'Computer Science Foundation, Mobile App Development, Agile / Scrum Methodologies, Software Development Lifecycle (SDLC), AI Agents & Vibe Coding' },
    { label: 'Languages:', text: 'English (Fluent), German (Intermediate), Russian (Native), Kazakh (Native), Turkish (Intermediate)' }
  ];

  for (const comp of competencies) {
    checkPageBreak(14);
    const labelWidth = fontBold.widthOfTextAtSize(comp.label + ' ', 8.5);
    const availableWidth = contentWidth - labelWidth;
    const lines = wrapText(comp.text, fontRegular, 8.5, availableWidth);
    
    page.drawText(comp.label, { x: margin, y: y, size: 8.5, font: fontBold, color: colorPrimary });
    if (lines.length > 0) {
      page.drawText(lines[0], { x: margin + labelWidth, y: y, size: 8.5, font: fontRegular, color: colorPrimary });
      y -= 12;
      for (let i = 1; i < lines.length; i++) {
        checkPageBreak(12);
        page.drawText(lines[i], { x: margin + labelWidth, y: y, size: 8.5, font: fontRegular, color: colorPrimary });
        y -= 12;
      }
    } else {
      y -= 12;
    }
  }

  // --- PROFESSIONAL EXPERIENCE ---
  drawSectionTitle('Professional Experience');

  const jobs = [
    {
      role: 'Technical Product Manager',
      company: 'Goldn',
      dates: 'Nov 2021 – Jan 2023 | Heidelberg, Germany',
      bullets: [
        'Problem: Stagnant organic traffic on the B2B marketplace; Action: Executed a comprehensive SEO and UX audit, followed by keyword optimisation; Result: Increased marketing website clicks by 65%; Insight: Data-driven UX improvements are as critical as technical SEO for conversion; Skill: SEO & UX Optimisation.',
        'Problem: Lack of standardised vendor terms leading to customer friction; Action: Led deep-dive vendor service research to define pricing and refund policies; Result: Increased customer satisfaction scores and platform trust; Insight: Transparent commercial policies directly reduce churn in B2B SaaS; Skill: Market Research & Policy Design.',
        'Problem: Siloed development slowing down feature releases; Action: Facilitated cross-functional workshops between design and engineering to launch new B2B tools; Result: Achieved seamless integration and high user adoption rates; Insight: Early engineering involvement in the design phase prevents technical debt; Skill: Cross-functional Leadership.',
        'Problem: High competitive pressure in the cosmetic supplier niche; Action: Conducted in-depth competitor benchmarking to pivot the product roadmap; Result: Identified 3 key differentiation opportunities now central to the company strategy; Insight: Competitive intelligence must be continuous, not a one-off project; Skill: Strategic Roadmapping.'
      ]
    },
    {
      role: 'Product Management Associate / Intern',
      company: 'Product People',
      dates: 'Nov 2020 – Feb 2021 | Berlin, Germany (Remote)',
      bullets: [
        'Scoped MVPs and designed product flowcharts, user stories, and user journeys for healthcare and mobility startups (Doctorly, Tier Mobility), accelerating early product development.',
        'Conducted comprehensive market research on food delivery and meal kit sectors for a global supply chain client to support strategic planning.',
        'Supported the growth of the Product People online community by defining target audience personas and engagement strategies.'
      ]
    },
    {
      role: 'IT Project Manager / Technical Delivery Lead',
      company: 'iBEC Systems',
      dates: 'Dec 2014 – Aug 2017 | Almaty, Kazakhstan',
      bullets: [
        'Led a 5-person international software development team to build a distributor fraud-detection application for Samsung Asia & Pacific, successfully launched in Central Asian markets.',
        'Directed a comprehensive website re-architecture project for Eurasian Resources Group (ERG), driving a +40% increase in website traffic and improved user experience.',
        'Delivered cross-functional client software projects across SaaS, B2B, and B2C business models utilising structured product research and data analysis.'
      ]
    },
    {
      role: 'Career Break — Parental Leave | Personal Focus',
      company: '',
      dates: 'Jan 2023 – Present | Berlin, Germany',
      bullets: [
        'Planned parental leave period in Germany while maintaining active knowledge in modern software product management practices and in AI Agents: Intensive Vibe Coding.'
      ]
    }
  ];

  for (const job of jobs) {
    checkPageBreak(25);
    const headerTitle = job.company ? `${job.role} | ${job.company}` : job.role;
    page.drawText(headerTitle, { x: margin, y: y, size: 9, font: fontBold, color: colorPrimary });
    const dateWidth = fontOblique.widthOfTextAtSize(job.dates, 8);
    page.drawText(job.dates, { x: pageWidth - margin - dateWidth, y: y, size: 8, font: fontOblique, color: colorMuted });
    y -= 13;

    for (const bullet of job.bullets) {
      const bulletLines = wrapText(bullet, fontRegular, 8.2, contentWidth - 14);
      for (let i = 0; i < bulletLines.length; i++) {
        checkPageBreak(11);
        if (i === 0) {
          page.drawText('•', { x: margin + 2, y: y, size: 8.2, font: fontBold, color: colorAccent });
        }
        page.drawText(bulletLines[i], { x: margin + 14, y: y, size: 8.2, font: fontRegular, color: colorPrimary });
        y -= 11.5;
      }
      y -= 2;
    }
    y -= 5;
  }

  // --- EDUCATION & CERTIFICATIONS ---
  drawSectionTitle('Education & Certifications');
  const eduItems = [
    'BSc in Computer Science — SDU University, Kazakhstan (2012 – 2016)',
    'Google Project Management Professional Certificate — Issued by Coursera (May 2021 | ID: V4U2RJCZXKPB)',
    'Agile Project Management Certification — Issued by Coursera (Jul 2021 | ID: 9CY3ZZUA7C6H)'
  ];

  for (const edu of eduItems) {
    checkPageBreak(14);
    page.drawText('•', { x: margin + 2, y: y, size: 8.5, font: fontBold, color: colorAccent });
    page.drawText(edu, { x: margin + 14, y: y, size: 8.5, font: fontRegular, color: colorPrimary });
    y -= 13;
  }

  const pdfBytes = await pdfDoc.save();
  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const outputPath = path.join(publicDir, 'Mereke_Dadabayeva_CV.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`✅ PDF successfully generated at: ${outputPath}`);
}

generateCV().catch(err => {
  console.error(err);
  process.exit(1);
});
