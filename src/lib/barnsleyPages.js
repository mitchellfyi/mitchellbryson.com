export const aiIntegrations = [
  {
    slug: 'chatbots-and-conversational-ai',
    title: 'Chatbots and conversational AI',
    description:
      'Customer support, lead qualification, and internal Q&A systems that understand your business context.',
    content:
      'I build chatbots and conversational AI that fit your business. Whether it\'s handling customer support queries, qualifying leads before they reach your sales team, or powering internal Q&A so staff can find answers without digging through docs - the goal is systems that understand your context and respond usefully.\n\nFor Barnsley businesses, this might mean a support bot that knows your product range, a triage system for incoming enquiries, or an internal assistant that helps staff navigate policies and procedures. I integrate with your existing tools (Slack, Teams, your CRM, website) so the AI works where your team already works.',
    category: 'ai',
    integrations: [
      {
        name: 'Voiceflow',
        url: 'https://voiceflow.com',
        description: 'Conversational AI design platform for voice and chat agents.',
        contextSentence: 'For chatbots, it helps design multi-turn flows and deploy to web, voice, or messaging channels.',
      },
      {
        name: 'Botpress',
        url: 'https://botpress.com',
        description: 'Open-source AI chatbot builder with LLM and RAG support.',
        contextSentence: 'In chatbot projects, it powers support bots and internal Q&A with knowledge-base grounding.',
      },
      {
        name: 'Rasa',
        url: 'https://rasa.com',
        description: 'Conversational AI framework for intent and entity extraction.',
        contextSentence: 'For chatbots, it handles intent classification and slot-filling for structured conversations.',
      },
      {
        name: 'Dialogflow',
        url: 'https://cloud.google.com/dialogflow',
        logoDomain: 'cloud.google.com',
        description: 'Google conversational AI for voice and text agents.',
        contextSentence: 'For chatbots, it provides NLU and fulfilment for voice and text interfaces.',
      },
      {
        name: 'Amazon Lex',
        url: 'https://aws.amazon.com/lex',
        logoDomain: 'aws.amazon.com',
        description: 'AWS service for building conversational interfaces.',
        contextSentence: 'For chatbots, it builds voice and text bots with AWS Lambda integration.',
      },
      {
        name: 'Flowise',
        url: 'https://flowiseai.com',
        description: 'LLM flow builder for conversational AI with RAG and tools.',
        contextSentence: 'For chatbots, it connects LLMs to knowledge bases and external tools via flows.',
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
    integrations: [
      {
        name: 'Marqo',
        url: 'https://marqo.ai',
        description: 'AI search API with built-in embedding and hybrid retrieval.',
        contextSentence: 'For search, it powers semantic queries over documents and product catalogues.',
      },
      {
        name: 'Zilliz',
        url: 'https://zilliz.com',
        description: 'Vector database for AI-powered semantic search at scale.',
        contextSentence: 'For search, it stores embeddings and runs similarity queries at scale.',
      },
      {
        name: 'Pinecone',
        url: 'https://www.pinecone.io',
        description: 'Vector DB for RAG and neural search over embeddings.',
        contextSentence: 'For search, it indexes vectors for fast retrieval in RAG pipelines.',
      },
      {
        name: 'Weaviate',
        url: 'https://weaviate.io',
        description: 'Vector database with hybrid search and built-in embeddings.',
        contextSentence: 'For search, it combines vector and keyword search for hybrid retrieval.',
      },
      {
        name: 'Qdrant',
        url: 'https://qdrant.tech',
        description: 'Vector database for similarity search and filtering.',
        contextSentence: 'For search, it enables filtered similarity search over embeddings.',
      },
      {
        name: 'LlamaIndex',
        url: 'https://llamaindex.ai',
        description: 'AI data framework for RAG, retrieval, and semantic search.',
        contextSentence: 'For search, it orchestrates indexing and retrieval for RAG applications.',
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
    integrations: [
      {
        name: 'Unstructured.io',
        url: 'https://unstructured.io',
        description: 'LLM-ready document parsing and chunking for RAG pipelines.',
        contextSentence: 'For document processing, it parses PDFs and extracts structured content for downstream use.',
      },
      {
        name: 'Amazon Textract',
        url: 'https://aws.amazon.com/textract',
        logoDomain: 'aws.amazon.com',
        description: 'AI document extraction for forms, tables, and handwriting.',
        contextSentence: 'For document processing, it extracts data from invoices, forms, and handwritten notes.',
      },
      {
        name: 'Google Document AI',
        url: 'https://cloud.google.com/document-ai',
        logoDomain: 'cloud.google.com',
        description: 'ML models for invoice, contract, and form data extraction.',
        contextSentence: 'For document processing, it automates invoice and contract data capture.',
      },
      {
        name: 'Docugami',
        url: 'https://docugami.com',
        description: 'Document intelligence for contracts and business docs.',
        contextSentence: 'For document processing, it structures contracts and extracts key terms.',
      },
      {
        name: 'Rossum',
        url: 'https://rossum.ai',
        description: 'AI document processing for invoices and purchase orders.',
        contextSentence: 'For document processing, it automates invoice and PO data extraction.',
      },
      {
        name: 'Sensible',
        url: 'https://sensible.so',
        description: 'LLM-powered document extraction and structured data output.',
        contextSentence: 'For document processing, it uses LLMs to extract fields from varied document layouts.',
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
    integrations: [
      {
        name: 'LangChain',
        url: 'https://langchain.com',
        description: 'Agent framework for tool-calling and multi-step LLM workflows.',
        contextSentence: 'For workflow automation, it orchestrates agents that triage, route, and trigger actions.',
      },
      {
        name: 'CrewAI',
        url: 'https://crewai.com',
        description: 'Multi-agent AI for delegating tasks between specialised agents.',
        contextSentence: 'For workflow automation, it coordinates agents for ticket triage and follow-ups.',
      },
      {
        name: 'AutoGen',
        url: 'https://microsoft.github.io/autogen',
        logoDomain: 'microsoft.com',
        description: 'Microsoft multi-agent framework for autonomous AI conversations.',
        contextSentence: 'For workflow automation, it builds agents that collaborate on multi-step tasks.',
      },
      {
        name: 'Relevance AI',
        url: 'https://relevanceai.com',
        description: 'AI agent builder for autonomous workflows and tool use.',
        contextSentence: 'For workflow automation, it deploys agents that call tools and handle requests.',
      },
      {
        name: 'Bolt.new',
        url: 'https://bolt.new',
        description: 'AI-powered full-stack app builder with agent workflows.',
        contextSentence: 'For workflow automation, it prototypes agents and connects them to external tools.',
      },
      {
        name: 'Steamship',
        url: 'https://steamship.com',
        description: 'AI agent framework for multi-step reasoning and tools.',
        contextSentence: 'For workflow automation, it runs multi-step agent workflows with tool use.',
      },
    ],
  },
  {
    slug: 'data-pipelines-and-analytics',
    title: 'Data pipelines and analytics',
    description:
      'LLM-powered data cleaning, enrichment, and insight generation from unstructured or messy data sources.',
    content:
      'A lot of valuable data is messy - free text, inconsistent formats, scattered across spreadsheets and emails. LLMs can clean, normalise, enrich, and extract insights from unstructured data in ways that traditional ETL struggles with.\n\nI build pipelines that ingest your messy data, apply AI for cleaning and enrichment, and output structured data for analytics or downstream systems. Use cases include: normalising product or customer data, extracting entities from notes or feedback, generating summaries for reporting, or enriching records with external context. For Barnsley businesses with legacy data or manual data entry, this often unlocks analytics that weren\'t feasible before.',
    category: 'ai',
    integrations: [
      {
        name: 'Unstructured.io',
        url: 'https://unstructured.io',
        description: 'AI-powered parsing of PDFs and docs for LLM ingestion.',
        contextSentence: 'For data pipelines, it ingests messy documents and outputs structured data for analytics.',
      },
      {
        name: 'Pandas AI',
        url: 'https://pandas-ai.com',
        description: 'Natural language to dataframe queries via LLM.',
        contextSentence: 'For data pipelines, it lets analysts query and clean data using natural language.',
      },
      {
        name: 'LangChain',
        url: 'https://langchain.com',
        description: 'Document loaders and chains for data extraction and enrichment.',
        contextSentence: 'For data pipelines, it chains loaders and LLMs for extraction and enrichment.',
      },
      {
        name: 'LangSmith',
        url: 'https://smith.langchain.com',
        description: 'LLM observability, tracing, and evaluation for AI pipelines.',
        contextSentence: 'For data pipelines, it traces and debugs LLM runs and evaluates outputs.',
      },
      {
        name: 'Haystack',
        url: 'https://haystack.deepset.ai',
        description: 'NLP framework for LLM pipelines and document processing.',
        contextSentence: 'For data pipelines, it builds document processing and extraction pipelines.',
      },
      {
        name: 'Ragas',
        url: 'https://ragas.io',
        description: 'AI evaluation and benchmarking for RAG pipelines.',
        contextSentence: 'For data pipelines, it evaluates and benchmarks RAG and extraction quality.',
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
    integrations: [
      {
        name: 'Vercel AI SDK',
        url: 'https://sdk.vercel.ai',
        logoDomain: 'vercel.com',
        description: 'React streaming hooks for chat UIs and AI completions.',
        contextSentence: 'For product features, it powers chat UIs and streaming completions in React apps.',
      },
      {
        name: 'Cohere',
        url: 'https://cohere.com',
        description: 'Embedding and rerank APIs for semantic search in products.',
        contextSentence: 'For product features, it adds semantic search and reranking to apps.',
      },
      {
        name: 'Together AI',
        url: 'https://together.ai',
        description: 'Open model inference API for embedding AI in apps.',
        contextSentence: 'For product features, it provides inference for embeddings and completions.',
      },
      {
        name: 'OpenAI',
        url: 'https://openai.com',
        description: 'GPT APIs for chat, embeddings, and assistive features.',
        contextSentence: 'For product features, it powers chat, recommendations, and assistive writing.',
      },
      {
        name: 'Anthropic',
        url: 'https://anthropic.com',
        description: 'Claude API for long-context and tool-use in products.',
        contextSentence: 'For product features, it enables long-context chat and tool-calling in products.',
      },
      {
        name: 'Stability AI',
        url: 'https://stability.ai',
        description: 'Image generation and multimodal AI for product features.',
        contextSentence: 'For product features, it adds image generation and visual AI to apps.',
      },
    ],
  },
  {
    slug: 'computer-vision-and-image-ai',
    title: 'Computer vision and image AI',
    description:
      'Image classification, object detection, and visual inspection for quality control, compliance, and automation.',
    content:
      'AI can see and interpret images at scale - from quality inspection on production lines to document classification and visual search. Computer vision handles tasks that used to require human eyes: spotting defects, counting objects, reading labels, or matching products to images.\n\nI build vision systems that fit your workflow. For Barnsley manufacturers, that might mean defect detection on finished goods or visual verification of assembly. For retailers, it\'s visual search or automated product tagging. For logistics, it\'s package inspection or warehouse automation. The models are proven; the work is integrating them into your processes and handling edge cases.',
    category: 'ai',
    integrations: [
      {
        name: 'Roboflow',
        url: 'https://roboflow.com',
        description: 'Computer vision platform for custom object detection and classification.',
        contextSentence: 'For computer vision, it trains custom models for defect detection and quality inspection.',
      },
      {
        name: 'Clarifai',
        url: 'https://clarifai.com',
        description: 'AI vision API for image and video recognition.',
        contextSentence: 'For computer vision, it provides pre-built models for image and video analysis.',
      },
      {
        name: 'Google Cloud Vision',
        url: 'https://cloud.google.com/vision',
        logoDomain: 'cloud.google.com',
        description: 'Image analysis and object detection API.',
        contextSentence: 'For computer vision, it detects objects, labels, and text in images.',
      },
      {
        name: 'AWS Rekognition',
        url: 'https://aws.amazon.com/rekognition',
        logoDomain: 'aws.amazon.com',
        description: 'Image and video analysis for object and scene detection.',
        contextSentence: 'For computer vision, it analyses images and video for objects and scenes.',
      },
      {
        name: 'Replicate',
        url: 'https://replicate.com',
        description: 'Run open-source vision models via API.',
        contextSentence: 'For computer vision, it runs open-source vision models without managing infra.',
      },
      {
        name: 'Hugging Face',
        url: 'https://huggingface.co',
        description: 'Pre-trained vision models for classification and detection.',
        contextSentence: 'For computer vision, it provides pre-trained models for classification and detection.',
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
    integrations: [
      {
        name: 'OpenAI Whisper',
        url: 'https://openai.com/whisper',
        description: 'Speech-to-text model for transcription and translation.',
        contextSentence: 'For voice AI, it transcribes calls, meetings, and dictation with high accuracy.',
      },
      {
        name: 'ElevenLabs',
        url: 'https://elevenlabs.io',
        description: 'AI voice synthesis for natural text-to-speech.',
        contextSentence: 'For voice AI, it generates natural-sounding speech for IVR and assistants.',
      },
      {
        name: 'AssemblyAI',
        url: 'https://assemblyai.com',
        description: 'Speech-to-text API with summarisation and sentiment.',
        contextSentence: 'For voice AI, it transcribes and analyses calls with summaries and sentiment.',
      },
      {
        name: 'Deepgram',
        url: 'https://deepgram.com',
        description: 'Real-time speech recognition and transcription API.',
        contextSentence: 'For voice AI, it provides real-time transcription for live conversations.',
      },
      {
        name: 'Vapi',
        url: 'https://vapi.ai',
        description: 'Voice AI platform for phone and voice assistants.',
        contextSentence: 'For voice AI, it builds phone and voice assistants with LLM backends.',
      },
      {
        name: 'Google Cloud Speech',
        url: 'https://cloud.google.com/speech-to-text',
        logoDomain: 'cloud.google.com',
        description: 'Speech-to-text and text-to-speech APIs.',
        contextSentence: 'For voice AI, it powers transcription and TTS for hands-free workflows.',
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
    integrations: [
      {
        name: 'Arize',
        url: 'https://arize.com',
        description: 'ML observability and monitoring for production models.',
        contextSentence: 'For predictive analytics, it monitors model performance and drift in production.',
      },
      {
        name: 'WhyLabs',
        url: 'https://whylabs.ai',
        description: 'AI monitoring and data drift detection.',
        contextSentence: 'For predictive analytics, it detects data drift and monitors model health.',
      },
      {
        name: 'Fiddler',
        url: 'https://fiddler.ai',
        description: 'ML explainability and model monitoring.',
        contextSentence: 'For predictive analytics, it explains predictions and monitors model behaviour.',
      },
      {
        name: 'Pandas AI',
        url: 'https://pandas-ai.com',
        description: 'Natural language to dataframe queries for analytics.',
        contextSentence: 'For predictive analytics, it lets analysts explore and forecast with natural language.',
      },
      {
        name: 'Prophet',
        url: 'https://facebook.github.io/prophet',
        description: 'Time-series forecasting for trend and seasonality.',
        contextSentence: 'For predictive analytics, it forecasts demand and time-series with trend and seasonality.',
      },
      {
        name: 'Hugging Face',
        url: 'https://huggingface.co',
        description: 'Time-series and tabular models for prediction.',
        contextSentence: 'For predictive analytics, it provides pre-trained forecasting and tabular models.',
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
      'Manufacturing and engineering firms in Barnsley and South Yorkshire have deep expertise - but it\'s often locked in people\'s heads or scattered across documents. I help capture that knowledge and put it to work.\n\nTypical starting points: process documentation that staff can query, quality check automation, supplier communication and order tracking, or internal knowledge bases for specs and procedures. We usually pick one high-friction workflow - something that eats time or causes errors - and solve that first. The goal is practical improvements that pay back quickly, not big-bang digital transformation.',
    category: 'businesses',
    integrations: [
      {
        name: 'Augmentir',
        url: 'https://augmentir.com',
        description: 'AI for frontline manufacturing workers and process guidance.',
        contextSentence: 'In manufacturing, it guides shop-floor workers through procedures and quality checks.',
      },
      {
        name: 'Sight Machine',
        url: 'https://sightmachine.com',
        description: 'Manufacturing analytics and AI for quality and yield.',
        contextSentence: 'In manufacturing, it analyses production data for quality and yield optimisation.',
      },
      {
        name: 'Samsara',
        url: 'https://samsara.com',
        description: 'AI-powered operations platform for industrial IoT and workflows.',
        contextSentence: 'In manufacturing, it connects equipment and automates operational workflows.',
      },
      {
        name: 'Siemens Industrial AI',
        url: 'https://siemens.com',
        logoDomain: 'siemens.com',
        description: 'AI for predictive maintenance and manufacturing optimisation.',
        contextSentence: 'In manufacturing, it predicts equipment failures and optimises production.',
      },
      {
        name: 'Cognex',
        url: 'https://cognex.com',
        description: 'Machine vision and AI for quality inspection.',
        contextSentence: 'In manufacturing, it inspects products and detects defects on the line.',
      },
      {
        name: 'SparkCognition',
        url: 'https://sparkcognition.com',
        description: 'AI for predictive maintenance and industrial optimisation.',
        contextSentence: 'In manufacturing, it predicts maintenance needs and optimises asset performance.',
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
    integrations: [
      {
        name: 'Harvey',
        url: 'https://harvey.ai',
        description: 'AI for legal research, contract analysis, and due diligence.',
        contextSentence: 'In professional services, it speeds up legal research and contract review.',
      },
      {
        name: 'Luminance',
        url: 'https://luminance.com',
        description: 'AI contract analysis and legal document review.',
        contextSentence: 'In professional services, it automates contract analysis for law firms.',
      },
      {
        name: 'Casetext',
        url: 'https://casetext.com',
        description: 'AI legal research and brief analysis (Thomson Reuters).',
        contextSentence: 'In professional services, it surfaces relevant case law and analyses briefs.',
      },
      {
        name: 'Kira',
        url: 'https://kirasystems.com',
        description: 'AI for contract review and due diligence.',
        contextSentence: 'In professional services, it extracts terms and flags risks in contracts.',
      },
      {
        name: 'Evisort',
        url: 'https://evisort.com',
        description: 'AI contract intelligence and lifecycle management.',
        contextSentence: 'In professional services, it manages contracts and extracts key clauses.',
      },
      {
        name: 'Ironclad',
        url: 'https://ironcladapp.com',
        description: 'Contract lifecycle management with AI extraction.',
        contextSentence: 'In professional services, it automates contract workflows and extraction.',
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
    integrations: [
      {
        name: 'Nosto',
        url: 'https://nosto.com',
        description: 'AI product recommendations and personalisation for retail.',
        contextSentence: 'In e-commerce, it personalises product recommendations and upsells.',
      },
      {
        name: 'Algolia AI',
        url: 'https://algolia.com',
        description: 'NeuralSearch and AI-powered product discovery.',
        contextSentence: 'In e-commerce, it powers semantic product search and discovery.',
      },
      {
        name: 'Dynamic Yield',
        url: 'https://www.dynamicyield.com',
        description: 'AI personalisation and recommendations for e-commerce.',
        contextSentence: 'In e-commerce, it personalises onsite experiences and recommendations.',
      },
      {
        name: 'Klevu',
        url: 'https://klevu.com',
        description: 'AI search and merchandising for e-commerce.',
        contextSentence: 'In e-commerce, it improves search relevance and merchandising.',
      },
      {
        name: 'Gorgias',
        url: 'https://gorgias.com',
        description: 'AI customer support for Shopify and e-commerce.',
        contextSentence: 'In e-commerce, it automates customer support and order queries.',
      },
      {
        name: 'Rebuy',
        url: 'https://rebuyengine.com',
        description: 'AI product recommendations and upsell for e-commerce.',
        contextSentence: 'In e-commerce, it drives upsells and cross-sells with AI recommendations.',
      },
    ],
  },
  {
    slug: 'b2b-saas-and-tech',
    title: 'B2B SaaS and tech companies',
    description:
      'Adding AI features to existing products, building internal tools, or prototyping new ideas with a clear path to production.',
    content:
      'Tech companies and B2B SaaS firms need to move fast on AI - either adding it to existing products or building new AI-powered offerings. I help with both.\n\nFor product teams: adding AI features (search, recommendations, assistive writing, automation) to existing products with a clear path to production. For internal tools: building AI-powered systems that make your team more productive. For prototyping: validating new ideas quickly with working software, then hardening for scale. I\'ve worked with startups and established tech companies; the approach is the same - ship something useful, learn from usage, iterate. Barnsley\'s growing digital ecosystem, including The Seam and the Tech Town initiative, makes this a good time to invest in AI product development.',
    category: 'businesses',
    integrations: [
      {
        name: 'Vercel AI SDK',
        url: 'https://sdk.vercel.ai',
        logoDomain: 'vercel.com',
        description: 'React AI components for embedding chat and completions in SaaS.',
        contextSentence: 'In B2B SaaS, it ships chat and AI features quickly in React apps.',
      },
      {
        name: 'LangChain',
        url: 'https://langchain.com',
        description: 'Framework for building AI features into B2B products.',
        contextSentence: 'In B2B SaaS, it builds RAG, agents, and AI workflows into products.',
      },
      {
        name: 'Anthropic',
        url: 'https://anthropic.com',
        description: 'Claude API for long-context and tool-use in product AI.',
        contextSentence: 'In B2B SaaS, it powers long-context and tool-calling in product AI.',
      },
      {
        name: 'OpenAI',
        url: 'https://openai.com',
        description: 'GPT APIs for embedding AI in B2B products.',
        contextSentence: 'In B2B SaaS, it adds chat, embeddings, and completions to products.',
      },
      {
        name: 'Vectara',
        url: 'https://vectara.com',
        description: 'Conversational search API for SaaS applications.',
        contextSentence: 'In B2B SaaS, it adds conversational search to applications.',
      },
      {
        name: 'Jina AI',
        url: 'https://jina.ai',
        description: 'AI reader and embeddings for RAG and search pipelines.',
        contextSentence: 'In B2B SaaS, it powers RAG and semantic search in products.',
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
    integrations: [
      {
        name: 'Vercel AI SDK',
        url: 'https://sdk.vercel.ai',
        logoDomain: 'vercel.com',
        description: 'Ship AI features fast with streaming and React integration.',
        contextSentence: 'For startups, it speeds up AI feature development with minimal boilerplate.',
      },
      {
        name: 'Replicate',
        url: 'https://replicate.com',
        description: 'Deploy open-source AI models via API without infra.',
        contextSentence: 'For startups, it runs open models without managing infrastructure.',
      },
      {
        name: 'Together AI',
        url: 'https://together.ai',
        description: 'Fast inference for open models when iterating on AI products.',
        contextSentence: 'For startups, it provides fast inference for rapid iteration.',
      },
      {
        name: 'Groq',
        url: 'https://groq.com',
        description: 'Fast LLM inference API for AI product development.',
        contextSentence: 'For startups, it delivers low-latency inference for real-time AI.',
      },
      {
        name: 'Hugging Face',
        url: 'https://huggingface.co',
        description: 'Open models, datasets, and inference for AI development.',
        contextSentence: 'For startups, it provides models and datasets for experimentation.',
      },
      {
        name: 'Mistral AI',
        url: 'https://mistral.ai',
        description: 'Open and frontier LLMs for building AI products.',
        contextSentence: 'For startups, it offers cost-effective frontier models for products.',
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
    integrations: [
      {
        name: 'Jasper',
        url: 'https://jasper.ai',
        description: 'AI content creation for client campaigns and marketing copy.',
        contextSentence: 'For agencies, it scales content creation for client campaigns.',
      },
      {
        name: 'Copy.ai',
        url: 'https://copy.ai',
        description: 'AI copywriting for ads, emails, and client deliverables.',
        contextSentence: 'For agencies, it drafts ad copy and emails for client work.',
      },
      {
        name: 'Writesonic',
        url: 'https://writesonic.com',
        description: 'AI writing for landing pages, blogs, and client content.',
        contextSentence: 'For agencies, it generates landing pages and blog content for clients.',
      },
      {
        name: 'Surfer SEO',
        url: 'https://surferseo.com',
        description: 'AI content optimisation for SEO and client sites.',
        contextSentence: 'For agencies, it optimises content for SEO on client sites.',
      },
      {
        name: 'Frase',
        url: 'https://frase.io',
        description: 'AI content research and writing for agencies.',
        contextSentence: 'For agencies, it researches topics and drafts content for clients.',
      },
      {
        name: 'Descript',
        url: 'https://descript.com',
        description: 'AI video and audio editing for client deliverables.',
        contextSentence: 'For agencies, it speeds up video and audio editing for client work.',
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
    integrations: [
      {
        name: 'Nuance DAX',
        url: 'https://nuance.com',
        description: 'AI-powered clinical documentation for healthcare.',
        contextSentence: 'In healthcare, it automates clinical documentation from patient encounters.',
      },
      {
        name: 'Suki',
        url: 'https://suki.ai',
        description: 'AI voice assistant for clinical documentation.',
        contextSentence: 'In healthcare, it captures clinical notes via voice during consultations.',
      },
      {
        name: 'Abridge',
        url: 'https://abridge.com',
        description: 'AI for medical conversation documentation.',
        contextSentence: 'In healthcare, it documents medical conversations for the record.',
      },
      {
        name: 'Tempus',
        url: 'https://tempus.com',
        description: 'AI for oncology and precision medicine.',
        contextSentence: 'In healthcare, it supports oncology and precision medicine workflows.',
      },
      {
        name: 'BenchSci',
        url: 'https://benchsci.com',
        description: 'AI for life sciences research and antibody discovery.',
        contextSentence: 'In healthcare, it accelerates research and antibody discovery.',
      },
      {
        name: 'Semantic Scholar',
        url: 'https://semanticscholar.org',
        description: 'AI-powered academic search for research.',
        contextSentence: 'In healthcare, it surfaces relevant research literature for clinicians.',
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
    integrations: [
      {
        name: 'FourKites',
        url: 'https://fourkites.com',
        description: 'AI supply chain visibility and predictive ETAs.',
        contextSentence: 'In logistics, it provides real-time visibility and predicted delivery times.',
      },
      {
        name: 'Project44',
        url: 'https://project44.com',
        description: 'Supply chain visibility and logistics intelligence.',
        contextSentence: 'In logistics, it connects carriers and provides shipment visibility.',
      },
      {
        name: 'Flexport',
        url: 'https://flexport.com',
        description: 'AI for freight and customs automation.',
        contextSentence: 'In logistics, it automates freight booking and customs documentation.',
      },
      {
        name: 'Blue Yonder',
        url: 'https://blueyonder.com',
        description: 'AI for demand planning and supply chain optimisation.',
        contextSentence: 'In logistics, it forecasts demand and optimises inventory and planning.',
      },
      {
        name: 'Locus',
        url: 'https://locus.sh',
        description: 'AI route optimisation for last-mile delivery.',
        contextSentence: 'In logistics, it optimises delivery routes and last-mile efficiency.',
      },
      {
        name: 'Kinaxis',
        url: 'https://kinaxis.com',
        description: 'AI for supply chain planning and demand sensing.',
        contextSentence: 'In logistics, it plans supply chain and senses demand changes.',
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
    integrations: [
      {
        name: 'Khan Academy',
        url: 'https://khanacademy.org',
        description: 'AI tutor and personalised learning (Khanmigo).',
        contextSentence: 'In education, it provides personalised tutoring and learning support.',
      },
      {
        name: 'Duolingo',
        url: 'https://duolingo.com',
        description: 'AI for language learning and adaptive practice.',
        contextSentence: 'In education, it adapts language practice to learner level and goals.',
      },
      {
        name: 'Grammarly',
        url: 'https://grammarly.com',
        description: 'AI writing assistant for education and feedback.',
        contextSentence: 'In education, it gives writing feedback and supports learner improvement.',
      },
      {
        name: 'Quizlet',
        url: 'https://quizlet.com',
        description: 'AI-powered study tools and flashcard generation.',
        contextSentence: 'In education, it generates study materials and adapts to learner progress.',
      },
      {
        name: 'Coursera',
        url: 'https://coursera.org',
        description: 'AI for course recommendations and learning paths.',
        contextSentence: 'In education, it recommends courses and personalises learning paths.',
      },
      {
        name: 'OpenAI',
        url: 'https://openai.com',
        description: 'GPT for content generation and tutoring applications.',
        contextSentence: 'In education, it powers content generation and tutoring features.',
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
  return Array.from(byUrl.values()).sort((a, b) =>
    a.name.localeCompare(b.name),
  )
}

/** Get a single integration by its slug */
export function getIntegrationBySlug(slug) {
  return getAllIntegrationsWithPages().find((i) => i.slug === slug)
}

/** Get all unique integration slugs for static generation */
export function getAllIntegrationSlugs() {
  return getAllIntegrationsWithPages().map((i) => i.slug)
}

/** Pick n random integrations (deterministic per build) */
export function getRandomIntegrations(n) {
  const all = getAllIntegrationsWithPages()
  const shuffled = [...all].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n)
}

/** Pick n random items from an array (deterministic per build) */
export function getRandomItems(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n)
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
  { group: 'AI integration types', options: aiIntegrations.map((p) => ({ slug: p.slug, title: p.title })) },
  { group: 'Business types', options: businessTypes.map((p) => ({ slug: p.slug, title: p.title })) },
]
