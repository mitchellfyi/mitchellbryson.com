export const aiIntegrations = [
  {
    slug: 'chatbots-and-conversational-ai',
    title: 'Chatbots and conversational AI',
    description:
      'Customer support, lead qualification, and internal Q&A systems that understand your business context.',
    content:
      "I build chatbots and conversational AI that fit your business. Whether it's handling customer support queries, qualifying leads before they reach your sales team, or powering internal Q&A so staff can find answers without digging through docs - the goal is systems that understand your context and respond usefully.\n\nFor Barnsley businesses, this might mean a support bot that knows your product range, a triage system for incoming enquiries, or an internal assistant that helps staff navigate policies and procedures. I integrate with your existing tools (Slack, Teams, your CRM, website) so the AI works where your team already works.",
    category: 'ai',
    faqs: [
      {
        question:
          'How much does an AI chatbot cost for a small Barnsley business?',
        answer:
          'A basic customer support chatbot typically starts from a few thousand pounds for setup, with modest monthly running costs for the AI model and hosting. Costs depend on conversation volume and complexity. I scope projects so you know the cost before committing.',
      },
      {
        question: 'Can a chatbot integrate with my existing website and CRM?',
        answer:
          'Yes. I build chatbots that plug into your website, Slack, Microsoft Teams, and most CRMs. The goal is AI that works where your team already works, not another separate tool to manage.',
      },
      {
        question:
          'Will the chatbot understand questions specific to my business?',
        answer:
          'Absolutely. I train chatbots on your product range, policies, and procedures so they give accurate, context-aware answers rather than generic responses. They can be grounded on your own documents and knowledge base.',
      },
      {
        question: 'How long does it take to build and deploy a chatbot?',
        answer:
          'A focused chatbot for one use case - such as customer support or internal Q&A - can typically be built and deployed within two to four weeks, including testing and refinement.',
      },
    ],
    integrations: [
      {
        name: 'Voiceflow',
        url: 'https://voiceflow.com',
        description:
          'Conversational AI design platform for voice and chat agents.',
        contextSentence:
          'For chatbots, it helps design multi-turn flows and deploy to web, voice, or messaging channels.',
      },
      {
        name: 'Botpress',
        url: 'https://botpress.com',
        description: 'Open-source AI chatbot builder with LLM and RAG support.',
        contextSentence:
          'In chatbot projects, it powers support bots and internal Q&A with knowledge-base grounding.',
      },
      {
        name: 'Rasa',
        url: 'https://rasa.com',
        description:
          'Conversational AI framework for intent and entity extraction.',
        contextSentence:
          'For chatbots, it handles intent classification and slot-filling for structured conversations.',
      },
      {
        name: 'Dialogflow',
        url: 'https://cloud.google.com/dialogflow',
        logoDomain: 'cloud.google.com',
        description: 'Google conversational AI for voice and text agents.',
        contextSentence:
          'For chatbots, it provides NLU and fulfilment for voice and text interfaces.',
      },
      {
        name: 'Amazon Lex',
        url: 'https://aws.amazon.com/lex',
        logoDomain: 'aws.amazon.com',
        description: 'AWS service for building conversational interfaces.',
        contextSentence:
          'For chatbots, it builds voice and text bots with AWS Lambda integration.',
      },
      {
        name: 'Flowise',
        url: 'https://flowiseai.com',
        description:
          'LLM flow builder for conversational AI with RAG and tools.',
        contextSentence:
          'For chatbots, it connects LLMs to knowledge bases and external tools via flows.',
      },
    ],
  },
  {
    slug: 'search-and-retrieval',
    title: 'Search and retrieval',
    description:
      'Semantic search over your documents, products, or knowledge base so users find what they need without exact keywords.',
    content:
      'Traditional keyword search breaks when users don\'t know the right terms. AI-powered semantic search understands intent - so "how do I return a faulty item" finds your returns policy even if it never mentions "faulty".\n\nI build AI search over documents, product catalogues, knowledge bases, and internal wikis. For Barnsley manufacturing firms, that might mean finding specs or procedures by describing the problem. For retailers, it\'s AI product discovery that understands "something like X but cheaper". For professional services, it\'s surfacing the right precedent or template. The tech (embeddings, vector search) is proven; the work is making AI search useful for your data and your users.',
    category: 'ai',
    faqs: [
      {
        question:
          'What is the difference between keyword search and AI semantic search?',
        answer:
          'Keyword search only finds exact word matches. AI semantic search understands meaning and intent, so a query like "how do I return a faulty item" will find your returns policy even if it never uses the word "faulty". It works by converting text into numerical representations (embeddings) and finding the closest matches.',
      },
      {
        question:
          'Can AI search work with our existing documents and product data?',
        answer:
          'Yes. I build search over whatever data you have - PDFs, spreadsheets, product catalogues, wikis, or internal docs. The AI indexes your content and makes it searchable by meaning, not just keywords.',
      },
      {
        question:
          'How accurate is AI-powered search compared to traditional search?',
        answer:
          "For queries where users don't know the exact terminology, AI search is significantly more accurate. It understands synonyms, context, and intent. For exact lookups like order numbers, traditional search still works well - most systems use a hybrid approach combining both.",
      },
      {
        question: 'Is AI search suitable for a small product catalogue?',
        answer:
          'Yes. Even with a few hundred products, semantic search improves discovery by understanding what customers mean rather than requiring exact product names. The technology scales from small catalogues to millions of items.',
      },
    ],
    integrations: [
      {
        name: 'Marqo',
        url: 'https://marqo.ai',
        description:
          'AI search API with built-in embedding and hybrid retrieval.',
        contextSentence:
          'For search, it powers semantic queries over documents and product catalogues.',
      },
      {
        name: 'Zilliz',
        url: 'https://zilliz.com',
        description: 'Vector database for AI-powered semantic search at scale.',
        contextSentence:
          'For search, it stores embeddings and runs similarity queries at scale.',
      },
      {
        name: 'Pinecone',
        url: 'https://www.pinecone.io',
        description: 'Vector DB for RAG and neural search over embeddings.',
        contextSentence:
          'For search, it indexes vectors for fast retrieval in RAG pipelines.',
      },
      {
        name: 'Weaviate',
        url: 'https://weaviate.io',
        description:
          'Vector database with hybrid search and built-in embeddings.',
        contextSentence:
          'For search, it combines vector and keyword search for hybrid retrieval.',
      },
      {
        name: 'Qdrant',
        url: 'https://qdrant.tech',
        description: 'Vector database for similarity search and filtering.',
        contextSentence:
          'For search, it enables filtered similarity search over embeddings.',
      },
      {
        name: 'LlamaIndex',
        url: 'https://llamaindex.ai',
        description:
          'AI data framework for RAG, retrieval, and semantic search.',
        contextSentence:
          'For search, it orchestrates indexing and retrieval for RAG applications.',
      },
    ],
  },
  {
    slug: 'document-processing',
    title: 'Document processing',
    description:
      'Extract, classify, and summarise from invoices, contracts, forms, and reports. Reduce manual data entry and speed up approvals.',
    content:
      'Documents are everywhere - invoices, contracts, forms, reports. Manually extracting data, routing for approval, or summarising for decision-makers is slow and error-prone. AI can read, classify, extract key fields, and summarise at scale.\n\nI build pipelines that ingest your documents (PDFs, scans, emails), extract the data you need, classify by type or urgency, and feed into your existing systems. Approval workflows get faster because the AI pre-fills what it can and flags what needs human review. For Barnsley businesses in manufacturing, professional services, or logistics, this often means starting with one high-volume document type - invoices, delivery notes, or contracts - and expanding from there.',
    category: 'ai',
    faqs: [
      {
        question: 'What types of documents can AI process?',
        answer:
          'AI can process PDFs, scanned documents, photos of paper forms, emails, spreadsheets, invoices, contracts, delivery notes, and more. It handles both typed and handwritten text, and can extract structured data from unstructured layouts.',
      },
      {
        question:
          'How accurate is AI document extraction compared to manual data entry?',
        answer:
          'Modern AI extraction typically achieves 90-98% accuracy depending on document quality and consistency. For high-confidence extractions it can match or exceed manual data entry, and it flags low-confidence fields for human review rather than guessing.',
      },
      {
        question:
          'Can AI document processing integrate with our accounting or ERP system?',
        answer:
          "Yes. I build pipelines that extract data from your documents and feed it directly into your existing systems - whether that's Xero, Sage, SAP, or a custom ERP. The AI handles extraction; your systems receive clean, structured data.",
      },
      {
        question: 'What is the best document type to start automating first?',
        answer:
          'Start with your highest-volume, most repetitive document type - usually invoices, purchase orders, or delivery notes. These have consistent formats and clear ROI. Once that works, expand to more varied documents like contracts or forms.',
      },
    ],
    integrations: [
      {
        name: 'Unstructured.io',
        url: 'https://unstructured.io',
        description:
          'LLM-ready document parsing and chunking for RAG pipelines.',
        contextSentence:
          'For document processing, it parses PDFs and extracts structured content for downstream use.',
      },
      {
        name: 'Amazon Textract',
        url: 'https://aws.amazon.com/textract',
        logoDomain: 'aws.amazon.com',
        description:
          'AI document extraction for forms, tables, and handwriting.',
        contextSentence:
          'For document processing, it extracts data from invoices, forms, and handwritten notes.',
      },
      {
        name: 'Google Document AI',
        url: 'https://cloud.google.com/document-ai',
        logoDomain: 'cloud.google.com',
        description:
          'ML models for invoice, contract, and form data extraction.',
        contextSentence:
          'For document processing, it automates invoice and contract data capture.',
      },
      {
        name: 'Docugami',
        url: 'https://docugami.com',
        description: 'Document intelligence for contracts and business docs.',
        contextSentence:
          'For document processing, it structures contracts and extracts key terms.',
      },
      {
        name: 'Rossum',
        url: 'https://rossum.ai',
        description: 'AI document processing for invoices and purchase orders.',
        contextSentence:
          'For document processing, it automates invoice and PO data extraction.',
      },
      {
        name: 'Sensible',
        url: 'https://sensible.so',
        description:
          'LLM-powered document extraction and structured data output.',
        contextSentence:
          'For document processing, it uses LLMs to extract fields from varied document layouts.',
      },
    ],
  },
  {
    slug: 'workflow-automation',
    title: 'Workflow automation',
    description:
      'AI agents that triage tickets, draft replies, route requests, and trigger follow-ups. Integrate with your existing tools.',
    content:
      'Workflow automation with AI goes beyond rules and triggers - it handles the judgment calls. An AI agent can triage support tickets by urgency and topic, draft replies for human review, route requests to the right person, and nudge when follow-ups are overdue.\n\nI build agents that plug into your existing stack - email, ticketing, CRM, project tools. The AI learns your patterns and handles the repetitive parts; humans stay in the loop for decisions that matter. For Barnsley businesses, this might mean support triage, sales lead routing, or internal request handling. The goal is less context-switching and faster resolution, not replacing people.',
    category: 'ai',
    faqs: [
      {
        question:
          'What is the difference between AI workflow automation and traditional automation?',
        answer:
          "Traditional automation follows rigid rules - if X then Y. AI automation handles judgment calls: triaging tickets by urgency, drafting context-aware replies, or routing requests based on content rather than simple keywords. It handles the grey areas that rule-based systems can't.",
      },
      {
        question: 'Will AI automation replace my team?',
        answer:
          'No. AI handles the repetitive, time-consuming parts - triage, drafting, routing, follow-up reminders. Your team stays in the loop for decisions that matter. The goal is less context-switching and faster resolution, not fewer people.',
      },
      {
        question: 'What tools can AI workflow automation integrate with?',
        answer:
          'I build agents that plug into your existing stack - email, Slack, Microsoft Teams, CRMs like HubSpot or Salesforce, ticketing systems like Zendesk or Freshdesk, and project tools like Linear or Jira. The AI works where your team already works.',
      },
      {
        question: 'How quickly can I see results from AI workflow automation?',
        answer:
          'Most businesses see measurable time savings within the first month. I typically start with one high-volume workflow - such as support ticket triage or lead routing - and you see the impact immediately as response times drop and manual handling reduces.',
      },
    ],
    integrations: [
      {
        name: 'LangChain',
        url: 'https://langchain.com',
        description:
          'Agent framework for tool-calling and multi-step LLM workflows.',
        contextSentence:
          'For workflow automation, it orchestrates agents that triage, route, and trigger actions.',
      },
      {
        name: 'CrewAI',
        url: 'https://crewai.com',
        description:
          'Multi-agent AI for delegating tasks between specialised agents.',
        contextSentence:
          'For workflow automation, it coordinates agents for ticket triage and follow-ups.',
      },
      {
        name: 'AutoGen',
        url: 'https://microsoft.github.io/autogen',
        logoDomain: 'microsoft.com',
        description:
          'Microsoft multi-agent framework for autonomous AI conversations.',
        contextSentence:
          'For workflow automation, it builds agents that collaborate on multi-step tasks.',
      },
      {
        name: 'Relevance AI',
        url: 'https://relevanceai.com',
        description: 'AI agent builder for autonomous workflows and tool use.',
        contextSentence:
          'For workflow automation, it deploys agents that call tools and handle requests.',
      },
      {
        name: 'Bolt.new',
        url: 'https://bolt.new',
        description: 'AI-powered full-stack app builder with agent workflows.',
        contextSentence:
          'For workflow automation, it prototypes agents and connects them to external tools.',
      },
      {
        name: 'Steamship',
        url: 'https://steamship.com',
        description: 'AI agent framework for multi-step reasoning and tools.',
        contextSentence:
          'For workflow automation, it runs multi-step agent workflows with tool use.',
      },
    ],
  },
  {
    slug: 'data-pipelines-and-analytics',
    title: 'Data pipelines and analytics',
    description:
      'LLM-powered data cleaning, enrichment, and insight generation from unstructured or messy data sources.',
    content:
      "A lot of valuable data is messy - free text, inconsistent formats, scattered across spreadsheets and emails. LLMs can clean, normalise, enrich, and extract insights from unstructured data in ways that traditional ETL struggles with.\n\nI build pipelines that ingest your messy data, apply AI for cleaning and enrichment, and output structured data for analytics or downstream systems. Use cases include: normalising product or customer data, extracting entities from notes or feedback, generating summaries for reporting, or enriching records with external context. For Barnsley businesses with legacy data or manual data entry, this often unlocks analytics that weren't feasible before.",
    category: 'ai',
    faqs: [
      {
        question: 'What kind of messy data can AI clean up?',
        answer:
          'AI handles free-text fields, inconsistent formats, duplicate records, misspellings, and data scattered across spreadsheets and emails. It can normalise addresses, standardise product names, extract entities from notes, and merge records that traditional tools would miss.',
      },
      {
        question: 'Do I need a data warehouse or special infrastructure?',
        answer:
          'Not necessarily. I can build pipelines that work with your existing tools - spreadsheets, databases, or cloud storage. For larger volumes, a simple data warehouse setup can be added, but many businesses start with what they have and scale as needed.',
      },
      {
        question: 'How does AI data enrichment work?',
        answer:
          'AI reads your existing records and adds missing context - for example, categorising customer feedback by topic, extracting key dates from contracts, or adding industry codes to company records. It uses language understanding rather than rigid rules, so it handles variation and ambiguity.',
      },
      {
        question:
          'Is AI data processing suitable for sensitive or regulated data?',
        answer:
          'Yes, with the right setup. I build pipelines with data governance in mind - audit trails, access controls, and the option to run models on-premises or in your own cloud account so data never leaves your infrastructure.',
      },
    ],
    integrations: [
      {
        name: 'Unstructured.io',
        url: 'https://unstructured.io',
        description: 'AI-powered parsing of PDFs and docs for LLM ingestion.',
        contextSentence:
          'For data pipelines, it ingests messy documents and outputs structured data for analytics.',
      },
      {
        name: 'Pandas AI',
        url: 'https://pandas-ai.com',
        description: 'Natural language to dataframe queries via LLM.',
        contextSentence:
          'For data pipelines, it lets analysts query and clean data using natural language.',
      },
      {
        name: 'LangChain',
        url: 'https://langchain.com',
        description:
          'Document loaders and chains for data extraction and enrichment.',
        contextSentence:
          'For data pipelines, it chains loaders and LLMs for extraction and enrichment.',
      },
      {
        name: 'LangSmith',
        url: 'https://smith.langchain.com',
        description:
          'LLM observability, tracing, and evaluation for AI pipelines.',
        contextSentence:
          'For data pipelines, it traces and debugs LLM runs and evaluates outputs.',
      },
      {
        name: 'Haystack',
        url: 'https://haystack.deepset.ai',
        description: 'NLP framework for LLM pipelines and document processing.',
        contextSentence:
          'For data pipelines, it builds document processing and extraction pipelines.',
      },
      {
        name: 'Ragas',
        url: 'https://ragas.io',
        description: 'AI evaluation and benchmarking for RAG pipelines.',
        contextSentence:
          'For data pipelines, it evaluates and benchmarks RAG and extraction quality.',
      },
    ],
  },
  {
    slug: 'custom-product-features',
    title: 'Custom product features',
    description:
      'Recommendations, personalisation, content generation, or assistive writing built into your app or platform.',
    content:
      'AI can power product features that feel native - recommendations, personalisation, content generation, or assistive writing. The key is fitting the AI to your product and your users, not the other way around.\n\nI work with product teams to design and build AI features: recommendation engines, personalised dashboards, content generation (drafts, summaries, variations), or writing assistants that understand your domain. For SaaS companies, agencies, or product-led businesses in Barnsley and South Yorkshire, this might mean adding AI to an existing product or prototyping a new AI-powered feature. I focus on shipping something useful, then iterating based on real usage.',
    category: 'ai',
    faqs: [
      {
        question:
          'Can AI features be added to an existing app or does it need rebuilding?',
        answer:
          'AI features can be added to existing apps without rebuilding. I integrate via APIs and SDKs so recommendations, search, content generation, or assistive writing slot into your current product. The AI layer sits alongside your existing codebase.',
      },
      {
        question: 'How do AI recommendations work in a product?',
        answer:
          'Recommendation engines analyse user behaviour and content to suggest relevant items - products, articles, features, or actions. They learn from usage patterns and improve over time. The AI considers context like what the user has viewed, purchased, or searched for.',
      },
      {
        question: 'What does it cost to add AI features to a SaaS product?',
        answer:
          'Costs depend on the feature complexity and scale. A simple content generation or assistive writing feature might take two to four weeks to build. Running costs come from the AI model API usage, which scales with your user base. I scope and estimate before starting.',
      },
      {
        question:
          'How do you ensure AI features are useful rather than gimmicky?',
        answer:
          "I focus on shipping a minimal useful version first, then iterating based on real usage data. The AI should solve an actual user problem - saving time, improving discovery, or reducing effort. If users don't engage with it, we adjust or remove it.",
      },
    ],
    integrations: [
      {
        name: 'Vercel AI SDK',
        url: 'https://sdk.vercel.ai',
        logoDomain: 'vercel.com',
        description: 'React streaming hooks for chat UIs and AI completions.',
        contextSentence:
          'For product features, it powers chat UIs and streaming completions in React apps.',
      },
      {
        name: 'Cohere',
        url: 'https://cohere.com',
        description:
          'Embedding and rerank APIs for semantic search in products.',
        contextSentence:
          'For product features, it adds semantic search and reranking to apps.',
      },
      {
        name: 'Together AI',
        url: 'https://together.ai',
        description: 'Open model inference API for embedding AI in apps.',
        contextSentence:
          'For product features, it provides inference for embeddings and completions.',
      },
      {
        name: 'OpenAI',
        url: 'https://openai.com',
        description: 'GPT APIs for chat, embeddings, and assistive features.',
        contextSentence:
          'For product features, it powers chat, recommendations, and assistive writing.',
      },
      {
        name: 'Anthropic',
        url: 'https://anthropic.com',
        description: 'Claude API for long-context and tool-use in products.',
        contextSentence:
          'For product features, it enables long-context chat and tool-calling in products.',
      },
      {
        name: 'Stability AI',
        url: 'https://stability.ai',
        description: 'Image generation and multimodal AI for product features.',
        contextSentence:
          'For product features, it adds image generation and visual AI to apps.',
      },
    ],
  },
  {
    slug: 'computer-vision-and-image-ai',
    title: 'Computer vision and image AI',
    description:
      'Image classification, object detection, and visual inspection for quality control, compliance, and automation.',
    content:
      "AI can see and interpret images at scale - from quality inspection on production lines to document classification and visual search. Computer vision handles tasks that used to require human eyes: spotting defects, counting objects, reading labels, or matching products to images.\n\nI build vision systems that fit your workflow. For Barnsley manufacturers, that might mean defect detection on finished goods or visual verification of assembly. For retailers, it's visual search or automated product tagging. For logistics, it's package inspection or warehouse automation. The models are proven; the work is integrating them into your processes and handling edge cases.",
    category: 'ai',
    faqs: [
      {
        question: 'Can AI visual inspection replace manual quality checks?',
        answer:
          'AI can handle the bulk of routine visual inspections - spotting defects, verifying assembly, and checking labels at speed. It works best as a first pass that flags issues for human review, reducing the volume of manual checks rather than eliminating them entirely.',
      },
      {
        question:
          'What equipment do I need for computer vision on a production line?',
        answer:
          'A standard industrial camera and adequate lighting are usually sufficient. I work with your existing setup where possible and recommend upgrades only when image quality would otherwise limit accuracy. The AI runs on standard compute hardware.',
      },
      {
        question: 'How long does it take to train a custom vision model?',
        answer:
          'A custom model for a specific inspection task typically takes two to four weeks, including data collection, labelling, training, and testing. Simpler tasks like counting objects or reading labels can often use pre-trained models with minimal customisation.',
      },
      {
        question:
          'Can computer vision work with existing CCTV or camera systems?',
        answer:
          'Often yes. If your existing cameras produce sufficiently clear images, the AI can process their feeds. I assess your current setup and recommend whether existing hardware will work or if specific cameras are needed for the task.',
      },
    ],
    integrations: [
      {
        name: 'Roboflow',
        url: 'https://roboflow.com',
        description:
          'Computer vision platform for custom object detection and classification.',
        contextSentence:
          'For computer vision, it trains custom models for defect detection and quality inspection.',
      },
      {
        name: 'Clarifai',
        url: 'https://clarifai.com',
        description: 'AI vision API for image and video recognition.',
        contextSentence:
          'For computer vision, it provides pre-built models for image and video analysis.',
      },
      {
        name: 'Google Cloud Vision',
        url: 'https://cloud.google.com/vision',
        logoDomain: 'cloud.google.com',
        description: 'Image analysis and object detection API.',
        contextSentence:
          'For computer vision, it detects objects, labels, and text in images.',
      },
      {
        name: 'AWS Rekognition',
        url: 'https://aws.amazon.com/rekognition',
        logoDomain: 'aws.amazon.com',
        description: 'Image and video analysis for object and scene detection.',
        contextSentence:
          'For computer vision, it analyses images and video for objects and scenes.',
      },
      {
        name: 'Replicate',
        url: 'https://replicate.com',
        description: 'Run open-source vision models via API.',
        contextSentence:
          'For computer vision, it runs open-source vision models without managing infra.',
      },
      {
        name: 'Hugging Face',
        url: 'https://huggingface.co',
        description:
          'Pre-trained vision models for classification and detection.',
        contextSentence:
          'For computer vision, it provides pre-trained models for classification and detection.',
      },
    ],
  },
  {
    slug: 'voice-and-speech-ai',
    title: 'Voice and speech AI',
    description:
      'Speech-to-text, text-to-speech, and voice assistants for hands-free workflows and accessibility.',
    content:
      'Voice AI lets users interact without typing - ideal for hands-busy environments, accessibility, or when speed matters. Speech-to-text transcribes calls, meetings, or dictation. Text-to-speech reads content aloud or powers IVR. Voice assistants handle commands and queries.\n\nI integrate voice AI into your products and workflows. For Barnsley businesses, that might mean transcribing customer calls for compliance, voice-controlled warehouse systems, or an IVR that understands natural language. The tech (Whisper, ElevenLabs, cloud APIs) is mature; the work is fitting it to your use case and handling accents, noise, and domain vocabulary.',
    category: 'ai',
    faqs: [
      {
        question: 'Can AI speech recognition handle Yorkshire accents?',
        answer:
          'Modern speech-to-text models like Whisper handle regional accents well, including Yorkshire English. For specialist vocabulary or strong dialect, I fine-tune the system on sample audio from your team to improve accuracy further.',
      },
      {
        question:
          'Is voice AI suitable for recording customer calls for compliance?',
        answer:
          'Yes. AI transcription can record and transcribe customer calls in real time or from recordings, with speaker separation. Transcripts can be automatically flagged for compliance keywords, stored securely, and made searchable for audits.',
      },
      {
        question:
          'Can voice AI work in noisy environments like warehouses or factories?',
        answer:
          'Yes, with the right setup. Noise-cancelling microphones and models trained on noisy audio handle industrial environments well. I test with real audio from your environment to ensure accuracy before deployment.',
      },
      {
        question:
          'What is the difference between speech-to-text and a voice assistant?',
        answer:
          'Speech-to-text converts spoken audio into written text - useful for transcription and documentation. A voice assistant goes further: it understands commands, answers questions, and triggers actions. Both use speech recognition, but a voice assistant adds AI reasoning on top.',
      },
    ],
    integrations: [
      {
        name: 'OpenAI Whisper',
        url: 'https://openai.com/whisper',
        description: 'Speech-to-text model for transcription and translation.',
        contextSentence:
          'For voice AI, it transcribes calls, meetings, and dictation with high accuracy.',
      },
      {
        name: 'ElevenLabs',
        url: 'https://elevenlabs.io',
        description: 'AI voice synthesis for natural text-to-speech.',
        contextSentence:
          'For voice AI, it generates natural-sounding speech for IVR and assistants.',
      },
      {
        name: 'AssemblyAI',
        url: 'https://assemblyai.com',
        description: 'Speech-to-text API with summarisation and sentiment.',
        contextSentence:
          'For voice AI, it transcribes and analyses calls with summaries and sentiment.',
      },
      {
        name: 'Deepgram',
        url: 'https://deepgram.com',
        description: 'Real-time speech recognition and transcription API.',
        contextSentence:
          'For voice AI, it provides real-time transcription for live conversations.',
      },
      {
        name: 'Vapi',
        url: 'https://vapi.ai',
        description: 'Voice AI platform for phone and voice assistants.',
        contextSentence:
          'For voice AI, it builds phone and voice assistants with LLM backends.',
      },
      {
        name: 'Google Cloud Speech',
        url: 'https://cloud.google.com/speech-to-text',
        logoDomain: 'cloud.google.com',
        description: 'Speech-to-text and text-to-speech APIs.',
        contextSentence:
          'For voice AI, it powers transcription and TTS for hands-free workflows.',
      },
    ],
  },
  {
    slug: 'predictive-analytics-and-forecasting',
    title: 'Predictive analytics and forecasting',
    description:
      'AI for demand forecasting, anomaly detection, risk scoring, and time-series prediction.',
    content:
      'Predictive AI turns historical data into forward-looking insights. Demand forecasting, anomaly detection, churn prediction, and risk scoring - the models learn patterns and extrapolate. For businesses with time-series data (sales, usage, sensor readings), this unlocks proactive decisions instead of reactive ones.\n\nI build predictive pipelines that fit your data and your questions. For Barnsley businesses, that might mean demand forecasting for inventory, anomaly detection on production metrics, or churn prediction for subscription services. The work is feature engineering, model selection, and integrating predictions into your workflows - not just building models in isolation.',
    category: 'ai',
    faqs: [
      {
        question: 'How much historical data do I need for AI forecasting?',
        answer:
          'It depends on the pattern. For demand forecasting with seasonal trends, two to three years of data is ideal. For anomaly detection, a few months of normal operation can be enough. I assess your data early and tell you honestly whether there is enough signal to build something useful.',
      },
      {
        question: 'Can AI predict customer churn for my business?',
        answer:
          'Yes, if you have customer activity data - logins, purchases, support tickets, usage patterns. The AI identifies patterns that precede churn and flags at-risk customers so your team can intervene. It works for subscriptions, SaaS, and repeat-purchase businesses.',
      },
      {
        question: 'What is anomaly detection and how can it help my business?',
        answer:
          'Anomaly detection spots unusual patterns in your data - a sudden drop in production quality, an unexpected spike in returns, or unusual transaction patterns. It alerts your team to problems early, before they escalate into costly issues.',
      },
      {
        question: 'Do I need a data science team to use predictive analytics?',
        answer:
          'No. I build the models, integrate predictions into your existing tools, and set up dashboards or alerts. Your team uses the outputs - forecasts, risk scores, anomaly alerts - without needing to understand the underlying models.',
      },
    ],
    integrations: [
      {
        name: 'Arize',
        url: 'https://arize.com',
        description: 'ML observability and monitoring for production models.',
        contextSentence:
          'For predictive analytics, it monitors model performance and drift in production.',
      },
      {
        name: 'WhyLabs',
        url: 'https://whylabs.ai',
        description: 'AI monitoring and data drift detection.',
        contextSentence:
          'For predictive analytics, it detects data drift and monitors model health.',
      },
      {
        name: 'Fiddler',
        url: 'https://fiddler.ai',
        description: 'ML explainability and model monitoring.',
        contextSentence:
          'For predictive analytics, it explains predictions and monitors model behaviour.',
      },
      {
        name: 'Pandas AI',
        url: 'https://pandas-ai.com',
        description: 'Natural language to dataframe queries for analytics.',
        contextSentence:
          'For predictive analytics, it lets analysts explore and forecast with natural language.',
      },
      {
        name: 'Prophet',
        url: 'https://facebook.github.io/prophet',
        description: 'Time-series forecasting for trend and seasonality.',
        contextSentence:
          'For predictive analytics, it forecasts demand and time-series with trend and seasonality.',
      },
      {
        name: 'Hugging Face',
        url: 'https://huggingface.co',
        description: 'Time-series and tabular models for prediction.',
        contextSentence:
          'For predictive analytics, it provides pre-trained forecasting and tabular models.',
      },
    ],
  },
]

export const businessTypes = [
  {
    slug: 'manufacturing-and-engineering',
    title: 'Manufacturing and engineering',
    description:
      'Process documentation, quality checks, supplier comms, and internal knowledge bases. Often starting with one high-friction workflow.',
    content:
      "Manufacturing and engineering firms in Barnsley and South Yorkshire have deep expertise - but it's often locked in people's heads or scattered across documents. I help capture that knowledge and put it to work.\n\nTypical starting points: process documentation that staff can query, quality check automation, supplier communication and order tracking, or internal knowledge bases for specs and procedures. We usually pick one high-friction workflow - something that eats time or causes errors - and solve that first. The goal is practical improvements that pay back quickly, not big-bang digital transformation.",
    category: 'businesses',
    faqs: [
      {
        question: 'How can AI help a manufacturing business in Barnsley?',
        answer:
          'Common starting points include: an internal knowledge base so staff can find specs and procedures without asking colleagues, automated quality checks using computer vision, supplier communication tracking, and process documentation that new starters can query. I pick one high-friction workflow and solve that first.',
      },
      {
        question: 'Do we need to replace our existing systems to use AI?',
        answer:
          'No. AI integrates with your existing tools - ERP, email, shared drives, production systems. I build connectors so the AI reads from and writes to what you already use. No rip-and-replace required.',
      },
      {
        question: 'What does AI cost for a small manufacturing firm?',
        answer:
          'A focused project - like an internal knowledge base or automated quality check - typically starts from a few thousand pounds. Running costs are modest. I scope and estimate before you commit, so there are no surprises.',
      },
      {
        question:
          'Can AI capture knowledge from experienced staff before they retire?',
        answer:
          'Yes. I build systems that capture institutional knowledge - procedures, troubleshooting steps, specifications - and make it searchable for the rest of the team. Staff contribute by answering questions or reviewing AI-generated documentation, preserving expertise that would otherwise be lost.',
      },
    ],
    integrations: [
      {
        name: 'Augmentir',
        url: 'https://augmentir.com',
        description:
          'AI for frontline manufacturing workers and process guidance.',
        contextSentence:
          'In manufacturing, it guides shop-floor workers through procedures and quality checks.',
      },
      {
        name: 'Sight Machine',
        url: 'https://sightmachine.com',
        description: 'Manufacturing analytics and AI for quality and yield.',
        contextSentence:
          'In manufacturing, it analyses production data for quality and yield optimisation.',
      },
      {
        name: 'Samsara',
        url: 'https://samsara.com',
        description:
          'AI-powered operations platform for industrial IoT and workflows.',
        contextSentence:
          'In manufacturing, it connects equipment and automates operational workflows.',
      },
      {
        name: 'Siemens Industrial AI',
        url: 'https://siemens.com',
        logoDomain: 'siemens.com',
        description:
          'AI for predictive maintenance and manufacturing optimisation.',
        contextSentence:
          'In manufacturing, it predicts equipment failures and optimises production.',
      },
      {
        name: 'Cognex',
        url: 'https://cognex.com',
        description: 'Machine vision and AI for quality inspection.',
        contextSentence:
          'In manufacturing, it inspects products and detects defects on the line.',
      },
      {
        name: 'SparkCognition',
        url: 'https://sparkcognition.com',
        description:
          'AI for predictive maintenance and industrial optimisation.',
        contextSentence:
          'In manufacturing, it predicts maintenance needs and optimises asset performance.',
      },
    ],
  },
  {
    slug: 'professional-services',
    title: 'Professional services',
    description:
      'Law, accountancy, consulting. Document review, contract extraction, client intake, and research automation.',
    content:
      'Professional services firms - law, accountancy, consulting - handle a lot of documents and repetitive research. AI can speed up document review, extract key terms from contracts, triage client intake, and surface relevant precedents or regulations.\n\nI work with firms in Barnsley and across the UK to automate the repetitive parts of professional work. That might mean contract extraction for due diligence, client intake that pre-fills from submitted documents, or research tools that summarise relevant case law or regulations. The AI augments your team; the professional judgment stays with your people. We start with one use case and expand when it proves its value.',
    category: 'businesses',
    faqs: [
      {
        question: 'Can AI review contracts as accurately as a solicitor?',
        answer:
          'AI excels at extracting key terms, flagging unusual clauses, and comparing against standard templates at speed. It handles the bulk review so your solicitors focus on judgment calls. Think of it as a very fast first pass rather than a replacement for legal expertise.',
      },
      {
        question: 'Is AI suitable for handling confidential client documents?',
        answer:
          'Yes, with the right setup. I build systems with encryption, access controls, and audit trails. Models can run in your own cloud environment so client data never leaves your infrastructure. Data governance is built in from day one.',
      },
      {
        question:
          'How can AI help with client intake for a professional services firm?',
        answer:
          'AI can read submitted documents, extract key information, pre-fill intake forms, flag missing data, and route the enquiry to the right person. It reduces manual data entry and speeds up the time from first contact to engagement.',
      },
      {
        question: 'What is the typical ROI for AI in professional services?',
        answer:
          'Most firms see payback within three to six months. The biggest savings come from reducing time on document review, research, and data entry - tasks that consume hours of billable-rate time. One contract review tool can pay for itself in the first month of heavy use.',
      },
    ],
    integrations: [
      {
        name: 'Harvey',
        url: 'https://harvey.ai',
        description:
          'AI for legal research, contract analysis, and due diligence.',
        contextSentence:
          'In professional services, it speeds up legal research and contract review.',
      },
      {
        name: 'Luminance',
        url: 'https://luminance.com',
        description: 'AI contract analysis and legal document review.',
        contextSentence:
          'In professional services, it automates contract analysis for law firms.',
      },
      {
        name: 'Casetext',
        url: 'https://casetext.com',
        description: 'AI legal research and brief analysis (Thomson Reuters).',
        contextSentence:
          'In professional services, it surfaces relevant case law and analyses briefs.',
      },
      {
        name: 'Kira',
        url: 'https://kirasystems.com',
        description: 'AI for contract review and due diligence.',
        contextSentence:
          'In professional services, it extracts terms and flags risks in contracts.',
      },
      {
        name: 'Evisort',
        url: 'https://evisort.com',
        description: 'AI contract intelligence and lifecycle management.',
        contextSentence:
          'In professional services, it manages contracts and extracts key clauses.',
      },
      {
        name: 'Ironclad',
        url: 'https://ironcladapp.com',
        description: 'Contract lifecycle management with AI extraction.',
        contextSentence:
          'In professional services, it automates contract workflows and extraction.',
      },
    ],
  },
  {
    slug: 'e-commerce-and-retail',
    title: 'E-commerce and retail',
    description:
      'Product search, customer support, inventory and order triage, and personalised recommendations.',
    content:
      'E-commerce and retail businesses need to help customers find products, answer questions, and feel understood. AI can power better search, smarter support, and personalised recommendations.\n\nI build product search that understands intent (not just keywords), customer support that handles common queries and escalates the rest, and recommendation engines that suggest what customers actually want. For inventory and operations, AI can triage orders, flag anomalies, and prioritise what needs attention. Barnsley and South Yorkshire have a strong retail presence - from independents to larger operations. The goal is tools that help you sell more and support customers better without needing a big tech team.',
    category: 'businesses',
    faqs: [
      {
        question: 'How can AI improve product search on my online shop?',
        answer:
          'AI semantic search understands what customers mean, not just what they type. A search for "warm winter jacket under fifty quid" finds the right products even if your listings don\'t use those exact words. It improves conversion by helping customers find what they want faster.',
      },
      {
        question: 'Can AI handle customer support for an e-commerce business?',
        answer:
          'Yes. An AI support agent can answer common queries - order status, returns process, sizing questions - instantly and around the clock. It escalates complex issues to your team. Most e-commerce businesses can automate 60-80% of support volume.',
      },
      {
        question:
          'What is AI-powered product recommendation and does it actually increase sales?',
        answer:
          "Recommendation engines analyse what customers browse, buy, and search for, then suggest relevant products. Done well, they increase average order value and repeat purchases. The AI learns from your customers' behaviour, not just generic rules.",
      },
      {
        question: 'Do I need a big product catalogue for AI to be worthwhile?',
        answer:
          'No. Even with a few hundred products, AI search and recommendations improve the shopping experience. The technology scales from small independent shops to large catalogues with tens of thousands of items.',
      },
    ],
    integrations: [
      {
        name: 'Nosto',
        url: 'https://nosto.com',
        description:
          'AI product recommendations and personalisation for retail.',
        contextSentence:
          'In e-commerce, it personalises product recommendations and upsells.',
      },
      {
        name: 'Algolia AI',
        url: 'https://algolia.com',
        description: 'NeuralSearch and AI-powered product discovery.',
        contextSentence:
          'In e-commerce, it powers semantic product search and discovery.',
      },
      {
        name: 'Dynamic Yield',
        url: 'https://www.dynamicyield.com',
        description: 'AI personalisation and recommendations for e-commerce.',
        contextSentence:
          'In e-commerce, it personalises onsite experiences and recommendations.',
      },
      {
        name: 'Klevu',
        url: 'https://klevu.com',
        description: 'AI search and merchandising for e-commerce.',
        contextSentence:
          'In e-commerce, it improves search relevance and merchandising.',
      },
      {
        name: 'Gorgias',
        url: 'https://gorgias.com',
        description: 'AI customer support for Shopify and e-commerce.',
        contextSentence:
          'In e-commerce, it automates customer support and order queries.',
      },
      {
        name: 'Rebuy',
        url: 'https://rebuyengine.com',
        description: 'AI product recommendations and upsell for e-commerce.',
        contextSentence:
          'In e-commerce, it drives upsells and cross-sells with AI recommendations.',
      },
    ],
  },
  {
    slug: 'b2b-saas-and-tech',
    title: 'B2B SaaS and tech companies',
    description:
      'Adding AI features to existing products, building internal tools, or prototyping new ideas with a clear path to production.',
    content:
      "Tech companies and B2B SaaS firms need to move fast on AI - either adding it to existing products or building new AI-powered offerings. I help with both.\n\nFor product teams: adding AI features (search, recommendations, assistive writing, automation) to existing products with a clear path to production. For internal tools: building AI-powered systems that make your team more productive. For prototyping: validating new ideas quickly with working software, then hardening for scale. I've worked with startups and established tech companies; the approach is the same - ship something useful, learn from usage, iterate. Barnsley's growing digital ecosystem, including The Seam and the Tech Town initiative, makes this a good time to invest in AI product development.",
    category: 'businesses',
    faqs: [
      {
        question: 'How do you add AI features to an existing SaaS product?',
        answer:
          'I integrate via your existing API layer - adding AI endpoints for search, recommendations, or content generation that your frontend calls. The AI layer sits alongside your codebase, not inside it. I work with your engineering team to ensure clean integration and maintainability.',
      },
      {
        question: 'Should we build AI features in-house or hire externally?',
        answer:
          'For your first AI features, external help gets you to production faster and avoids the learning curve. Once the patterns are established, your team can maintain and extend them. I aim to leave codebases your engineers can own, not black boxes they depend on me for.',
      },
      {
        question: 'How do you handle AI model costs at scale?',
        answer:
          'I design for cost-efficiency from the start - caching common responses, choosing the right model size for each task, and using cheaper models for simple operations. I set up monitoring so you can track costs per feature and per user, and optimise as usage grows.',
      },
      {
        question: 'Can AI help with internal tools for our tech team?',
        answer:
          'Absolutely. Common internal AI tools include: code review assistants, documentation generators, customer data enrichment, support ticket triage, and internal search over your knowledge base. These pay back quickly by saving engineering and support time.',
      },
    ],
    integrations: [
      {
        name: 'Vercel AI SDK',
        url: 'https://sdk.vercel.ai',
        logoDomain: 'vercel.com',
        description:
          'React AI components for embedding chat and completions in SaaS.',
        contextSentence:
          'In B2B SaaS, it ships chat and AI features quickly in React apps.',
      },
      {
        name: 'LangChain',
        url: 'https://langchain.com',
        description: 'Framework for building AI features into B2B products.',
        contextSentence:
          'In B2B SaaS, it builds RAG, agents, and AI workflows into products.',
      },
      {
        name: 'Anthropic',
        url: 'https://anthropic.com',
        description: 'Claude API for long-context and tool-use in product AI.',
        contextSentence:
          'In B2B SaaS, it powers long-context and tool-calling in product AI.',
      },
      {
        name: 'OpenAI',
        url: 'https://openai.com',
        description: 'GPT APIs for embedding AI in B2B products.',
        contextSentence:
          'In B2B SaaS, it adds chat, embeddings, and completions to products.',
      },
      {
        name: 'Vectara',
        url: 'https://vectara.com',
        description: 'Conversational search API for SaaS applications.',
        contextSentence:
          'In B2B SaaS, it adds conversational search to applications.',
      },
      {
        name: 'Jina AI',
        url: 'https://jina.ai',
        description: 'AI reader and embeddings for RAG and search pipelines.',
        contextSentence:
          'In B2B SaaS, it powers RAG and semantic search in products.',
      },
    ],
  },
  {
    slug: 'startups-and-scale-ups',
    title: 'Startups and scale-ups',
    description:
      'Fast iteration on AI-powered products, from MVP to production-ready. Often working alongside founders or small engineering teams.',
    content:
      'Startups and scale-ups need to move fast - validate ideas, build MVPs, and get to production without getting stuck in complexity. I work alongside founders and small engineering teams to ship AI-powered products.\n\nThe work ranges from greenfield MVPs to adding AI to existing products. I focus on getting something working that you can put in front of users, then iterating based on feedback. For early-stage teams, that might mean building the first version yourself so you can learn what works. For scale-ups, it might mean accelerating a specific AI initiative or filling a gap until you hire. The goal is momentum - shipped software that creates value, not perfect architecture that never ships.',
    category: 'businesses',
    faqs: [
      {
        question: 'How quickly can you build an AI-powered MVP?',
        answer:
          'A focused MVP with one core AI feature typically takes two to four weeks to build and deploy. I prioritise getting something working in front of users fast, then iterate based on feedback. Speed to learning matters more than perfection at this stage.',
      },
      {
        question: 'Do you work alongside existing engineering teams?',
        answer:
          'Yes. I slot in alongside founders and small engineering teams, filling the AI gap until you hire or upskill. I write clean, documented code that your team can own and extend after the engagement.',
      },
      {
        question: 'What AI stack do you recommend for startups?',
        answer:
          'I recommend a lean stack: Next.js or your existing framework, Vercel AI SDK for streaming, and API-based models (OpenAI, Anthropic, or open-source via Replicate/Together). This keeps infrastructure simple and costs proportional to usage. No GPU clusters needed to start.',
      },
      {
        question:
          'Can you help us figure out whether AI is the right approach for our product idea?',
        answer:
          'Yes. I do short validation sprints where we assess whether AI adds genuine value to your product, what the technical feasibility looks like, and what it would cost to build and run. Better to learn this in a week than after months of development.',
      },
    ],
    integrations: [
      {
        name: 'Vercel AI SDK',
        url: 'https://sdk.vercel.ai',
        logoDomain: 'vercel.com',
        description:
          'Ship AI features fast with streaming and React integration.',
        contextSentence:
          'For startups, it speeds up AI feature development with minimal boilerplate.',
      },
      {
        name: 'Replicate',
        url: 'https://replicate.com',
        description: 'Deploy open-source AI models via API without infra.',
        contextSentence:
          'For startups, it runs open models without managing infrastructure.',
      },
      {
        name: 'Together AI',
        url: 'https://together.ai',
        description:
          'Fast inference for open models when iterating on AI products.',
        contextSentence:
          'For startups, it provides fast inference for rapid iteration.',
      },
      {
        name: 'Groq',
        url: 'https://groq.com',
        description: 'Fast LLM inference API for AI product development.',
        contextSentence:
          'For startups, it delivers low-latency inference for real-time AI.',
      },
      {
        name: 'Hugging Face',
        url: 'https://huggingface.co',
        description: 'Open models, datasets, and inference for AI development.',
        contextSentence:
          'For startups, it provides models and datasets for experimentation.',
      },
      {
        name: 'Mistral AI',
        url: 'https://mistral.ai',
        description: 'Open and frontier LLMs for building AI products.',
        contextSentence:
          'For startups, it offers cost-effective frontier models for products.',
      },
    ],
  },
  {
    slug: 'agencies-and-service-providers',
    title: 'Agencies and service providers',
    description:
      'White-label AI solutions, client delivery, and internal efficiency tools for teams that bill by the hour.',
    content:
      'Agencies and service providers bill for time - so efficiency directly impacts margin. AI can help in two ways: delivering more value to clients, and reducing internal overhead.\n\nFor client delivery: white-label AI solutions you can offer as part of your service - chatbots, document processing, search, or custom tools. I build systems you can deploy for clients without each project starting from scratch. For internal efficiency: tools that speed up research, drafting, or repetitive tasks so your team can focus on high-value work. For Barnsley-based agencies serving local or national clients, this might mean adding AI to your service offering or streamlining how you deliver existing services.',
    category: 'businesses',
    faqs: [
      {
        question: 'Can I white-label AI solutions for my agency clients?',
        answer:
          'Yes. I build AI tools that you can deploy under your own brand for clients - chatbots, document processing, search, or custom automation. Each deployment is configured for the client without starting from scratch, so you deliver more while keeping margins healthy.',
      },
      {
        question: 'How can AI improve margins for a service-based business?',
        answer:
          'AI reduces the time spent on repetitive tasks - research, drafting, data entry, reporting. If your team bills by the hour, faster delivery means more capacity. If you charge fixed fees, faster delivery means better margins. Either way, AI lets your team focus on high-value work.',
      },
      {
        question:
          'What AI tools are most useful for marketing and creative agencies?',
        answer:
          'Content generation for first drafts and variations, SEO content optimisation, automated reporting, and client-facing chatbots are the most common. I also build research tools that summarise competitor content or industry trends, saving hours of manual work per campaign.',
      },
      {
        question: 'Can AI help with proposal writing and pitching?',
        answer:
          'Yes. AI can draft proposal sections, summarise case studies, generate tailored talking points, and pull relevant data. It speeds up the pitch process so you respond faster to opportunities without sacrificing quality.',
      },
    ],
    integrations: [
      {
        name: 'Jasper',
        url: 'https://jasper.ai',
        description:
          'AI content creation for client campaigns and marketing copy.',
        contextSentence:
          'For agencies, it scales content creation for client campaigns.',
      },
      {
        name: 'Copy.ai',
        url: 'https://copy.ai',
        description: 'AI copywriting for ads, emails, and client deliverables.',
        contextSentence:
          'For agencies, it drafts ad copy and emails for client work.',
      },
      {
        name: 'Writesonic',
        url: 'https://writesonic.com',
        description: 'AI writing for landing pages, blogs, and client content.',
        contextSentence:
          'For agencies, it generates landing pages and blog content for clients.',
      },
      {
        name: 'Surfer SEO',
        url: 'https://surferseo.com',
        description: 'AI content optimisation for SEO and client sites.',
        contextSentence:
          'For agencies, it optimises content for SEO on client sites.',
      },
      {
        name: 'Frase',
        url: 'https://frase.io',
        description: 'AI content research and writing for agencies.',
        contextSentence:
          'For agencies, it researches topics and drafts content for clients.',
      },
      {
        name: 'Descript',
        url: 'https://descript.com',
        description: 'AI video and audio editing for client deliverables.',
        contextSentence:
          'For agencies, it speeds up video and audio editing for client work.',
      },
    ],
  },
  {
    slug: 'healthcare-and-life-sciences',
    title: 'Healthcare and life sciences',
    description:
      'Clinical documentation, medical records, research automation, and compliance for healthcare providers.',
    content:
      'Healthcare generates vast amounts of unstructured data - notes, records, imaging reports. AI can assist with documentation, triage, summarisation, and research while keeping clinicians in the loop. The focus is on augmenting workflows, reducing administrative burden, and maintaining compliance.\n\nI work with healthcare providers and life sciences firms in Barnsley and the UK on AI that fits regulated environments. That might mean clinical note summarisation, prior auth assistance, or research literature synthesis. We start with one workflow, prove value, and expand carefully. Data governance and audit trails are built in from day one.',
    category: 'businesses',
    faqs: [
      {
        question:
          'Is AI safe to use with patient data in the NHS and UK healthcare?',
        answer:
          'Yes, with proper safeguards. I build systems with encryption, access controls, audit trails, and data processing agreements. Models can run within your own infrastructure so patient data never leaves your environment. Compliance with GDPR, the Data Protection Act, and NHS Digital standards is built in from day one.',
      },
      {
        question: 'Can AI reduce administrative burden for clinicians?',
        answer:
          'Significantly. AI can transcribe consultations, summarise clinical notes, pre-fill forms, and surface relevant patient history. This reduces documentation time so clinicians spend more time with patients and less time on paperwork.',
      },
      {
        question:
          'How does AI assist with clinical research and literature review?',
        answer:
          'AI can search and summarise research papers, identify relevant studies for a given question, extract key findings, and flag contradictions. It handles the volume that would take researchers weeks, surfacing the most relevant work for human review.',
      },
      {
        question: 'What healthcare AI use case should we start with?',
        answer:
          'Start with the task that consumes the most clinician or admin time for the least clinical value - usually documentation, note summarisation, or referral triage. These have clear ROI, low clinical risk, and build confidence for more ambitious projects.',
      },
    ],
    integrations: [
      {
        name: 'Nuance DAX',
        url: 'https://nuance.com',
        description: 'AI-powered clinical documentation for healthcare.',
        contextSentence:
          'In healthcare, it automates clinical documentation from patient encounters.',
      },
      {
        name: 'Suki',
        url: 'https://suki.ai',
        description: 'AI voice assistant for clinical documentation.',
        contextSentence:
          'In healthcare, it captures clinical notes via voice during consultations.',
      },
      {
        name: 'Abridge',
        url: 'https://abridge.com',
        description: 'AI for medical conversation documentation.',
        contextSentence:
          'In healthcare, it documents medical conversations for the record.',
      },
      {
        name: 'Tempus',
        url: 'https://tempus.com',
        description: 'AI for oncology and precision medicine.',
        contextSentence:
          'In healthcare, it supports oncology and precision medicine workflows.',
      },
      {
        name: 'BenchSci',
        url: 'https://benchsci.com',
        description: 'AI for life sciences research and antibody discovery.',
        contextSentence:
          'In healthcare, it accelerates research and antibody discovery.',
      },
      {
        name: 'Semantic Scholar',
        url: 'https://semanticscholar.org',
        description: 'AI-powered academic search for research.',
        contextSentence:
          'In healthcare, it surfaces relevant research literature for clinicians.',
      },
    ],
  },
  {
    slug: 'logistics-and-supply-chain',
    title: 'Logistics and supply chain',
    description:
      'Route optimisation, demand forecasting, inventory planning, and shipment tracking with AI.',
    content:
      'Logistics and supply chain involve constant trade-offs - cost vs speed, stock vs waste, capacity vs demand. AI can optimise routes, forecast demand, plan inventory, and flag anomalies. For Barnsley businesses in distribution, manufacturing, or retail, this often means starting with one pain point: late deliveries, excess stock, or manual planning.\n\nI build AI that plugs into your existing systems - TMS, WMS, ERP. The work ranges from demand forecasting for procurement to route optimisation for last-mile delivery. We focus on practical improvements that pay back quickly, with clear metrics and human oversight for exceptions.',
    category: 'businesses',
    faqs: [
      {
        question: 'How can AI improve delivery route planning?',
        answer:
          'AI analyses delivery addresses, traffic patterns, vehicle capacity, and time windows to find the most efficient routes. It adapts in real time to delays or new orders. Most businesses see a 10-20% reduction in fuel costs and delivery times after implementing AI route optimisation.',
      },
      {
        question: 'Can AI help reduce excess stock and waste?',
        answer:
          'Yes. AI demand forecasting analyses sales history, seasonality, and external factors to predict what you will need and when. This reduces over-ordering and stock-outs. For perishable goods or seasonal products, the savings can be substantial.',
      },
      {
        question: 'Does AI logistics require replacing our current TMS or WMS?',
        answer:
          'No. I build AI that integrates with your existing transport management and warehouse management systems. The AI reads your data, generates optimised plans, and feeds decisions back into your current tools.',
      },
      {
        question: 'What logistics problem should we tackle with AI first?',
        answer:
          'Start with your biggest pain point - usually demand forecasting for procurement, route optimisation for deliveries, or anomaly detection for shipment tracking. Pick the one that costs you the most time or money, prove the value, then expand.',
      },
    ],
    integrations: [
      {
        name: 'FourKites',
        url: 'https://fourkites.com',
        description: 'AI supply chain visibility and predictive ETAs.',
        contextSentence:
          'In logistics, it provides real-time visibility and predicted delivery times.',
      },
      {
        name: 'Project44',
        url: 'https://project44.com',
        description: 'Supply chain visibility and logistics intelligence.',
        contextSentence:
          'In logistics, it connects carriers and provides shipment visibility.',
      },
      {
        name: 'Flexport',
        url: 'https://flexport.com',
        description: 'AI for freight and customs automation.',
        contextSentence:
          'In logistics, it automates freight booking and customs documentation.',
      },
      {
        name: 'Blue Yonder',
        url: 'https://blueyonder.com',
        description: 'AI for demand planning and supply chain optimisation.',
        contextSentence:
          'In logistics, it forecasts demand and optimises inventory and planning.',
      },
      {
        name: 'Locus',
        url: 'https://locus.sh',
        description: 'AI route optimisation for last-mile delivery.',
        contextSentence:
          'In logistics, it optimises delivery routes and last-mile efficiency.',
      },
      {
        name: 'Kinaxis',
        url: 'https://kinaxis.com',
        description: 'AI for supply chain planning and demand sensing.',
        contextSentence:
          'In logistics, it plans supply chain and senses demand changes.',
      },
    ],
  },
  {
    slug: 'education-and-training',
    title: 'Education and training',
    description:
      'AI for learning platforms, assessment, content generation, and personalised learning paths.',
    content:
      'Education and training providers can use AI to personalise learning, automate assessment, generate content, and support tutors. For Barnsley schools, colleges, and training providers - including those supported by the Tech Town initiative - AI can help scale quality without scaling headcount.\n\nI work with education providers to integrate AI into their platforms and workflows. That might mean adaptive learning paths, automated marking with feedback, or content generation for course materials. We focus on tools that support educators and improve outcomes, not replace the human relationship at the heart of learning.',
    category: 'businesses',
    faqs: [
      {
        question: 'Can AI mark assignments and give feedback to students?',
        answer:
          'Yes. AI can assess written work, provide structured feedback, highlight areas for improvement, and even suggest next steps. It works best for formative assessment where the goal is learning, not just grading. Tutors review flagged or borderline submissions.',
      },
      {
        question: 'How does AI personalise learning paths?',
        answer:
          'AI tracks what each learner has mastered and where they struggle, then adjusts the content, difficulty, and pace accordingly. Stronger students are challenged while those who need more support get additional practice and explanation - all automatically.',
      },
      {
        question: 'Is AI appropriate for schools and colleges in Barnsley?',
        answer:
          'Yes, when used to support rather than replace educators. AI handles time-consuming tasks like marking, content generation, and progress tracking, freeing teachers to focus on the human side of education - mentoring, motivation, and complex questions.',
      },
      {
        question: 'Can AI generate course materials and lesson plans?',
        answer:
          'AI can draft lesson plans, generate practice questions, create reading summaries, and produce variations of existing materials for different ability levels. Educators review and refine the output, saving significant preparation time while maintaining quality.',
      },
    ],
    integrations: [
      {
        name: 'Khan Academy',
        url: 'https://khanacademy.org',
        description: 'AI tutor and personalised learning (Khanmigo).',
        contextSentence:
          'In education, it provides personalised tutoring and learning support.',
      },
      {
        name: 'Duolingo',
        url: 'https://duolingo.com',
        description: 'AI for language learning and adaptive practice.',
        contextSentence:
          'In education, it adapts language practice to learner level and goals.',
      },
      {
        name: 'Grammarly',
        url: 'https://grammarly.com',
        description: 'AI writing assistant for education and feedback.',
        contextSentence:
          'In education, it gives writing feedback and supports learner improvement.',
      },
      {
        name: 'Quizlet',
        url: 'https://quizlet.com',
        description: 'AI-powered study tools and flashcard generation.',
        contextSentence:
          'In education, it generates study materials and adapts to learner progress.',
      },
      {
        name: 'Coursera',
        url: 'https://coursera.org',
        description: 'AI for course recommendations and learning paths.',
        contextSentence:
          'In education, it recommends courses and personalises learning paths.',
      },
      {
        name: 'OpenAI',
        url: 'https://openai.com',
        description: 'GPT for content generation and tutoring applications.',
        contextSentence:
          'In education, it powers content generation and tutoring features.',
      },
    ],
  },
]

export const allBarnsleyPages = [...aiIntegrations, ...businessTypes]

export function getBarnsleyPage(slug) {
  return allBarnsleyPages.find((p) => p.slug === slug)
}

/** Generate a URL-safe slug from an integration name */
export function integrationSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/** All unique integrations across barnsley pages, with page references */
export function getAllIntegrationsWithPages() {
  const byUrl = new Map()
  for (const page of allBarnsleyPages) {
    if (!page.integrations) continue
    for (const integration of page.integrations) {
      const key = integration.url
      const pageRef = { slug: page.slug, title: page.title }
      if (byUrl.has(key)) {
        const existing = byUrl.get(key)
        if (!existing.pages.some((p) => p.slug === pageRef.slug)) {
          existing.pages.push(pageRef)
        }
      } else {
        byUrl.set(key, {
          slug: integrationSlug(integration.name),
          ...integration,
          pages: [pageRef],
        })
      }
    }
  }
  return Array.from(byUrl.values()).sort((a, b) => a.name.localeCompare(b.name))
}

/** Get a single integration by its slug */
export function getIntegrationBySlug(slug) {
  return getAllIntegrationsWithPages().find((i) => i.slug === slug)
}

/** Get all unique integration slugs for static generation */
export function getAllIntegrationSlugs() {
  return getAllIntegrationsWithPages().map((i) => i.slug)
}

/** Pick n random integrations */
export function getRandomIntegrations(n) {
  return fisherYatesSample(getAllIntegrationsWithPages(), n)
}

/** Pick n random items from an array */
export function getRandomItems(arr, n) {
  return fisherYatesSample(arr, n)
}

/** Fisher-Yates shuffle, returning the first n items */
function fisherYatesSample(arr, n) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a.slice(0, n)
}

/** Find the contextSentence for a specific integration on a specific page */
export function getContextForPage(integrationName, pageSlug) {
  const page = allBarnsleyPages.find((p) => p.slug === pageSlug)
  if (!page?.integrations) return null
  const match = page.integrations.find((i) => i.name === integrationName)
  return match?.contextSentence || null
}

/** Filter categories for the integrations page: AI types and business types */
export const integrationFilterCategories = [
  {
    group: 'AI integration types',
    options: aiIntegrations.map((p) => ({ slug: p.slug, title: p.title })),
  },
  {
    group: 'Business types',
    options: businessTypes.map((p) => ({ slug: p.slug, title: p.title })),
  },
]
