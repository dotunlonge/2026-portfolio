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
  "website": "https://dotunlonge.vercel.app",
  "linkedin": "https://www.linkedin.com/in/oludotunlonge",
  "summary": "Software Engineer with 8+ years experience building systems, full-stack applications, and AI/Web3 products for startups, agencies, and global teams. Worked across diverse domains including AI assistants, Web3 security, healthcare, media platforms, and fintech. Built products from early stage to scale, handling everything from infrastructure to payments to user-facing features.",
  "skills": [
    "TypeScript", "Rust", "Solidity", "JavaScript", "Python", "PHP", "Ruby on Rails", "C++", "C#", "Swift",
    "Tanstack Start", "Next.js", "React", "NestJS", "Bun", "Hono", "Express.js", "Node.js", "GraphQL", "REST",
    "OpenAI", "Gemini", "Anthropic", "Pinecone", "LangChain", "LlamaIndex",
    "Ethers.js", "Web3.js", "Wagmi", "Hardhat", "Stellar SDK",
    "Docker", "Kubernetes", "Redis", "Kafka", "RabbitMQ",
    "AWS", "GCP", "Azure",
    "Vercel", "Railway", "Heroku", "VPS", "Cloudflare",
    "PostgreSQL", "MySQL", "MongoDB", "Prisma", "Supabase", "Firebase",
    "Tauri", "Electron","Expo", "Microservices", "API Gateways", "CI/CD", "DevOps"
  ],
  "skillsByCategory": {
    "Languages": ["TypeScript", "Rust", "JavaScript", "Python", "PHP", "Ruby on Rails", "C++", "C#", "Swift", "Solidity"],
    "Frontend": ["React", "Next.js", "Tanstack Start", "Expo"],
    "Backend": ["Node.js", "NestJS", "Express.js", "Hono", "Bun", "GraphQL", "REST"],
    "AI/ML": ["OpenAI", "Gemini", "Anthropic", "Pinecone", "LangChain", "LlamaIndex"],
    "Web3": ["Ethers.js", "Web3.js", "Wagmi", "Hardhat", "Stellar SDK"],
    "Infrastructure": ["Docker", "Kubernetes", "Redis", "Kafka", "RabbitMQ", "CI/CD", "DevOps", "Microservices", "API Gateways"],
    "Cloud": ["AWS", "GCP", "Azure", "Vercel", "Railway", "Heroku", "VPS", "Cloudflare"],
    "Databases": ["PostgreSQL", "MySQL", "MongoDB", "Prisma", "Supabase", "Firebase"],
    "Desktop/Mobile": ["Tauri", "Electron"]
  }
})XXX";
    }

    std::string getProjectsJson() {
        return R"XXX([
  {
    "name": "Bange.io",
    "description": "AI Career Copilot - Built AI-powered resume, cover letter, job search and interview workflows using LLMs and vector search. Architected TypeScript/Next.js frontend + Nest.js API layer with Gemini/OpenAI integrations. Implemented smart feedback, job analysis, and scalable session management. Grew to 1000+ users with active monthly and yearly paying customers.",
    "period": "2024",
    "technologies": ["TypeScript", "Next.js", "Bun", "Tauri", "NestJS", "LLMs", "Azure", "Vector Search"],
    "highlight": "AI-powered career tools that help professionals optimize their job applications",
    "url": "https://bange.io"
  },
  {
    "name": "Omni Brain",
    "description": "AI RAG Platform - Built a full RAG pipeline using Pinecone + LLMs for multi-source knowledge retrieval. Developed Rust & TypeScript backend for embeddings, chunking, and semantic search. Integrated dashboards, role-based access, and streaming responses for conversational AI workflows.",
    "period": "2025",
    "technologies": ["Rust", "TypeScript", "Pinecone", "LLMs", "RAG", "Azure"],
    "highlight": "AI platform for intelligent knowledge retrieval and conversational AI",
    "url": "https://omin-live.vercel.app"
  },
  {
    "name": "Linda Ikeji TV",
    "description": "Media platform development - Built the main frontend (95% of the work) and admin frontend for one of Nigeria's leading media platforms. Developed backend service leveraging AWS to convert and load videos from regular formats to HLS format for streaming.",
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
        result += getBlogPostJson("cosmic-livestream");
        result += ",";
        result += getBlogPostJson("time-travel-paradox");
        result += ",";
        result += getBlogPostJson("boundless-space");
        result += ",";
        result += getBlogPostJson("origins-of-life");
        result += "]";
        return result;
    }

    std::string getBlogPostJson(const std::string& id) {
        if (id == "cosmic-livestream") {
            return R"XXX({
  "id": "cosmic-livestream",
  "title": "The Universe Is Basically One Big Laggy Livestream",
  "excerpt": "If you have ever complained about slow internet, the universe would like to politely laugh at you. Because the universe runs on the slowest livestream system imaginable.",
  "date": "2025-01-20",
  "category": "Space",
  "content": "If you have ever complained about slow internet, the universe would like to politely laugh at you. Because the universe runs on the slowest livestream system imaginable. Whenever you point a telescope at something very far away, you are not seeing it in real time. You are watching a cosmic replay. A highlight from a very, very old season.\n\nPeople say you are looking into the past. They are right. Light takes time to travel. If a planet is one light year away, you see it the way it was one year ago. If it is a hundred light years away, you are watching its century old memories in your present moment. If it is millions of light years away, congratulations, you are basically a historian.\n\nNow here is the funny part. Flip the situation. Imagine some aliens on a planet one hundred million light years away. They point a telescope at Earth today. What do they see. Dinosaurs. Actual dinosaurs. Big loud lizards doing big loud lizard things. To those aliens this is happening right now. Their clocks are ticking in sync with their viewfinder. They are watching Jurassic Park live while you are just trying to cook noodles in 2025.\n\nThis gets even funnier. Suppose you do something on Earth today. Let's say you wave at the sky. The light from that wave starts heading toward that far away alien planet. It will arrive in one hundred million years. So if the aliens are watching through a telescope, they will see your wave in the year 100,002,025 or whatever calendar they use. They will react in their present. Meanwhile you will be long gone and possibly recycled into six new species.\n\nHere is where human brains start to melt. You might think you could prank them. You imagine watching their livestream of your own past and then calling them to explain what they are seeing. But the universe does not allow that cheat code. Your call also travels at the speed of light. So your message will reach them at exactly the same time as the light from the event they are watching. The universe is basically saying nice try but this is not a time travel loophole.\n\nThis also means if you watch an ancient event from another planet and they watch your ancient event from their planet and both of you try to call each other about it, you will both be stuck in a cosmic customer service queue where nobody gets ahead. The processing time is forever. Literally.\n\nSo yes, somewhere out there, a civilization could be watching Earth's dinosaurs march across a swamp. They are experiencing that moment in their present while you experience memes and rent in yours. But none of you can talk about it until the universe finishes buffering the signal.\n\nThe cosmos is a laggy multiplayer server and everyone is playing with different ping. Yet somehow everything still works. That might be the funniest part of all."
})XXX";
        } else if (id == "time-travel-paradox") {
            return R"XXX({
  "id": "time-travel-paradox",
  "title": "The 1 Over Infinity Problem: A Completely Serious Exploration of Time Travel, Portals, and Human Stupidity",
  "excerpt": "Time travel is one of those ideas humans cannot stop poking at. So I went on a deep tangent about how a real time travel portal would actually behave, and I ended up discovering a simple truth: If time travel ever becomes real, humanity is finished in 12 minutes.",
  "date": "2025-01-15",
  "category": "Time Travel",
  "content": "Time travel is one of those ideas humans cannot stop poking at. Every decade someone publishes a paper, makes a sci fi movie, or tweets a thread about timelines as if the universe is just waiting for our approval to break itself.\n\nSo I went on a deep tangent about how a real time travel portal would actually behave, and I ended up discovering a simple truth:\n\nIf time travel ever becomes real, humanity is finished in 12 minutes.\n\n## **The Two Cheats That Break Reality**\n\nAfter thinking way too hard about time travel logic, two possible models appear. Neither works. Both are hilarious.\n\n### **Cheat A: You create new timelines every time you breathe near a portal**\n\nYou step in. You say hi. Reality instantly forks into Timeline B because you altered something.\n\nYou return to your original timeline because it is still there, except now it is missing you for a while.\n\nYou basically become a walking Git branch.\n\nThe universe already creates black holes. A new timeline is nothing. It would do it for sport.\n\n### **Cheat B: Everything becomes canon for everyone**\n\nThis is where things get stupid.\n\nIf someone goes back in time and kills one important person, billions of people might never be born.\n\nWhich means nobody will be left to remember that anything changed.\n\nWhich means the change is both remembered and not remembered.\n\nWhich means logic packs its bags and leaves the universe.\n\nThis is also how you get Time Travel Wars. And we are far too human to skip that.\n\n## **Entering the Portal Requires a Prayer**\n\nEventually I concluded that the correct description of a true time travel portal is:\n\n**1 over infinity**\n\nIf a portal ever existed, opening it would be like asking the universe to randomly pick one path out of infinite possible futures and say yes.\n\nSo I designed the theoretical API for it.\n\n## **collapse_probability(target_time)**\n\nThis function tells the universe you are stupid enough to attempt this.\n\n## **open_stable_conduit()**\n\nThis tries to stabilize the portal. It never works on the first attempt.\n\n## **pray()**\n\nThis is required. We cannot automate it. Humans must pray manually or the portal crashes.\n\n## **QTA = hash(universe_state || desired_time || your_vibes)**\n\nThis variable determines the timeline you land in.\n\nYour vibes matter. Unfortunately.\n\n## **The Paradox Engine Runs On a Cursed GPU**\n\nEvery time travel machine needs hardware. Preferably bad hardware. Which brings us to the funniest requirement:\n\n*One cursed GPU from AliExpress. Must arrive with coil whine and faint burning smell. This powers the paradox engine.*\n\nIf your GPU is clean, brand new, or functional, the portal refuses to open.\n\nThe universe expects suffering.\n\n## **Why Git Is Required For Time Travel**\n\nTime travel is basically branching.\n\nMerging timelines without conflicts is impossible.\n\nRebasing your birth year will get you killed.\n\nEvery timeline jump should be committed:\n\n```\n\ngit commit -m \"Fixed 2057. Accidentally caused antimatter recession.\"\n\n```\n\n## **The Probability Shear Generator**\n\nHow many GPUs are required to bend time\n\nAll of them.\n\nPreferably overheating.\n\nPreferably screaming.\n\n## **Finally, The Official Blessing**\n\nEvery portal traveler must receive the sacred farewell.\n\nThis is the only message appropriate when someone is about to tear spacetime:\n\n**Godspeed, Idiot**\n\n## **So Is Time Travel Possible**\n\nProbably not.\n\nNot because the physics is impossible.\n\nBut because humans would immediately weaponize it to:\n\n1. win arguments\n\n2. fix relationships\n\n3. delete embarrassing tweets\n\n4. go back to when Bitcoin was cents\n\n5. stop themselves from eating that one sandwich\n\nThe universe seems smarter than us.\n\nIf time travel was possible, we would have ruined everything already.\n\n## **Final Thought**\n\nThe biggest lesson I learned from this entire rabbit hole is simple:\n\nThe laws of physics are not the issue.\n\nHuman chaos is.\n\nIf the universe ever gives us a portal, the portal will close itself out of self preservation.\n\nUntil then, we can dream, theorize, and create completely unserious APIs that run on cursed GPUs.\n\nWhich, honestly, feels like the more responsible option."
})XXX";
        } else if (id == "boundless-space") {
            return R"XXX({
  "id": "boundless-space",
  "title": "The Infinite Expanse: Why Space Is More Boundless Than We Can Comprehend",
  "excerpt": "We like to pretend we understand space. But if you stop and really stare at the idea of space itself, something strange and uncomfortable happens. A philosophical exploration of space, nothingness, and existence.",
  "date": "2025-01-10",
  "category": "Space",
  "content": "We like to pretend we understand space. We talk about distance, galaxies, expansion, black holes and cosmic horizons. We say space is big and we say it goes on forever. But if you stop for a moment and really stare at the idea of space itself, something strange and uncomfortable happens.\n\nYou begin to see that space is not logically simple. It is not even intuitive. It is the most paradoxical thing we experience because it is the one thing we cannot remove, cannot replace and cannot imagine disappearing. And yet we act like it is normal.\n\nThis post explores a deeper way to think about space, nothingness, existence and why the universe feels like it is cheating the rules of reality. These thoughts are not scientific conclusions but philosophical reflections that try to take the idea of \"infinite space\" seriously instead of treating it as a math symbol.\n\n## **Space Is Not Supposed To Be Possible**\n\nWe know what it means for something to exist. A human exists. A planet exists. A star exists. They are all physical things that can appear, change or stop existing.\n\nBut space is different. Space is not an object in the usual sense. It is not a substance, not a material and not a void. It is the physical openness inside which everything else happens.\n\nIf you removed every star, galaxy and particle, you would still be left with space. Space is the stage. Space is the context. Space is the environment. Even empty space is still something.\n\nThis creates the first paradox. Space feels like it exists, but it does not behave like anything else that exists.\n\n## **Absolute Nothing Is Not Space**\n\nHere is where the confusion usually begins. When people imagine \"nothing\", they imagine a vast black emptiness. Infinite darkness. No matter, no light, no stars.\n\nBut that is still space. That is still a region. That is still distance and direction and geometry. That is still something.\n\nAbsolute nothing is not emptiness. It is not darkness. It is not infinite black. Absolute nothing has no space, no dimension, no size, no time, no potential and no openness. It cannot be infinite because infinity itself is a spatial property.\n\nNothing cannot be a container. Nothing cannot be a place. Nothing cannot even be imagined because the moment you imagine it, you have given it a space to sit in.\n\nAbsolute nothing is a mental concept, not a real possible state.\n\n## **So What Came First: Nothing Or Existence?**\n\nHere is the tempting idea: nothing existed, then something replaced it. You imagine nothing as the default and existence as a new arrival. Something appears and fills the blank. Something begins and overwrites the void.\n\nThis feels natural, but it hides a contradiction. If nothing ever existed as a state, then there could be no laws, no time, no change and no possibility. Absolute nothing cannot transform. It cannot shift into something because change itself requires existence.\n\nThe moment you allow a transition, you have already allowed existence.\n\nThis means the idea that nothing is older than existence cannot be correct. Nothing cannot be older. Nothing cannot take place before anything. Nothing cannot hold a state long enough to be replaced.\n\nNothingness is not a real contender. It is not a thing that lost to existence. It never had the ability to compete.\n\n## **Existence Did Not Come After Nothing**\n\nThe cleaner explanation is this:\n\nExistence is fundamental.\n\nNothing is not a real state.\n\nThere was never a moment when absolute nothing was true.\n\nThere was no before, no ahead, no earlier.\n\nExistence did not emerge. Existence simply is.\n\nIf you try to imagine absolute nothing as the starting point, you will always end up giving it attributes like earlier, outside, before or around. But those are all spatial or temporal concepts that only make sense inside existence.\n\nYou cannot apply the rules of existence to the absence of existence.\n\n## **Space Is Not Inside Anything**\n\nThis is the second major realization. Space is not a bubble floating inside a larger nothing. Space is not contained. Space does not sit within a background. The universe does not rest inside a void. Space is the framework of all possible relationships.\n\nIf space were inside something else, that something else would itself be space. Distance is distance. There is no meta-distance.\n\nThe universe is not in anything. The universe is everything.\n\n## **Then Why Does Space Feel Infinite?**\n\nBecause from inside the universe, there is no external boundary to hit. No edge to bounce off. No surface. No container.\n\nInfinity here does not describe an actual countable amount. It describes the absence of limits. We cannot travel to \"the end\" because the idea of an end only makes sense if something larger surrounds us.\n\nInfinity simply points to the fact that space is not a thing inside something else. It is the structure of all possible somethings.\n\n## **Can Space Cease To Exist?**\n\nA human can cease to exist. A planet can cease to exist. But space is not an object in space. It is not a participant. It is the condition required for participants to exist at all.\n\nIf space stopped existing, everything that relies on space would collapse with it. Time, causality, position, change, form, matter, identity. There would be no \"after\" in which the absence of space could be noticed.\n\nWe would not get nothing. We would get no possibility of anything.\n\nThis is the true boundary of the question.\n\n## **Existence Might Be The Only Possible State**\n\nThis leads to one last conclusion. A surprising one. A simple one.\n\nNothing is impossible.\n\nExistence is inevitable.\n\nExistence has no alternative.\n\nExistence does not explain itself because it is the condition that allows explanations to even exist.\n\nWhen people try to describe the ultimate foundation of reality, they often use metaphors like God or Being or The Ground. Not because they are invoking religion but because they are trying to name the thing that sits beneath every possible thing.\n\nNot an entity.\n\nNot a creator.\n\nNot a person.\n\nSimply the fact that there is something rather than nothing, and that nothing was never an option.\n\n## **Final Thoughts**\n\nSpace is stranger than we treat it. It is not emptiness. It is not contained. It is not a thing, yet it is physical. It is not infinite in size but infinite in the absence of boundaries. It cannot be created or destroyed in the same sense other things can. And it does not sit inside a larger void.\n\nWhen we say the universe is boundless, we are not exaggerating. We are admitting that our minds cannot fully fit the idea of existence inside themselves. We are creatures inside the system trying to understand the container that has no outside.\n\nThe infinite expanse is not just big. It is conceptually untouchable. And that is what makes it profound."
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
    "description": "Built crypto payments infrastructure to accept blockchain-based transactions. Developed prompt-to-visualization product enabling users to explore connections between transactions and accounts on the blockchain through natural language queries. Designed REST APIs for wallet analysis and third-party integrations. Reduced deployment time from days to minutes with containerized GitHub Actions.",
    "technologies": ["TypeScript", "React", "Node.js", "Web3", "Blockchain", "Docker", "Kubernetes", "CI/CD"]
  },
  {
    "company": "PBR Life Sciences",
    "location": "London",
    "position": "Full Stack Engineer",
    "period": "Sep 2023 — Dec 2023",
    "funding": "$1M raised through Techsters",
    "description": "Developed 3 products in rapid succession for pharmaceutical sales data visualization. Built Versus, an invite-only SaaS platform allowing companies to visualize PBR's pharmaceutical sales data in tables and charts. Wrote the backend leveraging SQL queries for data retrieval, authentication, server hosting, and testing. Contributed to the frontend client rendering the data. Built a Stripe-powered e-commerce platform for PBR products. Developed another platform similar to Versus but for a different dataset. All products integrated with Amazon SageMaker for ML data processing.",
    "technologies": ["TypeScript", "React", "Node.js", "AWS", "Amazon SageMaker", "SQL", "Stripe", "Full Stack"]
  },
  {
    "company": "Fireflies.ai",
    "location": "San Francisco",
    "position": "Full Stack Engineer",
    "period": "Jan 2018 — Jan 2021",
    "funding": "Now worth $1 billion",
    "description": "Joined as an early engineer building the AI meeting assistant used worldwide. Built calendar integrations enabling the AI to automatically join scheduled meetings. Developed the teammates feature allowing users to add team members to plans. Built the payments infrastructure handling subscription billing and revenue collection. Delivered API endpoints, data ingestion pipelines, and analytics. Collaborated with ML teams to support AI transcription workflows.",
    "technologies": ["TypeScript", "React", "Node.js", "Python", "AI/ML", "Microservices"]
  },
  {
    "company": "Sela",
    "location": "New York",
    "position": "Full Stack Engineer",
    "period": "Apr 2018 — Jun 2019",
    "funding": "Joined HatchLabs accelerator program",
    "description": "Led development of blockchain-powered platform ensuring transparency in Sustainable Development Goal projects across Africa. Took ownership of Stellar JS SDK integration enabling transparent real-time fund tracking, building workflows bridging complex ledger data to intuitive frontend dashboards. Led design and engineering of the Sela Web Platform, collaborating with design, backend, and mobile teams. Built dashboards, media upload interfaces, and project tracking systems that enabled pilots in Makoko and Port-Harcourt. Contributed to growing the engineering team by interviewing, vetting, and onboarding backend and mobile engineers.",
    "technologies": ["TypeScript", "React", "Node.js", "Stellar SDK", "Blockchain", "Web3", "Full Stack"]
  },
  {
    "company": "Freelance (Upwork & Direct Clients)",
    "location": "Global",
    "position": "Full Stack Engineer",
    "period": "Jan 2021 — Present",
    "funding": "",
    "description": "Delivered production-level applications for global clients through Upwork and direct engagements. Built an Excel-like table feature for LucidDreams (2023). Developed nestSafari, an Airbnb clone platform. Built the official web platform with custom blog for Investiv, an agriculture drone company specializing in aerial solutions for West Africa, using React static. Delivered dashboards, marketplaces, finance tools, and enterprise systems across diverse industries.",
    "technologies": ["TypeScript", "React", "Node.js", "Full Stack"]
  },
  {
    "company": "Swipe",
    "location": "Lagos",
    "position": "Full Stack Engineer",
    "period": "Jan 2018 — Jun 2018",
    "funding": "",
    "description": "Built GTBank's Bank 737 web platform using PHP and React. Developed frontend for CICO, a time tracking platform. Worked on the Linda Ikeji TV project during this period.",
    "technologies": ["React", "PHP", "JavaScript", "Frontend"]
  },
  {
    "company": "Planet NEST",
    "location": "Akure",
    "position": "Full Stack Engineer",
    "period": "Feb 2017 — Dec 2017",
    "funding": "",
    "description": "Built the initial Nigerian Women Techsters platform (frontend and backend), a platform that has trained 1000+ Nigerian women in tech and STEM skills. Developed gidicompare, a platform to compare prices of different products. Taught others how to code and collaborated with the CTO on various side projects.",
    "technologies": ["React", "PHP", "JavaScript", "Teaching", "Full Stack"]
  }
])XXX";
    }

    std::string getLeaderboardJson(const std::string& gameId) {
        if (gameId == "snake-3d") {
            return R"XXX([
  {
    "rank": 1,
    "player": "Dotun",
    "score": 450,
    "date": "2025-01-20"
  },
  {
    "rank": 2,
    "player": "Guest",
    "score": 320,
    "date": "2025-01-19"
  },
  {
    "rank": 3,
    "player": "Player1",
    "score": 280,
    "date": "2025-01-18"
  },
  {
    "rank": 4,
    "player": "Gamer",
    "score": 210,
    "date": "2025-01-17"
  },
  {
    "rank": 5,
    "player": "Test",
    "score": 180,
    "date": "2025-01-16"
  }
])XXX";
        } else if (gameId == "space-shooter") {
            return R"XXX([
  {
    "rank": 1,
    "player": "Dotun",
    "score": 1250,
    "wave": 13,
    "date": "2025-01-20"
  },
  {
    "rank": 2,
    "player": "Guest",
    "score": 980,
    "wave": 10,
    "date": "2025-01-19"
  },
  {
    "rank": 3,
    "player": "Player1",
    "score": 750,
    "wave": 8,
    "date": "2025-01-18"
  },
  {
    "rank": 4,
    "player": "Gamer",
    "score": 620,
    "wave": 7,
    "date": "2025-01-17"
  },
  {
    "rank": 5,
    "player": "Test",
    "score": 450,
    "wave": 5,
    "date": "2025-01-16"
  }
])XXX";
        }
        
        return "[]";
    }
}

