#include "../include/api.h"
#include <sstream>
#include <iomanip>

namespace api {
    std::string escapeJson(const std::string& str) {
        std::ostringstream o;
        for (size_t i = 0; i < str.length(); ++i) {
            switch (str[i]) {
                case '"': o << "\\\""; break;
                case '\\': o << "\\\\"; break;
                case '\b': o << "\\b"; break;
                case '\f': o << "\\f"; break;
                case '\n': o << "\\n"; break;
                case '\r': o << "\\r"; break;
                case '\t': o << "\\t"; break;
                default:
                    if ('\x00' <= str[i] && str[i] <= '\x1f') {
                        o << "\\u" << std::hex << std::setw(4) << std::setfill('0') << (int)str[i];
                    } else {
                        o << str[i];
                    }
            }
        }
        return o.str();
    }

    std::string getPersonalInfoJson() {
        return R"XXX({
  "name": "Oludotun Longe",
  "title": "Software Engineer (TypeScript • Rust • AI • Web3)",
  "location": "Lagos, Nigeria",
  "phone": "+234 817 009 6535",
  "email": "olududotunlonge@gmail.com",
  "github": "https://github.com/dotunlonge",
  "website": "https://dotunlonge.com",
  "linkedin": "https://www.linkedin.com/in/oludotunlonge",
  "summary": "Senior Software Engineer with 8+ years experience building high-performance systems, full-stack applications, and AI/Web3 products for startups, agencies, and global teams. I specialize in TypeScript, Rust, AI/LLMs, and decentralized technologies.",
  "skills": [
    "TypeScript", "Rust", "Solidity", "JavaScript", "Python",
    "Next.js", "React", "NestJS", "Bun", "Hono", "Express.js", "Node.js",
    "OpenAI", "Gemini", "Anthropic", "Pinecone", "LangChain", "LlamaIndex",
    "Ethers.js", "Web3.js", "Wagmi", "Hardhat", "Stellar SDK",
    "Docker", "Kubernetes", "Redis", "Kafka", "RabbitMQ",
    "AWS", "GCP", "Azure", "Vercel",
    "PostgreSQL", "MySQL", "MongoDB", "Prisma", "Supabase",
    "Tauri", "Expo", "GraphQL", "REST", "Microservices", "API Gateways"
  ]
})XXX";
    }

    std::string getProjectsJson() {
        return R"XXX([
  {
    "name": "Bange.io",
    "description": "AI Career Copilot - Built AI-powered resume, cover letter, job search and interview workflows using LLMs and vector search. Architected TypeScript/Next.js frontend + Nest.js API layer with Gemini/OpenAI integrations. Implemented smart feedback, job analysis, and scalable session management.",
    "period": "2024",
    "technologies": ["TypeScript", "Next.js", "Bun", "Tauri", "NestJS", "Gemini", "OpenAI", "Azure", "Vector Search"],
    "highlight": "AI-powered career tools that help professionals optimize their job applications",
    "url": "https://bange.io"
  },
  {
    "name": "Omni Brain",
    "description": "AI RAG Platform - Built a full RAG pipeline using Pinecone + LLMs for multi-source knowledge retrieval. Developed high-performance Rust & TypeScript backend for embeddings, chunking, and semantic search. Integrated dashboards, role-based access, and streaming responses for conversational AI workflows.",
    "period": "2025",
    "technologies": ["Rust", "TypeScript", "Pinecone", "LLMs", "RAG", "Azure"],
    "highlight": "Enterprise-grade AI platform for intelligent knowledge retrieval and conversational AI",
    "url": "https://omin-live.vercel.app"
  },
  {
    "name": "Linda Ikeji TV",
    "description": "Media platform development - Built scalable infrastructure and features for one of Nigeria's leading media platforms.",
    "period": "2018",
    "technologies": ["TypeScript", "React", "Node.js", "AWS"],
    "highlight": "Scalable media platform serving millions of users",
    "url": "https://x.com/lindaikejitv?lang=en"
  }
])XXX";
    }

    std::string getBlogPostsJson() {
        // Use getBlogPostJson to build the list - simpler approach
        std::string result = "[";
        result += getBlogPostJson("time-travel-paradox");
        result += ",";
        result += getBlogPostJson("boundless-space");
        result += ",";
        result += getBlogPostJson("origins-of-life");
        result += ",";
        result += getBlogPostJson("future-1000-years");
        result += "]";
        return result;
    }

    std::string getBlogPostJson(const std::string& id) {
        // Simple extraction - in production, use proper JSON parsing
        if (id == "time-travel-paradox") {
            return R"XXX({
  "id": "time-travel-paradox",
  "title": "The Chronological Paradox: Why Time Travel Might Be Impossible (And Why That's Beautiful)",
  "excerpt": "What if the very act of observing time travel creates a paradox that prevents it from ever existing? A deep dive into the quantum mechanics of temporal displacement.",
  "date": "2025-01-15",
  "category": "Time Travel",
  "content": "Imagine for a moment that time travel is not just difficult, but fundamentally impossible—not because of technological limitations, but because of the nature of causality itself. The universe, in its infinite wisdom, might have built-in safeguards against temporal paradoxes that would unravel the fabric of reality.\n\nWhen we think about time travel, we often imagine it as a linear journey: point A to point B, past to future. But what if time is more like a quantum field, where every possible timeline exists simultaneously, and 'traveling' through time is actually just shifting between parallel realities?\n\nIn this model, when you 'travel back' to prevent a catastrophe, you're not actually changing your original timeline. Instead, you're creating a new branch in the multiverse—a timeline where the catastrophe never happened. Your original timeline remains untouched, continuing its course in a separate quantum state.\n\nThis means that every decision, every moment of 'time travel,' spawns infinite new universes. The version of you that prevented the disaster exists in one reality, while the version that didn't exists in another. Both are equally real, both are equally valid.\n\nPerhaps the most beautiful aspect of this theory is that it suggests we're all time travelers in a way. Every choice we make creates a new timeline, a new version of reality. The past isn't fixed—it's a probability cloud, and we're constantly collapsing it into existence through our observations and actions.\n\nSo maybe time travel isn't about going back and changing things. Maybe it's about understanding that every moment contains infinite possibilities, and we're already navigating through them with every breath we take."
})XXX";
        } else if (id == "boundless-space") {
            return R"XXX({
  "id": "boundless-space",
  "title": "The Infinite Expanse: Why Space Is More Boundless Than We Can Comprehend",
  "excerpt": "The observable universe is 93 billion light-years across. But what lies beyond? A meditation on the true scale of cosmic infinity.",
  "date": "2025-01-10",
  "category": "Space",
  "content": "We live in a universe that is, by definition, incomprehensibly vast. The observable universe—the portion we can theoretically see—spans approximately 93 billion light-years in diameter. But here's the mind-bending part: that's just what we can observe. The actual universe might be infinite.\n\nThink about that for a moment. Not 'very large.' Not 'astronomically huge.' Infinite. Without end. Without boundary. A cosmos so vast that every possible configuration of matter, every possible arrangement of atoms, might exist somewhere out there.\n\nThis means that somewhere in the infinite expanse, there's another Earth—identical to ours in every way. Somewhere else, there's an Earth where you made different choices, where history unfolded differently. Somewhere else, there's a version of reality where the laws of physics themselves are different.\n\nBut infinity doesn't just mean 'everything exists.' It means something more profound: it means that the universe is fundamentally creative. In an infinite cosmos, new structures, new forms of life, new ways of being are constantly emerging. The universe isn't just expanding—it's evolving, creating, becoming more complex with every passing moment.\n\nConsider the possibility that we're not just living in space, but that space itself is alive. That the cosmic web of galaxies, the dark matter halos, the quantum fluctuations—all of it might be part of a vast, cosmic organism that we're only beginning to perceive.\n\nAnd if space is truly infinite, then so is the potential for discovery. Every star we observe, every exoplanet we find, every galaxy we map is just the beginning. The universe is an endless frontier, and we're just taking our first steps into the cosmic ocean.\n\nPerhaps the most humbling realization is this: in an infinite universe, we are simultaneously everything and nothing. We are a unique configuration of matter and energy, never to be repeated exactly. And yet, we are also an infinitesimally small part of an infinite whole—a single note in a cosmic symphony that has no end."
})XXX";
        } else if (id == "origins-of-life") {
            return R"XXX({
  "id": "origins-of-life",
  "title": "The Cosmic Recipe: Rethinking the Origins of Life in an Infinite Universe",
  "excerpt": "What if life didn't originate on Earth, but was seeded across the cosmos by ancient cosmic events? A radical reimagining of biogenesis.",
  "date": "2025-01-05",
  "category": "Origins of Life",
  "content": "The question of how life began is one of humanity's greatest mysteries. Traditional theories suggest that life emerged from a primordial soup on early Earth, a series of chemical reactions that somehow crossed the threshold from non-living to living matter.\n\nBut what if we're asking the wrong question? What if life didn't 'originate' at all, but has always existed in some form, scattered across the cosmos like cosmic seeds?\n\nConsider the panspermia hypothesis taken to its logical extreme. If the universe is infinite and has existed for billions of years, then life—or the precursors to life—might have emerged countless times, in countless places. These biological building blocks could have been spread across galaxies by comets, asteroids, and cosmic winds.\n\nBut let's go even further. What if life isn't a rare, precious phenomenon, but a fundamental property of the universe itself? Just as matter and energy are basic components of reality, perhaps life—or at least the potential for life—is woven into the fabric of spacetime.\n\nIn this view, the emergence of life on Earth wasn't a miraculous accident, but an inevitable expression of cosmic principles. The universe, in its infinite creativity, naturally gives rise to complex, self-organizing systems. Life is just one manifestation of this universal tendency toward complexity.\n\nThis perspective also suggests that life might take forms we can't even imagine. On distant worlds, under conditions we consider impossible, life might exist as pure energy, as information patterns, as quantum states. Our carbon-based, water-dependent biology might be just one way that the universe expresses its creative potential.\n\nPerhaps the most profound implication is this: if life is a fundamental property of the cosmos, then we're not alone in the universe. We're part of a vast, cosmic ecosystem—a living universe that has been evolving and diversifying for billions of years.\n\nAnd if that's true, then the question isn't 'How did life begin?' but 'How is life continuing to evolve?' We're not the endpoint of evolution, but a single branch in an infinite tree of biological possibility."
})XXX";
        } else if (id == "future-1000-years") {
            return R"XXX({
  "id": "future-1000-years",
  "title": "The Year 3025: A Vision of Humanity's Distant Future",
  "excerpt": "What will human civilization look like 1000 years from now? A speculative journey into a future where biology and technology have merged beyond recognition.",
  "date": "2025-01-01",
  "category": "Future",
  "content": "It's the year 3025. Humanity has transformed beyond recognition, not through destruction, but through evolution—both biological and technological. The boundary between human and machine, organic and synthetic, has dissolved into something entirely new.\n\nIn this future, consciousness isn't confined to biological bodies. Humans exist as distributed networks, their minds spread across quantum computers, biological nodes, and cloud-based neural clusters. A single person might simultaneously experience life as a physical body on Mars, as a data stream exploring the outer planets, and as a virtual entity in a simulated universe.\n\nEarth has become a nature preserve—a carefully managed ecosystem where the planet's original biosphere is protected and restored. Most of humanity lives in orbital habitats, on terraformed planets, or in vast space stations that drift between stars. Cities float in the clouds of gas giants, extract resources from asteroid belts, and orbit distant suns.\n\nTechnology has advanced to the point where it's indistinguishable from magic—or perhaps, from nature itself. Self-replicating nanobots maintain ecosystems, repair structures, and even create new worlds. Matter can be assembled atom by atom, energy can be harvested from the quantum vacuum, and information can be transmitted instantaneously across any distance.\n\nBut the most profound change is in how humans relate to time and mortality. Death, as we understand it, no longer exists. Consciousness can be backed up, transferred, and restored. People can choose to live for centuries, millennia, or indefinitely. Some choose to experience time at different rates—spending a subjective year in a few objective minutes, or stretching a single moment into years of contemplation.\n\nThis has created entirely new forms of society. Some groups exist as hive minds, sharing thoughts and experiences. Others maintain individual consciousness but can merge temporarily for complex problem-solving. There are communities that exist entirely in virtual realities, and others that have transcended physical form entirely, existing as pure information patterns.\n\nYet, despite all this change, some things remain constant. The drive to explore, to create, to understand. The curiosity that led us to the stars still burns bright. The universe, infinite and mysterious, still calls to us.\n\nIn 3025, humanity has become a cosmic species—not just living in space, but as part of space itself. We've merged with the universe, and in doing so, we've become something new: not human, not machine, but something that transcends both.\n\nAnd the journey is just beginning. The universe is infinite, and so is our potential. In another thousand years, we might be something we can't even imagine today—and that's the most exciting part of all."
})XXX";
        }
        
        return "{}";
    }

    std::string getWorkExperienceJson() {
        return R"XXX([
  {
    "company": "Shield",
    "location": "San Francisco",
    "position": "Full Stack Engineer",
    "period": "2023-2024",
    "funding": "$15M raised",
    "description": "Built a Web3 security platform end-to-end: backend, frontend, and data pipelines. Designed REST APIs for wallet analysis, and third-party integrations. Reduced deployment time from days to minutes with containerized GitHub Actions.",
    "technologies": ["TypeScript", "React", "Node.js", "Web3", "Docker", "Kubernetes", "CI/CD"]
  },
  {
    "company": "PBR Life Sciences",
    "location": "London",
    "position": "Full Stack Engineer",
    "period": "Sep 2023 — Dec 2023",
    "funding": "$1M raised through Techsters",
    "description": "Designed AI/ML-ready APIs for healthcare data systems. Improved UX and frontend performance, increasing engagement by 30%. Built dashboards, admin tools, and analytics modules. Integrated AWS infrastructure for AI/ML workloads.",
    "technologies": ["TypeScript", "React", "Node.js", "AWS", "AI/ML"]
  },
  {
    "company": "Fireflies.ai",
    "location": "San Francisco",
    "position": "Full Stack Engineer",
    "period": "Jan 2018 — Jan 2021",
    "funding": "Now worth $1 billion",
    "description": "Built major features for the AI meeting assistant used worldwide. Developed the payments infrastructure and backend microservices. Delivered API endpoints, data ingestion pipelines, and analytics. Collaborated with ML teams to support AI transcription workflows.",
    "technologies": ["TypeScript", "React", "Node.js", "Python", "AI/ML", "Microservices"]
  },
  {
    "company": "Sela",
    "location": "New York",
    "position": "Full Stack Engineer",
    "period": "Apr 2018 — Jun 2019",
    "funding": "Joined HatchLabs accelerator program",
    "description": "Built a blockchain-powered crowdsourcing platform for SDG projects. Integrated Stellar blockchain SDK for decentralized financial flows. Built full-stack features across UI, API, and backend architecture.",
    "technologies": ["TypeScript", "React", "Node.js", "Stellar SDK", "Blockchain", "Web3"]
  },
  {
    "company": "Upwork",
    "location": "Global",
    "position": "Full Stack Engineer",
    "period": "Jan 2021 — Present",
    "funding": "",
    "description": "Delivered production-level applications for global clients using React, TypeScript, and Node.js. Built dashboards, marketplaces, finance tools, and enterprise systems. Ensured performance, reliability, and scalable architecture.",
    "technologies": ["TypeScript", "React", "Node.js", "Full Stack"]
  },
  {
    "company": "Swipe",
    "location": "Lagos",
    "position": "Full Stack Engineer",
    "period": "Jan 2018 — Jun 2018",
    "funding": "",
    "description": "Developed frontends and dashboards for fintech, media, and enterprise clients. Implemented scalable UI architectures and component systems.",
    "technologies": ["React", "JavaScript", "UI/UX", "Frontend"]
  },
  {
    "company": "Planet NEST",
    "location": "Akure",
    "position": "Full Stack Engineer",
    "period": "Feb 2017 — Dec 2017",
    "funding": "",
    "description": "Built websites and platforms with React, PHP, and JavaScript. Taught junior developers within the talent accelerator program.",
    "technologies": ["React", "PHP", "JavaScript", "Teaching"]
  }
])XXX";
    }
}

