# Context Archive

Context Archive is a visual research workspace for collecting screenshots, diagrams, references, and other research fragments.

The idea came from a simple problem. Research rarely stays organised.

A useful screenshot ends up in Downloads. A diagram is saved somewhere else. A reference is forgotten in a folder. Even when the files are still there, the context around why they were collected is often lost.

Context Archive is an attempt to make those fragments easier to understand and revisit.

## What it does

Users can upload one or multiple visual research captures at once.

Each capture is stored in the archive and analysed to identify its subject, important concepts, visible text, and a short contextual summary.

The current system can generate:

* A descriptive title
* A short context summary
* Important concepts
* Extracted visible text
* Persistent capture records

The longer term goal is to discover relationships between captures and organise related research into automatically generated contexts.

## How it works

Captures are uploaded from the React interface and stored using Supabase Storage.

A database record is created for each capture.

Selected captures are then sent as a batch to a Supabase Edge Function. The function handles image analysis through the Gemini API and stores the generated research metadata back in the archive.

The archive reads the stored captures and presents both the original visual and the context extracted from it.

## Tech

React

TypeScript

Vite

Supabase

Supabase Storage

Supabase Edge Functions

Gemini API

## Current status

Context Archive is currently under development.

Capture upload, persistent storage, archive retrieval, and visual capture analysis are working.

Automatic context discovery and grouping are still being developed.

The interface is also being refined as the core functionality takes shape.

## Project direction

The goal of Context Archive is not to replace research tools or traditional note taking.

It is designed around visual research fragments and the relationships between them.

The next stage of development focuses on identifying related captures and building contextual groups from a larger research archive.

## Development

Run the project locally with:

npm install

npm run dev

Environment variables and external service credentials are required for the connected Supabase project.

