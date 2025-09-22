rag quality is mostly data problem
below is production-oriented pipeline that consistently improves answer accuracy and reduces hallucinations
deduplicate aggressively
split on meaning not characters
use hybrid retrieval lexical plus dense with fusion
rerank and diversify at query-time
evaluate with objective metrics before shipping
evidence and defaults are included throughout

TLDR defaults that work

- Dedup: MinHash SimHash n-gram shingles, keep canonical, cluster near-dupes
- Chunking: sentence-aware with semantic merge, 300-500 tokens, small overlap
- Retrieval: BM25 plus dense embeddings with RRF fusion or score blending
- Rerank and diversify: cross-encoder, Cohere Rerank, MS MARCO models, plus MMR to reduce redundancy
- Store: Postgres plus pgvector, HNSW for recall speed, IVFFlat for lower memory
- Evaluate: Ragas faithfulness, answer relevancy on a fixed eval set, gate deployments on retrieval precision and groundedness

Deduplication that scales

Duplicate and near-duplicate documents distort embeddings and retrieval. Especially from web or ticket archives. Use fuzzy dedup, n-gram shingling plus MinHash SimHash to cluster near-dupes, then keep a canonical record per cluster. This approach is standard in large-scale NLP pipelines and has been shown to reduce memorisation and improve downstream quality.

What to implement

- Normalise, lowercase, Unicode NFKC, strip boilerplate nav
- Shingle into 3-5-gram tokens, compute MinHash signatures, LSH into buckets, cluster by Jaccard similarity, optionally validate with SimHash Hamming distance
- Keep one canonical item per cluster, freshest, richest metadata
- Persist duplicate_cluster_id so duplicates can be suppressed at query-time

Why this matters

Google dedup work on C4 and related corpora shows removing near-dupes reduces verbatim copying and improves efficiency. Evidence that duplicates harm model behaviour and evaluation. The same logic holds for RAG stores.

pseudocode minhash lsh for near-duplicate clusters:
from datasketch import minhash minhashlsh
def shingles text n=5:
tokens equals text.split
for i in range len tokens minus n plus 1:
yield join tokens i to i plus n
def signature text:
m equals minhash num_perm=64
for s in shingles text:
m.update s.encode utf-8
return m
lsh equals minhashlsh threshold=0.8 num_perm=64
for doc in docs:
m equals signature doc.content
lsh.insert doc.id m

Semantic chunking not just character splits

Chunking drives retrieval hit-rate. Prefer semantic chunkers that split by sentence boundaries and merge sentences that remain semantically cohesive in embedding space. This keeps concepts intact and reduces answer spread across chunks. LangChain SemanticChunker and LlamaIndex semantic splitters follow this pattern. Use small overlap only when needed.

pseudocode semantic chunking with fallback:
const sentences equals tosentences cleantext
const groups equals groupbysemanticsimilarity sentences window 3 sim=0.75
const chunks equals mergeadjacent groups maxtokens 450 overlaptokens 40

Rule of thumb

Start around 300-500 tokens per chunk with 10-20% overlap for text-heavy domains. Adjust empirically using retrieval precision and answer faithfulness metrics.

Hybrid retrieval that actually finds things

Lexical and dense retrieval fail in different ways. Hybrid retrieval combines BM25 keyword with dense vectors and fuses results. Commonly via Reciprocal Rank Fusion RRF or score blending. BM25 remains a robust baseline across domains, BEIR, and RRF is a simple, well-studied fusion method that often outperforms either signal alone.

Implementation options

- Parallel BM25 plus vector search, then RRF to combine ranked lists. Many vector DBs and frameworks document this pattern
- In LlamaIndex, QueryFusionRetriever improves hybrid ranking over naive score mixing

pseudocode rrf on two ranked lists:
def rrf rank k=60:
return 1.0 divided by k plus rank
def fuse bm25_ranks dense_ranks k=60:
scores equals defaultdict float
for i doc in enumerate bm25_ranks:
scores doc plus equals rrf i+1 k
for i doc in enumerate dense_ranks:
scores doc plus equals rrf i+1 k
return sorted scores key scores.get reverse true

Postgres-first note

If staying in Postgres, use pgvector with HNSW for best speed-recall trade-off, higher memory and build time, or IVFFlat for faster build lower memory. Both are well-documented.

Rerank and de-duplicate at query-time

Even good hybrid retrieval returns redundant or borderline contexts.

Cross-encoder rerankers, Cohere Rerank or MS MARCO cross-encoders score each candidate chunk with the query and push the truly relevant ones to the top. This reliably increases precision at k.

MMR, Maximal Marginal Relevance adds diversity by penalising near-duplicates among the selected chunks, which reduces wasted context budget.

after hybrid retrieval to top_k=40:
candidates equals hybrid query slice 40
reranked equals cross_encoder_rerank query candidates slice 12
final_ctx equals mmr_diversify query reranked k=6 lambda_=0.5

Evaluate before and after shipping

Adopt a small, fixed eval set of realistic questions. Measure:

Retrieval: precision recall at k on gold passages, or reference-free retrieval quality. Answer: faithfulness groundedness, answer relevancy, context precision. Ragas provides these out of the box and integrates cleanly with tracing. Use it to gate releases.

Reference implementation end-to-end

Raw docs to Clean and normalise to MinHash SimHash near-dup clustering to Semantic chunking plus light overlap to BM25 index and Vector index pgvector HNSW to RRF fusion to Cross-encoder rerank to MMR diversify to Context to LLM and Eval Ragas and tracing.

Operational checklist

Ingestion

- Canonicalise URLs IDs, store duplicate_cluster_id
- Blocklists for boilerplate, nav, cookie banners

Chunking

- Use sentence boundaries plus semantic merge, verify average tokens chunk and overlap

Retrieval

- Run BM25 plus dense in parallel, fuse with RRF, log per-query which channel won

Rerank

- Cross-encoder rerank to 8-16 items, MMR to 4-8 final contexts

Store

- pgvector index selection: start with HNSW, fall back to IVFFlat if memory build time bite

Evaluate

- Automate Ragas on a nightly sample, block deploys if faithfulness drops greater than X percent or cost answer rises greater than Y percent
