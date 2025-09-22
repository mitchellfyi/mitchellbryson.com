RAG systems are mostly a data quality problem: if you want good answers you need to clean up your data first

the main things that break RAG
duplicate content that confuses the embeddings
chunks that don't make sense semantically
retrieval that only uses one method
instead of combining approaches
no way to measure if it's actually working

here's a simple pipeline that works
remove duplicates aggressively
use fuzzy matching to find near-duplicates
and keep only the best version
split documents on meaning
not just character count
break at sentence boundaries
and merge related chunks
use both keyword search and semantic search then combine the results
rerank results to get the most relevant ones first
measure everything with a fixed test set before you ship

the key insight is that most of the work is in the data preparation
not the fancy AI models
clean data beats clever algorithms every time

start with a small high-quality dataset and get that working perfectly before you scale up
