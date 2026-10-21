"use client";

import { MachineFigure } from "../machine/figure";
import { ragProject } from "./machine";

const STEPS = [
  { title: "The library is built first", body: "Before anyone asks anything, you upload documents. The app cuts each one into pages of about 1,000 letters, overlapping a little so no sentence is cut in half. Every page gets a number fingerprint (Google's text-embedding-005) and is saved in a database (Firestore). The books on the shelf are those saved pages." },
  { title: "A question becomes numbers", body: "A customer types a question. Computers can't compare meanings, only numbers, so the question gets its own fingerprint, made the same way as the pages." },
  { title: "Find the closest books", body: "The ladder rolls along the shelf and its lamp checks each book. The better a book matches the question, the further it sticks out, and the dial shows the match from 0 to 1. The database does this search for us (cosine similarity). This is the “retrieval”." },
  { title: "Take the closest five", body: "The five books that stick out the most are lifted down and laid open on the reading desk. We don't give the AI the whole library. Only the pages that matter keep the answer focused." },
  { title: "The AI reads only those", body: "The gauge shows how much text is now on the desk, and the lamp lights while the AI reads. It has a strict rule: “Answer ONLY using these pages.” The AI here is Gemini 2.5 Flash." },
  { title: "The AI types the answer", body: "The typewriter writes the answer, streaming it out word by word. That is the “generation”. Because it can only use the open books, it doesn't make things up." },
  { title: "If the books can't answer it", body: "Click the machine until you reach “who founded the company?”. No book matches, so none sticks out. The AI still gets five books, but the rule makes it type “I don't know, please contact support” instead of guessing." },
];

export default function RagProjectFigure() {
  return (
    <MachineFigure
      fig="Fig 2"
      title="Answering from your own documents"
      hint="Click or ← → to ask another question"
      keys={[
        { mark: "raised", label: "A saved page: the more it matches, the further it sticks out" },
        { mark: "lit", label: "The 5 books the AI is allowed to read" },
        { mark: "red", label: "The “I don't know” answer" },
      ]}
      caption="My RAG support agent as a small library. Pages are 1,000-character chunks with 150 characters of overlap, embedded with Vertex text-embedding-005 and stored in Firestore; a question finds its 5 nearest pages by cosine similarity and Gemini 2.5 Flash answers only from them. The embeddings drawn here are invented, but everything on screen is computed from them."
      lead={
        <>
          <b>What is this?</b> A support chatbot that answers from a company&apos;s own documents instead of from memory. A normal AI is like a student who read a lot but forgets details and has never seen your private files, so it guesses. <b>RAG</b> gives it an open book: first <b>find</b> the right pages, then <b>write</b> the answer from just those pages.
        </>
      }
      steps={STEPS}
      parts={
        <>
          <b>What am I looking at?</b> Each <b>book</b> is one saved page. The <b>ladder with the lamp</b> is the search. The <b>reading desk</b> is where the AI works, and the <b>typed sheet</b> is the answer. It turns red when the AI says it doesn&apos;t know.
        </>
      }
      machine={ragProject}
    />
  );
}
